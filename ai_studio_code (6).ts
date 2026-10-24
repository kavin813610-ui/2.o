import React, { useState } from 'react';
import { useWatches } from '../context/WatchContext';
import { Watch, WatchCategory, WatchCondition, WatchStatus } from '../types/watch';
import { X, Plus, Trash2, RotateCcw, Download, Upload, Check } from 'lucide-react';

export const InventoryManagerModal: React.FC = () => {
  const {
    watches,
    isManagerOpen,
    setIsManagerOpen,
    addWatch,
    updateWatch,
    toggleStatus,
    deleteWatch,
    resetToDefaults,
    importWatches
  } = useWatches();

  const [isAdding, setIsAdding] = useState(false);
  const [newWatch, setNewWatch] = useState({
    brand: '',
    model: '',
    reference: '',
    price: 35000,
    originalRetailPrice: 45000,
    year: new Date().getFullYear(),
    category: 'Diver' as WatchCategory,
    condition: 'Excellent' as WatchCondition,
    status: 'available' as WatchStatus,
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800',
    caseSize: '40mm',
    lugWidth: '20mm',
    thickness: '12.5mm',
    movement: 'Automatic Movement',
    boxAndPapers: 'Full Set (Box & Papers)' as any,
    summary: 'A clean and well-maintained timepiece.',
    description: 'Inspected under loupe and keeping accurate time.'
  });

  if (!isManagerOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWatch(newWatch);
    setIsAdding(false);
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(watches, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `n_collection_stock_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-sm shadow-2xl border border-neutral-300 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-neutral-900 text-white">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">Owner Control Panel</span>
            <h2 className="text-base font-serif-display font-semibold">N Collection Stock & Price Manager</h2>
          </div>
          <button
            onClick={() => setIsManagerOpen(false)}
            className="p-1 text-neutral-400 hover:text-white rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-3 py-1.5 font-medium bg-neutral-900 text-white hover:bg-neutral-800 rounded-sm cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAdding ? 'Cancel Adding' : 'Add New Timepiece'}</span>
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 font-medium bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100 rounded-sm cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Stock JSON</span>
            </button>
          </div>
          <button
            onClick={() => {
              if (confirm('Reset inventory back to initial default collection?')) resetToDefaults();
            }}
            className="text-neutral-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Add form */}
          {isAdding && (
            <form onSubmit={handleAddSubmit} className="p-4 bg-neutral-50 border border-neutral-300 rounded-sm space-y-3 text-xs mb-4">
              <h3 className="font-semibold text-neutral-900 text-sm">Add New Timepiece to N Collection</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-700 mb-1 font-medium">Brand *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SEIKO"
                    value={newWatch.brand}
                    onChange={(e) => setNewWatch({ ...newWatch, brand: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 mb-1 font-medium">Model Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prospex Alpinist"
                    value={newWatch.model}
                    onChange={(e) => setNewWatch({ ...newWatch, model: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 mb-1 font-medium">Price in INR (₹) *</label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={newWatch.price}
                    onChange={(e) => setNewWatch({ ...newWatch, price: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 rounded-sm font-mono"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-neutral-900 text-white font-semibold rounded-sm hover:bg-neutral-800 cursor-pointer"
              >
                Publish Watch to Store
              </button>
            </form>
          )}

          {/* Table of Watches */}
          <div className="border border-neutral-200 rounded-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 text-neutral-600 border-b border-neutral-200 font-medium">
                <tr>
                  <th className="p-3">Timepiece</th>
                  <th className="p-3">Price (₹ INR)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {watches.map((w) => (
                  <tr key={w.id} className="hover:bg-neutral-50/80">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={w.imageUrl} alt={w.model} className="w-10 h-10 object-cover rounded-xs" />
                        <div>
                          <span className="font-semibold text-neutral-900 block">{w.brand} {w.model}</span>
                          <span className="text-[11px] text-neutral-500 font-mono">{w.reference} · {w.condition}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 font-mono">
                        <span>₹</span>
                        <input
                          type="number"
                          value={w.price}
                          onChange={(e) => updateWatch(w.id, { price: Number(e.target.value) })}
                          className="w-24 px-2 py-1 border border-neutral-300 rounded-xs bg-white text-xs"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <select
                        value={w.status}
                        onChange={(e) => toggleStatus(w.id, e.target.value as WatchStatus)}
                        className={`px-2 py-1 rounded-xs border text-xs font-medium cursor-pointer ${
                          w.status === 'available'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : w.status === 'reserved'
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-neutral-100 border-neutral-300 text-neutral-600'
                        }`}
                      >
                        <option value="available">Available</option>
                        <option value="reserved">Under Hold</option>
                        <option value="sold">Sold Archive</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => deleteWatch(w.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};