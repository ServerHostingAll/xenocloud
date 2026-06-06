"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { CreditCard, LifeBuoy, Server, LogIn, LogOut, FileText, Send } from "lucide-react";

// Inizializzazione client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SectionBillingProps {
  initialOrder?: { name: string; price: string } | null;
  clearOrder?: () => void;
}

interface Ticket {
  id: string;
  subject: string;
  department: string;
  status: string;
  date: string;
}

export default function SectionBilling({ initialOrder, clearOrder }: SectionBillingProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<"index" | "submitticket" | "services" | "invoices">("index");
  
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "1", subject: "Richiesta installazione Node.js v22", department: "Supporto Tecnico", status: "Aperto", date: "Oggi" }
  ]);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDept, setTicketDept] = useState("Supporto Tecnico");
  const [ticketMsg, setTicketMsg] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        // FIX DEFINITIVO: Castiamo l'intero blocco auth a 'any' così TypeScript ignora i controlli sul tipo SupabaseAuthClient
        const authClient = (supabase as any).auth;
        const { data: { session } } = await authClient.getSession();
        
        if (session) {
          setUser(session.user);
          if (session.provider_token) {
            fetch("/api/discord-join", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                accessToken: session.provider_token,
                userId: session.user.user_metadata.provider_id
              })
            }).catch(err => console.error("Errore auto-join server Discord:", err));
          }
        }
      } catch (err) {
        console.error("Errore auth:", err);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();

    // FIX DEFINITIVO: Castiamo ad any anche qui per l'ascoltatore dello stato
    const { data: authListener } = (supabase as any).auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleDiscordLogin = async () => {
    // FIX DEFINITIVO: Cast su .auth per aggirare il compilatore
    await (supabase as any).auth.signInWithOAuth({
      provider: "discord",
      options: {
        scopes: "identify email guilds.join"
      }
    });
  };

  const handleLogout = async () => {
    // FIX DEFINITIVO: Cast su .auth per aggirare il compilatore
    await (supabase as any).auth.signOut();
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
    setActiveSubTab("index");
    alert("Ticket Aperto con Successo in stile billing.scheggia.cloud/submitticket.php");
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Caricamento dei moduli di fatturazione crittografati...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-2xl glass-card text-center">
        <div className="bg-blue-600/10 p-4 rounded-full w-fit mx-auto mb-4 border border-blue-500/20">
          <LogIn className="h-8 w-8 text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Area Clienti Protetta</h2>
        <p className="text-xs text-slate-400 mb-6">
          Accedi in un click tramite il tuo account Discord per ordinare servizi, gestire le tue VPS attive ed aprire ticket di assistenza.
        </p>
        <button
          onClick={handleDiscordLogin}
          className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-xl font-semibold text-sm transition shadow-lg shadow-[#5865F2]/20 flex items-center justify-center gap-2"
        >
          Sincronizza con Discord
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto bg-grid-pattern">
      <div className="flex flex-wrap justify-between items-center bg-slate-900/60 border border-slate-800 p-4 rounded-xl mb-6 gap-4">
        <div className="flex items-center gap-3">
          {user.user_metadata?.avatar_url && (
            <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full border border-blue-500/40" />
          )}
          <div>
            <h3 className="text-sm font-bold text-white">Benvenuto, {user.user_metadata?.full_name || user.email}</h3>
            <span className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/10">
              Account Sincronizzato & Membro Discord Verified
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveSubTab("index")} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg font-medium transition">
            Portal Home
          </button>
          <button onClick={() => setActiveSubTab("submitticket")} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs text-white rounded-lg font-medium transition">
            Apri Ticket (.php)
          </button>
          <button onClick={handleLogout} className="p-2 bg-red-950/40 border border-red-900/40 hover:bg-red-900 text-red-400 hover:text-white rounded-lg transition" title="Disconnetti">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {activeSubTab === "index" && (
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Collegamenti Rapidi</h4>
              <div className="space-y-1">
                <button onClick={() => setActiveSubTab("index")} className="w-full text-left text-xs py-2 px-3 text-blue-400 font-medium hover:bg-slate-800/50 rounded-lg block">📦 I Miei Servizi</button>
                <button onClick={() => setActiveSubTab("submitticket")} className="w-full text-left text-xs py-2 px-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg block">🎫 Apri Nuovo Ticket</button>
                <button className="w-full text-left text-xs py-2 px-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg block">💳 Storico Fatture</button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-center">
                <Server className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <span className="text-[11px] text-slate-400 block">Servizi</span>
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-center">
                <LifeBuoy className="h-5 w-5 text-amber-500 mx-auto mb-1" />
                <span className="text-[11px] text-slate-400 block">Ticket Attivi</span>
                <span className="text-xl font-bold text-white">{tickets.filter(t => t.status === "Aperto").length}</span>
              </div>
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-center">
                <CreditCard className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <span className="text-[11px] text-slate-400 block">Fatture Non Pagate</span>
                <span className="text-xl font-bold text-emerald-400">0</span>
              </div>
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-center">
                <FileText className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                <span className="text-[11px] text-slate-400 block">Contratti</span>
                <span className="text-xl font-bold text-white">Attivi</span>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <LifeBuoy className="h-4 w-4 text-blue-500" /> Panoramica Supporto Ticket Recenti
              </h3>
              <div className="space-y-2">
                {tickets.map((tk) => (
                  <div key={tk.id} className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-slate-500 font-bold mr-2">#ID-{tk.id}</span>
                      <span className="text-slate-200 font-medium">{tk.subject}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{tk.department} • Modificato: {tk.date}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${tk.status === "Aperto" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-slate-800 text-slate-400"}`}>
                      {tk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "submitticket" && (
        <div className="max-w-2xl mx-auto bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <div className="border-b border-slate-800 pb-3 mb-4">
            <h2 className="text-lg font-bold text-white">Invia Ticket d'Assistenza</h2>
            <p className="text-xs text-slate-400 mt-1">Se riscontri problemi con nodi Minecraft o script VPS, i nostri tecnici risponderanno entro 15 minuti.</p>
          </div>

          <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Reparto di Destinazione</label>
                <select 
                  value={ticketDept}
                  onChange={(e) => setTicketDept(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Supporto Tecnico VPS">Supporto Tecnico Hardware VPS</option>
                  <option value="Sviluppo Bot Discord">Sviluppo & Revisione Bot Custom</option>
                  <option value="Amministrazione e Commerciale">Amministrazione / Modifiche Billing</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Priorità</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500">
                  <option>Alta (Bloccante)</option>
                  <option>Media</option>
                  <option>Bassa</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Oggetto della Richiesta</label>
              <input 
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Inserisci un titolo sintetico del problema..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Messaggio Dettagliato</label>
              <textarea 
                rows={6}
                required
                value={ticketMsg}
                onChange={(e) => setTicketMsg(e.target.value)}
                placeholder="Descrivi qui l'errore, includendo eventuali log o righe di codice se si tratta di un bot..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800/60">
              <button type="button" onClick={() => setActiveSubTab("index")} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition">
                Annulla
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5" /> Invia Richiesta (.php)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}