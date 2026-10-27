// Integração Pix com a Efí (antiga Gerencianet), seguindo a API Pix do Banco Central.
// Não pede nenhum dado do pagador. Os dados de nascimento (19 dígitos, veja
// lib/nascimento.js) vão dentro do txid, então nada precisa ser guardado.
//
// Variáveis de ambiente:
//   EFI_CLIENT_ID, EFI_CLIENT_SECRET  credenciais da aplicação na Efí
//   EFI_CHAVE_PIX                     sua chave Pix cadastrada na Efí
//   EFI_CERT_BASE64                   certificado .p12 em base64 (veja o README)
//   EFI_SANDBOX=true                  usa o ambiente de homologação
//   PIX_MODO_TESTE=true               força o modo de teste mesmo em produção
//
// Modo de teste (Pix simulado, aprova sozinho): só no `npm run dev` sem credenciais,
// ou com PIX_MODO_TESTE=true. Em produção sem credenciais, nenhuma cobrança é criada
// e nenhum mapa é liberado — assim um deploy mal configurado não entrega nada de graça.

import crypto from "node:crypto";
import https from "node:https";
import "server-only";

export const PRECO = "1.00";
const PREFIXO = "ma"; // marca os txids criados por este site

const CLIENT_ID = process.env.EFI_CLIENT_ID;
const CLIENT_SECRET = process.env.EFI_CLIENT_SECRET;
const CHAVE = process.env.EFI_CHAVE_PIX;
const CERT = process.env.EFI_CERT_BASE64;
const HOST = process.env.EFI_SANDBOX === "true" ? "pix-h.api.efipay.com.br" : "pix.api.efipay.com.br";

export const MODO_TESTE =
  process.env.PIX_MODO_TESTE === "true" || (!CLIENT_ID && process.env.NODE_ENV !== "production");
const CONFIGURADO = Boolean(CLIENT_ID && CLIENT_SECRET && CHAVE && CERT);
const APROVA_EM_MS = 6000;

// ——— HTTP com certificado (a Efí exige o .p12 em todas as chamadas) ———
let agente;
function agenteTLS() {
  if (!agente) {
    if (!CERT) throw new Error("EFI_CERT_BASE64 não configurado");
    agente = new https.Agent({ pfx: Buffer.from(CERT, "base64"), passphrase: "" });
  }
  return agente;
}

function requisicao(metodo, caminho, { corpo, headers = {} } = {}) {
  return new Promise((resolve, reject) => {
    const dados = corpo ? JSON.stringify(corpo) : undefined;
    const req = https.request(
      {
        host: HOST,
        path: caminho,
        method: metodo,
        agent: agenteTLS(),
        headers: {
          "Content-Type": "application/json",
          ...(dados && { "Content-Length": Buffer.byteLength(dados) }),
          ...headers,
        },
      },
      (res) => {
        let txt = "";
        res.on("data", (c) => (txt += c));
        res.on("end", () => {
          let json = {};
          try { json = txt ? JSON.parse(txt) : {}; } catch {}
          resolve({ status: res.statusCode, json });
        });
      }
    );
    req.on("error", reject);
    if (dados) req.write(dados);
    req.end();
  });
}

// Token OAuth, reaproveitado até perto de expirar.
let token = { valor: null, expira: 0 };
async function autenticado(metodo, caminho, opcoes = {}) {
  if (!token.valor || Date.now() > token.expira) {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const r = await requisicao("POST", "/oauth/token", {
      corpo: { grant_type: "client_credentials" },
      headers: { Authorization: `Basic ${basic}` },
    });
    if (r.status !== 200) {
      console.error("Efí auth:", r.json);
      throw new Error("Falha na autenticação com a Efí");
    }
    token = { valor: r.json.access_token, expira: Date.now() + (r.json.expires_in - 60) * 1000 };
  }
  return requisicao(metodo, caminho, {
    ...opcoes,
    headers: { ...opcoes.headers, Authorization: `Bearer ${token.valor}` },
  });
}

// txid: 26 a 35 caracteres alfanuméricos. Formato: ma + 19 dígitos + 14 hex aleatórios = 35.
function novoTxid(codigo) {
  return `${PREFIXO}${codigo}${crypto.randomBytes(7).toString("hex")}`;
}

function lerTxid(id) {
  const m = /^ma(\d{19})[a-f0-9]{14}$/.exec(id);
  return m ? m[1] : null;
}

// ——— API usada pelas rotas ———

export async function criarPix(codigo) {
  if (MODO_TESTE) {
    return {
      id: `teste_${codigo}_${Date.now()}`,
      copiaECola: "00020126MODO-DE-TESTE-NAO-PAGUE5204000053039865802BR",
      qrImagem: null,
      teste: true,
    };
  }
  if (!CONFIGURADO) throw new Error("Pix não configurado: defina as variáveis EFI_* (veja o README)");

  const txid = novoTxid(codigo);
  const cob = await autenticado("PUT", `/v2/cob/${txid}`, {
    corpo: {
      calendario: { expiracao: 1800 },
      valor: { original: PRECO },
      chave: CHAVE,
      solicitacaoPagador: "Seu mapa astral",
    },
  });
  if (cob.status >= 300) {
    console.error("Efí cob:", cob.json);
    throw new Error("Falha ao criar a cobrança");
  }

  const qr = await autenticado("GET", `/v2/loc/${cob.json.loc.id}/qrcode`);
  if (qr.status >= 300) {
    console.error("Efí qrcode:", qr.json);
    throw new Error("Falha ao gerar o QR Code");
  }

  return {
    id: txid,
    copiaECola: qr.json.qrcode || cob.json.pixCopiaECola,
    qrImagem: qr.json.imagemQrcode, // já vem como data:image/png;base64,...
    teste: false,
  };
}

// Retorna { status, codigo }. status: "approved" | "pending" | "cancelled" | "not_found"
export async function statusPagamento(id) {
  if (MODO_TESTE) {
    const m = /^teste_(\d{19})_(\d+)$/.exec(id);
    if (!m) return { status: "not_found" };
    const aprovado = Date.now() - Number(m[2]) > APROVA_EM_MS;
    return { status: aprovado ? "approved" : "pending", codigo: m[1] };
  }
  if (!CONFIGURADO) return { status: "not_found" };

  const codigo = lerTxid(id);
  if (!codigo) return { status: "not_found" };

  const r = await autenticado("GET", `/v2/cob/${id}`);
  if (r.status !== 200) return { status: "not_found" };

  const pago = r.json.status === "CONCLUIDA" && Number(r.json.valor?.original) >= Number(PRECO);
  if (pago) return { status: "approved", codigo };
  if (r.json.status === "ATIVA") return { status: "pending", codigo };
  return { status: "cancelled" }; // REMOVIDA_PELO_USUARIO_RECEBEDOR, REMOVIDA_PELO_PSP
}
