// Junta o cálculo com os textos e monta a resposta que vai para a tela.
import "server-only";
import { calcularMapa } from "./astro";
import { SOL, LUA, ASCENDENTE } from "./interpretacoes";
import {
  TEMA, MERCURIO, VENUS, MARTE, JUPITER, SATURNO, URANO, NETUNO, PLUTAO,
  MEIO_DO_CEU, CASAS, ELEMENTOS, MODALIDADES, RETROGRADO,
} from "./interpretacoes-planetas";

const TEXTOS = {
  sol: SOL, lua: LUA, mercurio: MERCURIO, venus: VENUS, marte: MARTE,
  jupiter: JUPITER, saturno: SATURNO, urano: URANO, netuno: NETUNO, plutao: PLUTAO,
};

// "a", "a e b", "a, b e c"
const lista = (xs) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} e ${xs[xs.length - 1]}`);

// Texto do equilíbrio, tratando empates (ex.: Fogo 4 e Terra 4).
function textoElemento(chaves) {
  if (chaves.length === 1) return ELEMENTOS[chaves[0]];
  const nomes = chaves.map((k) => ELEMENTOS[k].nome);
  const resumos = chaves.map((k) => ELEMENTOS[k].resumo);
  return {
    nome: lista(nomes),
    texto: `Seu mapa tem ${lista(nomes)} em igual destaque: você une ${lista(resumos)}.`,
  };
}

function textoModalidade(chaves) {
  if (chaves.length === 1) return MODALIDADES[chaves[0]];
  const nomes = chaves.map((k) => MODALIDADES[k].nome.toLowerCase());
  const resumos = chaves.map((k) => MODALIDADES[k].resumo);
  const inicio = chaves.length === 3 ? "Você tem as três qualidades em equilíbrio" : `Você combina as qualidades ${lista(nomes)}`;
  return { nome: lista(nomes), texto: `${inicio}: ${lista(resumos)}.` };
}

const ponto = (p) => p && { signo: p.signo, grau: p.grau, minuto: p.minuto, longitude: p.longitude };

export function montarMapa({ data, hora, cidade }) {
  const m = calcularMapa(data, hora, cidade);

  const planetas = m.planetas.map((p) => {
    const incerta = p.chave === "lua" && m.luaIncerta;
    return {
      ...ponto(p),
      chave: p.chave,
      nome: p.nome,
      tema: TEMA[p.chave],
      casa: p.casa ?? null,
      retrogrado: p.retrogrado,
      incerta: !!incerta,
      texto: incerta
        ? `A Lua mudou de signo no dia em que você nasceu: está em ${m.luaIncerta[0]} ou ${m.luaIncerta[1]}. Com a hora de nascimento dá para saber qual.`
        : TEXTOS[p.chave][p.indice],
      textoCasa: p.casa ? `Na casa ${p.casa}, essa energia aparece mais em: ${CASAS[p.casa - 1]}.` : null,
      textoRetrogrado: p.retrogrado ? RETROGRADO : null,
    };
  });

  const { elementos, modalidades, elementosDominantes, modalidadesDominantes } = m.equilibrio;

  return {
    data,
    hora,
    local: `${cidade.nome} – ${cidade.uf}`,
    horaConhecida: m.horaConhecida,
    planetas,
    ascendente: m.ascendente && { ...ponto(m.ascendente), texto: ASCENDENTE[m.ascendente.indice] },
    meioDoCeu: m.meioDoCeu && { ...ponto(m.meioDoCeu), texto: MEIO_DO_CEU[m.meioDoCeu.indice] },
    casas: m.casas && m.casas.map((c, i) => ({ numero: i + 1, ...ponto(c), area: CASAS[i] })),
    equilibrio: {
      elementos,
      modalidades,
      elemento: textoElemento(elementosDominantes),
      modalidade: textoModalidade(modalidadesDominantes),
    },
  };
}
