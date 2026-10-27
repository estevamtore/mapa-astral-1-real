# Seu mapa astral por R$1

Site em Next.js: a pessoa informa data, hora e cidade de nascimento, paga R$1 no Pix (Efí) e recebe o mapa astral completo: os 10 planetas (signo, grau, casa e retrogradação), Ascendente, Meio do Céu, as 12 casas Placidus, o equilíbrio de elementos e modalidades e a roda do mapa desenhada. Não pede e-mail, telefone nem CPF.

## Como funciona
- `GET /api/cidades?q=` busca entre os 5.570 municípios do IBGE para o campo de cidade.
- `POST /api/pagamento` valida os dados de nascimento e cria uma cobrança Pix imediata na Efí.
- Os dados de nascimento viajam dentro do código da cobrança (`txid`): `ma` + data (AAAAMMDD) + hora (HHMM, ou `9999` se desconhecida) + código IBGE + parte aleatória. Por isso não precisa de banco.
- A página consulta `GET /api/pagamento/:txid` a cada 3s. Quando a Efí marca a cobrança como `CONCLUIDA` com valor ≥ R$1, o servidor calcula o mapa e devolve o resultado.
- O cálculo e as interpretações só existem no servidor (`server-only`); nada do conteúdo pago vai para o navegador antes do pagamento.

## O cálculo
- **Planetas:** [Astronomy Engine](https://github.com/cosinekitty/astronomy) (MIT), longitude eclíptica geocêntrica verdadeira da data, zodíaco tropical. Retrógrado = longitude diminuindo nas 24 h seguintes.
- **Ascendente e Meio do Céu:** a partir do tempo sideral do local, da latitude e da obliquidade da eclíptica.
- **Casas:** sistema Placidus (método do semiarco, iterativo). Conferido contra a definição do sistema por um caminho independente, com erro máximo de 0,001°.
- **Elementos e modalidades:** contagem dos 10 planetas + Ascendente.
- **Fuso horário histórico:** cada cidade usa o fuso IANA da sua região (ex.: `America/Belem`, `America/Bahia`), então os horários de verão antigos e o fim deles em 2019 entram na conta.
- **Sem hora de nascimento:** planetas calculados ao meio-dia; sem Ascendente, Meio do Céu e casas; se a Lua mudou de signo naquele dia, o site mostra os dois possíveis.
- **Aproximação conhecida:** o oeste do Amazonas e do Pará usa o fuso da capital do estado, o que pode deslocar em 1 hora alguns nascimentos antigos nessas regiões.

## Textos
As interpretações são textos originais; edite à vontade:
- `lib/interpretacoes.js`: Sol, Lua e Ascendente nos 12 signos.
- `lib/interpretacoes-planetas.js`: Mercúrio a Plutão nos 12 signos, Meio do Céu, áreas das casas, elementos, modalidades e retrogradação.

A tela do resultado (roda do mapa e seções) fica em `app/ResultadoMapa.js`.

Base de cidades: [kelvins/municipios-brasileiros](https://github.com/kelvins/municipios-brasileiros) (MIT), convertida em `lib/cidades-data.json`.

## Rodar local (modo de teste)
```bash
npm install
npm run dev
```
No `npm run dev` sem credenciais, o site roda em modo de teste: o "Pix" é simulado e aprovado sozinho depois de ~6s.

Em produção (`npm start` ou Vercel) o modo de teste **não** liga sozinho: sem as variáveis `EFI_*`, o site recusa gerar cobranças e não libera nenhum mapa. Assim, um deploy mal configurado não entrega o produto de graça. Para testar um build de produção com Pix simulado, use `PIX_MODO_TESTE=true npm start` — e nunca deixe essa variável ligada no site público.

## Ligar o Pix de verdade (Efí)
1. Abra uma conta na Efí e cadastre uma chave Pix.
2. No painel, em **API → Aplicações**, crie uma aplicação com os escopos de Pix (cobranças) e anote o **Client_Id** e o **Client_Secret**.
3. Em **API → Meus Certificados**, gere o certificado `.p12`. Ele só pode ser baixado uma vez, então guarde bem. Gere um para homologação e outro para produção.
4. Converta o certificado para base64, numa linha só:
   ```bash
   base64 -w0 certificado.p12     # Linux
   base64 -i certificado.p12      # macOS
   ```
5. Crie um `.env.local` (e as mesmas variáveis na Vercel, em Settings → Environment Variables):
   ```
   EFI_CLIENT_ID=Client_Id_...
   EFI_CLIENT_SECRET=Client_Secret_...
   EFI_CHAVE_PIX=sua-chave-pix
   EFI_CERT_BASE64=MIIK...
   EFI_SANDBOX=true
   ```
6. Teste em homologação com `EFI_SANDBOX=true`. Para produção, troque as credenciais e o certificado pelos de produção e remova `EFI_SANDBOX`.

Docs da Efí: https://dev.efipay.com.br/docs/api-pix/credenciais
