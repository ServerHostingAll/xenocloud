"use client";
import { useState, useEffect } from "react";
import { useXenoTheme } from "@/context/ThemeContext";
import { 
  Users, ShoppingCart, CreditCard, LifeBuoy, Server, 
  LogIn, LogOut, FileText, Send, Link, Sun, Moon, 
  Code, Cpu, Terminal, ChevronDown, Shield, RefreshCw,
  Eye, EyeOff, Lock, Mail, User, Phone, MapPin, Globe, Check
} from "lucide-react";

export default function Home() {
  const { isDark, toggleTheme } = useXenoTheme();
  const [view, setView] = useState<"landing" | "login" | "register" | "clientarea" | "services" | "invoices" | "support" | "openticket" | "affiliates">("landing");
  
  // Stato Utente e Dati Reali
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  
  // Form States
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Sincronizzazione iniziale dello stato utente
    const savedUser = localStorage.getItem("xeno_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulazione login reale connesso a Supabase Profiles
    const mockUser = { firstName: "Francesco", lastName: "Xeno", email, isAdmin: true };
    localStorage.setItem("xeno_user", JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    setView("clientarea");
  };

  // FIX: Aggiunta della funzione handleLogout mancante
  const handleLogout = () => {
    localStorage.removeItem("xeno_user");
    setCurrentUser(null);
    setServices([]);
    setTickets([]);
    setView("landing");
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0B0F19] text-blue-500 font-mono uppercase tracking-widest">Syncing with XenoCloud...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* SIMULATORE URL BROWSER */}
      <div className="bg-slate-200 dark:bg-[#090D14] px-4 py-1.5 flex items-center gap-3 border-b border-slate-300 dark:border-slate-900 text-[10px] text-slate-500 font-mono">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /></div>
        <div className="flex-1 max-w-lg mx-auto bg-white dark:bg-[#0F1422] border border-slate-300 dark:border-slate-800 rounded px-2 py-0.5 flex justify-between">
          <span>https://{view === "landing" ? "xenocloud.vercel.app" : "area.xenocloud.vercel.app/" + view}</span>
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
            <div className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span onClick={() => setView("landing")} className="cursor-pointer hover:text-blue-500">Home</span>
              <span className="flex items-center gap-1 cursor-pointer">Services <ChevronDown className="h-3 w-3" /></span>
              <span className="flex items-center gap-1 cursor-pointer">Support <ChevronDown className="h-3 w-3" /></span>
              <span onClick={() => setView("affiliates")} className="text-amber-500 cursor-pointer">Affiliates</span>
            </div>
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
            <p className="text-slate-500 dark:text-slate-400 max-w-md">Sviluppo Bot Discord, Web Dashboard e Server Minecraft professionali con protezione DDoS e uptime garantito sui nostri nodi core.</p>
            <div className="flex gap-4">
              <button onClick={() => setView("register")} className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-500/20">Get Started</button>
              <button onClick={() => setView("login")} className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold rounded-xl text-xs">Login</button>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <span className="text-xs font-mono text-slate-500">system_status_v3.0</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-12 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-800 flex items-center px-4 gap-3">
                <Terminal className="h-4 w-4 text-blue-500" /><span className="text-xs font-mono">Bot Node Core (TS/JS) Online</span>
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
          <p className="text-center text-xs text-slate-400 mb-8">Sign in to your account to continue.</p>
          <form onSubmit={handleLogin} className="space-y-5 text-xs">
            <div>
              <label className="block font-bold text-slate-500 mb-2">Email Address</label>
              <input type="email" required onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-white" placeholder="name@example.com" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-bold text-slate-500">Password</label>
                <span className="text-red-500 font-bold cursor-pointer">Forgot Password?</span>
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-white" placeholder="Password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-black rounded-xl shadow-lg transition">Login</button>
            <div className="text-center pt-4 border-t border-slate-800 text-slate-400">Not registered? <span onClick={() => setView("register")} className="text-red-500 font-bold cursor-pointer">Create account</span></div>
          </form>
        </div>
      )}

      {/* REAT-TIME CUSTOMER AREA WITH AFFILIATES */}
      {view !== "landing" && view !== "login" && view !== "register" && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex justify-between items-center bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl mb-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-black">X</div>
              <div>
                <h3 className="text-lg font-black leading-none">Hello, {currentUser?.firstName}!</h3>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Client Dashboard</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setView("clientarea")} className={`px-4 py-2 rounded-lg text-xs font-bold ${view === "clientarea" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>Home</button>
              <button onClick={() => setView("affiliates")} className={`px-4 py-2 rounded-lg text-xs font-bold ${view === "affiliates" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>Affiliates</button>
              <button onClick={() => setView("support")} className={`px-4 py-2 rounded-lg text-xs font-bold ${view === "support" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>Support</button>
              <button onClick={() => setView("openticket")} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold">Open Ticket</button>
              <button onClick={handleLogout} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><LogOut className="h-4 w-4" /></button>
            </div>
          </div>

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
                <p className="text-sm font-bold text-slate-500 mb-4">Your Unique Referral Link</p>
                <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-blue-500 text-sm">https://area.xenocloud.vercel.app/referral/26</div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-slate-800 border p-6 rounded-2xl">
                  <div><span className="block text-xs font-bold text-slate-400">Pending</span><span className="text-xl font-black">€0.00 EUR</span></div>
                  <div><span className="block text-xs font-bold text-slate-400">Available</span><span className="text-xl font-black">€0.00 EUR</span></div>
                  <div><span className="block text-xs font-bold text-slate-400">Total Withdrawn</span><span className="text-xl font-black">€0.00 EUR</span></div>
                </div>
                <button disabled className="mt-8 px-10 py-3 bg-red-500 opacity-50 text-white font-black rounded-xl text-xs cursor-not-allowed">Request Withdrawal</button>
              </div>
            </div>
          )}

          {/* ALTRE SEZIONI CLIENTAREA SE NECESSARIO */}
        </div>
      )}
    </div>
  );
}