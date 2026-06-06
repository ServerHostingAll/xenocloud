"use client";
import { useState, useEffect } from "react";
import { useXenoTheme } from "@/context/ThemeContext";
import { 
  Users, ShoppingCart, CreditCard, LifeBuoy, Server, 
  LogIn, LogOut, FileText, Send, Link, ArrowDown, Sun, Moon, CheckCircle, Code, Cpu
} from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  department: string;
  status: string;
  date: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  price: string;
  status: string;
}

export default function SectionBilling() {
  const { isDark, toggleTheme } = useXenoTheme();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Navigazione principale basata sui percorsi di ARi Systems
  const [activeTab, setActiveTab] = useState<"clientarea" | "services" | "invoices" | "support" | "openticket" | "affiliates">("clientarea");

  // Stati per la simulazione del database
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "1042", subject: "Setup Bot Discord Custom e Database", department: "Sviluppo Bot", status: "In Lavorazione", date: "Oggi" }
  ]);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDept, setTicketDept] = useState("Sviluppo Bot Discord");
  const [ticketMsg, setTicketMsg] = useState("");

  // Nuova categorizzazione Servizi XenoCloud Development
  const [services] = useState<Service[]>([
    { id: "XS-991", name: "Custom Discord Bot (TypeScript / Next Dashboard)", category: "Bot Developing", price: "€49.99 EUR", status: "Attivo" },
    { id: "XS-402", name: "Network Setup 1.21.4 (Spigot/Bungee)", category: "Minecraft Server", price: "€29.99 EUR", status: "In Attesa" }
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem("xenocloud_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const handleDiscordLogin = () => {
    const mockUser = {
      email: "developer@xenocloud.net",
      user_metadata: {
        full_name: "XenoDeveloper",
        avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png"
      }
    };
    localStorage.setItem("xenocloud_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("xenocloud_user");
    setUser(null);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) return;
    const newTk: Ticket = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      subject: ticketSubject,
      department: ticketDept,
      status: "Aperto",
      date: "Adesso"
    };
    setTickets([newTk, ...tickets]);
    setTicketSubject("");
    setTicketMsg("");
    setActiveTab("support");
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-medium text-slate-400 text-sm">
        Caricamento dei moduli crittografati in corso...
      </div>
    );
  }

  // Schermata di Login (Stile ARi Systems /login)
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center shadow-xl transition-all">
        <div className="flex justify-end mb-2">
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
        <div className="bg-blue-600/10 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-500/20">
          <LogIn className="h-8 w-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Sign In - XenoCloud Hub</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Gestisci i tuoi ordinativi di sviluppo bot, siti web e configurazioni Minecraft.
        </p>
        <button
          onClick={handleDiscordLogin}
          className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-[#5865F2]/20 flex items-center justify-center gap-2"
        >
          Accedi con Discord
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto transition-colors duration-200">
      
      {/* HEADER NAVBAR INTERNA (WHMCS ARi Systems Remake) */}
      <div className="flex flex-wrap justify-between items-center bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-6 gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full border border-blue-500/40" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hello, {user.user_metadata.full_name}!</h3>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/10">
              Logged in as: Dev Agency Client
            </span>
          </div>
        </div>

        {/* Pulsanti Navigazione Schede (Riflette i link inviati) */}
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          <button onClick={() => setActiveTab("clientarea")} className={`px-3 py-2 rounded-lg transition ${activeTab === "clientarea" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Home</button>
          <button onClick={() => setActiveTab("services")} className={`px-3 py-2 rounded-lg transition ${activeTab === "services" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Services</button>
          <button onClick={() => setActiveTab("invoices")} className={`px-3 py-2 rounded-lg transition ${activeTab === "invoices" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Billing</button>
          <button onClick={() => setActiveTab("support")} className={`px-3 py-2 rounded-lg transition ${activeTab === "support" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Support</button>
          <button onClick={() => setActiveTab("openticket")} className={`px-3 py-2 rounded-lg transition ${activeTab === "openticket" ? "bg-emerald-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Open Ticket</button>
          <button onClick={() => setActiveTab("affiliates")} className={`px-3 py-2 rounded-lg transition ${activeTab === "affiliates" ? "bg-amber-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Affiliates</button>
          
          {/* Switch del Tema */}
          <button onClick={toggleTheme} className="p-2 ml-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:opacity-80 transition">
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          <button onClick={handleLogout} className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition">
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 1. PAGINA: CLIENT AREA HOME */}
      {activeTab === "clientarea" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-center">
              <Code className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <span className="text-xs text-slate-400 block font-medium">Progetti Attivi</span>
              <span className="text-2xl font-black text-slate-800 dark:text-white">2</span>
            </div>
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-center">
              <LifeBuoy className="h-6 w-6 text-amber-500 mx-auto mb-2" />
              <span className="text-xs text-slate-400 block font-medium">Ticket Aperti</span>
              <span className="text-2xl font-black text-slate-800 dark:text-white">{tickets.length}</span>
            </div>
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-center">
              <CreditCard className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
              <span className="text-xs text-slate-400 block font-medium">Fatture Pendenti</span>
              <span className="text-2xl font-black text-emerald-500">0</span>
            </div>
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-center">
              <Users className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <span className="text-xs text-slate-400 block font-medium">Saldo Affiliato</span>
              <span className="text-2xl font-black text-slate-800 dark:text-white">€0.00</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-md font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-blue-500" /> Listino Servizi di Sviluppo XenoCloud
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 rounded-xl">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">Bot Developing & Settings</h4>
                <p className="text-slate-400 mb-3">Sviluppo bot Discord in JavaScript/TypeScript modulari con log, ticket avanzati e comandi slash.</p>
                <button onClick={() => setActiveTab("openticket")} className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg">Richiedi Preventivo</button>
              </div>
              <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 rounded-xl">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">Website Dashboard Dev</h4>
                <p className="text-slate-400 mb-3">Integrazione di pannelli web Next.js reattivi connessi a database o direttamente ai tuoi bot Discord.</p>
                <button onClick={() => setActiveTab("openticket")} className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg">Richiedi Preventivo</button>
              </div>
              <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 rounded-xl">
                <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">Minecraft Server Setup</h4>
                <p className="text-slate-400 mb-3">Configurazione network completi v1.21.4, tablist, scoreboards, permessi avanzati e proxy Bungee.</p>
                <button onClick={() => setActiveTab("openticket")} className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg">Richiedi Preventivo</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PAGINA: SERVICES (/clientarea.php?action=services) */}
      {activeTab === "services" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900 dark:text-white mb-1">My Products & Services</h2>
          <p className="text-xs text-slate-400 mb-4">I tuoi ordini correnti gestiti dal team di sviluppatori XenoCloud.</p>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold">
                  <th className="py-2">ID Progetto</th>
                  <th>Servizio Richiesto</th>
                  <th>Categoria</th>
                  <th>Costo Sviluppo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {services.map((srv) => (
                  <tr key={srv.id} className="border-b border-slate-100 dark:border-slate-800/50 text-slate-700 dark:text-slate-300">
                    <td className="py-3 font-mono font-bold text-slate-500">{srv.id}</td>
                    <td className="font-medium">{srv.name}</td>
                    <td>{srv.category}</td>
                    <td className="font-bold">{srv.price}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${srv.status === "Attivo" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10" : "bg-amber-500/10 text-amber-500 border border-amber-500/10"}`}>
                        {srv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PAGINA: INVOICES & PAYMENTS */}
      {activeTab === "invoices" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm text-center py-12">
          <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Tutte le fatture risultano saldate</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">Non ci sono pagamenti pendenti o preventivi da approvare per i tuoi contratti di sviluppo attivi.</p>
        </div>
      )}

      {/* 4. PAGINA: SUPPORT TICKETS */}
      {activeTab === "support" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Support Tickets</h2>
              <p className="text-xs text-slate-400">Storico delle conversazioni e stato avanzamento lavori dei codici.</p>
            </div>
            <button onClick={() => setActiveTab("openticket")} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">Apri Nuovo</button>
          </div>
          <div className="space-y-2 text-xs">
            {tickets.map((tk) => (
              <div key={tk.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40 flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-slate-400 mr-2">#ID-{tk.id}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{tk.subject}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">{tk.department} • Aggiornato: {tk.date}</span>
                </div>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-bold border border-blue-500/10">
                  {tk.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PAGINA: OPEN TICKET (/submitticket.php) */}
      {activeTab === "openticket" && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">Invia una Richiesta Tecnica</h2>
          <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Reparto Sviluppo</label>
                <select value={ticketDept} onChange={(e) => setTicketDept(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-white focus:outline-none">
                  <option value="Sviluppo Bot Discord">Sviluppo Bot Discord & API</option>
                  <option value="Website Development">Creazione Web Dashboard Next.js</option>
                  <option value="Minecraft Setup">Settaggio/Creazione Server Minecraft</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Priorità Avanzamento</label>
                <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-white focus:outline-none">
                  <option>Normale (Fasi di testing)</option>
                  <option>Alta (Bug Bloccante in produzione)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1">Oggetto Modifica / Progetto</label>
              <input type="text" required value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} placeholder="Es: Inserimento sistema di fatturazione automatica" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1">Specifiche Tecniche o Log Errore</label>
              <textarea rows={5} required value={ticketMsg} onChange={(e) => setTicketMsg(e.target.value)} placeholder="Incolla qui i requisiti o l'errore del terminale..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-white font-mono focus:outline-none" />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button type="button" onClick={() => setActiveTab("clientarea")} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold">Annulla</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg flex items-center gap-1.5"><Send className="h-3.5 w-3.5" /> Invia Progetto (.php)</button>
            </div>
          </form>
        </div>
      )}

      {/* 6. PAGINA: AFFILIATES (STILE ESATTO FOTO WHMCS DI ARi SYSTEMS) */}
      {activeTab === "affiliates" && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* I Tre Contatori Superiori (Colori reali presi dallo screen) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box Giallo/Dorato - Clicks */}
            <div className="p-6 bg-[#FCF8E3] dark:bg-amber-950/20 border border-[#FAEBCC] dark:border-amber-900/30 rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-[#8A6D3B] dark:text-amber-400">
                  <Users className="h-10 w-10 opacity-80" />
                </div>
                <div>
                  <span className="text-3xl font-black text-[#8A6D3B] dark:text-amber-400 block">0</span>
                  <span className="text-xs font-bold text-[#8A6D3B]/90 dark:text-amber-400/80 uppercase tracking-wider">Clicks</span>
                </div>
              </div>
            </div>

            {/* Box Azzurro - Signups */}
            <div className="p-6 bg-[#D9EDF7] dark:bg-blue-950/20 border border-[#BCE8F1] dark:border-blue-900/30 rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-[#31708F] dark:text-blue-400">
                  <ShoppingCart className="h-10 w-10 opacity-80" />
                </div>
                <div>
                  <span className="text-3xl font-black text-[#31708F] dark:text-blue-400 block">0</span>
                  <span className="text-xs font-bold text-[#31708F]/90 dark:text-blue-400/80 uppercase tracking-wider">Signups</span>
                </div>
              </div>
            </div>

            {/* Box Verde - Conversions */}
            <div className="p-6 bg-[#DFF0D8] dark:bg-emerald-950/20 border border-[#D6E9C6] dark:border-emerald-900/30 rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-[#3C763D] dark:text-emerald-400">
                  <FileText className="h-10 w-10 opacity-80" />
                </div>
                <div>
                  <span className="text-3xl font-black text-[#3C763D] dark:text-emerald-400 block">0%</span>
                  <span className="text-xs font-bold text-[#3C763D]/90 dark:text-emerald-400/80 uppercase tracking-wider">Conversions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sezione Referral Link Unico */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
              <Link className="h-4 w-4 text-blue-500" /> Your Unique Referral Link
            </h3>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300 select-all">
              https://xenocloud.net/referral/{user ? "26" : "id"}
            </div>
          </div>

          {/* Tabella Dei Guadagni e Richiesta Prelievo */}
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm text-xs">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-white">Resoconto Provvigioni Sviluppo</span>
              <span className="text-[10px] text-slate-400">Minimo prelievo: €10.00 EUR</span>
            </div>
            
            <div className="divide-y divide-slate-200 dark:divide-slate-800 px-4 bg-white dark:bg-slate-900">
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-medium">Commissions Pending Maturation:</span>
                <span className="font-bold text-slate-800 dark:text-white">€0.00 EUR</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-medium">Available Commissions Balance:</span>
                <span className="font-bold text-slate-800 dark:text-white">€0.00 EUR</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-medium">Total Amount Withdrawn:</span>
                <span className="font-bold text-slate-800 dark:text-white">€0.00 EUR</span>
              </div>
            </div>

            {/* Bottone Richiesta Prelievo (Stile Rosa/Rosso Disabilitato come in foto) */}
            <div className="p-4 bg-white dark:bg-slate-900 text-center border-t border-slate-200 dark:border-slate-800">
              <button disabled className="bg-[#D9534F] opacity-60 text-white font-bold py-2 px-6 rounded-lg shadow cursor-not-allowed transition">
                Request Withdrawal
              </button>
              <p className="text-[10px] text-slate-400 mt-2">
                You will be able to request a withdrawal as soon as your balance reaches the minimum required amount of €10.00 EUR.
              </p>
            </div>
          </div>

          {/* Tabella Vuota dei Referrals In Basso */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm text-xs">
            <h3 className="font-bold text-slate-800 dark:text-white mb-3">Your Referrals</h3>
            <div className="text-center py-6 text-slate-400">
              Showing 0 to 0 of 0 entries
            </div>
          </div>

        </div>
      )}

    </div>
  );
}