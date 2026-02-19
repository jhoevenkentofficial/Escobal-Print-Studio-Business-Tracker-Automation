
import React from 'react';
import { 
  LayoutGrid, 
  FileText, 
  ShoppingBag, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  Plus,
  ArrowUpRight,
  ChevronDown,
  // Added Printer to fix the missing icon import
  Printer
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { LiveFeedItem, StatCardProps } from '../types';

const revenueData = [
  { name: 'Jan', print: 32000, design: 15000 },
  { name: 'Feb', print: 28000, design: 18000 },
  { name: 'Mar', print: 35000, design: 20000 },
  { name: 'Apr', print: 25000, design: 22000 },
  { name: 'May', print: 40000, design: 24000 },
  { name: 'Jun', print: 45280, design: 26000 },
];

const liveFeed: LiveFeedItem[] = [
  { id: '1', name: 'Marcus Aurelius', avatar: 'https://i.pravatar.cc/150?u=marcus', status: 'online', action: 'Requested quote:', detail: '500 Business Cards', time: '2 MINS AGO', color: 'green' },
  { id: '2', name: 'Julia Roberts', avatar: 'https://i.pravatar.cc/150?u=julia', status: 'busy', action: 'New Inquiry:', detail: 'Wall Mural Install', time: '15 MINS AGO', color: 'pink' },
  { id: '3', name: 'Creative Labs Inc.', avatar: 'https://i.pravatar.cc/150?u=creative', status: 'offline', action: 'Requested quote:', detail: 'Branding Kit', time: '42 MINS AGO', color: 'blue' },
  { id: '4', name: 'Pizzeria Uno', avatar: 'https://i.pravatar.cc/150?u=pizzeria', status: 'offline', action: 'Requested quote:', detail: '1000 Flyers', time: '1 HOUR AGO', color: 'orange' },
];

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, color, icon, isCritical }) => (
  <div className="bg-white p-6 rounded-3xl custom-shadow border border-gray-50 flex flex-col gap-4 relative overflow-hidden group">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color}-600`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${isCritical ? 'text-red-500' : (isPositive ? <><ArrowUpRight className="w-3 h-3" /> {change}</> : change)}`}>
        {isCritical ? `! ${change}` : (isPositive ? <><ArrowUpRight className="w-3 h-3" /> {change}</> : change)}
      </div>
    </div>
    <div>
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      <h3 className="text-4xl font-extrabold text-gray-900 mt-1">{value}</h3>
    </div>
    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
      <div className={`h-full ${color.replace('text-', 'bg-')} rounded-full w-2/3 transition-all duration-1000 group-hover:w-4/5`} />
    </div>
  </div>
);

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="flex min-h-screen bg-[#fcfcfc]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={onLogout}>
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-100">E</div>
          <div>
            <h1 className="font-bold text-gray-900 leading-none">Escobal</h1>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-1">Print Studio</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-pink-500 text-white rounded-2xl font-semibold shadow-lg shadow-pink-100 transition-all">
            <LayoutGrid className="w-5 h-5" />
            Dashboard
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl font-semibold transition-all group">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 group-hover:text-pink-500" />
              Quote Requests
            </div>
            <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl font-semibold transition-all group">
            <ShoppingBag className="w-5 h-5 group-hover:text-pink-500" />
            Orders
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl font-semibold transition-all group">
            <MessageCircle className="w-5 h-5 group-hover:text-pink-500" />
            Concerns
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl font-semibold transition-all group">
            <BarChart3 className="w-5 h-5 group-hover:text-pink-500" />
            Analytics
          </button>

          <div className="pt-8">
            <p className="text-[10px] font-bold text-gray-300 tracking-widest uppercase mb-4 px-4">Preferences</p>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl font-semibold transition-all group">
              <Settings className="w-5 h-5 group-hover:text-pink-500" />
              Settings
            </button>
          </div>
        </nav>

        <div className="mt-auto pt-8">
          <div className="bg-pink-50 p-6 rounded-[2rem] space-y-4">
            <div>
              <p className="text-pink-600 font-bold text-sm">Need Help?</p>
              <p className="text-[11px] text-pink-400 mt-1 leading-relaxed">Access documentation or contact support.</p>
            </div>
            <button className="w-full py-3 bg-pink-500 text-white rounded-2xl text-xs font-bold hover:bg-pink-600 transition-all">
              Support Center
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Bar */}
        <header className="flex items-center justify-between mb-10">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search orders, quotes or clients..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/10 border-transparent border focus:border-pink-200 transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Sarah Jenkins</p>
                <p className="text-[10px] font-bold text-gray-400">Studio Manager</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=sarah" alt="User" className="w-10 h-10 rounded-xl object-cover shadow-md" />
            </div>
          </div>
        </header>

        {/* Dashboard Title */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">At a Glance</h2>
          <button className="px-4 py-1.5 bg-pink-50 text-pink-600 text-[10px] font-extrabold tracking-widest uppercase rounded-full">
            Live Updates
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Active Quotes" 
            value="124" 
            change="+12%" 
            isPositive={true} 
            color="bg-pink-500" 
            icon={<FileText className="w-6 h-6" />} 
          />
          <StatCard 
            title="Pending Orders" 
            value="42" 
            change="+5%" 
            isPositive={true} 
            color="bg-cyan-500" 
            icon={<Printer className="w-6 h-6" />} 
          />
          <StatCard 
            title="Support Tickets" 
            value="08" 
            change="2 Critical" 
            isPositive={false} 
            color="bg-orange-500" 
            icon={<MessageCircle className="w-6 h-6" />} 
            isCritical={true}
          />
        </div>

        {/* Bottom Section: Charts & Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Feed */}
          <div className="bg-white p-8 rounded-[2rem] custom-shadow border border-gray-50 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-extrabold text-gray-900 text-lg">Live Feed</h3>
              <button className="text-xs font-bold text-pink-500 hover:text-pink-600">View All</button>
            </div>
            <div className="flex-1 space-y-8">
              {liveFeed.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="relative">
                    <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
                    <span className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full ${
                      item.color === 'green' ? 'bg-green-500' : 
                      item.color === 'pink' ? 'bg-pink-500' : 
                      item.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}></span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {item.action} <span className="text-pink-500 font-semibold">{item.detail}</span>
                    </p>
                    <p className="text-[10px] font-bold text-gray-300 mt-2 tracking-wider uppercase">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] custom-shadow border border-gray-50">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">Revenue Trends</h3>
                <p className="text-xs text-gray-400 font-medium mt-1">Monthly performance analytics</p>
              </div>
              <button className="px-3 py-1.5 border border-gray-100 rounded-xl text-[10px] font-bold text-gray-400 flex items-center gap-2 hover:bg-gray-50">
                Last 6 Months <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorPrint" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e91e63" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#e91e63" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDesign" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }} 
                    cursor={{ stroke: '#f1f1f1', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="print" 
                    stroke="#e91e63" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorPrint)" 
                    animationDuration={2000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="design" 
                    stroke="#06b6d4" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorDesign)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-50">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                  <span className="text-xs font-bold text-gray-900">Print Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                  <span className="text-xs font-bold text-gray-900">Design Studio</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-pink-500">$45,280.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 bg-white p-8 rounded-[2rem] border border-gray-50 flex items-center justify-between">
            <div>
                <h4 className="font-extrabold text-gray-900">Customer Concerns</h4>
                <p className="text-xs text-gray-400 mt-1">Unresolved inquiries and feedback</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all">
                <Plus className="w-5 h-5" /> New Entry
            </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;