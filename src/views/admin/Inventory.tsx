import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { InventoryItem } from '../../types/schema';
import { Plus, Search, Trash2, Edit, Package, X } from 'lucide-react';

const Inventory: React.FC = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
        name: '',
        category: '',
        quantity: 0,
        unitPrice: 0,
        threshold: 0
    });

    useEffect(() => {
        const fetchInventory = () => {
            setItems(db.getInventory());
        };

        fetchInventory();

        const handleUpdate = (e?: StorageEvent) => {
            if (!e || (e.key && e.key.startsWith('eps_'))) {
                fetchInventory();
            }
        };

        window.addEventListener('storage', handleUpdate);
        window.addEventListener('eps-db-update', handleUpdate);

        return () => {
            window.removeEventListener('storage', handleUpdate);
            window.removeEventListener('eps-db-update', handleUpdate);
        };
    }, []);


    const handleAddItem = () => {
        setIsModalOpen(true);
        setNewItem({
            name: '',
            category: 'Paper',
            quantity: 0,
            unitPrice: 0,
            threshold: 0
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({
            ...prev,
            [name]: name === 'name' || name === 'category' ? value : Number(value)
        }));
    };

    const handleSaveItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.name || !newItem.category) return;

        const itemToSave: InventoryItem = {
            id: crypto.randomUUID(),
            name: newItem.name,
            category: newItem.category,
            quantity: newItem.quantity || 0,
            unitPrice: newItem.unitPrice || 0,
            threshold: newItem.threshold || 0,
            lastUpdated: new Date().toISOString()
        };

        db.addInventoryItem(itemToSave);
        setItems(db.getInventory());
        setIsModalOpen(false);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Inventory Management</h2>
                    <p className="text-sm font-medium text-gray-400 mt-1">Real-time stock monitoring & asset control</p>
                </div>
                <button
                    onClick={handleAddItem}
                    className="flex items-center gap-2 px-8 py-4 bg-pink-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-pink-100 hover:bg-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <Plus className="w-5 h-5" /> Add New Item
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Quick search throughout inventory..."
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
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Item Details</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Category</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Live Stock</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Unit Price</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="p-8 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Package className="w-12 h-12 text-gray-200" />
                                            <p className="text-gray-400 font-medium">No inventory assets found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredItems.map((item) => (
                                    <tr key={item.id} className="group hover:bg-gray-50/80 transition-all duration-300">
                                        <td className="p-8">
                                            <p className="font-bold text-gray-900 text-lg group-hover:text-pink-500 transition-colors">{item.name}</p>
                                            <p className="text-[10px] font-bold text-gray-300 mt-0.5 tracking-wider uppercase">SID-{item.id.slice(0, 8)}</p>
                                        </td>
                                        <td className="p-8">
                                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 uppercase tracking-tight">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex items-center gap-2">
                                                <span className="font-extrabold text-gray-900 text-xl">{item.quantity}</span>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Units</span>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <span className="font-extrabold text-gray-900 text-lg">${item.unitPrice.toFixed(2)}</span>
                                        </td>
                                        <td className="p-8">
                                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest ${item.quantity <= item.threshold
                                                ? 'bg-red-50 text-red-500 border border-red-100'
                                                : 'bg-green-50 text-green-500 border border-green-100'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${item.quantity <= item.threshold ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                                                {item.quantity <= item.threshold ? 'Low Stock' : 'In Stock'}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                <button className="p-3 bg-white text-blue-500 hover:text-white hover:bg-blue-500 rounded-xl shadow-sm border border-gray-100 transition-all">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-3 bg-white text-red-500 hover:text-white hover:bg-red-500 rounded-xl shadow-sm border border-gray-100 transition-all">
                                                    <Trash2 className="w-4 h-4" />
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

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Add New Item</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Define asset characteristics</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-900 transition-all shadow-sm"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveItem} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Asset Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={newItem.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Glossy Cardstock Premium"
                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold text-gray-900 border border-transparent focus:bg-white focus:border-pink-500/20 focus:ring-4 focus:ring-pink-500/5 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                                    <select
                                        name="category"
                                        value={newItem.category}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold text-gray-900 border border-transparent focus:bg-white focus:border-pink-500/20 focus:ring-4 focus:ring-pink-500/5 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Paper">Paper</option>
                                        <option value="Ink">Ink</option>
                                        <option value="Packaging">Packaging</option>
                                        <option value="Equipment">Equipment</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit Price ($)</label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        name="unitPrice"
                                        value={newItem.unitPrice}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold text-gray-900 border border-transparent focus:bg-white focus:border-pink-500/20 focus:ring-4 focus:ring-pink-500/5 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Quantity</label>
                                    <input
                                        required
                                        type="number"
                                        name="quantity"
                                        value={newItem.quantity}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold text-gray-900 border border-transparent focus:bg-white focus:border-pink-500/20 focus:ring-4 focus:ring-pink-500/5 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alert Threshold</label>
                                    <input
                                        required
                                        type="number"
                                        name="threshold"
                                        value={newItem.threshold}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold text-gray-900 border border-transparent focus:bg-white focus:border-pink-500/20 focus:ring-4 focus:ring-pink-500/5 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-xl shadow-pink-100 hover:bg-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Register Asset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
