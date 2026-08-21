export type SharedPropertyCard = {
  id: string;
  displayTitle: string;
  showForSaleInLocation?: boolean;
  statusLabel: string;
  category: string | null;
  buildingType: string | null;
  propertyType: string | null;
  price?: number | null;
  priceOnRequest?: boolean;
  priceLabel?: string;
  location: string | null;
  micromarket: string | null;
  city: string | null;
  locationLine: string;
  bhk: string | null;
  bhkLabel: string | null;
  area: { size: number | null; unit: string | null };
  areaLabel?: string | null;
  furnishing?: string | null;
  floor?: string | null;
  constructionStatus?: string | null;
  imageUrl: string | null;
  imageUrls?: string[];
  imageCount?: number;
  isVerified?: boolean;
  postedByBadge?: string | null;
  updatedAt?: string;
  savedAt: string;
  showContact: boolean;
};

export type ShareOg = {
  title: string;
  description: string;
  imageUrl: string | null;
};

export type SharedPropertyDetail = SharedPropertyCard & {
  imageUrls: string[];
  videoCount?: number;
  about?: string | null;
  rera?: string | null;
  possession?: string | null;
  mapUrl?: string | null;
  specs: Array<{ label: string; value: string }>;
};

export type ListingGroup = {
  key: string;
  label: string;
  count: number;
  items: SharedPropertyCard[];
};

export type SharedListResponse = {
  clientId: string;
  clientName: string;
  updatedAt: string;
  total: number;
  page: number;
  limit: number;
  items: SharedPropertyCard[];
  groups: ListingGroup[];
  og?: ShareOg;
};

export type SharedDetailResponse = {
  clientId: string;
  clientName: string;
  item: SharedPropertyDetail;
  og?: ShareOg;
};

export type SharedSingleListingResponse = {
  item: SharedPropertyCard;
  share?: {
    listingId: string;
    url: string;
    message: string;
    whatsappUrl: string;
  };
  og?: ShareOg;
};

export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  timestamp: string;
  error?: { code?: string; message?: string };
};
