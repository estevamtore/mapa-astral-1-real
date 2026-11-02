import "./globals.css";
import StarField from "./StarField";

export const metadata = {
  title: "Dona Lua — Seu mapa astral por R$4,99",
  description: "Descubra seu Sol, sua Lua e seu Ascendente com a Dona Lua. Por apenas R$4,99 no Pix.",
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
      <body>
        <StarField />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
