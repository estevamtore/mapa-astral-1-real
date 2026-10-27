import "./globals.css";

export const metadata = {
  title: "Seu mapa astral por R$1",
  description: "Descubra seu Sol, sua Lua e seu Ascendente por um valor simbólico de R$1 no Pix.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
