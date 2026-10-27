import "server-only";
// Mapa astral completo: 10 planetas, Ascendente, Meio do Céu e casas Placidus.
// Zodíaco tropical, eclíptica verdadeira da data.
// Posições pela Astronomy Engine (MIT); fuso histórico pelo Luxon/IANA,
// que já considera os horários de verão brasileiros de cada época e região.
import * as Astronomy from "astronomy-engine";
import { DateTime } from "luxon";

export const SIGNOS = [
  "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
  "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes",
];

// chave, nome, corpo na Astronomy Engine
export const PLANETAS = [
  ["sol", "Sol", "Sun"],
  ["lua", "Lua", "Moon"],
  ["mercurio", "Mercúrio", "Mercury"],
  ["venus", "Vênus", "Venus"],
  ["marte", "Marte", "Mars"],
  ["jupiter", "Júpiter", "Jupiter"],
  ["saturno", "Saturno", "Saturn"],
  ["urano", "Urano", "Uranus"],
  ["netuno", "Netuno", "Neptune"],
  ["plutao", "Plutão", "Pluto"],
];

const ELEMENTO = ["fogo", "terra", "ar", "agua"]; // signo % 4
const MODALIDADE = ["cardinal", "fixo", "mutavel"]; // signo % 3

const rad = Math.PI / 180;
const norm = (g) => ((g % 360) + 360) % 360;

function posicao(longitude) {
  const l = norm(longitude);
  const i = Math.floor(l / 30);
  const resto = l - i * 30;
  return { longitude: l, indice: i, signo: SIGNOS[i], grau: Math.floor(resto), minuto: Math.floor((resto % 1) * 60) };
}

// Longitude eclíptica geocêntrica verdadeira da data.
function longitude(corpo, data) {
  if (corpo === "Sun") return Astronomy.SunPosition(data).elon;
  if (corpo === "Moon") return Astronomy.EclipticGeoMoon(data).lon;
  const eqj = Astronomy.GeoVector(corpo, data, true);
  const ect = Astronomy.RotateVector(Astronomy.Rotation_EQJ_ECT(data), eqj);
  return norm(Math.atan2(ect.y, ect.x) / rad);
}

function obliquidade(data) {
  const t = Astronomy.MakeTime(data).tt / 36525;
  return (23.4392911 - 0.0130042 * t) * rad;
}

// ——— Ângulos e casas ———

function ramcGraus(data, lon) {
  return norm(Astronomy.SiderealTime(data) * 15 + lon);
}

function ascendente(ramc, eps, lat) {
  const r = ramc * rad;
  return norm(Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(eps) + Math.tan(lat * rad) * Math.sin(eps))) / rad);
}

function meioDoCeu(ramc, eps) {
  const r = ramc * rad;
  return norm(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(eps)) / rad);
}

// Ponto da eclíptica com ascensão reta "ra" (graus).
function eclipticaPorAR(ra, eps) {
  const r = ra * rad;
  return norm(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(eps)) / rad);
}

// Casas Placidus pelo método do semiarco, com iteração.
// Casas 11 e 12 dividem o semiarco diurno; 2 e 3, o noturno.
function cuspidePlacidus(ramc, eps, lat, fracao, diurna) {
  let ra = diurna ? ramc + 90 * fracao : ramc + 180 - 90 * fracao;
  for (let i = 0; i < 50; i++) {
    const l = eclipticaPorAR(ra, eps);
    const dec = Math.asin(Math.sin(eps) * Math.sin(l * rad));
    const x = Math.max(-1, Math.min(1, -Math.tan(lat * rad) * Math.tan(dec)));
    const sad = Math.acos(x) / rad; // semiarco diurno
    const novo = diurna ? ramc + fracao * sad : ramc + 180 - fracao * (180 - sad);
    if (Math.abs(norm(novo - ra + 180) - 180) < 1e-7) { ra = novo; break; }
    ra = novo;
  }
  return eclipticaPorAR(ra, eps);
}

function casasPlacidus(ramc, eps, lat) {
  const asc = ascendente(ramc, eps, lat);
  const mc = meioDoCeu(ramc, eps);
  const c11 = cuspidePlacidus(ramc, eps, lat, 1 / 3, true);
  const c12 = cuspidePlacidus(ramc, eps, lat, 2 / 3, true);
  const c2 = cuspidePlacidus(ramc, eps, lat, 2 / 3, false);
  const c3 = cuspidePlacidus(ramc, eps, lat, 1 / 3, false);
  const casas = [asc, c2, c3, mc + 180, c11 + 180, c12 + 180, asc + 180, c2 + 180, c3 + 180, mc, c11, c12];
  return { asc, mc, casas: casas.map(norm) };
}

// Em que casa (1–12) cai uma longitude.
function casaDe(lon, casas) {
  for (let i = 0; i < 12; i++) {
    const ini = casas[i];
    const fim = casas[(i + 1) % 12];
    const tam = norm(fim - ini);
    if (norm(lon - ini) < tam) return i + 1;
  }
  return 1;
}

// ——— Mapa ———

function paraUTC(dataISO, hora, tz) {
  const dt = DateTime.fromISO(`${dataISO}T${hora}`, { zone: tz });
  if (!dt.isValid) throw new Error("Data ou hora inválida");
  return dt.toJSDate();
}

function planetas(instante) {
  const depois = new Date(instante.getTime() + 864e5);
  return PLANETAS.map(([chave, nome, corpo]) => {
    const l = longitude(corpo, instante);
    const delta = norm(longitude(corpo, depois) - l + 180) - 180;
    return { chave, nome, ...posicao(l), retrogrado: corpo !== "Sun" && corpo !== "Moon" && delta < 0 };
  });
}

function equilibrio(pontos) {
  const elementos = { fogo: 0, terra: 0, ar: 0, agua: 0 };
  const modalidades = { cardinal: 0, fixo: 0, mutavel: 0 };
  for (const p of pontos) {
    elementos[ELEMENTO[p.indice % 4]]++;
    modalidades[MODALIDADE[p.indice % 3]]++;
  }
  // Todos os que empatam no maior valor (ex.: Fogo 4 e Terra 4 → ["fogo", "terra"]).
  const maiores = (o) => {
    const topo = Math.max(...Object.values(o));
    return Object.keys(o).filter((k) => o[k] === topo);
  };
  return { elementos, modalidades, elementosDominantes: maiores(elementos), modalidadesDominantes: maiores(modalidades) };
}

/**
 * @param {string} dataISO "1995-08-14"
 * @param {string|null} hora "14:30" ou null
 * @param {{lat:number, lon:number, tz:string}} cidade
 */
export function calcularMapa(dataISO, hora, cidade) {
  const instante = paraUTC(dataISO, hora || "12:00", cidade.tz);
  const lista = planetas(instante);

  if (!hora) {
    // Sem hora: sem Ascendente, Meio do Céu e casas. A Lua pode ter mudado de signo no dia.
    const a = posicao(longitude("Moon", paraUTC(dataISO, "00:00", cidade.tz)));
    const b = posicao(longitude("Moon", paraUTC(dataISO, "23:59", cidade.tz)));
    const luaIncerta = a.indice !== b.indice ? [a.signo, b.signo] : null;
    const pontos = luaIncerta ? lista.filter((p) => p.chave !== "lua") : lista;
    return { horaConhecida: false, planetas: lista, luaIncerta, ascendente: null, meioDoCeu: null, casas: null, equilibrio: equilibrio(pontos) };
  }

  const eps = obliquidade(instante);
  const ramc = ramcGraus(instante, cidade.lon);
  const { asc, mc, casas } = casasPlacidus(ramc, eps, cidade.lat);
  for (const p of lista) p.casa = casaDe(p.longitude, casas);

  return {
    horaConhecida: true,
    planetas: lista,
    luaIncerta: null,
    ascendente: posicao(asc),
    meioDoCeu: posicao(mc),
    casas: casas.map((c) => posicao(c)),
    equilibrio: equilibrio([...lista, posicao(asc)]),
  };
}

// Exportado para testes.
export const _interno = { ascendente, meioDoCeu, casasPlacidus, obliquidade, ramcGraus, longitude };
