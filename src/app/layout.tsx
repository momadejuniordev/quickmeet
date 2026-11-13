import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quick Meet | Videoconferência Inteligente Moçambicana",
  description: "A plataforma moçambicana de videoconferência e colaboração com áudio cristalino, IA e ultra-baixa latência para equipas modernas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${poppins.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
