"use client";
import { useState, useEffect } from "react";
import { useXenoTheme } from "@/context/ThemeContext";
import { 
  Users, ShoppingCart, CreditCard, LifeBuoy, Server, 
  LogIn, LogOut, FileText, Send, Link, Sun, Moon, 
  CheckCircle, Code, Cpu, Terminal, Layers, ShieldCheck, Check
} from "lucide-react";

interface Ticket { id: string; subject: string; department: string; status: string; date: string; }
interface Service { id: string; name: string; category: string; price: string; status: string; }

export default function Home() {
  const { isDark, toggleTheme } = useXenoTheme();
  
  // Navigazione principale del sito: "landing" o le schede dell'area clienti
  const [view, setView] = useState<"landing" | "clientarea" | "services" | "invoices" | "support" | "openticket" | "affiliates">("landing");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Database simulato client-side (Zero crash di compilazione)
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "1042", subject: "Setup Bot Discord Custom e Database", department: "Sviluppo Bot", status: "In Lavorazione", date: "Oggi" }
  ]);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDept, setTicketDept] = useState("Sviluppo Bot Discord");
  const [ticketMsg, setTicketMsg] = useState("");

  const [services] = useState<Service[]>([
    { id: "XS-991", name: "Custom Discord Bot (TypeScript + Dashboard)", category: "Bot Developing", price: "€49.99 EUR", status: "Attivo" },
    { id: "XS-402", name: "Network Setup 1.21.4 (Spigot/Bungee)", category: "Minecraft Server", price: "€29.99 EUR", status: "Attivo" }
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
    setView("clientarea");
  };

  const handleLogout = () => {
    localStorage.removeItem("xenocloud_user");
    setUser(null);
    setView("landing");
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
    setView("support");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-sm font-semibold text-slate-400">Loading XenoCloud Engine...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-200">
      
      {/* GLOBAL NAVBAR (Stile ARi Systems) */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0F1422]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <span onClick={() => setView("landing")} className="text-xl font-black tracking-wider text-blue-600 dark:text-white cursor-pointer flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-500" /> XENO<span className="text-blue-500">CLOUD</span>
            </span>
            {/* Menu standard */}
            <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span onClick={() => setView("landing")} className="cursor-pointer hover:text-blue-500 transition">Home</span>
              <span onClick={() => { user ? setView("services") : handleDiscordLogin() }} className="cursor-pointer hover:text-blue-500 transition">Services</span>
              <span onClick={() => { user ? setView("support") : handleDiscordLogin() }} className="cursor-pointer hover:text-blue-500 transition">Support</span>
              <span onClick={() => { user ? setView("affiliates") : handleDiscordLogin() }} className="cursor-pointer hover:text-blue-500 transition font-medium text-amber-500">Affiliates</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Switcher Tema */}
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:opacity-80 transition">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {/* Bottone Login / Dashboard */}
            {user ? (
              <button onClick={() => setView("clientarea")} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition">
                Client Area
              </button>
            ) : (
              <button onClick={handleDiscordLogin} className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 text-white dark:text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5">
                <LogIn className="h-3.5 w-3.5" /> Portal Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ==================== CASO 1: LANDING PAGE (arisystems.org) ==================== */}
      {view === "landing" && (
        <div>
          {/* HERO SECTION */}
          <header className="max-w-5xl mx-auto px-6 text-center pt-20 pb-16">
            <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">
              Next-Gen Development Agency
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 dark:text-white mt-4 max-w-3xl mx-auto leading-tight">
              Diamo vita ai tuoi progetti su <span className="text-blue-500">Discord</span> e <span className="text-blue-500">Minecraft</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-6 max-w-2xl mx-auto font-medium">
              Non siamo un hosting. Sviluppiamo sistemi complessi di botting, interfacce web Next.js collegate a database e configuriamo server Minecraft scalabili e pronti al pubblico.
            </p>
            <div className="flex justify-center gap-3 mt-8">
              <button onClick={() => { user ? setView("openticket") : handleDiscordLogin() }} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition">
                Ordina un Progetto Custom
              </button>
              <button onClick={handleDiscordLogin} className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-100 transition">
                Accedi all'Area Clienti
              </button>
            </div>
          </header>

          {/* SEZIONE SERVIZI OFFERTI */}
          <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <Terminal className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-black text-slate-950 dark:text-white">Bot Developing & Settings</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Sviluppo di bot Discord stabili in TypeScript/JavaScript. Sistemi avanzati di ticket bilingue, log crittografati, comandi slash ad attivazione immediata su server locali o globali.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <Code className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-black text-slate-950 dark:text-white">Website & Dashboard Dev</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Creazione di siti vetrina e pannelli amministrativi completi in Next.js con database Supabase/SQLite3 per gestire i dati del tuo bot o della tua community direttamente dal web.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <Server className="h-8 w-8 text-emerald-500 mb-4" />
              <h3 className="text-lg font-black text-slate-950 dark:text-white">Minecraft Network Setup</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Configurazione completa di server Minecraft professionali v1.21.4. Ottimizzazione Spigot/Paper, allineamento tablist, scoreboards, permessi dei ranghi e proxy BungeeCord.
              </p>
            </div>
          </section>

          {/* LISTINO PREZZI POPOLARI (Stile #popular di ARi Systems) */}
          <section className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">I Piani di Sviluppo più Richiesti</h2>
              <p className="text-xs text-slate-400 mt-1">Nessun costo nascosto, preventivi chiari e codice di proprietà del cliente.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md relative overflow-hidden">
                <span className="absolute top-3 right-3 text-[9px] bg-blue-500/10 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-500/20">POPULAR</span>
                <h4 className="text-sm font-bold text-slate-400 uppercase">Discord Bot Custom</h4>
                <div className="text-3xl font-black text-slate-950 dark:text-white mt-2">€49.99 <span className="text-xs font-normal text-slate-400">/una tantum</span></div>
                <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-500" /> Sviluppo in Node.js / Discord.js</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-500" /> Pannello ticket & Modulistica multi-lingua</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-500" /> Database SQLite3 integrato per i log</li>
                </ul>
                <button onClick={handleDiscordLogin} className="w-full mt-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition">Ordina Ora</button>
              </div>
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md">
                <h4 className="text-sm font-bold text-slate-400 uppercase">Minecraft Server Setup</h4>
                <div className="text-3xl font-black text-slate-950 dark:text-white mt-2">€29.99 <span className="text-xs font-normal text-slate-400">/una tantum</span></div>
                <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-500" /> Ottimizzazione completa Spigot versione 1.21.4</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-500" /> Branding grafico Tablist & Scoreboard</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-blue-500" /> Configurazione dei permessi dei Staff</li>
                </ul>
                <button onClick={handleDiscordLogin} className="w-full mt-6 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition">Ordina Ora</button>
              </div>
            </div>
          </section>
        </div>
      )}


      {/* ==================== CASO 2: PORTALE AREA CLIENTI INTERNA (area.arisystems.org) ==================== */}
      {view !== "landing" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Sotto-Navigazione WHMCS Interna */}
          <div className="flex flex-wrap justify-between items-center bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-6 gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <img src={user?.user_metadata?.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full border border-blue-500/40" />
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">Hello, {user?.user_metadata?.full_name}!</h3>
                <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/10">
                  Portal Home / {view.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Pulsantiera delle schede richieste */}
            <div className="flex flex-wrap gap-1 text-xs font-bold">
              <button onClick={() => setView("clientarea")} className={`px-3 py-2 rounded-lg transition ${view === "clientarea" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Home</button>
              <button onClick={() => setView("services")} className={`px-3 py-2 rounded-lg transition ${view === "services" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Services</button>
              <button onClick={() => setView("invoices")} className={`px-3 py-2 rounded-lg transition ${view === "invoices" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Billing</button>
              <button onClick={() => setView("support")} className={`px-3 py-2 rounded-lg transition ${view === "support" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Support</button>
              <button onClick={() => setView("openticket")} className={`px-3 py-2 rounded-lg transition ${view === "openticket" ? "bg-emerald-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Open Ticket</button>
              <button onClick={() => setView("affiliates")} className={`px-3 py-2 rounded-lg transition ${view === "affiliates" ? "bg-amber-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}>Affiliates</button>
              <button onClick={handleLogout} className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition" title="Disconnetti"><LogOut className="h-3.5 w-3.5" /></button>
            </div>
          </div>

          {/* TAB 1: CLIENT AREA HOME */}
          {view === "clientarea" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-center">
                  <Code className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <span className="text-xs text-slate-400 block font-medium">Sviluppi Attivi</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">2</span>
                </div>
                <div className="p-5 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-center">
                  <LifeBuoy className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                  <span className="text-xs text-slate-400 block font-medium">Ticket Aperti</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">{tickets.length}</span>
                </div>
                <div className="p-5 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-center">
                  <CreditCard className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                  <span className="text-xs text-slate-400 block font-medium">Fatture Pendenti</span>
                  <span className="text-xl font-black text-emerald-500">0</span>
                </div>
                <div className="p-5 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-center">
                  <Users className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <span className="text-xs text-slate-400 block font-medium">Guadagni Affiliato</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">€0.00</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2"><Cpu className="h-4 w-4 text-blue-500" /> Richiedi una consulenza immediata</h3>
                <p className="text-xs text-slate-400 mb-4">I nostri sviluppatori sono pronti a scrivere il codice per i tuoi bot o a configurare i plugin del tuo server.</p>
                <button onClick={() => setView("openticket")} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs">Apri Ticket di Sviluppo</button>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES */}
          {view === "services" && (
            <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-black text-slate-950 dark:text-white mb-1">My Products & Services</h2>
              <p className="text-xs text-slate-400 mb-4">Visualizzazione dei codici custom correntemente commissionati ad XenoCloud.</p>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold">
                      <th className="py-2">ID Progetto</th>
                      <th>Nome Servizio</th>
                      <th>Categoria</th>
                      <th>Prezzo Sviluppo</th>
                      <th>Stato Lavori</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((srv) => (
                      <tr key={srv.id} className="border-b border-slate-100 dark:border-slate-800/50 text-slate-700 dark:text-slate-300">
                        <td className="py-3 font-mono font-bold text-slate-400">{srv.id}</td>
                        <td className="font-bold">{srv.name}</td>
                        <td>{srv.category}</td>
                        <td className="font-black">{srv.price}</td>
                        <td><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 rounded-full font-bold text-[10px]">{srv.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: INVOICES */}
          {view === "invoices" && (
            <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm text-center">
              <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Nessuna fattura da pagare</h3>
              <p className="text-xs text-slate-400 mt-1">Tutti i preventivi di sviluppo risultano approvati e saldati.</p>
            </div>
          )}

          {/* TAB 4: SUPPORT TICKETS LIST */}
          {view === "support" && (
            <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-black text-slate-950 dark:text-white">Support Tickets</h2>
                <button onClick={() => setView("openticket")} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">Invia Nuovo Ticket</button>
              </div>
              <div className="space-y-2 text-xs">
                {tickets.map((tk) => (
                  <div key={tk.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/20 flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold text-slate-400 mr-2">#ID-{tk.id}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{tk.subject}</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{tk.department} • Modificato: {tk.date}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-bold">{tk.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: OPEN TICKET FORM */}
          {view === "openticket" && (
            <div className="max-w-2xl mx-auto bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">Open Ticket - Richiesta Sviluppo</h2>
              <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Reparto Tecnico</label>
                    <select value={ticketDept} onChange={(e) => setTicketDept(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-white focus:outline-none">
                      <option value="Sviluppo Bot Discord">Sviluppo Bot Discord</option>
                      <option value="Sviluppo Web Dashboard">Sviluppo Web Dashboard Next.js</option>
                      <option value="Settaggio Server Minecraft">Settaggio / Creazione Server Minecraft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Priorità</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-white focus:outline-none"><option>Media</option><option>Alta</option></select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Oggetto Modifica o Nuovo Progetto</label>
                  <input type="text" required value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} placeholder="Oggetto del ticket..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Descrizione Requisiti</label>
                  <textarea rows={5} required value={ticketMsg} onChange={(e) => setTicketMsg(e.target.value)} placeholder="Descrivi qui nel dettaglio cosa dobbiamo sviluppare..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-white font-mono focus:outline-none" />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button type="button" onClick={() => setView("clientarea")} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold">Annulla</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg flex items-center gap-1.5"><Send className="h-3.5 w-3.5" /> Invia Richiesta (.php)</button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: AFFILIATES (REPLICA REALE DALLA TUA FOTO DI ARi SYSTEMS) */}
          {view === "affiliates" && (
            <div className="space-y-6">
              
              {/* I Tre Contatori Superiori colorati */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Box Giallo/Dorato - Clicks */}
                <div className="p-6 bg-[#FCF8E3] dark:bg-amber-950/20 border border-[#FAEBCC] dark:border-amber-900/20 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-[#8A6D3B] dark:text-amber-400"><Users className="h-10 w-10 opacity-80" /></div>
                    <div>
                      <span className="text-3xl font-black text-[#8A6D3B] dark:text-amber-400 block">0</span>
                      <span className="text-xs font-bold text-[#8A6D3B]/90 dark:text-amber-400/80 uppercase tracking-wider">Clicks</span>
                    </div>
                  </div>
                </div>

                {/* Box Azzurro - Signups */}
                <div className="p-6 bg-[#D9EDF7] dark:bg-blue-950/20 border border-[#BCE8F1] dark:border-blue-900/20 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-[#31708F] dark:text-blue-400"><ShoppingCart className="h-10 w-10 opacity-80" /></div>
                    <div>
                      <span className="text-3xl font-black text-[#31708F] dark:text-blue-400 block">0</span>
                      <span className="text-xs font-bold text-[#31708F]/90 dark:text-blue-400/80 uppercase tracking-wider">Signups</span>
                    </div>
                  </div>
                </div>

                {/* Box Verde - Conversions */}
                <div className="p-6 bg-[#DFF0D8] dark:bg-emerald-950/20 border border-[#D6E9C6] dark:border-emerald-900/20 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="text-[#3C763D] dark:text-emerald-400"><FileText className="h-10 w-10 opacity-80" /></div>
                    <div>
                      <span className="text-3xl font-black text-[#3C763D] dark:text-emerald-400 block">0%</span>
                      <span className="text-xs font-bold text-[#3C763D]/90 dark:text-emerald-400/80 uppercase tracking-wider">Conversions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unique Referral Link Box */}
              <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <Link className="h-3.5 w-3.5 text-blue-500" /> Your Unique Referral Link
                </h3>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300 select-all">
                  https://xenocloud.net/referral/26
                </div>
              </div>

              {/* Tabella Resoconto Provvigioni e Richiesta Prelievo */}
              <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs shadow-sm">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-800 dark:text-white">
                  Resoconto Guadagni Affiliazione
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-800 px-4">
                  <div className="py-3 flex justify-between"><span className="text-slate-400 font-medium">Commissions Pending Maturation:</span><span className="font-bold">€0.00EUR</span></div>
                  <div className="py-3 flex justify-between"><span className="text-slate-400 font-medium">Available Commissions Balance:</span><span className="font-bold">€0.00EUR</span></div>
                  <div className="py-3 flex justify-between"><span className="text-slate-400 font-medium">Total Amount Withdrawn:</span><span className="font-bold">€0.00EUR</span></div>
                </div>
                <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 text-center border-t border-slate-200 dark:border-slate-800">
                  <button disabled className="bg-[#D9534F] opacity-50 text-white font-bold py-2 px-6 rounded-lg shadow cursor-not-allowed text-xs transition">
                    Request Withdrawal
                  </button>
                  <p className="text-[10px] text-slate-400 mt-2">You will be able to request a withdrawal as soon as your balance reaches the minimum required amount of €10.00EUR.</p>
                </div>
              </div>

              {/* Referrals list vuota */}
              <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm text-xs">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">Your Referrals</h3>
                <div className="text-center py-6 text-slate-400">Showing 0 to 0 of 0 entries</div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}