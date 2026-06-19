import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Openbook Email Signature Generator",
  description: "Gerador interno de assinaturas de email Openbook Group.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
