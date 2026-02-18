import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { Quotation, Sale } from '../../types/schema';
import { Search, CheckCircle, XCircle, Clock, Eye, PhilippinePeso as PesoIcon } from 'lucide-react';

const Quotations: React.FC = () => {
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');

    useEffect(() => {
        const fetchQuotations = () => {
            setQuotations(db.getQuotations());
        };

        fetchQuotations();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'eps_quotations') {
                fetchQuotations();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleStatusUpdate = (id: string, newStatus: Quotation['status']) => {
        db.updateQuotationStatus(id, newStatus);
        setQuotations(db.getQuotations()); // Refresh list
    };

    const filteredQuotes = quotations.filter(q => {
        if (!q) return false;
        const name = q.customerName || '';
        const email = q.customerEmail || '';
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' || q.status === filterStatus;
        return matchesSearch && matchesStatus;
    });



    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Quotation Requests</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1">Review, approve, and convert incoming leads</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by customer name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 rounded-2xl text-sm font-medium border border-transparent focus:outline-none focus:ring-4 focus:ring-pink-500/5 focus:bg-white focus:border-pink-500/20 transition-all"
                    />
                </div>
                <div className="flex bg-gray-50/50 p-1.5 rounded-[1.25rem] border border-gray-100/50">
                    {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${filterStatus === status
                                ? 'bg-white text-pink-500 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Customer Profile</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Requested Items</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Submission Date</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Current Status</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] text-right">Review Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredQuotes.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Clock className="w-12 h-12 text-gray-200" />
                                            <p className="text-gray-400 font-medium">No quotation inquiries found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredQuotes.map((quote) => (
                                    <tr key={quote.id} className="group hover:bg-gray-50/80 transition-all duration-300">
                                        <td className="p-8">
                                            <p className="font-bold text-gray-900 text-lg group-hover:text-pink-500 transition-colors">{quote.customerName}</p>
                                            <p className="text-[10px] font-bold text-gray-300 mt-0.5 tracking-wider uppercase">{quote.customerEmail}</p>
                                        </td>
                                        <td className="p-8">
                                            <div className="space-y-2">
                                                {quote.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <span className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center text-[10px] font-bold">
                                                            {item.quantity}x
                                                        </span>
                                                        <span className="text-sm font-semibold text-gray-700">{item.itemName}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <span className="text-sm font-bold text-gray-500">
                                                {new Date(quote.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest ${quote.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                                quote.status === 'APPROVED' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                    'bg-red-50 text-red-600 border border-red-100'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${quote.status === 'PENDING' ? 'bg-yellow-500 animate-pulse' : quote.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                {quote.status}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                {quote.status === 'PENDING' && (
                                                    <div className="flex gap-2 mr-2 border-r pr-3 border-gray-100">
                                                        <button
                                                            onClick={() => handleStatusUpdate(quote.id, 'APPROVED')}
                                                            className="p-3 bg-white text-green-500 hover:text-white hover:bg-green-500 rounded-xl shadow-sm border border-gray-100 transition-all"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(quote.id, 'REJECTED')}
                                                            className="p-3 bg-white text-red-500 hover:text-white hover:bg-red-500 rounded-xl shadow-sm border border-gray-100 transition-all"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                                {quote.status !== 'REJECTED' && (
                                                    <button
                                                        onClick={() => {
                                                            const sale: Sale = {
                                                                id: crypto.randomUUID(),
                                                                customerName: quote.customerName,
                                                                items: quote.items,
                                                                totalAmount: quote.totalAmount || quote.items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
                                                                date: new Date().toISOString(),
                                                                paymentMethod: 'CASH'
                                                            };
                                                            db.addSale(sale);
                                                            db.updateQuotationStatus(quote.id, 'APPROVED');
                                                            alert('Successfully converted to Transaction!');
                                                            setQuotations(db.getQuotations());
                                                        }}
                                                        className="p-3 bg-white text-cyan-500 hover:text-white hover:bg-cyan-500 rounded-xl shadow-sm border border-gray-100 transition-all"
                                                        title="Convert to Sale"
                                                    >
                                                        <PesoIcon className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button className="p-3 bg-white text-gray-400 hover:text-gray-900 rounded-xl shadow-sm border border-gray-100 transition-all" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Quotations;
