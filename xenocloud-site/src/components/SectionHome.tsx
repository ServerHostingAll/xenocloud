import { ArrowRight, Cpu, ShieldCheck, Terminal, Zap } from "lucide-react";

export default function SectionHome({ changeTab }: { changeTab: (tab: string) => void }) {
  return (
    <div className="relative pt-20 pb-24 px-4 max-w-7xl mx-auto">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full mb-6 animate-pulse">
          <Zap className="h-3 w-3" /> Infrastruttura di Nuova Generazione online
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent leading-tight">
          Sviluppo Bot Dedicati & Hosting Cloud ad Alte Prestazioni
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Proprio come hai sempre desiderato. Server VPS stabili, nodi di gioco ottimizzati e sviluppo di automazioni e bot Discord stabili al 100%. Gestisci tutto in un unico posto.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button onClick={() => changeTab("services")} className="bg-white text-slate-950 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-200 transition shadow-xl">
            Esplora i Servizi <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => changeTab("billing")} className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition">
            Ordina Ora (Billing)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-24">
        <div className="p-6 rounded-2xl glass-card">
          <Cpu className="h-8 w-8 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Hardware Avanzato</h3>
          <p className="text-sm text-slate-400">Processori AMD EPYC e storage interamente NVMe v4 per caricamenti fulminei dei tuoi script e database.</p>
        </div>
        <div className="p-6 rounded-2xl glass-card">
          <Terminal className="h-8 w-8 text-indigo-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Bot Dev Custom</h3>
          <p className="text-sm text-slate-400">Sviluppiamo il tuo bot Discord o applicazione in Node.js/TypeScript con setup istantaneo in produzione.</p>
        </div>
        <div className="p-6 rounded-2xl glass-card">
          <ShieldCheck className="h-8 w-8 text-emerald-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Protezione Anti-DDoS</h3>
          <p className="text-sm text-slate-400">Mitigazione costante a livello Layer 3, 4 e 7 per mantenere i tuoi servizi online 24 ore su 24, 7 giorni su 7.</p>
        </div>
      </div>
    </div>
  );
}