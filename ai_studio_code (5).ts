import React, { useState } from 'react';
import { Watch } from '../types/watch';
import { X, CheckCircle2, ShieldAlert, Send } from 'lucide-react';

interface InquiryModalProps {
  watch: Watch | null;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ watch, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contactDetail: '',
    preferredChannel: 'WhatsApp / Phone',
    deliveryPreference: 'Insured Speed Post (Pan-India)',
    paymentIntent: 'UPI (GPay / PhonePe / Paytm)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!watch) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendMail = () => {
    const subject = encodeURIComponent(`Hold Request: ${watch.brand} ${watch.model} (${watch.reference})`);
    const body = encodeURIComponent(
      `Hello N Collection,\n\nI would like to place a 24-hour hold on the following timepiece:\n\n` +
      `Watch: ${watch.brand} ${watch.model}\n` +
      `Reference: ${watch.reference}\n` +
      `Price: ₹${watch.price.toLocaleString('en-IN')}\n\n` +
      `My Details:\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone / WhatsApp: ${form.contactDetail}\n` +
      `Delivery: ${form.deliveryPreference}\n` +
      `Payment Intent: ${form.paymentIntent}\n` +
      `Notes: ${form.notes || 'None'}\n\n` +
      `Thank you!`
    );
    window.location.href = `mailto:n45349897@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-sm shadow-xl border border-neutral-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-neutral-100 bg-neutral-50">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 block">
              24-Hour Complimentary Reservation
            </span>
            <h2 className="text-base font-serif-display font-bold text-neutral-900">
              Hold: {watch.brand} {watch.model}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif-display font-semibold text-neutral-900">
              Hold Request Prepared
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
              We received your reservation for <strong>{watch.brand} {watch.model}</strong> (₹{watch.price.toLocaleString('en-IN')}). We will contact you at <strong>{form.email}</strong> to confirm wrist sizing and share our direct UPI or bank transfer details.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={handleSendMail}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in Email App</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-sm transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200/70 rounded-sm">
              <img
                src={watch.imageUrl}
                alt={watch.model}
                className="w-12 h-12 object-cover rounded-xs"
              />
              <div className="flex-1">
                <span className="font-semibold text-neutral-900 block">{watch.brand} {watch.model}</span>
                <span className="text-neutral-500 font-mono text-[11px] block">{watch.reference} · {watch.condition}</span>
                <span className="text-xs font-bold text-neutral-900 font-mono">₹{watch.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={form.contactDetail}
                  onChange={(e) => setForm({ ...form, contactDetail: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Delivery / Handover</label>
                <select
                  value={form.deliveryPreference}
                  onChange={(e) => setForm({ ...form, deliveryPreference: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white"
                >
                  <option value="Insured Speed Post (Pan-India)">Insured Speed Post (Pan-India)</option>
                  <option value="Local Handover in Andaman">Local Handover in Port Blair / Andaman</option>
                  <option value="Priority Air Courier">Priority Air Express Courier</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">Payment Method</label>
              <select
                value={form.paymentIntent}
                onChange={(e) => setForm({ ...form, paymentIntent: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white"
              >
                <option value="UPI (GPay / PhonePe / Paytm)">UPI (Google Pay, PhonePe, Paytm)</option>
                <option value="Bank Transfer (NEFT / IMPS)">Direct Bank Transfer (NEFT / IMPS)</option>
                <option value="Cash on Local Handover (Andaman)">Cash on Local Handover (Andaman)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">Wrist Size / Questions (Optional)</label>
              <textarea
                rows={2}
                placeholder="e.g. My wrist is 6.75 inches, could you size the bracelet before shipping?"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-3 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors cursor-pointer"
              >
                Place 24h Hold
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};