"use client";
import { useState } from "react";
import { ShoppingCart, CreditCard, LifeBuoy, Server, Plus, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  price: string;
  status: "Attivo" | "Sospeso";
}

interface SectionBillingProps {
  initialOrder?: { name: string; price: string } | null;
  clearOrder?: () => void;
}

export default function SectionBilling({ initialOrder, clearOrder }: SectionBillingProps) {
  const [activeSubTab, setActiveSubTab] = useState<"dashboard" | "order" | "invoices" | "support">("dashboard");
  const [myServices, setMyServices] = useState<ServiceItem[]>([
    { id: "VPS-9912", name: "VPS Cloud Linux - Standard", price: "5.50", status: "Attivo" },
    { id: "BOT-4401", name: "Discord Bot Hosting", price: "2.99", status: "Attivo" }
  ]);
  const [tickets, setTickets] = useState([
    { id: "TK-203", subject: "Configurazione Reverse DNS VPS", status: "Chiuso" }
  ]);
  const [newTicketSubject, setNewTicketSubject] = useState("");

  const handleCreateOrder = (name: string, price: string) => {
    const newService: ServiceItem = {
      id: `SRV-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      price,
      status: "Attivo"
    };
    setMyServices([newService, ...myServices]);
    alert(`Grazie per il tuo ordine! Il servizio "${name}" è in fase di attivazione immediata.`);
    if (clearOrder) clearOrder();
    setActiveSubTab("dashboard");
  };

  const handleOpenTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim()) return;
    setTickets([{ id: `TK-${Math.floor(100 + Math.random() * 900)}`, subject: newTicketSubject, status: "Aperto" }, ...tickets]);
    setNewTicketSubject("");
    alert("Ticket inviato con successo al team di supporto.");
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-slate-800 pb-4 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Hub Amministrazione Clienti</h2>
          <p className="text-xs text-slate-400">Gestisci i tuoi server, rinnova le fatture o richiedi assistenza tecnica.</p>
        </div>
        
        {/* Sub Navigation */}
        <div className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button onClick={() => setActiveSubTab("dashboard")} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeSubTab === "dashboard" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>
            <Server className="h-3.5 w-3.5" /> Servizi Attivi
          </button>
          <button onClick={() => setActiveSubTab("order")} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeSubTab === "order" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>
            <ShoppingCart className="h-3.5 w-3.5" /> Nuovo Ordine
          </button>
          <button onClick={() => setActiveSubTab("invoices")} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeSubTab === "invoices" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>
            <CreditCard className="h-3.5 w-3.5" /> Fatture
          </button>
          <button onClick={() => setActiveSubTab("support")} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeSubTab === "support" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>
            <LifeBuoy className="h-3.5 w-3.5" /> Supporto
          </button>
        </div>
      </div>

      {/* Redirect immediato se l'utente arriva dopo aver premuto "Ordina" nella tab Servizi */}
      {initialOrder && (
        <div className="mb-6 p-4 bg-blue-900/30 border border-blue-500/40 rounded-xl flex items-center justify-between">
          <div className="text-sm">
            Hai selezionato: <strong className="text-white">{initialOrder.name}</strong> (€{initialOrder.price}/mese)
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleCreateOrder(initialOrder.name, initialOrder.price)} className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-500">
              Conferma Pagamento ed Attiva
            </button>
            <button onClick={clearOrder} className="text-slate-400 text-xs px-2 hover:text-white">Annulla</button>
          </div>
        </div>
      )}

      {/* Sub Tab: Dashboard */}
      {activeSubTab === "dashboard" && (
        <div>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
              <span className="text-slate-400 text-xs block">Servizi Totali</span>
              <span className="text-2xl font-bold text-white">{myServices.length}</span>
            </div>
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
              <span className="text-slate-400 text-xs block">Costo Mensile Stimato</span>
              <span className="text-2xl font-bold text-blue-500">
                €{myServices.reduce((acc, curr) => acc + parseFloat(curr.price), 0).toFixed(2)}
              </span>
            </div>
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
              <span className="text-slate-400 text-xs block">Stato del Network</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 block animate-ping" /> Tutti i nodi operativi
              </span>
            </div>
          </div>

          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Le tue Istanze Attive</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-900/20">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400">
                  <th className="p-3 font-semibold">ID Servizio</th>
                  <th className="p-3 font-semibold">Nome Prodotto</th>
                  <th className="p-3 font-semibold">Costo Mensile</th>
                  <th className="p-3 font-semibold">Stato</th>
                  <th className="p-3 font-semibold text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {myServices.map((srv) => (
                  <tr key={srv.id} className="hover:bg-slate-900/30">
                    <td className="p-3 font-mono font-bold text-slate-400">{srv.id}</td>
                    <td className="p-3 font-medium text-white">{srv.name}</td>
                    <td className="p-3 text-slate-300">€{srv.price} / mese</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                        <CheckCircle className="h-3 w-3" /> {srv.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-blue-400 hover:underline font-medium">Gestisci</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub Tab: Nuovo Ordine Manuale */}
      {activeSubTab === "order" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <h3 className="font-bold text-lg mb-4 text-white">Ordine Rapido Istantaneo</h3>
            <p className="text-xs text-slate-400 mb-4">Usa questo configuratore interno rapido per aggiungere un'istanza senza passare dalle pagine del catalogo.</p>
            <div className="space-y-3">
              {[
                { name: "VPS Advanced Core", price: "12.00" },
                { name: "NodeJS Bot Client Professional", price: "5.00" },
                { name: "MySQL Cloud DB Dedicated Instance", price: "4.50" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <span className="text-xs text-slate-400">€{item.price}/mese</span>
                  </div>
                  <button onClick={() => handleCreateOrder(item.name, item.price)} className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border border-dashed border-slate-800 rounded-2xl flex flex-col justify-center items-center text-center text-slate-400">
            <RefreshCw className="h-10 w-10 text-slate-600 mb-2 animate-spin" style={{ animationDuration: '6s' }} />
            <h4 className="text-sm font-bold text-slate-300">Integrazione Gateway WHMCS / Stripe</h4>
            <p className="text-xs max-w-xs mt-1">In ambiente di produzione, questo modulo si interfaccia direttamente con i webhook di Stripe o PayPal per verificare le transazioni in tempo reale.</p>
          </div>
        </div>
      )}

      {/* Sub Tab: Fatture */}
      {activeSubTab === "invoices" && (
        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h3 className="font-bold text-base mb-4 text-white">Storico Ricevute e Scadenze</h3>
          <div className="space-y-2">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="font-mono text-slate-400 block">INV-2026-004</span>
                <span className="text-slate-300">Rinnovo VPS Cloud Linux & Bot Hosting</span>
              </div>
              <div className="text-right">
                <span className="text-slate-200 font-bold block">€8.49</span>
                <span className="text-emerald-400 font-semibold">Pagata via Saldo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab: Supporto / Ticket */}
      {activeSubTab === "support" && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 p-5 bg-slate-900/40 border border-slate-800 rounded-xl">
            <h3 className="font-bold text-sm text-white mb-3">Apri un Ticket</h3>
            <form onSubmit={handleOpenTicket} className="space-y-3">
              <div>
                <label className="text-[11px] uppercase text-slate-400 font-bold block mb-1">Oggetto del Problema</label>
                <input 
                  type="text" 
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  placeholder="Es. Il mio bot crasha all'avvio..." 
                  className="w-full bg-slate-900 border border-slate-800 text-xs rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition">
                Invia Ticket Assistenza
              </button>
            </form>
          </div>

          <div className="md:col-span-2 p-5 bg-slate-900/40 border border-slate-800 rounded-xl">
            <h3 className="font-bold text-sm text-white mb-3">I Tuoi Ticket Recenti</h3>
            <div className="space-y-2">
              {tickets.map((tk) => (
                <div key={tk.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono text-slate-500 font-bold mr-2">{tk.id}</span>
                    <span className="text-slate-200">{tk.subject}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${tk.status === "Aperto" ? "bg-amber-500/10 text-amber-400" : "bg-slate-800 text-slate-400"}`}>
                    <AlertCircle className="h-3 w-3" /> {tk.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}