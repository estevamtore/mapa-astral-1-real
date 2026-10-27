import { criarPix } from "@/lib/pix";
import { codificar } from "@/lib/nascimento";

export async function POST(req) {
  const corpo = await req.json().catch(() => ({}));
  const { codigo, erro } = codificar(corpo);
  if (erro) return Response.json({ erro }, { status: 400 });

  try {
    const pix = await criarPix(codigo);
    return Response.json(pix);
  } catch (e) {
    console.error(e);
    return Response.json({ erro: "Não foi possível gerar o Pix. Tente de novo." }, { status: 502 });
  }
}
