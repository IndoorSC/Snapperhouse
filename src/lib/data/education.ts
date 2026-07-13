import type { EducationGuide, TradeDayEvent } from "@/lib/types";

export const educationGuides: EducationGuide[] = [
  {
    slug: "fish-acclimation-standard",
    title: "Fish acclimation — float and drip method",
    audience: "buyers",
    summary:
      "Correct temperature and chemistry acclimation to reduce fish losses after purchase.",
    format: "web+pdf",
    content: [
      "Never tip bag water into your display tank. Bag water can carry pathogens and mismatched chemistry.",
      "Float the sealed bag for 15–20 minutes to equalise temperature.",
      "Open the bag and begin a drip or cup-exchange acclimation over 30–60 minutes until pH and GH are close.",
      "Net the fish into your tank and discard the bag water.",
      "Dim lights for the first few hours and watch for signs of stress.",
    ],
  },
  {
    slug: "fish-acclimation-freight",
    title: "Fish acclimation — freight-arrived stock",
    audience: "buyers",
    summary: "Extra steps for stressed fish after courier transit.",
    format: "web+pdf",
    content: [
      "Inspect bags for leaks and extreme temperature before opening.",
      "Keep lights off and allow a longer drip acclimation — up to 90 minutes for large chemistry swings.",
      "Consider a quarantine tank for the first 2–4 weeks.",
      "Offer food sparingly on day one; focus on recovery first.",
    ],
  },
  {
    slug: "packaging-transport",
    title: "Packaging and transport guide for sellers",
    audience: "sellers",
    summary: "How to bag, oxygenate and pack fish safely for handover or freight.",
    format: "web+pdf",
    content: [
      "Use appropriate bag sizes — fish need oxygen space above the waterline.",
      "Double-bag livestock and tape corners to prevent puncture.",
      "Insulate against heat and cold with foam or polystyrene.",
      "Label bags with species and quantity. Keep paperwork dry and separate.",
    ],
  },
  {
    slug: "water-parameter-matching",
    title: "Water parameter matching",
    audience: "buyers",
    summary: "Why matching temp and pH before acclimation matters.",
    format: "web",
    content: [
      "Sudden pH or temperature swings are a leading cause of post-purchase losses.",
      "Ask sellers for their tank parameters and compare to your own before meetup.",
      "If parameters differ widely, plan a longer drip and consider RO blending.",
    ],
  },
  {
    slug: "quarantine-guide",
    title: "Quarantine guide",
    audience: "buyers",
    summary: "Recommended quarantine period and setup for new arrivals.",
    format: "web",
    content: [
      "A simple quarantine tank with heater, sponge filter and hiding spots is enough.",
      "Observe new fish for 2–4 weeks before adding to a display community.",
      "Watch for ich, fin damage, lethargy and refusal to eat.",
    ],
  },
  {
    slug: "rehoming-responsibly",
    title: "Rehoming responsibly",
    audience: "sellers",
    summary: "Responsibilities when rehoming livestock and finding suitable homes.",
    format: "web",
    content: [
      "Be honest about adult size, temperament and water needs.",
      "Prefer local pickup for delicate species when possible.",
      "Rehoming listings still count toward your financial year summary on Snapperhouse.",
    ],
  },
  {
    slug: "tax-awareness",
    title: "Tax awareness explainer",
    audience: "sellers",
    summary: "Plain-English hobby vs business distinction for fish sellers.",
    format: "web",
    content: [
      "Snapperhouse does not provide tax advice. This guide is educational only.",
      "The ATO looks at the overall pattern of activity — not individual listing labels.",
      "Occasional rehoming is different from regular breeding with a view to profit.",
      "If you sell regularly, keep records and consider the ATO hobby vs business tool.",
      "Consult a registered tax agent if you are unsure about your situation.",
    ],
  },
  {
    slug: "platform-rules",
    title: "Platform rules and seller code of conduct",
    audience: "all",
    summary: "What is and is not permitted on Snapperhouse.",
    format: "web",
    content: [
      "List only livestock and equipment you currently have in your possession.",
      "Photos must show the actual fish or gear for sale — stock photos are not allowed.",
      "Prohibited species cannot be listed. Local-only species require acknowledgement.",
      "All contact stays on-platform until both parties agree otherwise.",
      "Commercial wholesale lots are not permitted — this is a private-seller marketplace.",
    ],
  },
];

export const tradeDayEvents: TradeDayEvent[] = [
  {
    id: "td-1",
    title: "Snapperhouse Fish Trade Day — Metro Melbourne",
    area: "Metro Melbourne",
    date: "2026-09-13",
    venue: "Community hall — location announced to registrants",
    description:
      "Seller tables, livestock auction, bring-your-problem-fish corner, and door prizes. Priority entry for active Snapperhouse sellers.",
    ticketPrice: "$8 buyer entry",
  },
  {
    id: "td-2",
    title: "Snapperhouse Fish Trade Day — South East Melbourne",
    area: "South East Melbourne",
    date: "2026-12-06",
    venue: "TBC",
    description:
      "Quarterly community market supporting local club networks. Credits help fund these events.",
    ticketPrice: "$8 buyer entry",
  },
];

export const creditBundles = [
  { credits: 5, price: 5, perListing: 1.0, label: "Casual" },
  { credits: 20, price: 12, perListing: 0.6, label: "Regular" },
  { credits: 50, price: 25, perListing: 0.5, label: "Breeder" },
];

export function getGuide(slug: string) {
  return educationGuides.find((g) => g.slug === slug);
}
