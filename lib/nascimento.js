// Os dados de nascimento viajam dentro do próprio código da cobrança Pix (txid),
// então o servidor não precisa de banco para lembrar deles depois do pagamento.
//
// Formato (19 dígitos): AAAAMMDD + HHMM (ou 9999 se a hora é desconhecida) + código IBGE (7)
import "server-only";
import { cidadePorIbge } from "./cidades";

const SEM_HORA = "9999";

function dataValida(dataISO) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dataISO || "");
  if (!m) return false;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  const real = d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3];
  return real && +m[1] >= 1900 && d <= new Date();
}

const horaValida = (h) => /^([01]\d|2[0-3]):[0-5]\d$/.test(h || "");

// Valida o que veio do formulário e devolve os 19 dígitos, ou { erro }.
export function codificar({ data, hora, ibge }) {
  if (!dataValida(data)) return { erro: "Informe uma data de nascimento válida." };
  if (hora && !horaValida(hora)) return { erro: "Informe uma hora válida." };
  if (!cidadePorIbge(ibge)) return { erro: "Escolha a cidade na lista." };
  const hhmm = hora ? hora.replace(":", "") : SEM_HORA;
  return { codigo: `${data.replaceAll("-", "")}${hhmm}${String(ibge).padStart(7, "0")}` };
}

export function decodificar(codigo) {
  const m = /^(\d{4})(\d{2})(\d{2})(\d{4})(\d{7})$/.exec(codigo || "");
  if (!m) return null;
  const data = `${m[1]}-${m[2]}-${m[3]}`;
  const hora = m[4] === SEM_HORA ? null : `${m[4].slice(0, 2)}:${m[4].slice(2)}`;
  const cidade = cidadePorIbge(m[5]);
  if (!dataValida(data) || (hora && !horaValida(hora)) || !cidade) return null;
  return { data, hora, cidade };
}
