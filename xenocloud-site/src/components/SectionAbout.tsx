import { CheckCircle2, Users, Code, Award } from "lucide-react";

export default function SectionAbout() {
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase">Il Nostro Team</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6">Chi c'è dietro XenoCloud?</h2>
          <p className="text-slate-400 mb-4 leading-relaxed">
            Siamo un team di sviluppatori, sistemisti e appassionati di infrastrutture di rete. Il nostro obiettivo è abbattere i costi elevati offrendo una piattaforma che unisce l'hosting puro allo sviluppo software avanzato.
          </p>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Niente configurazioni complesse o pannelli lenti: abbiamo automatizzato l'intero ciclo di vita del deployment per permetterti di concentrarti solo sul codice o sulle tue community.
          </p>
          <div className="space-y-3">
            {["Uptime garantito al 99.99%", "Supporto tecnico via ticket prioritario", "Nessun costo nascosto o vincolo contrattuale"].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-slate-200 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h4 className="text-2xl font-extrabold text-white">100%</h4>
            <p className="text-xs text-slate-400 mt-1">Clienti Soddisfatti</p>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-center">
            <Code className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
            <h4 className="text-2xl font-extrabold text-white">50+</h4>
            <p className="text-xs text-slate-400 mt-1">Bot Sviluppati</p>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-center col-span-2">
            <Award className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-xl font-bold text-white">Infrastruttura di Proprietà</h4>
            <p className="text-xs text-slate-400 mt-1">Nodi posizionati nei migliori datacenter europei</p>
          </div>
        </div>
      </div>
    </div>
  );
}