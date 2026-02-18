import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { Sale } from '../../types/schema';
import { Search, Printer, PhilippinePeso as PesoIcon } from 'lucide-react';

const Sales: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setSales(db.getSales());
    }, []);

    const filteredSales = sales.filter(s =>
        s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRevenue = filteredSales.reduce((acc, curr) => acc + curr.totalAmount, 0);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sales Records</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1">Full transaction history and revenue analytics</p>
                </div>
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 px-8 py-4 rounded-[2rem] shadow-xl shadow-green-100 border border-green-200/50 flex flex-col items-end">
                    <div className="flex items-center gap-2 text-white/80 mb-1">
                        <PesoIcon className="w-4 h-4" />
                        <p className="text-[10px] font-extrabold uppercase tracking-widest">Total Revenue</p>
                    </div>
                    <p className="text-3xl font-black text-white leading-none">₱{totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by customer name or transaction ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 rounded-2xl text-sm font-medium border border-transparent focus:outline-none focus:ring-4 focus:ring-pink-500/5 focus:bg-white focus:border-pink-500/20 transition-all"
                    />
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Transaction ID</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Customer</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Purchase Details</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Date</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Method</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] text-right">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredSales.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Printer className="w-12 h-12 text-gray-200" />
                                            <p className="text-gray-400 font-medium">No transaction records found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredSales.map((sale) => (
                                    <tr key={sale.id} className="group hover:bg-gray-50/80 transition-all duration-300">
                                        <td className="p-8">
                                            <span className="font-mono text-[10px] font-extrabold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                TRX-{sale.id.slice(0, 8).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <p className="font-bold text-gray-900 text-lg group-hover:text-pink-500 transition-colors">
                                                {sale.customerName || 'Hand-walk Client'}
                                            </p>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex flex-col gap-1.5">
                                                {sale.items.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <span className="text-[10px] font-extrabold text-gray-400">{item.quantity}x</span>
                                                        <span className="text-sm font-semibold text-gray-600">{item.itemName}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <span className="text-sm font-bold text-gray-500">
                                                {new Date(sale.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <span className="px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border border-gray-100">
                                                {sale.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="p-8 text-right">
                                            <span className="text-xl font-black text-gray-900">
                                                ₱{sale.totalAmount.toFixed(2)}
                                            </span>
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

export default Sales;
