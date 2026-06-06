"use client";
import { useState, useEffect } from "react";
import { useXenoTheme } from "@/context/ThemeContext";
import { 
  Users, ShoppingCart, CreditCard, LifeBuoy, Server, 
  LogIn, LogOut, FileText, Send, Link, Sun, Moon, 
  Code, Cpu, Terminal, ChevronDown, Shield, RefreshCw,
  Eye, EyeOff, Lock, Mail, User, Phone, Briefcase, MapPin
} from "lucide-react";

// Interfacce per i dati reali del database
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  address1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

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

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  total: string;
  status: string;
}

export default function Home() {
  const { isDark, toggleTheme } = useXenoTheme();
  const [view, setView] = useState<"landing" | "login" | "register" | "clientarea" | "services" | "invoices" | "support" | "openticket" | "affiliates">("landing");
  
  // Stati per l'utente e i dati reali caricati dal server
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

  // Stati dei Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDept, setTicketDept] = useState("Sviluppo Bot Discord");
  const [ticketPriority, setTicketPriority] = useState("Medium");
  const [ticketMsg, setTicketMsg] = useState("");

  // ==========================================
  // LOGICA DI CARICAMENTO DATI REALI (API)
  // ==========================================
  
  // Funzione per recuperare i dati reali dell'utente dal backend
  const fetchRealUserData = async (userId: string) => {
    setLoading(true);
    try {
      // Sostituisci questi URL con i tuoi veri endpoint API (es. Supabase o il tuo backend Node.js)
      const [resServices, resTickets, resInvoices] = await Promise.all([
        fetch(`/api/client/services?userId=${userId}`),
        fetch(`/api/client/tickets?userId=${userId}`),
        fetch(`/api/client/invoices?userId=${userId}`)
      ]);

      if (resServices.ok) setServices(await resServices.json());
      if (resTickets.ok) setTickets(await resTickets.json());
      if (resInvoices.ok) setInvoices(await resInvoices.json());
    } catch (error) {
      console.error("Errore nel recupero dei dati reali dal database:", error);
    } finally {
      setLoading(false);
    }
  };

  // Controllo sessione reale al caricamento della pagina
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const userData = await res.json();
          setCurrentUser(userData);
          fetchRealUserData(userData.id);
          setView("clientarea");
        }
      } catch (e) {
        console.log("Nessuna sessione attiva.");
      }
    };
    checkSession();
  }, []);

  // Login Reale verso il Backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        await fetchRealUserData(data.user.id);
        setView("clientarea");
      } else {
        alert("Credenziali errate sul database. Riprova.");
      }
    } catch (error) {
      alert("Errore di connessione con il server.");
    }
  };

  // Invio Ticket Reale nel Database
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg || !currentUser) return;

    try {
      const res = await fetch("/api/client/tickets/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          subject: ticketSubject,
          department: ticketDept,
          priority: ticketPriority,
          message: ticketMsg
        })
      });

      if (res.ok) {
        // Ricarica i ticket aggiornati direttamente dal database reale
        await fetchRealUserData(currentUser.id);
        setTicketSubject("");
        setTicketMsg("");
        setView("support");
      }
    } catch (error) {
      alert("Impossibile salvare il ticket sul database.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
    setServices([]);
    setTickets([]);
    setInvoices([]);
    setView("landing");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans">
      
      {/* SIMULATORE URL BROWSER */}
      <div className="bg-slate-200 dark:bg-[#090D14] px-4 py-2 flex items-center gap-3 border-b border-slate-300 dark:border-slate-900 text-xs text-slate-500 select-none">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-amber-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <div className="flex-1 max-w-xl mx-auto bg-white dark:bg-[#0F1422] border border-slate-300 dark:border-slate-800 rounded-md py-1 px-3 flex items-center justify-between text-[11px] text-slate-400 font-mono shadow-inner">
          <div className="flex items-center gap-2 truncate">
            <Shield className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300 truncate">https://area.xenocloud.net/{view === "landing" ? "" : view + ".php"}</span>
          </div>
          <RefreshCw className={`h-3 w-3 text-slate-400 cursor-pointer ${loading ? "animate-spin" : ""}`} />
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0F1422]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span onClick={() => setView("landing")} className="text-lg font-black tracking-tighter text-slate-950 dark:text-white cursor-pointer flex items-center gap-2 uppercase">
              <span className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-sm">X</span>
              Xeno<span className="text-blue-500">Cloud</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:opacity-80 transition">
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500">Hi, {currentUser.firstName}</span>
                <button onClick={() => setView("clientarea")} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow">Area Clienti</button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span onClick={() => setView("login")} className="text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer hover:text-blue-500">Log in</span>
                <button onClick={() => setView("register")} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow">Register</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* LANDING PAGE */}
      {view === "landing" && (
        <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-6">
          <h1 className="text-5xl font-black tracking-tight">Sistemi Cloud & Soluzioni Sviluppo</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">Gestisci i tuoi Bot Discord, i server Minecraft 1.21.4 e lo sviluppo web da un'unica vera piattaforma centralizzata.</p>
          <button onClick={() => setView("login")} className="px-6 py-3 bg-blue-600 font-bold text-xs text-white rounded-xl shadow-lg">Accedi al Portale</button>
        </div>
      )}

      {/* LOGIN COMPATIBILE (FOTO 1) */}
      {view === "login" && (
        <div className="max-w-sm mx-auto my-16 px-4">
          <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black">Login</h2>
              <p className="text-xs text-slate-400 mt-1">Inserisci i tuoi dati reali per accedere ai servizi.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="name@example.com" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-white focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-white focus:outline-none" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full py-2.5 bg-blue-600 font-bold text-white rounded-lg transition shadow-md">
                {loading ? "Verifica Database..." : "Login"}
              </button>
            </form>
            <div className="text-center mt-6 text-xs text-slate-400">
              Non hai un account? <span onClick={() => setView("register")} className="text-blue-500 font-bold hover:underline cursor-pointer">Register</span>
            </div>
          </div>
        </div>
      )}

      {/* PORTALE DASHBOARD LIVE CON CONNESSI DATI REAL-TIME */}
      {view !== "landing" && view !== "login" && view !== "register" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* MENU WHMCS REALE */}
          <div className="flex flex-wrap justify-between items-center bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">{currentUser?.firstName.charAt(0)}</div>
              <div>
                <h4 className="text-xs font-black">{currentUser?.firstName} {currentUser?.lastName}</h4>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{view}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 text-xs font-bold">
              <button onClick={() => setView("clientarea")} className={`px-3 py-1.5 rounded-lg ${view === "clientarea" ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`}>Dashboard</button>
              <button onClick={() => setView("services")} className={`px-3 py-1.5 rounded-lg ${view === "services" ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`}>Servizi ({services.length})</button>
              <button onClick={() => setView("invoices")} className={`px-3 py-1.5 rounded-lg ${view === "invoices" ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`}>Fatture ({invoices.filter(i=>i.status === "Non Pagata").length})</button>
              <button onClick={() => setView("support")} className={`px-3 py-1.5 rounded-lg ${view === "support" ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`}>Supporto ({tickets.length})</button>
              <button onClick={() => setView("openticket")} className="px-3 py-1.5 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition">Apri Ticket</button>
              <button onClick={handleLogout} className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"><LogOut className="h-4 w-4" /></button>
            </div>
          </div>

          {/* AREA DI LOGICA DINAMICA (I CONTATORI MOSTRANO I VERI COMPONENTI) */}
          {view === "clientarea" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <Code className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Servizi Licenziati</span>
                <span className="text-2xl font-black block mt-1">{services.length}</span>
              </div>
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <LifeBuoy className="h-5 w-5 text-amber-500 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">I Tuoi Ticket</span>
                <span className="text-2xl font-black block mt-1">{tickets.length}</span>
              </div>
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <CreditCard className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Fatture Scadute</span>
                <span className="text-2xl font-black text-emerald-500 block mt-1">{invoices.filter(i=>i.status==="Non Pagata").length}</span>
              </div>
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <Users className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Affiliazione Attiva</span>
                <span className="text-2xl font-black block mt-1">SI</span>
              </div>
            </div>
          )}

          {/* ELENCO DEI SERVIZI COMPLETI DAL DATABASE */}
          {view === "services" && (
            <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-black mb-1">I Tuoi Sviluppi Attivi</h2>
              <p className="text-xs text-slate-400 mb-4">Lista sincronizzata con i nodi e le licenze attive.</p>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase">
                      <th className="py-2">ID Prodotto</th>
                      <th>Nome Servizio</th>
                      <th>Prezzo Rinnovo</th>
                      <th>Stato Core</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.length === 0 ? (
                      <tr><td colSpan={4} className="py-4 text-center text-slate-500">Nessun servizio attivo sul tuo database utente.</td></tr>
                    ) : (
                      services.map(s => (
                        <tr key={s.id} className="border-b border-slate-800/50">
                          <td className="py-3 font-mono text-blue-500">{s.id}</td>
                          <td className="font-bold">{s.name} ({s.category})</td>
                          <td className="font-black">{s.price}</td>
                          <td><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded font-bold text-[10px]">{s.status}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ELENCO DEI TICKET REALI */}
          {view === "support" && (
            <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm text-xs">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-black">Ticket di Supporto Tecnico</h2>
                <button onClick={() => setView("openticket")} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold">Apri Nuovo</button>
              </div>
              <div className="space-y-2">
                {tickets.length === 0 ? (
                  <p className="text-slate-500 text-center py-4">Nessun ticket registrato.</p>
                ) : (
                  tickets.map(t => (
                    <div key={t.id} className="p-3 border border-slate-800 rounded-lg bg-slate-950/40 flex justify-between items-center">
                      <div>
                        <span className="font-mono text-blue-500 font-bold mr-2">#ID-{t.id}</span>
                        <span className="font-bold">{t.subject}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{t.department} • Data: {t.date}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded font-bold text-[10px]">{t.status}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* COMPONENTE FORM PER APRIRE UN TICKET SUL DATABASE */}
          {view === "openticket" && (
            <div className="max-w-2xl mx-auto bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-xs">
              <h2 className="text-sm font-black border-b border-slate-800 pb-2 mb-4">Invia Richiesta di Sviluppo / Configurazione</h2>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Reparto Principale</label>
                    <select value={ticketDept} onChange={(e) => setTicketDept(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white">
                      <option value="Sviluppo Bot Discord">Sviluppo Bot Discord (TS/JS)</option>
                      <option value="Sviluppo Dashboard Web">Dashboard Next.js & Database</option>
                      <option value="Configurazione Minecraft">Configurazione Server Minecraft 1.21.4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Priorità Incarico</label>
                    <select value={ticketPriority} onChange={(e) => setTicketPriority(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white">
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Urgency</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Oggetto del Ticket</label>
                  <input type="text" required value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} placeholder="Esempio: Errore setup plugin tablist o aggiunta comando bot" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Specifiche Tecniche Dettagliate</label>
                  <textarea rows={5} required value={ticketMsg} onChange={(e) => setTicketMsg(e.target.value)} placeholder="Scrivi qui i requisiti del tuo codice o del server..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none" />
                </div>
                <div className="flex justify-end gap-2 border-t border-slate-800 pt-3">
                  <button type="button" onClick={() => setView("clientarea")} className="px-4 py-2 bg-slate-800 rounded-lg font-bold">Annulla</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-1.5"><Send className="h-3.5 w-3.5" /> Invia a XenoCloud</button>
                </div>
              </form>
            </div>
          )}

        </div>
      )}
    </div>
  );
}