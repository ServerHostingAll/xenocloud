"use client";
import { useState } from "react";
import { CreditCard, Send, ShieldAlert, Tag, Bell, ArrowLeft } from "lucide-react";

export default function AdminPanel() {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(25);
  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(`Coupon ${couponCode} creato con successo sconti del ${discount}%!`);
      setLoading(false);
      setCouponCode("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-600/20">
              <ShieldAlert className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Admin Management</h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">XenoCloud Secure Backend</p>
            </div>
          </div>
          <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:opacity-80 rounded-xl text-xs font-bold transition text-slate-900 dark:text-white">
            <ArrowLeft className="h-4 w-4" /> Exit Admin
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-xs font-bold">
          {/* Coupon Generator */}
          <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl">
            <h2 className="text-slate-900 dark:text-white text-lg font-black mb-6 flex items-center gap-3">
              <Tag className="h-5 w-5 text-blue-500" /> Coupon Generator (5% - 100%)
            </h2>
            <form onSubmit={handleCreateCoupon} className="space-y-6">
              <div>
                <label className="block text-slate-400 mb-2">Coupon Code (Uppercase)</label>
                <input type="text" required value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white font-mono text-base" placeholder="XENO100" />
              </div>
              <div>
                <label className="block text-slate-400 mb-2">Discount Percentage: <span className="text-blue-500">{discount}%</span></label>
                <input type="range" min="5" max="100" step="5" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                <div className="flex justify-between mt-2 text-[10px] text-slate-600"><span>5% (Starter)</span><span>100% (FREE)</span></div>
              </div>
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-lg transition flex items-center justify-center gap-2">
                <CreditCard className="h-4 w-4" /> {loading ? "Creating..." : "Save Coupon to Database"}
              </button>
            </form>
          </div>

          {/* Announcements Manager */}
          <div className="bg-white dark:bg-[#0F1422] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl">
            <h2 className="text-slate-900 dark:text-white text-lg font-black mb-6 flex items-center gap-3">
              <Bell className="h-5 w-5 text-amber-500" /> Global Announcements
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 mb-2">Announcement Message</label>
                <textarea rows={4} value={announcement} onChange={(e) => setAnnouncement(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white" placeholder="Nuovi nodi Ryzen disponibili!..." />
              </div>
              <button type="button" className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl shadow-lg transition flex items-center justify-center gap-2">
                <Send className="h-4 w-4" /> Publish Globally
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}