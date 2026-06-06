"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHome from "@/components/SectionHome";
import SectionAbout from "@/components/SectionAbout";
import SectionServices from "@/components/SectionServices";
import SectionBilling from "@/components/SectionBilling";

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedOrder, setSelectedOrder] = useState<{ name: string; price: string } | null>(null);

  const handleOrderRedirect = (name: string, price: string) => {
    setSelectedOrder({ name, price });
    setActiveTab("billing");
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="transition-all duration-300">
          {activeTab === "home" && (
            <SectionHome changeTab={setActiveTab} />
          )}
          
          {activeTab === "about" && (
            <SectionAbout />
          )}
          
          {activeTab === "services" && (
            <SectionServices onOrder={handleOrderRedirect} />
          )}
          
          {activeTab === "billing" && (
            <SectionBilling 
              initialOrder={selectedOrder} 
              clearOrder={() => setSelectedOrder(null)} 
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}