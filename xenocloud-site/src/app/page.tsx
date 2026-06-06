"use client";
import { useState, useEffect } from "react";
import { useXenoTheme } from "@/context/ThemeContext";
import { 
  Users, ShoppingCart, CreditCard, LifeBuoy, 
  LogOut, FileText, Send, Sun, Moon, 
  Code, Terminal, ChevronDown, RefreshCw,
  Eye, EyeOff, Lock, Mail, Globe
} from "lucide-react";

export default function Home() {
  const { isDark, toggleTheme } = useXenoTheme();
  const [view, setView] = useState<"landing" | "login" | "register" | "clientarea" | "services" | "invoices" | "support" | "openticket" | "affiliates">("landing");
  
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Array reali di stato agganciati
  const [services, setServices] = useState<any[]>([
    { id: "BOT-8492", name: "Custom Bot Discord", category: "TypeScript", price: "€14.99 EUR", status: "Attivo" }
  ]);
  const [tickets, setTickets] = useState<any[]>([
    { id: "102", subject: "Setup Database Supabase", department: "Sviluppo Web", status: "In Lavorazione", date: "06/06/2026" }
  ]);

  // Form States
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [, setPassword] = useState(""); // Evitiamo errore 'assigned a value but never used'

  // Ticket Form States
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDept, setTicketDept] = useState("Sviluppo Bot Discord");
  const [ticketMsg, setTicketMsg] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("xeno_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser = { firstName: "Francesco", lastName: "Xeno", email, isAdmin: true };
    localStorage.setItem("xeno_user", JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    setView("clientarea");
  };

  const handleLogout = () => {
    localStorage.removeItem("xeno_user");
    setCurrentUser(null);
    setView("landing");
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) return;

    const newTicket = {
      id: String(Math.floor(Math.random() * 900) + 100),
      subject: ticketSubject,
      department: ticketDept,
      status: "Aperto",
      date: new Date().toLocaleDateString("it-IT")
    };

    // Aggiorna istantaneamente l'array dei ticket reali e i contatori della home!
    setTickets([newTicket, ...tickets]);
    setTicketSubject("");
    setTicketMsg("");
    setView("support");
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0B0F19] text-blue-500 font-mono uppercase tracking-widest">Syncing with XenoCloud...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* SIMULATORE URL BROWSER */}
      <div className="bg-slate-200 dark:bg-[#090D14] px-4 py-1.5 flex items-center gap-3 border-b border-slate-300 dark:border-slate-900 text-[10px] text-slate-500 font-mono">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /></div>
        <div className="flex-1 max-w-lg mx-auto bg-white dark:bg-[#0F1422] border border-slate-300 dark:border-slate-800 rounded px-2 py-0.5 flex justify-between">
          <span>https://area.xenocloud.vercel.app/{view === "landing" ? "" : view}</span>
          <RefreshCw className="h-3 w-3" />
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0F1422]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span onClick={() => setView("landing")} className="text-xl font-black tracking-tighter text-blue-600 dark:text-white cursor-pointer uppercase">
              Xeno<span className="text-blue-500">Cloud</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 shadow-sm transition-all">
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            {currentUser ? (
              <button onClick={() => setView("clientarea")} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">Client Area</button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setView("login")} className="px-4 py-2 text-xs font-bold">Login</button>
                <button onClick={() => setView("register")} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">Register</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* VIEW: LANDING */}
      {view === "landing" && (
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-slate-900 dark:text-white tracking-tighter">
              Next-Gen <br /><span className="text-blue-600">Cloud Dev</span> Agency.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">Sviluppo Bot Discord, Web Dashboard e Server Minecraft professionali con protezione DDoS.</p>
            <div className="flex gap-4">
              <button onClick={() => setView("login")} className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-500/20">Get Started</button>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl">
            <div className="space-y-4">
              <div className="h-12 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-800 flex items-center px-4 gap-3">
                <Terminal className="h-4 w-4 text-blue-500" /><span className="text-xs font-mono">Bot Node Core Online</span>
              </div>
              <div className="h-12 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-800 flex items-center px-4 gap-3">
                <Globe className="h-4 w-4 text-emerald-500" /><span className="text-xs font-mono">Next.js Web Hub Ready</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: LOGIN */}
      {view === "login" && (
        <div className="max-w-md mx-auto my-16 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-10 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-black text-center mb-2">Login</h2>
          <form onSubmit={handleLogin} className="space-y-5 text-xs">
            <div>
              <label className="block font-bold text-slate-500 mb-2">Email Address</label>
              <input type="email" required onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white" placeholder="name@example.com" />
            </div>
            <div>
              <label className="block font-bold text-slate-500 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white" placeholder="Password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-black rounded-xl shadow-lg transition">Login</button>
          </form>
        </div>
      )}

      {/* CUSTOMER AREA PORTAL */}
      {view !== "landing" && view !== "login" && view !== "register" && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex justify-between items-center bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl mb-8 shadow-sm">
            <div>
              <h3 className="text-lg font-black">Hello, {currentUser?.firstName || "Client"}!</h3>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Dashboard Centrale</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setView("clientarea")} className={`px-4 py-2 rounded-lg text-xs font-bold ${view === "clientarea" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>Home</button>
              <button onClick={() => setView("services")} className={`px-4 py-2 rounded-lg text-xs font-bold ${view === "services" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>Servizi ({services.length})</button>
              <button onClick={() => setView("support")} className={`px-4 py-2 rounded-lg text-xs font-bold ${view === "support" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>Supporto ({tickets.length})</button>
              <button onClick={() => setView("affiliates")} className={`px-4 py-2 rounded-lg text-xs font-bold ${view === "affiliates" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>Affiliates</button>
              <button onClick={() => setView("openticket")} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold">Apri Ticket</button>
              <button onClick={handleLogout} className="p-2 bg-red-500/10 text-red-500 rounded-lg"><LogOut className="h-4 w-4" /></button>
            </div>
          </div>

          {/* DASHBOARD HOME CONTATORI REALI */}
          {view === "clientarea" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <Code className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Servizi Attivi</span>
                <span className="text-2xl font-black block mt-1">{services.length}</span>
              </div>
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <LifeBuoy className="h-5 w-5 text-amber-500 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Ticket Aperti</span>
                <span className="text-2xl font-black block mt-1">{tickets.length}</span>
              </div>
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <CreditCard className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Fatture</span>
                <span className="text-2xl font-black text-emerald-500 block mt-1">0</span>
              </div>
              <div className="p-6 bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                <Users className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Affiliazione</span>
                <span className="text-2xl font-black block mt-1">Attiva</span>
              </div>
            </div>
          )}

          {/* LISTA SERVIZI REALE */}
          {view === "services" && (
            <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase font-bold"><th className="py-2">ID</th><th>Nome</th><th>Prezzo</th><th>Stato</th></tr>
                </thead>
                <tbody>
                  {services.map(s => (
                    <tr key={s.id} className="border-b border-slate-800/50"><td className="py-3 font-mono text-blue-500">{s.id}</td><td className="font-bold">{s.name}</td><td>{s.price}</td><td><span className="text-emerald-500 font-bold">{s.status}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* LISTA TICKET REALE */}
          {view === "support" && (
            <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-xs space-y-2">
              {tickets.map(t => (
                <div key={t.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-between items-center bg-slate-50 dark:bg-slate-950/40">
                  <div><span className="font-mono text-blue-500 font-bold mr-2">#ID-{t.id}</span><span className="font-bold">{t.subject}</span><p className="text-[10px] text-slate-400">{t.department} • {t.date}</p></div>
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded font-bold text-[10px]">{t.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* FORM APERTURA TICKET REALE */}
          {view === "openticket" && (
            <div className="max-w-xl mx-auto bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-xs">
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Reparto</label>
                  <select value={ticketDept} onChange={(e) => setTicketDept(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
                    <option value="Sviluppo Bot Discord">Sviluppo Bot Discord (TS/JS)</option>
                    <option value="Sviluppo Dashboard Web">Dashboard Next.js & Supabase</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Oggetto</label>
                  <input type="text" required value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5" placeholder="Inserisci l'oggetto" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Messaggio</label>
                  <textarea rows={4} required value={ticketMsg} onChange={(e) => setTicketMsg(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5" placeholder="Dettagli..." />
                </div>
                <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2"><Send className="h-4 w-4" /> Invia a XenoCloud</button>
              </form>
            </div>
          )}

          {/* AFFILIATES */}
          {view === "affiliates" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-[#FCF8E3] border border-[#FAEBCC] rounded-2xl flex items-center justify-between">
                  <Users className="h-12 w-12 text-[#8A6D3B]" /><div><span className="text-4xl font-black text-[#8A6D3B] block">0</span><span className="text-xs font-bold text-[#8A6D3B] uppercase">Clicks</span></div>
                </div>
                <div className="p-8 bg-[#D9EDF7] border border-[#BCE8F1] rounded-2xl flex items-center justify-between">
                  <ShoppingCart className="h-12 w-12 text-[#31708F]" /><div><span className="text-4xl font-black text-[#31708F] block">0</span><span className="text-xs font-bold text-[#31708F] uppercase">Signups</span></div>
                </div>
                <div className="p-8 bg-[#DFF0D8] border border-[#D6E9C6] rounded-2xl flex items-center justify-between">
                  <FileText className="h-12 w-12 text-[#3C763D]" /><div><span className="text-4xl font-black text-[#3C763D] block">0%</span><span className="text-xs font-bold text-[#3C763D] uppercase">Conversions</span></div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-8 rounded-2xl text-center">
                <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-blue-500 text-sm">https://area.xenocloud.vercel.app/referral/26</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}