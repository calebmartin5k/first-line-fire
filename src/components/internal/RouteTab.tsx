"use client";
import { useState } from "react";
import { Map, Clock, Navigation, CheckCircle2, Circle, GripVertical, Settings2, Truck, AlertCircle } from "lucide-react";

interface RouteTabProps {
  onSelectJob: () => void;
}

const initialJobs = [
  {
    id: 1,
    client: "Marquette Transportation Co.",
    address: "150 N 4th St, Paducah, KY",
    type: "Subchapter M Audit",
    time: "01:00 PM",
    status: "pending",
    distance: "4.1 mi",
    rawDistance: 4.1,
  },
  {
    id: 2,
    client: "Paducah River Port Authority",
    address: "1300 HC Mathis Dr, Paducah, KY",
    type: "Marine Fire Suppression Insp.",
    time: "08:00 AM",
    status: "completed",
    distance: "0.5 mi",
    rawDistance: 0.5,
  },
  {
    id: 3,
    client: "Western Kentucky Community College",
    address: "4810 Alben Barkley Dr, Paducah, KY",
    type: "Kitchen Hood System",
    time: "10:30 AM",
    status: "pending",
    distance: "3.2 mi",
    rawDistance: 3.2,
  }
];

export default function RouteTab({ onSelectJob }: RouteTabProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [isOptimized, setIsOptimized] = useState(false);

  const optimizeRoute = () => {
    if (!isOptimized) {
      // Sort by distance (completed items stay where they are or drop to bottom depending on logic, let's keep completed at top for today)
      const sorted = [...jobs].sort((a, b) => {
        if (a.status === "completed" && b.status !== "completed") return -1;
        if (b.status === "completed" && a.status !== "completed") return 1;
        return a.rawDistance - b.rawDistance;
      });
      setJobs(sorted);
      setIsOptimized(true);
    } else {
      setJobs(initialJobs);
      setIsOptimized(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-24">
      
      {/* Route Optimizer Header */}
      <div className="bg-dark text-white p-5 rounded-xl shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-serif">Daily Route</h2>
            <button 
              onClick={optimizeRoute}
              className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 font-medium transition-colors ${
                isOptimized ? "bg-green-500/20 text-green-400" : "bg-white text-dark hover:bg-gray-100"
              }`}
            >
              <Settings2 size={14} />
              {isOptimized ? "Optimized" : "Optimize"}
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-300 mt-4">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Est. Windshield Time: {isOptimized ? "35m" : "55m"}</span>
            </div>
            {isOptimized && (
              <div className="flex items-center gap-1 text-green-400 animate-in fade-in">
                <Navigation size={16} />
                <span>-20m saved</span>
              </div>
            )}
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
          <Map size={120} className="transform translate-x-4 translate-y-4" />
        </div>
      </div>

      {/* Truck Inventory Sync */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
          <h3 className="font-medium text-dark flex items-center gap-2">
            <Truck size={18} className="text-gray-500" />
            Truck Inventory Sync
          </h3>
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded font-bold">SYNCED 07:30 AM</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">10-lb Amerex ABC</span>
            <span className="font-medium text-dark">4 loaded</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subchapter M Logbooks</span>
            <span className="font-medium text-dark">2 loaded</span>
          </div>
          <div className="flex items-start gap-2 mt-2 bg-yellow-50 text-yellow-800 p-2 rounded text-xs border border-yellow-200">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <p><strong>Warning:</strong> You have 3 kitchen hood systems today, but only 1 Fusible Link in stock. Request parts from warehouse?</p>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-3">
        <h3 className="font-medium text-dark px-1">Scheduled Visits</h3>
        
        <div className="space-y-3">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all ${
                job.status === "completed" 
                  ? "bg-gray-50 border-gray-200 opacity-60" 
                  : "bg-white border-gray-200 shadow-sm hover:border-brand-red hover:shadow-md cursor-pointer"
              }`}
              onClick={() => job.status === "pending" ? onSelectJob() : null}
            >
              <div className="cursor-grab text-gray-300 hover:text-gray-500 shrink-0">
                <GripVertical size={20} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    {job.status === "completed" ? (
                      <CheckCircle2 className="text-green-500" size={16} />
                    ) : (
                      <Circle className="text-gray-300" size={16} />
                    )}
                    <span className="text-xs font-bold text-dark">{job.time}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                    {job.distance}
                  </span>
                </div>
                
                <h4 className="font-medium text-dark">{job.client}</h4>
                <p className="text-xs text-gray-500 mb-2 truncate">{job.address}</p>
                <div className="inline-block bg-red-50 text-brand-red text-xs px-2 py-0.5 rounded font-bold">
                  {job.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
