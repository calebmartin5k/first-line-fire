"use client";
import { useState } from "react";
import { 
  Camera, 
  Mic, 
  FileText, 
  History, 
  AlertCircle, 
  CheckCircle,
  PackageX,
  PenTool,
  Send,
  Search,
  Plus
} from "lucide-react";

export default function SiteVisitTab() {
  const [activeSubTab, setActiveSubTab] = useState<"history" | "capture" | "quote">("capture");
  const [notes, setNotes] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [signed, setSigned] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setNotes((prev) => prev + (prev ? " " : "") + "Found two 10-pound ABC extinguishers in the main kitchen area with expired hydrostatic test dates from 2012. Both require immediate replacement.");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleGenerateQuote = () => {
    setShowQuote(true);
    setActiveSubTab("quote");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-24">
      
      {/* Client Context Header */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-red"></div>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-xl font-serif text-dark">Western KY Community College</h2>
            <p className="text-xs text-gray-500 mt-1">4810 Alben Barkley Dr, Paducah, KY</p>
          </div>
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold tracking-widest uppercase">
            Site Aware
          </span>
        </div>
        
        {/* Sub-Navigation */}
        <div className="flex gap-4 mt-4 border-b border-gray-100 pb-2">
          <button 
            onClick={() => setActiveSubTab("history")}
            className={`text-sm font-medium pb-2 -mb-2 border-b-2 transition-colors ${activeSubTab === "history" ? "border-brand-red text-brand-red" : "border-transparent text-gray-500 hover:text-gray-800"}`}
          >
            History & Assets
          </button>
          <button 
            onClick={() => setActiveSubTab("capture")}
            className={`text-sm font-medium pb-2 -mb-2 border-b-2 transition-colors ${activeSubTab === "capture" ? "border-brand-red text-brand-red" : "border-transparent text-gray-500 hover:text-gray-800"}`}
          >
            Capture
          </button>
          <button 
            onClick={() => setActiveSubTab("quote")}
            className={`text-sm font-medium pb-2 -mb-2 border-b-2 transition-colors ${activeSubTab === "quote" ? "border-brand-red text-brand-red" : "border-transparent text-gray-500 hover:text-gray-800"}`}
          >
            Quote Builder
          </button>
        </div>
      </div>

      {/* ----------------- TAB: HISTORY ----------------- */}
      {activeSubTab === "history" && (
        <div className="space-y-4 animate-in slide-in-from-left-2">
          
          {/* Hazard Alert based on Industry */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex gap-3 items-start shadow-sm">
            <AlertCircle className="text-brand-red shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-bold text-red-900">Industry Hazard Alert: Education/Tech</h4>
              <p className="text-xs text-red-800 mt-1">
                New lithium-ion storage units installed in engineering wing. Ensure Class D or specialized Li-Ion suppression equipment is present and quoted if missing.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-dark mb-3 text-sm flex items-center gap-2">
              <History size={16} className="text-gray-500" />
              Known Site Assets
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <div>
                  <p className="text-sm font-medium text-dark">Portable Extinguishers (ABC)</p>
                  <p className="text-xs text-gray-500">Last inspected: Jan 2025</p>
                </div>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">Qty: 42</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <div>
                  <p className="text-sm font-medium text-dark">Ansul Kitchen Hood System</p>
                  <p className="text-xs text-orange-500 font-medium">Due for semi-annual</p>
                </div>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">Qty: 1</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB: CAPTURE ----------------- */}
      {activeSubTab === "capture" && (
        <div className="space-y-4 animate-in slide-in-from-bottom-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Action Row */}
            <div className="grid grid-cols-2 divide-x border-b border-gray-100">
              <button className="p-4 flex flex-col items-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors">
                <Camera size={24} className="text-brand-red" />
                <span className="text-sm font-medium">Add Photo</span>
              </button>
              <button 
                onClick={toggleRecording}
                className={`p-4 flex flex-col items-center gap-2 transition-colors ${
                  isRecording ? "bg-red-50 text-brand-red" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Mic size={24} className={isRecording ? "animate-pulse text-brand-red" : "text-blue-500"} />
                <span className="text-sm font-medium">{isRecording ? "Listening..." : "Voice Notes"}</span>
              </button>
            </div>
            
            <div className="p-4 bg-gray-50/50">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  AI-Summarized Notes
                </label>
                {notes && (
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    AI Active
                  </span>
                )}
              </div>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red min-h-[120px] shadow-inner"
                placeholder="Record voice notes to let AI identify deficiencies and parts needed..."
              />
            </div>
          </div>

          <button 
            onClick={handleGenerateQuote}
            disabled={!notes}
            className={`w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              notes ? "bg-dark text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FileText size={16} /> 
            Generate Quote from Notes
          </button>
        </div>
      )}

      {/* ----------------- TAB: QUOTE ----------------- */}
      {activeSubTab === "quote" && (
        <div className="space-y-4 animate-in slide-in-from-right-2">
          
          {/* Price Book Search */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price Book Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search parts, services, or SKUs..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-red"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Quick Add Pills */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
              <button className="whitespace-nowrap flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium transition-colors">
                <Plus size={12} /> 6-Year Maint.
              </button>
              <button className="whitespace-nowrap flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium transition-colors">
                <Plus size={12} /> Hydro Test
              </button>
              <button className="whitespace-nowrap flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium transition-colors">
                <Plus size={12} /> 10lb ABC
              </button>
            </div>
          </div>

          {/* Current Quote */}
          {showQuote ? (
            <div className="bg-white p-5 rounded-xl shadow-sm border border-brand-red">
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                  <h4 className="font-bold text-dark">Deficiency Repair Quote</h4>
                  <p className="text-xs text-gray-500 mt-1">Generated via AI</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-dark">$315.00</span>
                  <span className="block text-xs text-green-600 font-medium">Est. Commission: $63.00</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm group">
                  <span className="text-gray-600">2x 10-lb Amerex ABC Extinguisher</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">$250.00</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm group">
                  <span className="text-gray-600">Disposal & Tagging Fee</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">$65.00</span>
                  </div>
                </div>
              </div>

              {/* Inventory Check Mock */}
              <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-xs flex gap-2 items-start mb-6 border border-yellow-200">
                <PackageX size={16} className="shrink-0 text-yellow-600" />
                <p>
                  <strong>Inventory Alert:</strong> Only 1 unit of "10-lb Amerex ABC" on your truck. 
                  System has auto-reserved 1 unit from the warehouse for pickup tomorrow.
                </p>
              </div>

              {/* Click to Sign */}
              {!signed ? (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSigned(true)}
                    className="flex-1 bg-brand-red text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-md"
                  >
                    <PenTool size={16} /> Hand to Client for Signature
                  </button>
                  <button className="px-4 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200">
                    <Send size={18} />
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg flex flex-col items-center text-center gap-2 border border-green-200">
                  <CheckCircle size={28} className="text-green-500" />
                  <div>
                    <p className="font-bold text-sm">Quote Approved & Signed!</p>
                    <p className="text-xs mt-1 text-green-600">Added to your commission hub. Follow-up task created automatically.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <FileText size={48} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">Use the Capture tab to build a quote via voice, or search the price book above.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
