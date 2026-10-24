import React, { useState } from 'react';
import { Watch } from '../types/watch';
import { Clock } from 'lucide-react';

interface WatchCardProps {
  watch: Watch;
  onSelect: (watch: Watch) => void;
  onInquire: (watch: Watch) => void;
}

export const WatchCard: React.FC<WatchCardProps> = ({ watch, onSelect, onInquire }) => {
  const [imgError, setImgError] = useState(false);

  const isSold = watch.status === 'sold';
  const isReserved = watch.status === 'reserved';

  return (
    <article
      onClick={() => onSelect(watch)}
      className="group cursor-pointer bg-white border border-neutral-200/80 rounded-sm overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-neutral-300"
    >
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <img
            src={watch.imageUrl}
            alt={`${watch.brand} ${watch.model}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-400 p-6 text-center">
            <Clock className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-xs uppercase tracking-wider font-medium text-neutral-500">
              {watch.brand}
            </span>
            <span className="text-xs text-neutral-400 font-serif-display mt-0.5">
              {watch.model}
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3">
          {isSold ? (
            <span className="text-[11px] font-semibold uppercase tracking-wider bg-neutral-900/90 text-neutral-300 px-2 py-0.5 backdrop-blur-xs">
              Sold Archive
            </span>
          ) : isReserved ? (
            <span className="text-[11px] font-semibold uppercase tracking-wider bg-amber-950/85 text-amber-200 px-2 py-0.5 backdrop-blur-xs">
              Under Hold
            </span>
          ) : (
            <span className="text-[11px] font-medium tracking-wider bg-neutral-900/75 text-white px-2 py-0.5 backdrop-blur-xs">
              Available
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-medium text-neutral-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 border border-neutral-200/60 shadow-xs">
            {watch.condition}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span className="font-semibold tracking-wider uppercase text-neutral-700">
              {watch.brand}
            </span>
            <span className="text-neutral-400">
              {watch.year} · {watch.caseSize}
            </span>
          </div>

          <h3 className="text-base font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
            {watch.model}
          </h3>

          <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            {watch.summary}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-neutral-900 font-mono tabular-nums">
                ₹{watch.price.toLocaleString('en-IN')}
              </span>
              {watch.originalRetailPrice && watch.originalRetailPrice > watch.price && (
                <span className="text-xs text-neutral-400 line-through font-mono tabular-nums">
                  ₹{watch.originalRetailPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[11px] text-neutral-500">
              {watch.boxAndPapers.includes('Full Set') ? 'Full Set' : 'Watch Only'} · Free Insured Speed Post
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isSold) {
                onSelect(watch);
              } else {
                onInquire(watch);
              }
            }}
            className={`text-xs font-medium px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isSold
                ? 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            {isSold ? 'View Details' : 'Reserve Watch'}
          </button>
        </div>
      </div>
    </article>
  );
};