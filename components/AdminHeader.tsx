import React, { useEffect, useState } from 'react';
import { Search, Bell, LogOut, User, FileText, MessageCircle, AlertTriangle, Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'quote' | 'concern' | 'inventory';
    path: string;
    isRead: boolean;
}

const AdminHeader: React.FC = () => {
    const [username, setUsername] = useState('Admin User');
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            setUsername(storedUser);
        }

        const fetchNotifications = () => {
            console.log('[Header] Fetching notifications...');
            const quotes = db.getQuotations();
            const concerns = db.getConcerns();
            const inventory = db.getInventory();

            const newNotifications: Notification[] = [];

            // Pending Quotes
            quotes.filter(q => q && q.status === 'PENDING').forEach(q => {
                newNotifications.push({
                    id: `q-${q.id}`,
                    title: 'New Service Request',
                    description: `From ${q.customerName || 'Unknown'}`,
                    time: q.createdAt,
                    type: 'quote',
                    path: '/admin/quotations',
                    isRead: !!q.isRead
                });
            });

            // Open Concerns
            concerns.filter(c => c && c.status === 'OPEN').forEach(c => {
                newNotifications.push({
                    id: `c-${c.id}`,
                    title: 'Customer Inquiry',
                    description: c.subject || 'No Subject',
                    time: c.createdAt,
                    type: 'concern',
                    path: '/admin/concerns',
                    isRead: !!c.isRead
                });
            });

            // Low Stock
            inventory.filter(i => i && i.quantity <= i.threshold).forEach(i => {
                newNotifications.push({
                    id: `i-${i.id}`,
                    title: 'Low Stock Alert',
                    description: `${i.name} (${i.quantity} left)`,
                    time: new Date().toISOString(),
                    type: 'inventory',
                    path: '/admin/inventory',
                    isRead: false
                });
            });

            console.log(`[Header] Found ${newNotifications.length} active notifications`);
            setNotifications(newNotifications.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()));
        };

        fetchNotifications();

        // Listen for storage changes across tabs
        const handleStorageChange = (e: StorageEvent) => {
            console.log('[Header] Storage event detected:', e.key);
            if (e.key?.startsWith('eps_')) {
                fetchNotifications();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also a quick poll as fallback for the same tab
        const interval = setInterval(fetchNotifications, 5000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleNotificationClick = (notif: Notification) => {
        // Persist to DB
        const id = notif.id.split('-')[1];
        if (notif.type === 'quote') {
            db.markQuotationAsRead(id);
        } else if (notif.type === 'concern') {
            db.markConcernAsRead(id);
        }

        setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
        setShowNotifications(false);
        navigate(notif.path);
    };

    const markAllRead = () => {
        db.markAllNotificationsAsRead();
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const handleLogout = () => {
        localStorage.removeItem('adminUser');
        navigate('/');
    };

    return (
        <header className="flex items-center justify-between mb-10">
            <div className="relative w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
                />
            </div>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative p-3 rounded-xl transition-all duration-300 ${showNotifications ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
                    >
                        <Bell className="w-6 h-6" />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-pink-500 border-2 border-white rounded-full text-[8px] flex items-center justify-center text-white font-black animate-pulse">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-4 w-[22rem] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                                <div>
                                    <h3 className="font-black text-gray-900 text-lg">Alert Center</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Real-time system updates</p>
                                </div>
                                <button
                                    onClick={markAllRead}
                                    className="px-3 py-1.5 hover:bg-white rounded-xl text-blue-500 transition-all shadow-sm flex items-center gap-2 text-[10px] font-bold"
                                    title="Mark all as read"
                                >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Mark all read</span>
                                </button>
                            </div>

                            <div className="max-h-[25rem] overflow-y-auto custom-scrollbar">
                                {notifications.length > 0 ? (
                                    <div className="flex flex-col">
                                        {notifications.map((notif) => (
                                            <div
                                                key={notif.id}
                                                onClick={() => handleNotificationClick(notif)}
                                                className={`p-6 flex gap-4 cursor-pointer hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 relative group ${!notif.isRead ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.type === 'quote' ? 'bg-pink-50 text-pink-600' :
                                                    notif.type === 'concern' ? 'bg-orange-50 text-orange-600' :
                                                        'bg-red-50 text-red-600'
                                                    }`}>
                                                    {notif.type === 'quote' ? <FileText className="w-5 h-5" /> :
                                                        notif.type === 'concern' ? <MessageCircle className="w-5 h-5" /> :
                                                            <AlertTriangle className="w-5 h-5" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="font-black text-gray-900 text-sm truncate">{notif.title}</p>
                                                        <span className="text-[9px] font-bold text-gray-300 uppercase shrink-0">
                                                            {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1 font-medium truncate">{notif.description}</p>
                                                </div>
                                                {!notif.isRead && (
                                                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full shadow-sm shadow-blue-200" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-10 flex flex-col items-center justify-center text-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                            <Bell className="w-8 h-8 text-gray-200" />
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-gray-900">All caught up!</p>
                                            <p className="text-xs text-gray-400 mt-1 font-medium">No new notifications to show.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-gray-50/50 border-t border-gray-50">
                                <button className="w-full py-3 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-gray-900 transition-all shadow-sm">
                                    View Logic Logs
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{username}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Administrator</p>
                    </div>
                    <div className="group relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-pink-100 cursor-pointer overflow-hidden">
                            {username.charAt(0).toUpperCase()}
                        </div>

                        {/* Dropdown/Logout Overlay */}
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="p-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
