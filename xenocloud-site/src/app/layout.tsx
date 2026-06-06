import { ThemeProvider } from "@/context/ThemeContext";
import "@/app/globals.css"; // Assicurati che Tailwind sia importato qui

export const metadata = {
  title: "XenoCloud - Next-Gen Development Agency",
  description: "Sviluppo Bot Discord, Web Dashboard e Server Minecraft professionali",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="dark">
      <body className="bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200 antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}