"use client";
import { Server, LayoutDashboard } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "Chi Siamo" },
    { id: "services", label: "Servizi" },
    { id: "billing", label: "Billing / Area Clienti" }
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#060814]/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-600/30">
            <Server className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Xeno<span className="text-blue-500">Cloud</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab("billing")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-500/20"
          >
            <LayoutDashboard className="h-4 w-4" />
            Accedi Hub
          </button>
        </div>
      </div>
    </nav>
  );
}