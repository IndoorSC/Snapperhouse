export type TradeStatus = "open" | "local_only" | "prohibited";
export type WaterType = "freshwater" | "brackish" | "marine";
export type BreedingDifficulty = "easy" | "moderate" | "challenging" | "specialist";
export type ListingType = "for_sale" | "rehoming";
export type ListingStatus = "draft" | "active" | "sold" | "removed" | "expired";
export type AusState = "ACT" | "NSW" | "NT" | "QLD" | "SA" | "TAS" | "VIC" | "WA";
export type EquipmentCategory =
  | "filtration"
  | "heating"
  | "lighting"
  | "co2_system"
  | "pump_powerhead"
  | "test_equipment"
  | "substrate"
  | "hardscape"
  | "décor"
  | "other";
export type EquipmentCondition = "new" | "like_new" | "good" | "fair" | "spares_repair";

export interface TaxonomyGroup {
  id: string;
  name: string;
  slug: string;
  section: "fish" | "plants" | "equipment";
  subgroups?: string[];
}

export interface TaxonomyGenus {
  id: string;
  groupId: string;
  name: string;
  slug: string;
}

export interface Species {
  id: string;
  slug: string;
  commonName: string;
  commonNameAliases: string[];
  scientificName: string;
  groupId: string;
  genusId: string;
  tradeStatus: TradeStatus;
  tradeNotes?: string;
  waterType: WaterType;
  tempMin?: number;
  tempMax?: number;
  phMin?: number;
  phMax?: number;
  ghMin?: number;
  ghMax?: number;
  khMin?: number;
  khMax?: number;
  diet?: string;
  minTankLitres?: number;
  compatibility?: string;
  breedingDifficulty?: BreedingDifficulty;
  originNotes?: string;
  careSummary?: string;
  approved: boolean;
}

export interface Seller {
  id: string;
  username: string;
  displayName: string;
  suburb: string;
  state: AusState;
  memberSince: string;
  sellerRating: number;
  sellerSales: number;
  buyerRating?: number;
  buyerPurchases?: number;
  noshowCount?: number;
  bio?: string;
  isSeller: boolean;
}

export interface Listing {
  id: string;
  listingType: ListingType;
  status: ListingStatus;
  speciesId: string;
  sellerId: string;
  quantityAvailable: number;
  price: number;
  priceNegotiable: boolean;
  locationSuburb: string;
  locationState: AusState;
  locationLat: number;
  locationLng: number;
  pickupAvailable: boolean;
  freightConsidered: boolean;
  sellerTemp?: number;
  sellerPh?: number;
  sellerGh?: number;
  sellerKh?: number;
  dietNotes?: string;
  minTankLitres?: number;
  compatibilityNotes?: string;
  strainVariant?: string;
  breedingNotes?: string;
  description: string;
  photos: string[];
  completenessScore: number;
  publishedAt: string;
  distanceKm?: number;
}

export interface EquipmentListing {
  id: string;
  sellerId: string;
  category: EquipmentCategory;
  brand?: string;
  model?: string;
  condition: EquipmentCondition;
  price: number;
  priceNegotiable: boolean;
  locationSuburb: string;
  locationState: AusState;
  photos: string[];
  description: string;
  publishedAt: string;
  status: ListingStatus;
}

export interface SetupListing {
  id: string;
  sellerId: string;
  tankLengthCm: number;
  tankWidthCm: number;
  tankHeightCm: number;
  tankVolumeLitres: number;
  price: number;
  priceNegotiable: boolean;
  locationSuburb: string;
  locationState: AusState;
  photos: string[];
  description: string;
  included: Record<string, boolean>;
  otherItems?: string;
  publishedAt: string;
  status: ListingStatus;
}

export interface EducationGuide {
  slug: string;
  title: string;
  audience: "buyers" | "sellers" | "all";
  summary: string;
  format: "web" | "web+pdf";
  content: string[];
}

export interface Rating {
  id: string;
  stars: number;
  note?: string;
  reviewerName: string;
  date: string;
  speciesName?: string;
  role: "seller" | "buyer";
}

export interface TradeDayEvent {
  id: string;
  title: string;
  area: string;
  date: string;
  venue: string;
  description: string;
  ticketPrice: string;
}
