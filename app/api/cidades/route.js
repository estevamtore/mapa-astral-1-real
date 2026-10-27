import { buscarCidades } from "@/lib/cidades";

export async function GET(req) {
  const q = new URL(req.url).searchParams.get("q") || "";
  return Response.json(buscarCidades(q.slice(0, 60)), {
    headers: { "Cache-Control": "public, max-age=86400" },
  });
}
