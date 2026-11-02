export const metadata = {
  title: "Termos e Privacidade — Dona Lua",
};

export default function Privacidade() {
  return (
    <main className="privacidade-page">
      <div className="privacidade-card">
        <p className="ornamento" aria-hidden="true">☽</p>
        <h1>Termos e Privacidade</h1>

        <section>
          <h2>Nenhum dado é armazenado</h2>
          <p>
            Os dados que você preenche — data de nascimento, hora e cidade — são usados
            exclusivamente para calcular o seu mapa astral durante a sessão atual.
            Não salvamos, registramos nem compartilhamos essas informações com terceiros.
            Assim que a sessão é encerrada, todos os dados são descartados.
          </p>
        </section>

        <section>
          <h2>Cada sessão é única e independente</h2>
          <p>
            Não utilizamos contas de usuário, login ou qualquer forma de identificação
            pessoal. Cada acesso ao site é tratado como uma sessão completamente nova.
            Não há histórico, perfil ou banco de dados de mapas gerados.
          </p>
        </section>

        <section>
          <h2>Pagamento</h2>
          <p>
            O pagamento via Pix é processado pelo Mercado Pago. Não temos acesso aos seus
            dados bancários ou de pagamento — eles são tratados diretamente pela plataforma
            do Mercado Pago, sujeita à própria política de privacidade. O valor cobrado
            (R$&nbsp;4,99) não está vinculado a nenhum cadastro.
          </p>
        </section>

        <section>
          <h2>Cookies e rastreamento</h2>
          <p>
            Este site não utiliza cookies de rastreamento, anúncios ou ferramentas de
            análise de comportamento. Não há pixels de terceiros, não há remarketing e
            não há coleta de endereço IP associada a dados pessoais.
          </p>
        </section>

        <section>
          <h2>Finalidade e entretenimento</h2>
          <p>
            O mapa astral gerado é calculado com base no zodíaco tropical e na biblioteca
            Astronomy Engine, de código aberto. As interpretações foram elaboradas com
            inspiração na obra <em>O Significado da Astrologia</em>, de Elizabeth Teissier,
            como referência simbólica e psicológica. O conteúdo é fornecido para fins de
            entretenimento e autoconhecimento. Não constitui aconselhamento profissional
            de qualquer natureza.
          </p>
        </section>

        <p className="privacidade-voltar">
          <a href="/">← Voltar ao site</a>
        </p>
      </div>
    </main>
  );
}
