import React, { useState, useMemo } from 'react';
import { useWatches } from '../context/WatchContext';
import { Watch } from '../types/watch';
import { WatchCard } from './WatchCard';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ShopPageProps {
  onSelectWatch: (watch: Watch) => void;
  onInquireWatch: (watch: Watch) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onSelectWatch, onInquireWatch }) => {
  const { watches, setIsManagerOpen } = useWatches();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('newest');

  const categories: string[] = ['All', 'Diver', 'Chronograph', 'Dress / Vintage', 'Field & Tool', 'Integrated Sports'];

  const filteredWatches = useMemo(() => {
    return watches
      .filter((watch) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            watch.brand.toLowerCase().includes(q) ||
            watch.model.toLowerCase().includes(q) ||
            watch.reference.toLowerCase().includes(q) ||
            watch.movement.toLowerCase().includes(q) ||
            watch.category.toLowerCase().includes(q);
          if (!match) return false;
        }

        if (selectedCategory !== 'All' && watch.category !== selectedCategory) {
          return false;
        }

        if (selectedStatus === 'available' && watch.status !== 'available') return false;
        if (selectedStatus === 'reserved' && watch.status !== 'reserved') return false;
        if (selectedStatus === 'sold' && watch.status !== 'sold') return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [watches, searchQuery, selectedCategory, selectedStatus, sortBy]);

  const availableCount = watches.filter(w => w.status === 'available').length;

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              <span>Current Vault</span>
              <span>·</span>
              <span className="font-mono text-neutral-900 tabular-nums">{availableCount} Pieces Ready to Ship</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-neutral-900">
              Curated Timepiece Collection
            </h1>
            <p className="mt-1 text-sm text-neutral-600 max-w-xl">
              Every watch is personally sourced, inspected under 10x magnification, regulated on our timegrapher, and backed by a 24-hour hold guarantee.
            </p>
          </div>

          <button
            onClick={() => setIsManagerOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-sm shadow-2xs transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Manage / Add Watches</span>
          </button>
        </div>

        {/* Real-Time Search Bar at the Top */}
        <div className="mt-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              aria-label="Filter watches by brand or model name"
              placeholder="Search by brand or model name (e.g., Seiko, Chronograph, Panda, Diver)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-24 py-3 text-sm bg-white border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 shadow-2xs transition-all placeholder:text-neutral-400"
            />
            {searchQuery ? (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400 tabular-nums hidden sm:inline">
                  {filteredWatches.length} {filteredWatches.length === 1 ? 'match' : 'matches'}
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xs transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>
            ) : (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400 hidden sm:block font-mono">
                Real-time search
              </div>
            )}
          </div>

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-neutral-400 font-medium mr-0.5">Popular:</span>
              {['Seiko', 'Chronograph', 'Panda', 'Diver', 'Titanium'].map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => setSearchQuery(keyword)}
                  className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                    searchQuery.toLowerCase() === keyword.toLowerCase()
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {keyword}
                </button>
              ))}
            </div>

            {searchQuery && (
              <div className="text-neutral-600">
                Filtering by: <span className="font-semibold text-neutral-900">"{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
                >
                  Reset search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="mt-6 pt-4 border-t border-neutral-200/70 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-1 p-1 bg-neutral-200/60 rounded-sm self-start overflow-x-auto max-w-full">
              {[
                { label: 'All Watches', value: 'all' },
                { label: 'Available Now', value: 'available' },
                { label: 'On Hold', value: 'reserved' },
                { label: 'Past Sold Archive', value: 'sold' }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedStatus(tab.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xs whitespace-nowrap transition-colors cursor-pointer ${
                    selectedStatus === tab.value
                      ? 'bg-white text-neutral-900 shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-neutral-500 whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 shadow-2xs cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="featured">Curator's Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs text-neutral-400 font-medium mr-1 whitespace-nowrap">Style:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-8">
          {filteredWatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredWatches.map((watch) => (
                <WatchCard
                  key={watch.id}
                  watch={watch}
                  onSelect={onSelectWatch}
                  onInquire={onInquireWatch}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-neutral-200 rounded-sm p-8">
              <p className="text-lg font-serif-display text-neutral-800">
                {searchQuery
                  ? `No watches found matching "${searchQuery}"`
                  : 'No timepieces match your current filters.'}
              </p>
              <div className="mt-5 flex justify-center gap-3">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedStatus('all');
                  }}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-sm transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};