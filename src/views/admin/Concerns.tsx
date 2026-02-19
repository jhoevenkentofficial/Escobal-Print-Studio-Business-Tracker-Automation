import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { Concern } from '../../types/schema';
import { Search, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Concerns: React.FC = () => {
    const [concerns, setConcerns] = useState<Concern[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'>('ALL');

    useEffect(() => {
        const fetchConcerns = () => {
            setConcerns(db.getConcerns());
        };

        fetchConcerns();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key?.startsWith('eps_')) {
                fetchConcerns();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        const handleDbUpdate = () => {
            fetchConcerns();
        };
        window.addEventListener('eps-db-update', handleDbUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('eps-db-update', handleDbUpdate);
        };
    }, []);

    const handleStatusUpdate = (id: string, newStatus: Concern['status']) => {
        db.updateConcernStatus(id, newStatus);
        setConcerns(db.getConcerns());
    };

    const filteredConcerns = concerns.filter(c => {
        if (!c) return false;
        const name = c.customerName || '';
        const subject = c.subject || '';
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Customer Concerns</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1">Manage support tickets and service inquiries</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, subject, or message..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 rounded-2xl text-sm font-medium border border-transparent focus:outline-none focus:ring-4 focus:ring-pink-500/5 focus:bg-white focus:border-pink-500/20 transition-all"
                    />
                </div>
                <div className="flex bg-gray-50/50 p-1.5 rounded-[1.25rem] border border-gray-100/50">
                    {(['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'] as const).map(status => (
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

            {/* Concerns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredConcerns.length === 0 ? (
                    <div className="col-span-full bg-white p-20 rounded-[2.5rem] text-center border border-gray-100">
                        <div className="flex flex-col items-center gap-3">
                            <MessageSquare className="w-12 h-12 text-gray-200" />
                            <p className="text-gray-400 font-medium">No active support tickets found</p>
                        </div>
                    </div>
                ) : (
                    filteredConcerns.map((concern) => (
                        <div key={concern.id} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 hover:border-pink-100 transition-all duration-300">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-2xl ${concern.status === 'OPEN' ? 'bg-orange-50 text-orange-500' :
                                        concern.status === 'RESOLVED' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'
                                        }`}>
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-gray-900 text-lg group-hover:text-pink-600 transition-colors uppercase tracking-tight">{concern.subject}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-[10px] font-extrabold text-gray-400 uppercase">{concern.customerName}</p>
                                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                            <p className="text-[10px] font-bold text-gray-300">{concern.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest ${concern.status === 'OPEN' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                    concern.status === 'RESOLVED' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                    }`}>
                                    {concern.status === 'OPEN' && <span className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 animate-pulse" />}
                                    {concern.status}
                                </span>
                            </div>

                            <div className="bg-gray-50/50 p-6 rounded-2xl text-sm font-medium text-gray-600 mb-6 italic leading-relaxed border border-gray-50">
                                "{concern.message}"
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                                    Created: {new Date(concern.createdAt).toLocaleDateString()}
                                </p>
                                <div className="flex gap-2">
                                    {concern.status !== 'RESOLVED' && (
                                        <>
                                            {concern.status === 'OPEN' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(concern.id, 'IN_PROGRESS')}
                                                    className="px-4 py-2 text-[10px] font-extrabold bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white border border-blue-100 transition-all uppercase tracking-widest shadow-sm"
                                                >
                                                    Start Progress
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleStatusUpdate(concern.id, 'RESOLVED')}
                                                className="px-4 py-2 text-[10px] font-extrabold bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white border border-green-100 transition-all uppercase tracking-widest shadow-sm"
                                            >
                                                Mark Resolved
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Concerns;
