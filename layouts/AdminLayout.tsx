import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    ShoppingBag,
    Package,
    Menu,
    X,
    LogOut
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminUser');
        navigate('/');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Quotations', path: '/admin/quotations', icon: <FileText size={20} /> },
        { name: 'Concerns', path: '/admin/concerns', icon: <MessageSquare size={20} /> },
        { name: 'Sales Records', path: '/admin/sales', icon: <ShoppingBag size={20} /> },
        { name: 'Inventory', path: '/admin/inventory', icon: <Package size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`bg-gray-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'
                    } flex flex-col fixed h-full z-10 md:relative`}
            >
                <div className="p-4 flex items-center justify-between border-b border-gray-800">
                    {isSidebarOpen && <h1 className="font-bold text-xl text-blue-400">EPS Admin</h1>}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 rounded hover:bg-gray-800"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 py-6">
                    <ul className="space-y-2 px-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                        }`}
                                >
                                    <span className="shrink-0">{item.icon}</span>
                                    {isSidebarOpen && <span>{item.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <AdminHeader />
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
