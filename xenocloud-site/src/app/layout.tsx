import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "XenoCloud | Server Hosting & Bot Development",
  description: "Soluzioni cloud professionali: VPS, Game Server, Sviluppo Bot Discord su misura e sistemi ad alta affidabilità.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className="scroll-smooth dark">
      <head>
        {/* Assicura la corretta scalabilità sui dispositivi mobili */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-[#060814] text-slate-100 antialiased min-h-screen flex flex-col`}>
        {/* Rimosso Navbar e Footer da qui perché sono già gestiti e controllati dallo stato interno di src/app/page.tsx */}
        <div className="flex-grow flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}