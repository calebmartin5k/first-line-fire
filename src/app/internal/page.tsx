"use client";
import { useState } from "react";
import DashboardTab from "../../components/internal/DashboardTab";
import RouteTab from "../../components/internal/RouteTab";
import SiteVisitTab from "../../components/internal/SiteVisitTab";
import { LayoutDashboard, MapPin, Wrench } from "lucide-react";

export default function InternalTool() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "route" | "site">("dashboard");

  return (
    <div className="bg-light min-h-screen font-sans pb-24 text-dark">
      {/* Header */}
      <header className="bg-dark text-white p-4 shadow-md sticky top-0 z-20 flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">Internal Hub</p>
          <h1 className="font-serif text-xl italic text-brand-red">Route Optimizer & Commission Hub</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-sm font-bold">
            JD
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-3xl mx-auto">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "route" && <RouteTab onSelectJob={() => setActiveTab("site")} />}
        {activeTab === "site" && <SiteVisitTab />}
      </main>

      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="flex justify-around items-center max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center p-4 w-full transition-colors ${
              activeTab === "dashboard" ? "text-brand-red border-t-2 border-brand-red bg-red-50" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <LayoutDashboard size={24} />
            <span className="text-xs mt-1 font-medium">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab("route")}
            className={`flex flex-col items-center p-4 w-full transition-colors ${
              activeTab === "route" ? "text-brand-red border-t-2 border-brand-red bg-red-50" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <MapPin size={24} />
            <span className="text-xs mt-1 font-medium">My Route</span>
          </button>

          <button
            onClick={() => setActiveTab("site")}
            className={`flex flex-col items-center p-4 w-full transition-colors ${
              activeTab === "site" ? "text-brand-red border-t-2 border-brand-red bg-red-50" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Wrench size={24} />
            <span className="text-xs mt-1 font-medium">Site Visit</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
