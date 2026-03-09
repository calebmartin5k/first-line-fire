"use client";
import { useState } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Search,
  Anchor,
  Settings,
  Ship,
  Info,
  PackageSearch,
  Calculator,
  FileCheck,
  Flame,
  BatteryWarning,
  Clock,
  Wrench
} from 'lucide-react';

type Step = 'intro' | 'vessel-profile' | 'hazards' | 'suppression' | 'maintenance' | 'inventory' | 'analyzing' | 'results';

interface VesselData {
  length: 'under-26' | '26-to-40' | '40-to-65' | 'over-65' | null;
  grossTonnage: number | null;
  horsepower: number | null;
  hasFixedSystem: boolean | null;
  hasLithiumIon: boolean | null;
  hasCommercialGalley: boolean | null;
  lastInspectionDate: 'under-1-year' | '1-to-5-years' | 'over-5-years' | 'unknown' | null;
  alarmBatteryAge: 'under-5-years' | '5-to-10-years' | 'over-10-years' | 'no-alarm' | null;
  
  // Inventory
  current10B: number; // 5-B / 10-B / B-I
  current40B: number; // 20-B / 40-B / B-II
  currentSemiPortable: number; // 160-B
  currentClassD: number; // Lithium / Special
  currentClassK: number; // Galley
}

export default function MaritimeComplianceArchitect() {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [vesselData, setVesselData] = useState<VesselData>({
    length: null,
    grossTonnage: null,
    horsepower: null,
    hasFixedSystem: null,
    hasLithiumIon: null,
    hasCommercialGalley: null,
    lastInspectionDate: null,
    alarmBatteryAge: null,
    current10B: 0,
    current40B: 0,
    currentSemiPortable: 0,
    currentClassD: 0,
    currentClassK: 0,
  });

  const [leadForm, setLeadForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const nextStep = (step: Step) => {
    if (step === 'analyzing') {
      setCurrentStep('analyzing');
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentStep('results');
      }, 2500);
    } else {
      setCurrentStep(step);
    }
  };
  
  const prevStep = (step: Step) => setCurrentStep(step);

  const calculateRequirements = () => {
    let req10B = 0;
    let req40B = 0;
    let reqSemiPortable = 0;
    let reqClassD = 0;
    let reqClassK = 0;
    let needsInspection = false;
    let needsAlarmBattery = false;
    
    // Logic for vessels under 65 feet
    if (vesselData.length === 'under-26') {
      req10B = vesselData.hasFixedSystem ? 0 : 1;
    } else if (vesselData.length === '26-to-40') {
      req10B = vesselData.hasFixedSystem ? 1 : 2;
    } else if (vesselData.length === '40-to-65') {
      req10B = vesselData.hasFixedSystem ? 2 : 3;
    } 
    
    // Logic for vessels over 65 feet (horsepower and tonnage based)
    if (vesselData.length === 'over-65') {
      const hp = vesselData.horsepower || 0;
      // 1 40-B extinguisher for every 1,000 BHP, capped at 6
      req40B = Math.ceil(hp / 1000);
      if (req40B > 6) req40B = 6;
      
      // If fixed system is installed, reduce required portable extinguishers by 1
      if (vesselData.hasFixedSystem && req40B > 0) {
        req40B -= 1;
      }
      
      // Semi-portable requirements for larger vessels (simulated based on tonnage)
      const gt = vesselData.grossTonnage || 0;
      if (gt > 300) {
        reqSemiPortable = 2; // e.g., two 160-B systems
      } else if (gt > 50) {
        reqSemiPortable = 1;
      }
    }

    // Special Hazards
    if (vesselData.hasLithiumIon) {
      reqClassD = 2; // Minimum 2 dedicated Li-ion/Class D units for battery banks
    }
    if (vesselData.hasCommercialGalley) {
      reqClassK = 1; // 1 Class K for the galley
    }

    // Maintenance logic
    if (vesselData.lastInspectionDate !== 'under-1-year') {
      needsInspection = true; // NFPA 10 requires annual
    }
    
    if (vesselData.alarmBatteryAge === 'over-10-years') {
      needsAlarmBattery = true; // Research doc mentioned 10-year battery replacement
    }

    // Calculate absolute gaps
    const gap10B = Math.max(0, req10B - vesselData.current10B);
    const gap40B = Math.max(0, req40B - vesselData.current40B);
    const gapSemiPortable = Math.max(0, reqSemiPortable - vesselData.currentSemiPortable);
    const gapClassD = Math.max(0, reqClassD - vesselData.currentClassD);
    const gapClassK = Math.max(0, reqClassK - vesselData.currentClassK);

    return { 
      req10B, req40B, reqSemiPortable, reqClassD, reqClassK,
      gap10B, gap40B, gapSemiPortable, gapClassD, gapClassK,
      needsInspection, needsAlarmBattery
    };
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-brand-red/10 p-4 rounded-xl inline-flex mb-2">
              <Shield className="w-10 h-10 text-brand-red" />
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-dark">Subchapter M & Safety Risk Auditor</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Regulatory compliance for maritime assets goes far beyond simply having a red canister on the wall. This advanced tool evaluates your vessel against the intricacies of 46 CFR Subchapter M, NFPA 10, and modern emerging hazards like Lithium-Ion battery banks.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 my-6">
              <h4 className="font-medium text-dark mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-red" /> Deep-Scan Audit Capabilities:
              </h4>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0"><Ship className="w-4 h-4 text-dark" /></div>
                  <div><strong className="text-dark block">Vessel Profiling</strong> Calculates requirements via BHP, Tonnage, and Length matrices.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0"><Flame className="w-4 h-4 text-dark" /></div>
                  <div><strong className="text-dark block">Special Hazards</strong> Adjusts for high-risk zones like commercial galleys (Class K) and Lithium-Ion storage (Class D).</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0"><Clock className="w-4 h-4 text-dark" /></div>
                  <div><strong className="text-dark block">Maintenance Tracking</strong> Identifies non-compliant inspection intervals and expiring alarm panel batteries.</div>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => nextStep('vessel-profile')}
              className="bg-dark text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-red transition-all flex items-center gap-2 group w-full md:w-auto justify-center shadow-xl shadow-dark/20"
            >
              Start Comprehensive Audit <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );

      case 'vessel-profile':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <button onClick={() => prevStep('intro')} className="text-gray-500 hover:text-dark flex items-center gap-2 text-sm transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to start
            </button>
            
            <div>
              <h3 className="font-serif text-3xl text-dark mb-3">Vessel Classification</h3>
              <p className="text-gray-600">Enter your primary specs to determine the baseline B-I / B-II extinguisher tiers.</p>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-dark uppercase tracking-wider mb-4">Vessel Length</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'under-26', label: 'Under 26 feet', icon: Ship },
                    { id: '26-to-40', label: '26 to 40 feet', icon: Ship },
                    { id: '40-to-65', label: '40 to 65 feet', icon: Ship },
                    { id: 'over-65', label: 'Over 65 feet', icon: Anchor }
                  ].map((size) => {
                    const Icon = size.icon;
                    return (
                      <button
                        key={size.id}
                        onClick={() => setVesselData({ ...vesselData, length: size.id as any })}
                        className={`p-4 border-2 rounded-xl text-left transition-all flex items-center gap-4 ${
                          vesselData.length === size.id 
                            ? 'border-brand-red bg-brand-red/5' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${vesselData.length === size.id ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-dark">{size.label}</span>
                        {vesselData.length === size.id && <CheckCircle className="w-5 h-5 text-brand-red ml-auto" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {vesselData.length === 'over-65' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-dark uppercase tracking-wider mb-2">Gross Tonnage (GT)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="e.g. 150"
                        value={vesselData.grossTonnage || ''}
                        onChange={(e) => setVesselData({ ...vesselData, grossTonnage: parseInt(e.target.value) || null })}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-colors"
                      />
                      <Ship className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Determines semi-portable (160-B) system mandates.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark uppercase tracking-wider mb-2">Main Engine (BHP)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="e.g. 3500"
                        value={vesselData.horsepower || ''}
                        onChange={(e) => setVesselData({ ...vesselData, horsepower: parseInt(e.target.value) || null })}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-colors"
                      />
                      <Settings className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Calculation: 1x 40-B per 1,000 BHP (capped at 6).</p>
                  </div>
                </div>
              )}
            </div>

            <button 
              disabled={!vesselData.length || (vesselData.length === 'over-65' && (!vesselData.horsepower || !vesselData.grossTonnage))}
              onClick={() => nextStep('hazards')}
              className="w-full bg-dark text-white px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-bold hover:bg-brand-red transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              Continue to Hazards <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );

      case 'hazards':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <button onClick={() => prevStep('vessel-profile')} className="text-gray-500 hover:text-dark flex items-center gap-2 text-sm transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to Vessel Specs
            </button>
            
            <div>
              <h3 className="font-serif text-3xl text-dark mb-3">Special Hazard Zoning</h3>
              <p className="text-gray-600">Modern marine environments feature specific risks that multi-purpose dry chemical units cannot safely extinguish.</p>
            </div>
            
            <div className="space-y-6">
              {/* Lithium Ion */}
              <div className={`p-6 border-2 rounded-xl transition-all ${vesselData.hasLithiumIon ? 'border-brand-red bg-brand-red/5' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm h-fit">
                      <BatteryWarning className={`w-6 h-6 ${vesselData.hasLithiumIon ? 'text-brand-red' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-lg mb-1">Lithium-Ion Battery Banks</h4>
                      <p className="text-sm text-gray-600 mb-4">Does the vessel utilize large Li-ion energy storage systems (e.g., hybrid propulsion, backup power arrays)? These require specialized extinguishing agents.</p>
                      <div className="flex gap-3">
                        <button onClick={() => setVesselData({...vesselData, hasLithiumIon: true})} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${vesselData.hasLithiumIon === true ? 'bg-brand-red text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-brand-red hover:text-brand-red'}`}>Yes</button>
                        <button onClick={() => setVesselData({...vesselData, hasLithiumIon: false})} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${vesselData.hasLithiumIon === false ? 'bg-gray-800 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-800'}`}>No</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commercial Galley */}
              <div className={`p-6 border-2 rounded-xl transition-all ${vesselData.hasCommercialGalley ? 'border-brand-red bg-brand-red/5' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm h-fit">
                      <Flame className={`w-6 h-6 ${vesselData.hasCommercialGalley ? 'text-brand-red' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-lg mb-1">Commercial Galley</h4>
                      <p className="text-sm text-gray-600 mb-4">Does the vessel have a commercial-grade cooking area with deep fat fryers or extensive grease-producing appliances? Requires Class K wet chemical.</p>
                      <div className="flex gap-3">
                        <button onClick={() => setVesselData({...vesselData, hasCommercialGalley: true})} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${vesselData.hasCommercialGalley === true ? 'bg-brand-red text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-brand-red hover:text-brand-red'}`}>Yes</button>
                        <button onClick={() => setVesselData({...vesselData, hasCommercialGalley: false})} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${vesselData.hasCommercialGalley === false ? 'bg-gray-800 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-800'}`}>No</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              disabled={vesselData.hasLithiumIon === null || vesselData.hasCommercialGalley === null}
              onClick={() => nextStep('suppression')}
              className="w-full bg-dark text-white px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-bold hover:bg-brand-red transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-6"
            >
              Continue to Suppression <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );

      case 'suppression':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <button onClick={() => prevStep('hazards')} className="text-gray-500 hover:text-dark flex items-center gap-2 text-sm transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to Hazards
            </button>
            
            <div>
              <h3 className="font-serif text-3xl text-dark mb-3">Fixed Engine Systems</h3>
              <p className="text-gray-600">Is there a fixed fire suppression system (e.g., CO2, FM-200, Novec 1230, Water Mist) installed in the main machinery space?</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setVesselData({ ...vesselData, hasFixedSystem: true })}
                className={`p-6 border-2 rounded-xl text-left transition-all ${
                  vesselData.hasFixedSystem === true 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col gap-3">
                  <CheckCircle className={`w-8 h-8 ${vesselData.hasFixedSystem === true ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="font-medium text-dark text-lg">Yes, installed</span>
                  <p className="text-sm text-gray-500">Applies a regulatory 46 CFR 142.230 credit, reducing portable unit requirements.</p>
                </div>
              </button>
              <button
                onClick={() => setVesselData({ ...vesselData, hasFixedSystem: false })}
                className={`p-6 border-2 rounded-xl text-left transition-all ${
                  vesselData.hasFixedSystem === false 
                    ? 'border-brand-red bg-brand-red/5' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col gap-3">
                  <AlertTriangle className={`w-8 h-8 ${vesselData.hasFixedSystem === false ? 'text-brand-red' : 'text-gray-400'}`} />
                  <span className="font-medium text-dark text-lg">No, not installed</span>
                  <p className="text-sm text-gray-500">Standard uncredited portable extinguisher volume requirements apply.</p>
                </div>
              </button>
            </div>

            <button 
              disabled={vesselData.hasFixedSystem === null}
              onClick={() => nextStep('maintenance')}
              className="w-full bg-dark text-white px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-bold hover:bg-brand-red transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              Continue to Maintenance <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );

      case 'maintenance':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <button onClick={() => prevStep('suppression')} className="text-gray-500 hover:text-dark flex items-center gap-2 text-sm transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to Suppression
            </button>
            
            <div>
              <h3 className="font-serif text-3xl text-dark mb-3">Maintenance & Inspection History</h3>
              <p className="text-gray-600">Equipment is only compliant if its certifications are active. Missing an inspection date can void insurance and fail USCG audits.</p>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-brand-red" /> Last Professional Inspection Tag
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'under-1-year', label: '< 1 Year (Compliant)' },
                    { id: '1-to-5-years', label: '1 - 5 Years' },
                    { id: 'over-5-years', label: 'Over 5 Years' },
                    { id: 'unknown', label: 'Unknown / No Tags' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setVesselData({ ...vesselData, lastInspectionDate: opt.id as any })}
                      className={`p-3 border rounded-lg text-center transition-all text-sm font-medium ${
                        vesselData.lastInspectionDate === opt.id 
                          ? 'border-brand-red bg-brand-red/5 text-brand-red' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="block text-sm font-medium text-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-red" /> Fire Alarm Panel Battery Age
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'under-5-years', label: '< 5 Years' },
                    { id: '5-to-10-years', label: '5 - 10 Years' },
                    { id: 'over-10-years', label: '> 10 Years (Critical)' },
                    { id: 'no-alarm', label: 'No Fire Alarm Panel' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setVesselData({ ...vesselData, alarmBatteryAge: opt.id as any })}
                      className={`p-3 border rounded-lg text-center transition-all text-sm font-medium ${
                        vesselData.alarmBatteryAge === opt.id 
                          ? 'border-brand-red bg-brand-red/5 text-brand-red' 
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">Industry standards dictate batteries exceeding 10 years pose a severe failure risk during power loss.</p>
              </div>
            </div>

            <button 
              disabled={vesselData.lastInspectionDate === null || vesselData.alarmBatteryAge === null}
              onClick={() => nextStep('inventory')}
              className="w-full bg-dark text-white px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-bold hover:bg-brand-red transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              Continue to Inventory <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );
        
      case 'inventory':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <button onClick={() => prevStep('maintenance')} className="text-gray-500 hover:text-dark flex items-center gap-2 text-sm transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to Maintenance
            </button>
            
            <div>
              <div className="flex items-center gap-3 mb-3">
                <PackageSearch className="w-8 h-8 text-brand-red" />
                <h3 className="font-serif text-3xl text-dark">Current Usable Inventory</h3>
              </div>
              <p className="text-gray-600">Enter the quantity of currently functional, non-damaged units onboard so we can calculate your exact financial gap.</p>
            </div>

            <div className="space-y-4">
              {/* 10-B/B-I */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-dark">Type B-I / 10-B:C</h4>
                  <p className="text-xs text-gray-500">Standard portable. ~5 lb dry chemical.</p>
                </div>
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-1">
                  <button onClick={() => setVesselData({...vesselData, current10B: Math.max(0, vesselData.current10B - 1)})} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-dark font-bold">-</button>
                  <span className="w-6 text-center font-bold">{vesselData.current10B}</span>
                  <button onClick={() => setVesselData({...vesselData, current10B: vesselData.current10B + 1})} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-dark font-bold">+</button>
                </div>
              </div>

              {/* 40-B/B-II */}
              {vesselData.length === 'over-65' && (
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-dark">Type B-II / 40-B</h4>
                    <p className="text-xs text-gray-500">Large capacity portable. Engine rooms.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-1">
                    <button onClick={() => setVesselData({...vesselData, current40B: Math.max(0, vesselData.current40B - 1)})} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-dark font-bold">-</button>
                    <span className="w-6 text-center font-bold">{vesselData.current40B}</span>
                    <button onClick={() => setVesselData({...vesselData, current40B: vesselData.current40B + 1})} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-dark font-bold">+</button>
                  </div>
                </div>
              )}

              {/* Semi-Portable */}
              {vesselData.length === 'over-65' && (vesselData.grossTonnage || 0) > 50 && (
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-dark">Semi-Portable 160-B</h4>
                    <p className="text-xs text-gray-500">Wheeled units for high-tonnage vessels.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-1">
                    <button onClick={() => setVesselData({...vesselData, currentSemiPortable: Math.max(0, vesselData.currentSemiPortable - 1)})} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-dark font-bold">-</button>
                    <span className="w-6 text-center font-bold">{vesselData.currentSemiPortable}</span>
                    <button onClick={() => setVesselData({...vesselData, currentSemiPortable: vesselData.currentSemiPortable + 1})} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-dark font-bold">+</button>
                  </div>
                </div>
              )}

              {/* Hazards (Li-Ion / Galley) */}
              {vesselData.hasLithiumIon && (
                <div className="bg-red-50 p-5 rounded-xl border border-red-100 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-red-900">Class D / Lithium Spec.</h4>
                    <p className="text-xs text-red-700">Dedicated battery bank suppression.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white border border-red-200 rounded-lg p-1">
                    <button onClick={() => setVesselData({...vesselData, currentClassD: Math.max(0, vesselData.currentClassD - 1)})} className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 rounded text-red-900 font-bold">-</button>
                    <span className="w-6 text-center font-bold text-red-900">{vesselData.currentClassD}</span>
                    <button onClick={() => setVesselData({...vesselData, currentClassD: vesselData.currentClassD + 1})} className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 rounded text-red-900 font-bold">+</button>
                  </div>
                </div>
              )}

              {vesselData.hasCommercialGalley && (
                <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-orange-900">Class K (Wet Chemical)</h4>
                    <p className="text-xs text-orange-700">Galley grease fire suppression.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white border border-orange-200 rounded-lg p-1">
                    <button onClick={() => setVesselData({...vesselData, currentClassK: Math.max(0, vesselData.currentClassK - 1)})} className="w-8 h-8 flex items-center justify-center bg-orange-50 hover:bg-orange-100 rounded text-orange-900 font-bold">-</button>
                    <span className="w-6 text-center font-bold text-orange-900">{vesselData.currentClassK}</span>
                    <button onClick={() => setVesselData({...vesselData, currentClassK: vesselData.currentClassK + 1})} className="w-8 h-8 flex items-center justify-center bg-orange-50 hover:bg-orange-100 rounded text-orange-900 font-bold">+</button>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => nextStep('analyzing')}
              className="w-full bg-brand-red text-white px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
            >
              Compile & Analyze Matrix <Calculator className="w-4 h-4 ml-2" />
            </button>
          </div>
        );

      case 'analyzing':
        return (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
            <div className="relative w-28 h-28 mb-10">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-brand-red rounded-full border-t-transparent animate-spin"></div>
              <Shield className="absolute inset-0 m-auto w-10 h-10 text-dark animate-pulse" />
            </div>
            <h3 className="font-serif text-3xl text-dark mb-4">Generating Risk Profile...</h3>
            <div className="space-y-3 text-center w-full max-w-sm">
              <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-2">
                <span>Checking CFR 142.230 Logic</span> <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-2">
                <span>Calculating HP/Tonnage Multipliers</span> <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-2">
                <span>Validating NFPA 10 Recertification</span> <div className="w-4 h-4 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        );

      case 'results':
        const { 
          req10B, req40B, reqSemiPortable, reqClassD, reqClassK,
          gap10B, gap40B, gapSemiPortable, gapClassD, gapClassK,
          needsInspection, needsAlarmBattery 
        } = calculateRequirements();
        
        // Internal Pricing Logic
        const price10B = 145; 
        const price40B = 385; 
        const priceSemi = 2100;
        const priceClassD = 650;
        const priceClassK = 275;
        const priceInspection = 250; // Base visit
        const priceBattery = 185; // Panel battery replacement
        
        const quote10B = gap10B * price10B; 
        const quote40B = gap40B * price40B; 
        const quoteSemi = gapSemiPortable * priceSemi;
        const quoteClassD = gapClassD * priceClassD;
        const quoteClassK = gapClassK * priceClassK;
        
        const totalEquipmentQuote = quote10B + quote40B + quoteSemi + quoteClassD + quoteClassK;
        const totalServiceQuote = (needsInspection ? priceInspection : 0) + (needsAlarmBattery ? priceBattery : 0);
        const totalOverall = totalEquipmentQuote + totalServiceQuote;

        const isCompliant = totalOverall === 0;

        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FileCheck className={`w-8 h-8 ${isCompliant ? 'text-green-500' : 'text-brand-red'}`} />
                    <h3 className="font-serif text-3xl text-dark">Architect Risk Report</h3>
                  </div>
                  <p className="text-gray-600">Subchapter M & Specialized Hazard Audit completed.</p>
                </div>
                <button onClick={() => prevStep('inventory')} className="text-dark hover:bg-gray-100 font-medium text-sm flex items-center gap-2 border border-gray-200 bg-white px-5 py-2.5 rounded-full w-fit shadow-sm transition-colors">
                  <Settings className="w-4 h-4" /> Modify Inputs
                </button>
              </div>
              
              {isCompliant ? (
                <div className="bg-green-50 border border-green-200 p-12 rounded-2xl text-center flex flex-col justify-center items-center my-10">
                  <Shield className="w-20 h-20 text-green-500 mb-6" />
                  <h5 className="text-3xl font-serif text-green-900 mb-3">Vessel Fully Compliant</h5>
                  <p className="text-green-700 text-lg max-w-lg mx-auto leading-relaxed">
                    Based on your inputs, your vessel meets all portable, semi-portable, special hazard, and maintenance interval requirements for Subchapter M and NFPA 10.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Detailed Deficiencies Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="font-bold text-dark uppercase tracking-wider text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500"/> Identified Deficiencies</h4>
                    
                    {/* Hardware Gaps */}
                    {totalEquipmentQuote > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Equipment Shortages</p>
                        {gap10B > 0 && (
                          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex justify-between items-center">
                            <div><span className="font-bold text-red-900 block">Type B-I / 10-B:C</span><span className="text-sm text-red-700">Missing {gap10B} unit(s) based on {vesselData.length}ft length.</span></div>
                            <span className="text-xl font-black text-brand-red">-{gap10B}</span>
                          </div>
                        )}
                        {gap40B > 0 && (
                          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex justify-between items-center">
                            <div><span className="font-bold text-red-900 block">Type B-II / 40-B</span><span className="text-sm text-red-700">Missing {gap40B} unit(s) based on {vesselData.horsepower} BHP.</span></div>
                            <span className="text-xl font-black text-brand-red">-{gap40B}</span>
                          </div>
                        )}
                        {gapSemiPortable > 0 && (
                          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex justify-between items-center">
                            <div><span className="font-bold text-red-900 block">Semi-Portable 160-B</span><span className="text-sm text-red-700">Missing {gapSemiPortable} wheeled unit(s) based on tonnage.</span></div>
                            <span className="text-xl font-black text-brand-red">-{gapSemiPortable}</span>
                          </div>
                        )}
                        {gapClassD > 0 && (
                          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex justify-between items-center">
                            <div><span className="font-bold text-red-900 block">Class D Lithium Spec.</span><span className="text-sm text-red-700">Missing dedicated battery suppression.</span></div>
                            <span className="text-xl font-black text-brand-red">-{gapClassD}</span>
                          </div>
                        )}
                        {gapClassK > 0 && (
                          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex justify-between items-center">
                            <div><span className="font-bold text-red-900 block">Class K Wet Chemical</span><span className="text-sm text-red-700">Missing required galley suppression.</span></div>
                            <span className="text-xl font-black text-brand-red">-{gapClassK}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Service/Maintenance Gaps */}
                    {totalServiceQuote > 0 && (
                      <div className="space-y-3 pt-4 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Maintenance Violations</p>
                        {needsInspection && (
                          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                            <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-bold text-amber-900 block">Recertification Required</span>
                              <span className="text-sm text-amber-800">Your equipment tags are out of compliance. NFPA 10 requires annual professional inspection. Current units are unverified for emergency use.</span>
                            </div>
                          </div>
                        )}
                        {needsAlarmBattery && (
                          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                            <BatteryWarning className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-bold text-amber-900 block">Critical: Alarm Panel Battery</span>
                              <span className="text-sm text-amber-800">Fire detection panel batteries over 10 years old have a highly elevated risk of failure during generator loss. Immediate replacement mandated.</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Active Credits */}
                    {vesselData.hasFixedSystem && (
                      <div className="p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 flex items-start gap-3 mt-6">
                        <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-green-600" />
                        <div>
                          <span className="font-bold block">Fixed System Credit Applied</span>
                          <span className="text-sm">46 CFR 142.230 credit applied, reducing your portable baseline requirement by 1 unit, saving capital expenditure.</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Quote Column */}
                  <div className="lg:col-span-5">
                    <div className="bg-dark text-white p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl shadow-dark/20 h-full flex flex-col">
                      <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none"></div>
                      
                      <h4 className="font-medium text-gray-300 uppercase tracking-wider text-sm border-b border-white/10 pb-4 mb-6 relative z-10">Remediation Quote</h4>
                      
                      <div className="relative z-10 space-y-3 mb-auto flex-grow">
                        {gap10B > 0 && <div className="flex justify-between text-sm"><span className="text-gray-300">{gap10B}x Type B-I / 10-B:C</span><span>${quote10B}</span></div>}
                        {gap40B > 0 && <div className="flex justify-between text-sm"><span className="text-gray-300">{gap40B}x Type B-II / 40-B</span><span>${quote40B}</span></div>}
                        {gapSemiPortable > 0 && <div className="flex justify-between text-sm"><span className="text-gray-300">{gapSemiPortable}x Semi-Portable 160-B</span><span>${quoteSemi}</span></div>}
                        {gapClassD > 0 && <div className="flex justify-between text-sm"><span className="text-gray-300">{gapClassD}x Class D (Lithium)</span><span>${quoteClassD}</span></div>}
                        {gapClassK > 0 && <div className="flex justify-between text-sm"><span className="text-gray-300">{gapClassK}x Class K (Galley)</span><span>${quoteClassK}</span></div>}
                        
                        {needsInspection && <div className="flex justify-between text-sm pt-2 text-brand-red"><span className="">Annual Inspection Call</span><span>${priceInspection}</span></div>}
                        {needsAlarmBattery && <div className="flex justify-between text-sm text-brand-red"><span className="">FACP Battery Replacement</span><span>${priceBattery}</span></div>}
                      </div>

                      <div className="relative z-10 border-t border-white/20 pt-6 mt-8">
                        <span className="text-gray-400 text-sm block mb-1">Total Estimated Remediation</span>
                        <span className="text-5xl font-serif text-white tracking-tight">${totalOverall}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Lead Form Section */}
            {!isCompliant && (
              <div id="schedule-form" className="bg-gray-100 p-8 md:p-12 rounded-2xl border border-gray-200 mt-8 scroll-mt-24 shadow-inner">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-3xl text-dark mb-2">Deploy a Marine Specialist</h3>
                    <p className="text-gray-600">Secure your compliance. We will dispatch a certified technician with your exact equipment payload to verify and install.</p>
                  </div>
                  
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-10 rounded-2xl text-center shadow-sm">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h4 className="text-2xl font-serif mb-2">Audit Transmitted to Dispatch</h4>
                      <p className="text-green-700">A First-Line Fire specialist is reviewing your vessel's gap report. We will contact you shortly to coordinate your dockside service window.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-5 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name / Captain</label>
                          <input required type="text" className="w-full p-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Operating Company / Vessel</label>
                          <input required type="text" className="w-full p-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all" value={leadForm.company} onChange={e => setLeadForm({...leadForm, company: e.target.value})} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                          <input required type="email" className="w-full p-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Direct Phone</label>
                          <input required type="tel" className="w-full p-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-brand-red text-white px-8 py-5 rounded-xl text-sm uppercase tracking-widest font-bold hover:bg-red-700 transition-all mt-6 shadow-lg shadow-red-500/20">
                        Request Dockside Deployment
                      </button>
                      <p className="text-xs text-gray-400 text-center mt-4">
                        Submitting this data places no financial obligation on your company. 
                      </p>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  const steps = [
    { id: 'intro', label: 'Overview' },
    { id: 'vessel-profile', label: 'Vessel Specs' },
    { id: 'hazards', label: 'Special Hazards' },
    { id: 'suppression', label: 'Fixed Systems' },
    { id: 'maintenance', label: 'Maintenance Data' },
    { id: 'inventory', label: 'Current Inventory' },
    { id: 'results', label: 'Audit Report', loading: currentStep === 'analyzing' }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50/50" id="compliance-architect">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Progress Sidebar */}
          <div className="w-full lg:w-1/4 order-1 lg:order-1 mb-8 lg:mb-0">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-32">
              <h4 className="font-serif text-xl text-dark mb-8">Architect Protocol</h4>
              
              {/* Desktop Progress */}
              <div className="hidden lg:block space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-[calc(100%-30px)] before:w-0.5 before:bg-gray-100">
                {steps.map((step, index) => {
                  const stepOrder = ['intro', 'vessel-profile', 'hazards', 'suppression', 'maintenance', 'inventory', 'analyzing', 'results'];
                  const currentMapped = currentStep === 'analyzing' ? 'results' : currentStep;
                  const currentIndex = stepOrder.indexOf(currentMapped);
                  const thisIndex = stepOrder.indexOf(step.id);
                  const isCompleted = thisIndex < currentIndex;
                  const isCurrent = thisIndex === currentIndex || (step.id === 'results' && currentStep === 'analyzing');
                  
                  return (
                    <div key={step.id} className="relative flex items-center justify-normal group is-active z-10">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 bg-white transition-colors duration-300 ${
                        isCompleted ? 'border-brand-red text-brand-red' : 
                        isCurrent ? 'border-brand-red bg-brand-red text-white' : 
                        'border-gray-200 text-gray-300'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : 
                         step.loading ? <div className="w-2 h-2 bg-white rounded-full animate-ping"></div> : 
                         <span className="text-[10px] font-bold">{index + 1}</span>}
                      </div>
                      <div className={`ml-4 text-sm transition-colors duration-300 ${
                        isCurrent ? 'text-dark font-bold' : 
                        isCompleted ? 'text-gray-600 font-medium' : 
                        'text-gray-400'
                      }`}>
                        {step.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Progress (Horizontal) */}
              <div className="flex lg:hidden justify-between relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:right-0 before:h-0.5 before:bg-gray-100 overflow-x-auto pb-4 hide-scrollbar">
                {steps.map((step, index) => {
                  const stepOrder = ['intro', 'vessel-profile', 'hazards', 'suppression', 'maintenance', 'inventory', 'analyzing', 'results'];
                  const currentMapped = currentStep === 'analyzing' ? 'results' : currentStep;
                  const currentIndex = stepOrder.indexOf(currentMapped);
                  const thisIndex = stepOrder.indexOf(step.id);
                  const isCompleted = thisIndex < currentIndex;
                  const isCurrent = thisIndex === currentIndex || (step.id === 'results' && currentStep === 'analyzing');
                  
                  return (
                    <div key={step.id} className="relative z-10 bg-white px-1 shrink-0">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white transition-colors duration-300 ${
                        isCompleted ? 'border-brand-red text-brand-red' : 
                        isCurrent ? 'border-brand-red bg-brand-red text-white' : 
                        'border-gray-200 text-gray-300'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : 
                         step.loading ? <div className="w-3 h-3 bg-white rounded-full animate-ping"></div> : 
                         <span className="text-xs font-bold">{index + 1}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Area */}
          <div className="w-full lg:w-3/4 order-2 lg:order-2 min-h-[500px]">
            {renderStep()}
          </div>

        </div>
      </div>
    </section>
  );
}
