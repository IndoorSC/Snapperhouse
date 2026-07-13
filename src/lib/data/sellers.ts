import type { Rating, Seller } from "@/lib/types";

export const sellers: Seller[] = [
  {
    id: "u-maya",
    username: "maya-aquatics",
    displayName: "Maya Aquatics",
    suburb: "Geelong",
    state: "VIC",
    memberSince: "2024-03-12",
    sellerRating: 4.9,
    sellerSales: 47,
    buyerRating: 5,
    buyerPurchases: 12,
    bio: "Community breeder focused on Corydoras and South American dwarfs.",
    isSeller: true,
  },
  {
    id: "u-tom",
    username: "tanktom",
    displayName: "Tank Tom",
    suburb: "Brunswick",
    state: "VIC",
    memberSince: "2023-11-02",
    sellerRating: 4.7,
    sellerSales: 31,
    noshowCount: 0,
    bio: "Planted tanks and rainbowfish. Pickup preferred in Melbourne metro.",
    isSeller: true,
  },
  {
    id: "u-sara",
    username: "shrimp-sara",
    displayName: "Shrimp Sara",
    suburb: "Parramatta",
    state: "NSW",
    memberSince: "2025-01-18",
    sellerRating: 5,
    sellerSales: 22,
    bio: "Neocaridina and Caridina colour lines. Soft water setups.",
    isSeller: true,
  },
  {
    id: "u-josh",
    username: "josh-reefless",
    displayName: "Josh Reefless",
    suburb: "Ipswich",
    state: "QLD",
    memberSince: "2024-07-09",
    sellerRating: 4.6,
    sellerSales: 18,
    bio: "Bettas, gouramis and peaceful community livestock.",
    isSeller: true,
  },
  {
    id: "u-ellen",
    username: "ellen-exits",
    displayName: "Ellen",
    suburb: "Hobart",
    state: "TAS",
    memberSince: "2025-06-01",
    sellerRating: 5,
    sellerSales: 3,
    bio: "Downsizing — rehoming healthy stock and kit.",
    isSeller: true,
  },
];

export const ratings: Rating[] = [
  {
    id: "r1",
    stars: 5,
    note: "Healthy bronze corys, bagged perfectly. Clear communication.",
    reviewerName: "Alex M",
    date: "2026-05-12",
    speciesName: "Bronze Corydora",
    role: "seller",
  },
  {
    id: "r2",
    stars: 5,
    note: "Beautiful colour on the Boesemanis. Would buy again.",
    reviewerName: "Priya K",
    date: "2026-04-28",
    speciesName: "Boesemani Rainbowfish",
    role: "seller",
  },
  {
    id: "r3",
    stars: 4,
    note: "Fish arrived well. Slight delay on meetup but worth it.",
    reviewerName: "Dan W",
    date: "2026-03-15",
    speciesName: "Neon Tetra",
    role: "seller",
  },
  {
    id: "r4",
    stars: 5,
    note: "Genuine buyer, on time, brought own containers.",
    reviewerName: "Maya Aquatics",
    date: "2026-05-12",
    role: "buyer",
  },
];

export function getSeller(idOrUsername: string) {
  return sellers.find((s) => s.id === idOrUsername || s.username === idOrUsername);
}

export function getSellerRatings(sellerId: string) {
  const seller = getSeller(sellerId);
  if (!seller) return [];
  return ratings.filter((r) => r.role === "seller");
}
