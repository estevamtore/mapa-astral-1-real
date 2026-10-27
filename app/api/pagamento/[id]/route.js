import { statusPagamento } from "@/lib/pix";
import { decodificar } from "@/lib/nascimento";
import { montarMapa } from "@/lib/montar-mapa";

export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  const { id } = await params;
  const { status, codigo } = await statusPagamento(id);
  if (status !== "approved") return Response.json({ status });

  // O mapa só é calculado e enviado depois do pagamento aprovado.
  const nasc = decodificar(codigo);
  if (!nasc) return Response.json({ status: "not_found" });

  return Response.json({ status, mapa: montarMapa(nasc) });
}
