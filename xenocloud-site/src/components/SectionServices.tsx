import { Check, Server, Terminal, Gamepad2, Layers } from "lucide-react";

export default function SectionServices({ onOrder }: { onOrder: (serviceName: string, price: string) => void }) {
  const categories = [
    {
      title: "VPS Cloud Linux",
      icon: <Server className="h-6 w-6 text-blue-500" />,
      price: "5.50",
      features: ["1 vCPU AMD EPYC", "2 GB RAM DDR5", "40 GB NVMe Storage", "Porta 1 Gbps", "Accesso Root SSH"]
    },
    {
      title: "Discord Bot Hosting",
      icon: <Terminal className="h-6 w-6 text-indigo-400" />,
      price: "2.99",
      features: ["Supporto Node.js / Python", "Database SQLite/MongoDB incluso", "Console Web Interattiva", "Auto-Restart su crash", "Git Webhook Deploy"]
    },
    {
      title: "Game Hosting (Minecraft/FiveM)",
      icon: <Gamepad2 className="h-6 w-6 text-emerald-400" />,
      price: "7.00",
      features: ["Slot illimitati", "Allocazione RAM Dedicata", "Pannello di controllo completo", "Database MySQL Gratuito", "Protezione Anti-DDoS Game"]
    },
    {
      title: "Bot Development Custom",
      icon: <Layers className="h-6 w-6 text-purple-400" />,
      price: "29.99",
      features: ["Sviluppo codice da zero", "Sistemi Ticket multilingua", "Integrazione Database Custom", "Consegna file sorgenti", "Manutenzione inclusa 30gg"]
    }
  ];

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold">Soluzioni Flessibili per Ogni Esigenza</h2>
        <p className="text-slate-400 mt-3">Attivazione istantanea subito dopo il pagamento nell'area di Billing.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((service, index) => (
          <div key={index} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl w-fit mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-2xl font-extrabold text-white">€{service.price}</span>
                <span className="text-xs text-slate-400">/mese</span>
              </div>
              <ul className="space-y-2 mt-4 border-t border-slate-800/80 pt-4">
                {service.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button 
              onClick={() => onOrder(service.title, service.price)}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 text-sm font-medium transition"
            >
              Configura e Ordina
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}