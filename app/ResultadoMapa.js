"use client";

import { useState } from "react";

// Glifos com ︎ para não virarem emoji no celular.
const T = "︎";
const GLIFO_SIGNO = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((g) => g + T);
const GLIFO_PLANETA = {
  sol: "☉", lua: "☽", mercurio: "☿" + T, venus: "♀" + T, marte: "♂" + T,
  jupiter: "♃", saturno: "♄", urano: "♅", netuno: "♆", plutao: "♇",
};
const ELEMENTO_COR = ["var(--fogo)", "var(--terra)", "var(--ar)", "var(--agua)"];
const ELEMENTOS = [["fogo", "Fogo"], ["terra", "Terra"], ["ar", "Ar"], ["agua", "Água"]];
const MODALIDADES = [["cardinal", "Cardinal"], ["fixo", "Fixa"], ["mutavel", "Mutável"]];

const dataBR = (iso) => iso.split("-").reverse().join("/");
const grau = (p) => `${p.grau}°${String(p.minuto).padStart(2, "0")}′`;

// ——— Roda do mapa ———
function RodaMapa({ mapa }) {
  const C = 200;
  const base = mapa.ascendente ? mapa.ascendente.longitude : 0; // Ascendente à esquerda
  const ang = (lon) => ((180 + lon - base) * Math.PI) / 180;
  const pt = (lon, r) => [C + r * Math.cos(ang(lon)), C - r * Math.sin(ang(lon))];
  const R = { fora: 192, signos: 164, planetas: 138, casas: 112, centro: 60 };

  // Espalha planetas muito próximos para os glifos não se sobreporem.
  const ordenados = [...mapa.planetas].sort((a, b) => a.longitude - b.longitude);
  const pos = ordenados.map((p) => ({ ...p, desenho: p.longitude }));
  for (let volta = 0; volta < 6; volta++) {
    for (let i = 0; i < pos.length; i++) {
      const a = pos[i];
      const b = pos[(i + 1) % pos.length];
      let dif = (b.desenho - a.desenho + 360) % 360;
      if (dif < 9) {
        const ajuste = (9 - dif) / 2;
        a.desenho -= ajuste;
        b.desenho += ajuste;
      }
    }
  }

  const caminhoSetor = (ini, fim, r1, r2) => {
    const [x1, y1] = pt(ini, r2), [x2, y2] = pt(fim, r2), [x3, y3] = pt(fim, r1), [x4, y4] = pt(ini, r1);
    return `M${x1},${y1} A${r2},${r2} 0 0 0 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 0 1 ${x4},${y4} Z`;
  };

  return (
    <svg viewBox="-24 -24 448 448" className="roda" role="img" aria-label="Roda do seu mapa astral">
      {/* Signos */}
      {GLIFO_SIGNO.map((g, i) => {
        const [x, y] = pt(i * 30 + 15, (R.fora + R.signos) / 2);
        return (
          <g key={i}>
            <path d={caminhoSetor(i * 30, i * 30 + 30, R.signos, R.fora)} fill={ELEMENTO_COR[i % 4]} fillOpacity="0.14" stroke="var(--linha)" strokeWidth="1" />
            <text x={x} y={y} className="glifo-signo" fill={ELEMENTO_COR[i % 4]} textAnchor="middle" dominantBaseline="central">{g}</text>
          </g>
        );
      })}
      <circle cx={C} cy={C} r={R.signos} fill="none" stroke="var(--linha)" />
      <circle cx={C} cy={C} r={R.casas} fill="none" stroke="var(--linha)" />
      <circle cx={C} cy={C} r={R.centro} fill="var(--campo)" stroke="var(--linha)" />

      {/* Casas */}
      {mapa.casas && mapa.casas.map((c, i) => {
        const angular = i % 3 === 0; // 1, 4, 7 e 10
        const [x1, y1] = pt(c.longitude, R.centro);
        const [x2, y2] = pt(c.longitude, angular ? R.fora : R.signos);
        const prox = mapa.casas[(i + 1) % 12].longitude;
        const meio = c.longitude + (((prox - c.longitude) % 360 + 360) % 360) / 2;
        const [tx, ty] = pt(meio, (R.casas + R.centro) / 2 + 2);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={angular ? "var(--ouro)" : "var(--linha)"} strokeWidth={angular ? 1.6 : 1} />
            <text x={tx} y={ty} className="num-casa" textAnchor="middle" dominantBaseline="central">{i + 1}</text>
          </g>
        );
      })}
      {mapa.ascendente && (() => {
        const [x, y] = pt(mapa.ascendente.longitude, R.fora + 2);
        const [mx, my] = pt(mapa.meioDoCeu.longitude, R.fora + 2);
        return (
          <>
            <text x={x - 4} y={y} className="eixo" textAnchor="end" dominantBaseline="central">AC</text>
            <text x={mx} y={my - 6} className="eixo" textAnchor="middle">MC</text>
          </>
        );
      })()}

      {/* Planetas */}
      {pos.map((p) => {
        const [x1, y1] = pt(p.longitude, R.signos);
        const [x2, y2] = pt(p.longitude, R.signos - 7);
        const [gx, gy] = pt(p.desenho, R.planetas);
        return (
          <g key={p.chave}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ouro)" strokeWidth="1.4" />
            <text x={gx} y={gy} className="glifo-planeta" textAnchor="middle" dominantBaseline="central">
              {GLIFO_PLANETA[p.chave]}
            </text>
            {p.retrogrado && (
              <text x={gx + 9} y={gy + 8} className="retro-mini" textAnchor="middle">R</text>
            )}
          </g>
        );
      })}
      <text x={C} y={C - 6} className="centro-titulo" textAnchor="middle">{mapa.horaConhecida ? "Placidus" : "Sem hora"}</text>
      <text x={C} y={C + 12} className="centro-sub" textAnchor="middle">tropical</text>
    </svg>
  );
}

function Barras({ valores, itens }) {
  const total = Object.values(valores).reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="barras">
      {itens.map(([chave, nome], i) => (
        <div className="barra" key={chave}>
          <span className="barra-nome">{nome}</span>
          <span className="barra-trilho">
            <span className="barra-valor" style={{ width: `${(valores[chave] / total) * 100}%`, background: itens.length === 4 ? ELEMENTO_COR[i] : "var(--ouro)" }} />
          </span>
          <span className="barra-num">{valores[chave]}</span>
        </div>
      ))}
    </div>
  );
}

function Secao({ glifo, titulo, tema, pos, casa, retrogrado, texto, textoCasa, textoRetrogrado, incerta }) {
  return (
    <section className="secao">
      <div className="secao-topo">
        <span className="secao-glifo" aria-hidden="true">{glifo}</span>
        <div className="secao-titulos">
          <h3>
            {titulo}{" "}
            {!incerta && <>em <strong>{pos.signo}</strong> <span className="grau">{grau(pos)}</span></>}
          </h3>
          <p className="tema">{tema}</p>
        </div>
        <div className="selos">
          {casa && <span className="selo">Casa {casa}</span>}
          {retrogrado && <span className="selo retro">Retrógrado</span>}
        </div>
      </div>
      <p className={incerta ? "aviso-astro" : ""}>{texto}</p>
      {textoCasa && <p className="extra">{textoCasa}</p>}
      {textoRetrogrado && <p className="extra">{textoRetrogrado}</p>}
    </section>
  );
}

function rr(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.lineTo(x + w - r, y);
  c.arcTo(x + w, y, x + w, y + r, r);
  c.lineTo(x + w, y + h - r);
  c.arcTo(x + w, y + h, x + w - r, y + h, r);
  c.lineTo(x + r, y + h);
  c.arcTo(x, y + h, x, y + h - r, r);
  c.lineTo(x, y + r);
  c.arcTo(x, y, x + r, y, r);
  c.closePath();
}

async function gerarImagemMapa(mapa) {
  const W = 1080, H = 1920;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const c = cv.getContext("2d");

  const OURO = "#d9b871", OURO2 = "#e7c98a";
  const TEXTO = "#ece6d8", SUAVE = "#a29fb8", LINHA = "#2c3358";
  const CEU = "#0f1428", CEU2 = "#1a1f3d", CAMPO = "#10152b", CARD = "#171c36";
  const SANS = 'Inter, system-ui, sans-serif';
  const SERIF = '"Cormorant Garamond", Georgia, serif';

  // Background
  const bg = c.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, CEU2); bg.addColorStop(1, CEU);
  c.fillStyle = bg; c.fillRect(0, 0, W, H);

  // Stars
  [[108,95],[860,60],[44,210],[1020,170],[310,88],[780,130],[55,760],[1025,610],[540,45],[200,980],[950,900]].forEach(([x,y]) => {
    c.fillStyle = "rgba(255,255,255,0.55)"; c.beginPath(); c.arc(x,y,2.2,0,Math.PI*2); c.fill();
  });

  await document.fonts.ready;
  c.textAlign = "center";

  // Ornament
  c.fillStyle = OURO; c.font = `500 52px ${SERIF}`;
  c.fillText("✦", W/2, 130);

  // Title
  c.fillStyle = TEXTO; c.font = `600 96px ${SERIF}`;
  c.fillText("Seu Mapa Astral", W/2, 248);

  // Date · local
  c.fillStyle = SUAVE; c.font = `400 34px ${SANS}`;
  const dataLinha = `${dataBR(mapa.data)}${mapa.hora ? " · " + mapa.hora : ""} · ${mapa.local}`;
  c.fillText(dataLinha, W/2, 310);

  // Divider
  c.strokeStyle = LINHA; c.lineWidth = 1;
  c.beginPath(); c.moveTo(80, 350); c.lineTo(W-80, 350); c.stroke();

  // ——— Trio (Sol / Lua / Asc) ———
  const sol = mapa.planetas.find((p) => p.chave === "sol");
  const lua = mapa.planetas.find((p) => p.chave === "lua");
  const trio = [
    { label: "☉  Sol", val: sol.signo },
    { label: "☽  Lua", val: lua.incerta ? "—" : lua.signo },
    { label: "↑  Ascendente", val: mapa.ascendente ? mapa.ascendente.signo : "—" },
  ];
  const bW = (W - 100) / 3 - 10, bH = 220, bY = 380;
  trio.forEach(({ label, val }, i) => {
    const bX = 50 + i * ((W - 100) / 3);
    c.fillStyle = CAMPO; rr(c, bX, bY, bW, bH, 22); c.fill();
    c.strokeStyle = LINHA; c.lineWidth = 1; rr(c, bX, bY, bW, bH, 22); c.stroke();
    const cx = bX + bW / 2;
    c.fillStyle = SUAVE; c.font = `400 27px ${SANS}`;
    c.fillText(label, cx, bY + 72);
    c.fillStyle = OURO2; c.font = `600 58px ${SERIF}`;
    c.fillText(val, cx, bY + 160);
  });

  // ——— Outros planetas ———
  c.strokeStyle = LINHA; c.lineWidth = 1;
  c.beginPath(); c.moveTo(80, 640); c.lineTo(W-80, 640); c.stroke();

  const pessoais = ["mercurio","venus","marte","jupiter","saturno"];
  const glf = { mercurio:"☿", venus:"♀", marte:"♂", jupiter:"♃", saturno:"♄", urano:"♅", netuno:"♆", plutao:"♇" };
  const planFiltro = mapa.planetas.filter(p => pessoais.includes(p.chave));

  c.fillStyle = SUAVE; c.font = `500 28px ${SANS}`;
  c.fillText("PLANETAS", W/2, 700);

  const colunas = 2, larg = (W - 160) / colunas;
  planFiltro.forEach((p, i) => {
    const col = i % colunas, row = Math.floor(i / colunas);
    const px = 80 + col * larg + larg / 2;
    const py = 760 + row * 100;
    c.fillStyle = CAMPO; rr(c, 80 + col * larg, py - 44, larg - 20, 80, 16); c.fill();
    c.strokeStyle = LINHA; c.lineWidth = 1; rr(c, 80 + col * larg, py - 44, larg - 20, 80, 16); c.stroke();
    c.fillStyle = SUAVE; c.font = `400 24px ${SANS}`;
    c.fillText(`${glf[p.chave]}  ${p.nome}`, px - 10, py - 12);
    c.fillStyle = OURO; c.font = `600 36px ${SERIF}`;
    c.fillText(p.signo, px - 10, py + 26);
  });

  // ——— MC ———
  if (mapa.meioDoCeu) {
    const mcY = 760 + Math.ceil(planFiltro.length / 2) * 100 + 20;
    c.fillStyle = CAMPO; rr(c, 80, mcY, W - 160, 80, 16); c.fill();
    c.strokeStyle = LINHA; c.lineWidth = 1; rr(c, 80, mcY, W - 160, 80, 16); c.stroke();
    c.fillStyle = SUAVE; c.font = `400 24px ${SANS}`;
    c.fillText("MC  Meio do Céu", W/2, mcY + 26);
    c.fillStyle = OURO; c.font = `600 36px ${SERIF}`;
    c.fillText(mapa.meioDoCeu.signo, W/2, mcY + 62);
  }

  // ——— Equilíbrio ———
  const eqY = H - 340;
  c.strokeStyle = LINHA; c.lineWidth = 1;
  c.beginPath(); c.moveTo(80, eqY); c.lineTo(W-80, eqY); c.stroke();

  const doms = mapa.equilibrio.elemento.nome;
  const mods = mapa.equilibrio.modalidade.nome;
  c.fillStyle = SUAVE; c.font = `400 30px ${SANS}`;
  c.fillText(`Elemento · ${doms}     Modalidade · ${mods}`, W/2, eqY + 60);

  // ——— Footer ———
  c.strokeStyle = LINHA; c.lineWidth = 1;
  c.beginPath(); c.moveTo(80, H - 200); c.lineTo(W-80, H - 200); c.stroke();
  c.fillStyle = OURO; c.font = `500 32px ${SANS}`;
  c.fillText("mapa-astral-1-real.vercel.app", W/2, H - 140);
  c.fillStyle = SUAVE; c.font = `400 26px ${SANS}`;
  c.fillText("Posições pelo zodíaco tropical · Astronomy Engine", W/2, H - 90);

  return new Promise((res) => cv.toBlob(res, "image/png"));
}

function BotaoCompartilhar({ mapa }) {
  const [gerando, setGerando] = useState(false);

  async function compartilhar() {
    setGerando(true);
    try {
      const blob = await gerarImagemMapa(mapa);
      const file = new File([blob], "meu-mapa-astral.png", { type: "image/png" });
      // Mobile: Web Share API com arquivo
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Meu Mapa Astral" });
      } else {
        // Desktop / fallback: abre a imagem em nova aba para salvar/compartilhar
        const url = URL.createObjectURL(blob);
        const w = window.open(url, "_blank");
        if (!w) {
          // Bloqueado pelo popup blocker: faz download direto
          const a = document.createElement("a");
          a.href = url; a.download = "meu-mapa-astral.png";
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
        }
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      }
    } catch (e) {
      console.error("compartilhar error:", e);
    }
    setGerando(false);
  }

  return (
    <button onClick={compartilhar} disabled={gerando}>
      {gerando ? "Gerando imagem…" : "Compartilhar resultado"}
    </button>
  );
}

export default function ResultadoMapa({ mapa, onNovo }) {
  const sol = mapa.planetas.find((p) => p.chave === "sol");
  const lua = mapa.planetas.find((p) => p.chave === "lua");
  const pessoais = mapa.planetas.filter((p) => ["mercurio", "venus", "marte"].includes(p.chave));
  const sociais = mapa.planetas.filter((p) => ["jupiter", "saturno"].includes(p.chave));
  const geracionais = mapa.planetas.filter((p) => ["urano", "netuno", "plutao"].includes(p.chave));
  const secaoPlaneta = (p) => (
    <Secao key={p.chave} glifo={GLIFO_PLANETA[p.chave]} titulo={p.nome} tema={p.tema} pos={p}
      casa={p.casa} retrogrado={p.retrogrado} texto={p.texto} textoCasa={p.textoCasa}
      textoRetrogrado={p.textoRetrogrado} incerta={p.incerta} />
  );

  return (
    <div className="resultado">
      <header className="res-topo">
        <p className="ornamento" aria-hidden="true">✦</p>
        <h1 className="menor">Seu mapa astral</h1>
        <p className="dados">{dataBR(mapa.data)}{mapa.hora && ` · ${mapa.hora}`} · {mapa.local}</p>
      </header>

      <div className="trio">
        <div><span>☉ Sol</span><strong>{sol.signo}</strong></div>
        <div><span>☽ Lua</span><strong>{lua.incerta ? "—" : lua.signo}</strong></div>
        <div><span>↑ Ascend.</span><strong>{mapa.ascendente ? mapa.ascendente.signo : "—"}</strong></div>
      </div>

      <RodaMapa mapa={mapa} />
      {!mapa.horaConhecida && (
        <p className="aviso-astro centro">Sem a hora de nascimento, o mapa não tem Ascendente, Meio do Céu nem casas.</p>
      )}

      <section className="secao destaque">
        <h2>O equilíbrio do seu mapa</h2>
        <Barras valores={mapa.equilibrio.elementos} itens={ELEMENTOS} />
        <p>{mapa.equilibrio.elemento.texto}</p>
        <Barras valores={mapa.equilibrio.modalidades} itens={MODALIDADES} />
        <p>{mapa.equilibrio.modalidade.texto}</p>
      </section>

      <h2 className="grupo">Os três pilares</h2>
      {secaoPlaneta(sol)}
      {secaoPlaneta(lua)}
      {mapa.ascendente && (
        <Secao glifo="↑" titulo="Ascendente" tema="como você se mostra ao mundo" pos={mapa.ascendente} texto={mapa.ascendente.texto} />
      )}

      <h2 className="grupo">Planetas pessoais</h2>
      {pessoais.map(secaoPlaneta)}

      <h2 className="grupo">Crescimento e maturidade</h2>
      {sociais.map(secaoPlaneta)}
      {mapa.meioDoCeu && (
        <Secao glifo="MC" titulo="Meio do Céu" tema="sua vocação e carreira" pos={mapa.meioDoCeu} texto={mapa.meioDoCeu.texto} />
      )}

      <h2 className="grupo">Sua geração</h2>
      {geracionais.map(secaoPlaneta)}

      {mapa.casas && (
        <section className="secao">
          <h2>Suas 12 casas</h2>
          <div className="tabela-casas">
            <table>
              <thead><tr><th>Casa</th><th>Começa em</th><th>Área da vida</th></tr></thead>
              <tbody>
                {mapa.casas.map((c) => (
                  <tr key={c.numero}>
                    <td className="num">{c.numero}</td>
                    <td><span className="glifo-tab">{GLIFO_SIGNO[Math.floor(c.longitude / 30)]}</span> {c.signo} {c.grau}°</td>
                    <td>{c.area[0].toUpperCase() + c.area.slice(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <BotaoCompartilhar mapa={mapa} />
      <button className="secundario" onClick={onNovo}>Fazer outro mapa</button>
    </div>
  );
}
