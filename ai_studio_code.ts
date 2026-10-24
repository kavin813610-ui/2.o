export type WatchCondition = 'Mint / Unworn' | 'Near Mint' | 'Excellent' | 'Very Good' | 'Vintage Patina';

export type WatchStatus = 'available' | 'reserved' | 'sold';

export type WatchCategory = 'Diver' | 'Chronograph' | 'Dress / Vintage' | 'Field & Tool' | 'Integrated Sports';

export interface Watch {
  id: string;
  reference: string;
  brand: string;
  model: string;
  price: number; // In Indian Rupees (₹)
  originalRetailPrice?: number;
  year: number | string;
  category: WatchCategory;
  condition: WatchCondition;
  status: WatchStatus;
  imageUrl: string;
  additionalImages?: string[];
  caseSize: string; // e.g. "39.5mm"
  lugWidth: string; // e.g. "20mm"
  thickness?: string; // e.g. "12.8mm"
  movement: string; // e.g. "Automatic Caliber NH35A" or "Valjoux 7750"
  powerReserve?: string; // e.g. "41 Hours"
  waterResistance?: string; // e.g. "200m / 660ft"
  boxAndPapers: 'Full Set (Box & Papers)' | 'Box Only' | 'Papers Only' | 'Watch Only';
  summary: string;
  description: string;
  timingAccuracy?: string; // e.g. "+4s / day (Weishi tested)"
  isFeatured?: boolean;
  dateAdded: string;
}

export interface InquiryFormState {
  fullName: string;
  email: string;
  phoneOrHandle: string;
  preferredContact: 'email' | 'instagram' | 'whatsapp' | 'sms';
  watchId?: string;
  watchTitle?: string;
  message: string;
}