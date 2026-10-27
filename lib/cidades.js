// Municípios do IBGE (base kelvins/municipios-brasileiros, licença MIT),
// com o fuso IANA de cada região para acertar o horário de verão histórico.
import "server-only";
import dados from "./cidades-data.json";

// [ibge, nome, uf, lat, lon, tz]
const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const LISTA = dados.map(([ibge, nome, uf, lat, lon, tz]) => ({
  ibge, nome, uf, lat, lon, tz, busca: semAcento(nome),
}));
const POR_IBGE = new Map(LISTA.map((c) => [c.ibge, c]));

export function cidadePorIbge(ibge) {
  return POR_IBGE.get(Number(ibge)) || null;
}

// Busca por nome, sem acento. Quem começa com o termo vem antes de quem só o contém.
export function buscarCidades(termo, limite = 8) {
  const q = semAcento(termo.trim());
  if (q.length < 2) return [];
  const comeca = [];
  const contem = [];
  for (const c of LISTA) {
    if (c.busca.startsWith(q)) comeca.push(c);
    else if (c.busca.includes(q)) contem.push(c);
  }
  // Nomes mais curtos primeiro: "Vitória" antes de "Vitória da Conquista".
  comeca.sort((a, b) => a.nome.length - b.nome.length || a.nome.localeCompare(b.nome, "pt"));
  return [...comeca, ...contem].slice(0, limite).map(({ ibge, nome, uf }) => ({ ibge, nome, uf }));
}
