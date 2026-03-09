"use client";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { DollarSign, TrendingUp, AlertTriangle, Target, Award, Info } from 'lucide-react';

const weeklyData = [
  { name: 'Mon', comm: 120, base: 100 },
  { name: 'Tue', comm: 250, base: 100 },
  { name: 'Wed', comm: 180, base: 100 },
  { name: 'Thu', comm: 300, base: 100 },
  { name: 'Fri', comm: 450, base: 100 },
];

const conversionData = [
  { name: 'Week 1', rate: 45 },
  { name: 'Week 2', rate: 52 },
  { name: 'Week 3', rate: 60 },
  { name: 'Week 4', rate: 68 },
];

export default function DashboardTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      
      {/* Commission Transparency / Management Buffer */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-serif font-bold text-dark mb-4 border-b pb-2">Your Earnings</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center">
            <p className="text-sm text-gray-500 font-medium mb-1">Total This Week</p>
            <h2 className="text-3xl font-serif font-bold text-green-600">$1,300</h2>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-center">
            <p className="text-sm text-gray-500 font-medium mb-1">Monthly Goal Progress</p>
            <div className="flex items-end gap-2 mb-2">
              <h2 className="text-2xl font-serif font-bold text-dark">$4,200</h2>
              <span className="text-sm text-gray-500 mb-1">/ $5,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-brand-red h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Info size={16} className="text-blue-500" />
            <span className="text-sm font-bold text-blue-900">Commission Calculation Breakdown</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Base Route Pay (5 days)</span>
              <span>$500.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Deficiency Revenue ($4,000 @ 20%)</span>
              <span className="text-green-600 font-medium">+$800.00</span>
            </div>
            <div className="pt-2 border-t border-blue-200 flex justify-between font-bold text-dark">
              <span>Total Earnings</span>
              <span>$1,300.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Commission Chart - Stacked */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-dark">Daily Breakdown</h3>
          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1 font-medium">
            <Award size={12} /> Top 10% Rep
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                cursor={{fill: '#f9fafb'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="base" stackId="a" fill="#9ca3af" name="Base Pay" />
              <Bar dataKey="comm" stackId="a" fill="#e0393e" radius={[4, 4, 0, 0]} name="Commission" maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversion Rate Trend */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-dark">Deficiency Conversion Rate</h3>
          <div className="text-right">
            <span className="text-xs text-gray-500 block">Current</span>
            <span className="text-lg font-bold text-blue-600">68%</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">Tracking how often your on-site quotes are approved.</p>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={conversionData}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} tickFormatter={(val) => `${val}%`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
              />
              <Area type="monotone" dataKey="rate" stroke="#2563eb" fillOpacity={1} fill="url(#colorRate)" strokeWidth={3} activeDot={{r: 6}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Leakage Alert */}
      <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex gap-3 items-start shadow-sm">
        <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-sm font-bold text-orange-800">Revenue Leakage Alert</h4>
          <p className="text-xs text-orange-700 mt-1 mb-2 leading-relaxed">
            You identified 3 expired extinguishers at <strong>Smith Logistics</strong> yesterday but did not send a quote. 
            Generating an instant quote on-site increases approval rates by 44%.
          </p>
          <button className="text-xs bg-orange-600 text-white px-3 py-1.5 rounded font-medium hover:bg-orange-700 transition-colors">
            Generate Quote Now
          </button>
        </div>
      </div>

    </div>
  );
}
