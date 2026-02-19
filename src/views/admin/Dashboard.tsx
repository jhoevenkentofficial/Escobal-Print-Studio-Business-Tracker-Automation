import React, { useEffect, useState } from 'react';
import {
    FileText,
    MessageCircle,
    Printer,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Bell,
    TrendingUp,
    AlertTriangle,
    Clock,
    User,
    ChevronRight,
    Plus,
    Package
} from 'lucide-react';
import {
    AreaChart,
    Area,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { db } from '../../services/db';

// Mock data for sparklines in StatCards
const sparklineData = [
    { value: 400 }, { value: 600 }, { value: 500 }, { value: 700 }, { value: 400 }, { value: 800 }, { value: 600 }
];

const revenueData = [
    { name: 'Mon', print: 4000, design: 2400 },
    { name: 'Tue', print: 3000, design: 1398 },
    { name: 'Wed', print: 2000, design: 9800 },
    { name: 'Thu', print: 2780, design: 3908 },
    { name: 'Fri', print: 1890, design: 4800 },
    { name: 'Sat', print: 2390, design: 3800 },
    { name: 'Sun', print: 3490, design: 4300 },
];

interface StatCardProps {
    title: string;
    value: string;
    description: string;
    trend: string;
    isPositive: boolean;
    color: string;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, trend, isPositive, color, icon }) => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-6 relative overflow-hidden group hover:shadow-xl hover:shadow-gray-100/50 hover:border-pink-100 transition-all duration-300">
        <div className="flex justify-between items-start z-10">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color}-600`}>
                {icon}
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {trend}
            </div>
        </div>

        <div className="z-10">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</p>
            <h3 className="text-4xl font-black text-gray-900 mt-2 tracking-tight">{value}</h3>
            <p className="text-gray-300 text-[10px] font-bold mt-2 uppercase tracking-tighter">{description}</p>
        </div>

        {/* Mini Sparkline Background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color.includes('pink') ? '#ec4899' : (color.includes('cyan') ? '#06b6d4' : '#f97316')}
                        strokeWidth={4}
                        fill={color.includes('pink') ? '#ec4899' : (color.includes('cyan') ? '#06b6d4' : '#f97316')}
                        fillOpacity={0.1}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        pendingQuotes: 0,
        totalSales: 0,
        openConcerns: 0,
        lowStockItems: 0
    });

    useEffect(() => {
        const fetchData = () => {
            const quotes = db.getQuotations();
            const sales = db.getSales();
            const concerns = db.getConcerns();
            const inventory = db.getInventory();

            setStats({
                pendingQuotes: quotes.filter(q => q.status === 'PENDING').length,
                totalSales: sales.reduce((acc, sale) => acc + sale.totalAmount, 0),
                openConcerns: concerns.filter(c => c.status === 'OPEN').length,
                lowStockItems: inventory.filter(i => i.quantity <= i.threshold).length
            });
        };

        fetchData();

        const handleUpdate = () => {
            console.log('[Dashboard] Refreshing data...');
            fetchData();
        };

        window.addEventListener('storage', handleUpdate);
        window.addEventListener('eps-db-update', handleUpdate);

        return () => {
            window.removeEventListener('storage', handleUpdate);
            window.removeEventListener('eps-db-update', handleUpdate);
        };
    }, []);


    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Business Intelligence</h2>
                    <p className="text-gray-400 font-bold text-sm mt-1 uppercase tracking-widest">Global command center & real-time analytics</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        <Clock className="w-4 h-4" /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-xs hover:bg-black transition-all shadow-lg">
                        <Plus className="w-4 h-4" /> New Transaction
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                    title="Active Quotes"
                    value={stats.pendingQuotes.toString()}
                    description="Incoming service requests"
                    trend="+12.5%"
                    isPositive={true}
                    color="bg-pink-500"
                    icon={<FileText className="w-6 h-6 text-pink-600" />}
                />
                <StatCard
                    title="Gross Revenue"
                    value={`₱${stats.totalSales.toLocaleString()}`}
                    description="Total recorded sales"
                    trend="+8.2%"
                    isPositive={true}
                    color="bg-cyan-500"
                    icon={<Printer className="w-6 h-6 text-cyan-600" />}
                />
                <StatCard
                    title="Support Tickets"
                    value={stats.openConcerns.toString()}
                    description="Active customer inquiries"
                    trend={stats.openConcerns > 0 ? "+2 issues" : "Stable"}
                    isPositive={stats.openConcerns === 0}
                    color="bg-orange-500"
                    icon={<MessageCircle className="w-6 h-6 text-orange-600" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Charts Section */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-black text-gray-900 text-2xl tracking-tight">Revenue Trajectory</h3>
                            <p className="text-gray-400 text-xs font-bold uppercase mt-1 tracking-widest">7-Day performance overview</p>
                        </div>
                        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl">
                            <button className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white text-gray-900 shadow-sm border border-gray-100">Weekly</button>
                            <button className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600">Monthly</button>
                        </div>
                    </div>

                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorDesign" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                                    tickFormatter={(val) => `₱${val}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '20px',
                                        border: 'none',
                                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                        padding: '16px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="print"
                                    stroke="#ec4899"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="design"
                                    stroke="#06b6d4"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorDesign)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Secondary Sidebar Content */}
                <div className="flex flex-col gap-8">
                    {/* Activity Feed */}
                    <div className="bg-gray-900 p-10 rounded-[3rem] shadow-2xl text-white flex flex-col gap-8">
                        <div>
                            <h3 className="font-black text-xl tracking-tight">Recent Activity</h3>
                            <p className="text-white/40 text-[10px] font-extrabold uppercase mt-1 tracking-[0.2em]">Latest system events</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-pink-500/20 group-hover:text-pink-400 transition-all font-bold text-xs">
                                        {item === 1 ? 'SQ' : item === 2 ? 'TR' : 'CS'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-xs truncate">New Inquiry: Standard Card</p>
                                        <p className="text-[10px] text-white/30 font-bold uppercase mt-0.5 tracking-tighter">2 mins ago • User: Admin</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all">
                            View Audit Log
                        </button>
                    </div>

                    {/* Stock Alerts */}
                    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col gap-6">
                        <div className="flex items-center gap-3 text-orange-500">
                            <AlertTriangle className="w-6 h-6" />
                            <h3 className="font-black text-gray-900 tracking-tight">System Alerts</h3>
                        </div>

                        <div className="space-y-4">
                            {stats.lowStockItems > 0 && (
                                <div className="p-5 bg-orange-50 rounded-[2rem] border border-orange-100/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-500 rounded-lg text-white">
                                            <Package className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 text-xs">Low Stock Detected</p>
                                            <p className="text-[10px] font-bold text-orange-600/70 uppercase tracking-tighter">{stats.lowStockItems} items require restock</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="p-5 bg-blue-50 rounded-[2rem] border border-blue-100/50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500 rounded-lg text-white">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 text-xs">Target Reached</p>
                                        <p className="text-[10px] font-bold text-blue-600/70 uppercase tracking-tighter">Sales up by 12% today</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
