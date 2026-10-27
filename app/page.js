"use client";

import { useEffect, useRef, useState } from "react";
import ResultadoMapa from "./ResultadoMapa";

const FIM = ["rejected", "cancelled", "expired", "refunded", "not_found"];
const hoje = () => new Date().toISOString().slice(0, 10);

function CampoCidade({ selecionada, onSelecionar }) {
  const [texto, setTexto] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);
  const espera = useRef(null);

  useEffect(() => {
    if (selecionada) setTexto(`${selecionada.nome} – ${selecionada.uf}`);
  }, [selecionada]);

  function digitar(valor) {
    setTexto(valor);
    onSelecionar(null);
    clearTimeout(espera.current);
    if (valor.trim().length < 2) {
      setOpcoes([]);
      setAberto(false);
      return;
    }
    espera.current = setTimeout(async () => {
      const res = await fetch(`/api/cidades?q=${encodeURIComponent(valor)}`);
      const lista = await res.json();
      setOpcoes(lista);
      setAtivo(0);
      setAberto(true);
    }, 180);
  }

  function escolher(c) {
    onSelecionar(c);
    setAberto(false);
  }

  function teclas(e) {
    if (!aberto || !opcoes.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setAtivo((a) => (a + 1) % opcoes.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setAtivo((a) => (a - 1 + opcoes.length) % opcoes.length); }
    if (e.key === "Enter") { e.preventDefault(); escolher(opcoes[ativo]); }
    if (e.key === "Escape") setAberto(false);
  }

  return (
    <div className="cidade">
      <input
        id="cidade"
        type="text"
        role="combobox"
        aria-expanded={aberto}
        aria-controls="cidades-lista"
        aria-autocomplete="list"
        autoComplete="off"
        placeholder="Digite e escolha na lista"
        value={texto}
        onChange={(e) => digitar(e.target.value)}
        onKeyDown={teclas}
        onBlur={() => setTimeout(() => setAberto(false), 150)}
        onFocus={() => opcoes.length && !selecionada && setAberto(true)}
      />
      {aberto && (
        <ul id="cidades-lista" role="listbox" className="sugestoes">
          {opcoes.length === 0 && <li className="vazio">Nenhuma cidade encontrada</li>}
          {opcoes.map((c, i) => (
            <li
              key={c.ibge}
              role="option"
              aria-selected={i === ativo}
              className={i === ativo ? "ativo" : ""}
              onMouseDown={(e) => { e.preventDefault(); escolher(c); }}
            >
              {c.nome} <span>{c.uf}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Home() {
  const [etapa, setEtapa] = useState("inicio"); // inicio | gerando | aguardando | mapa | erro
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [semHora, setSemHora] = useState(false);
  const [horaDeVerao, setHoraDeVerao] = useState(false);
  const [cidade, setCidade] = useState(null);
  const [pix, setPix] = useState(null);
  const [mapa, setMapa] = useState(null);
  const [erro, setErro] = useState("");
  const [copiado, setCopiado] = useState(false);
  const timer = useRef(null);

  function ajustarDST(horaStr, dataISO) {
    const [h, m] = horaStr.split(":").map(Number);
    const totalMin = h * 60 + m + 60;
    if (totalMin < 24 * 60) {
      const hh = String(Math.floor(totalMin / 60)).padStart(2, "0");
      const mm = String(totalMin % 60).padStart(2, "0");
      return { hora: `${hh}:${mm}`, data: dataISO };
    }
    const d = new Date(dataISO + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() + 1);
    const hh = String(Math.floor((totalMin - 1440) / 60)).padStart(2, "0");
    const mm = String((totalMin - 1440) % 60).padStart(2, "0");
    return { hora: `${hh}:${mm}`, data: d.toISOString().slice(0, 10) };
  }

  async function comprar(e) {
    e.preventDefault();
    if (!data) return setErro("Informe sua data de nascimento.");
    if (!semHora && !hora) return setErro('Informe a hora ou marque "Não sei a hora".');
    if (!cidade) return setErro("Escolha a cidade de nascimento na lista.");
    setErro("");
    setEtapa("gerando");
    let horaEnvio = semHora ? null : hora;
    let dataEnvio = data;
    if (!semHora && hora && horaDeVerao) {
      const adj = ajustarDST(hora, data);
      horaEnvio = adj.hora;
      dataEnvio = adj.data;
    }
    const res = await fetch("/api/pagamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: dataEnvio, hora: horaEnvio, ibge: cidade.ibge }),
    });
    const r = await res.json();
    if (!res.ok) {
      setErro(r.erro);
      setEtapa("inicio");
      return;
    }
    setPix(r);
    setEtapa("aguardando");
  }

  useEffect(() => {
    if (etapa !== "aguardando" || !pix) return;
    timer.current = setInterval(async () => {
      const res = await fetch(`/api/pagamento/${pix.id}`, { cache: "no-store" });
      const r = await res.json();
      if (r.status === "approved") {
        clearInterval(timer.current);
        setMapa(r.mapa);
        setEtapa("mapa");
      } else if (FIM.includes(r.status)) {
        clearInterval(timer.current);
        setErro("O pagamento não foi concluído. Gere um novo Pix.");
        setEtapa("erro");
      }
    }, 3000);
    return () => clearInterval(timer.current);
  }, [etapa, pix]);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(pix.copiaECola);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {}
  }

  function denovo() {
    setPix(null);
    setMapa(null);
    setErro("");
    setEtapa("inicio");
  }

  return (
    <main>
      <div className={`card ${etapa === "mapa" ? "largo" : ""}`}>
        {(etapa === "inicio" || etapa === "gerando") && (
          <form onSubmit={comprar} noValidate>
            <p className="ornamento" aria-hidden="true">☉ ☽ ↑</p>
            <h1>Seu mapa astral</h1>
            <p className="sub">
              Por um valor simbólico de <strong>R$&nbsp;1,00</strong>, receba seu mapa astral completo: os 10 planetas, Ascendente, Meio do Céu e as 12 casas.
            </p>

            <div className="linha">
              <div className="campo">
                <label htmlFor="data">Data de nascimento</label>
                <input id="data" type="date" min="1900-01-01" max={hoje()} value={data}
                  onChange={(e) => setData(e.target.value)} />
              </div>
              <div className="campo">
                <label htmlFor="hora">Hora</label>
                <input id="hora" type="time" value={hora} disabled={semHora}
                  onChange={(e) => setHora(e.target.value)} />
              </div>
            </div>

            <label className="check">
              <input id="sem-hora" type="checkbox" checked={semHora}
                onChange={(e) => { setSemHora(e.target.checked); if (e.target.checked) setHoraDeVerao(false); }} />
              Não sei a hora (sem Ascendente e casas)
            </label>

            {!semHora && hora && (
              <label className="verao">
                <input id="hora-verao" type="checkbox" checked={horaDeVerao}
                  onChange={(e) => setHoraDeVerao(e.target.checked)} />
                <span className="verao-texto">
                  <span className="verao-nome">Horário de verão</span>
                  <span className="verao-desc">O horário no registro está em hora padrão, mas nasci durante o horário de verão</span>
                </span>
              </label>
            )}

            <div className="campo">
              <label htmlFor="cidade">Cidade de nascimento</label>
              <CampoCidade selecionada={cidade} onSelecionar={setCidade} />
            </div>

            {erro && <p className="erro">{erro}</p>}
            <button disabled={etapa === "gerando"}>
              {etapa === "gerando" ? "Gerando Pix…" : "Ver meu mapa astral"}
            </button>
          </form>
        )}

        {etapa === "aguardando" && pix && (
          <div className="pix">
            <h1 className="menor">Pague com Pix</h1>
            {pix.teste && <p className="aviso">Modo de teste: aprova sozinho em alguns segundos.</p>}
            {pix.qrImagem ? (
              <img src={pix.qrImagem} alt="QR Code do Pix" />
            ) : (
              <div className="qr-falso">QR</div>
            )}
            <button className="secundario" onClick={copiar}>
              {copiado ? "Copiado!" : "Copiar Pix copia e cola"}
            </button>
            <p className="espera"><span className="ponto" /> Aguardando pagamento…</p>
          </div>
        )}

        {etapa === "mapa" && mapa && (
          <ResultadoMapa mapa={mapa} onNovo={denovo} />
        )}

        {etapa === "erro" && (
          <div className="resultado">
            <p className="erro">{erro}</p>
            <button onClick={denovo}>Tentar de novo</button>
          </div>
        )}
      </div>

      <footer>Posições calculadas com a Astronomy Engine, no zodíaco tropical. Conteúdo para entretenimento.</footer>
    </main>
  );
}
