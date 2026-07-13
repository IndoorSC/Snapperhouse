import type { Species, TaxonomyGenus, WaterType, TradeStatus } from "@/lib/types";
import { taxonomyGroups } from "@/lib/data/groups";
import { slugify } from "@/lib/utils";

export { taxonomyGroups };

type Seed = {
  common: string;
  scientific: string;
  groupId: string;
  genus: string;
  aliases?: string[];
  waterType?: WaterType;
  tradeStatus?: TradeStatus;
  tradeNotes?: string;
  tempMin?: number;
  tempMax?: number;
  phMin?: number;
  phMax?: number;
  diet?: string;
  minTankLitres?: number;
  compatibility?: string;
  careSummary?: string;
};

/** Compact launch catalogue — all entries are pre-approved for listing */
const SEEDS: Seed[] = [
  // Angelfish
  { common: "Freshwater Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", aliases: ["Angelfish", "Scalar"], minTankLitres: 120 },
  { common: "Altum Angelfish", scientific: "Pterophyllum altum", groupId: "g-angelfish", genus: "Pterophyllum", aliases: ["Orinoco Altum", "True Altum"], tradeStatus: "local_only", tradeNotes: "Cannot be imported into Australia. Legal to breed and sell from existing local stock only.", minTankLitres: 200 },
  { common: "Leopold's Angelfish", scientific: "Pterophyllum leopoldi", groupId: "g-angelfish", genus: "Pterophyllum", minTankLitres: 120 },

  // Australian Natives
  { common: "Desert Goby", scientific: "Chlamydogobius eremius", groupId: "g-aus-natives", genus: "Chlamydogobius", minTankLitres: 40 },
  { common: "Empire Gudgeon", scientific: "Hypseleotris compressa", groupId: "g-aus-natives", genus: "Hypseleotris", minTankLitres: 60 },
  { common: "Firetail Gudgeon", scientific: "Hypseleotris galii", groupId: "g-aus-natives", genus: "Hypseleotris", aliases: ["Fire Tail Gudgeon"], minTankLitres: 40 },
  { common: "Southern Purple-spotted Gudgeon", scientific: "Mogurnda adspersa", groupId: "g-aus-natives", genus: "Mogurnda", aliases: ["Gudgeon Purple Spotted Southern"], minTankLitres: 80 },
  { common: "Olive Perchlet", scientific: "Ambassis agassizii", groupId: "g-aus-natives", genus: "Ambassis", minTankLitres: 60 },
  { common: "Australian Bass", scientific: "Macquaria novemaculeata", groupId: "g-aus-natives", genus: "Macquaria", minTankLitres: 300 },
  { common: "Silver Perch", scientific: "Bidyanus bidyanus", groupId: "g-aus-natives", genus: "Bidyanus", aliases: ["Perch Silver"], minTankLitres: 300 },
  { common: "Jade Perch", scientific: "Scortum barcoo", groupId: "g-aus-natives", genus: "Scortum", minTankLitres: 300 },
  { common: "Cairns Rainbowfish", scientific: "Cairnsichthys rhombosomoides", groupId: "g-aus-natives", genus: "Cairnsichthys", minTankLitres: 80 },

  // Barbs
  { common: "Tiger Barb", scientific: "Puntigrus tetrazona", groupId: "g-barbs", genus: "Puntigrus", aliases: ["Sumatra Barb"], minTankLitres: 80 },
  { common: "Cherry Barb", scientific: "Puntius titteya", groupId: "g-barbs", genus: "Puntius", minTankLitres: 60 },
  { common: "Rosy Barb", scientific: "Pethia conchonius", groupId: "g-barbs", genus: "Pethia", minTankLitres: 80 },
  { common: "Gold Barb", scientific: "Barbodes semifasciolatus", groupId: "g-barbs", genus: "Barbodes", minTankLitres: 80 },
  { common: "Odessa Barb", scientific: "Pethia padamya", groupId: "g-barbs", genus: "Pethia", minTankLitres: 80 },
  { common: "Checker Barb", scientific: "Oliotius oligolepis", groupId: "g-barbs", genus: "Oliotius", minTankLitres: 60 },
  { common: "Denison Barb", scientific: "Sahyadria denisonii", groupId: "g-barbs", genus: "Sahyadria", aliases: ["Red Line Torpedo Barb"], minTankLitres: 200 },
  { common: "Tinfoil Barb", scientific: "Barbonymus schwanenfeldii", groupId: "g-barbs", genus: "Barbonymus", minTankLitres: 300 },
  { common: "Clown Barb", scientific: "Barbodes everetti", groupId: "g-barbs", genus: "Barbodes", minTankLitres: 120 },
  { common: "Arulius Barb", scientific: "Dawkinsia arulius", groupId: "g-barbs", genus: "Dawkinsia", minTankLitres: 120 },

  // Bettas
  { common: "Siamese Fighting Fish", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", aliases: ["Betta", "Fancy Betta"], minTankLitres: 20 },
  { common: "Giant Betta", scientific: "Betta sp. giant", groupId: "g-bettas", genus: "Betta", aliases: ["King Betta"], minTankLitres: 40 },
  { common: "Plakat Betta", scientific: "Betta splendens plakat", groupId: "g-bettas", genus: "Betta", aliases: ["Short-fin Betta"], minTankLitres: 20 },
  { common: "Crowntail Betta", scientific: "Betta splendens crowntail", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Halfmoon Betta", scientific: "Betta splendens halfmoon", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Alien Betta", scientific: "Betta sp. alien", groupId: "g-bettas", genus: "Betta", minTankLitres: 40 },
  { common: "Wild Betta imbellis", scientific: "Betta imbellis", groupId: "g-bettas", genus: "Betta", aliases: ["Peaceful Betta"], minTankLitres: 40 },
  { common: "Betta mahachaiensis", scientific: "Betta mahachaiensis", groupId: "g-bettas", genus: "Betta", minTankLitres: 40 },

  // Brackish
  { common: "Archerfish", scientific: "Toxotes jaculatrix", groupId: "g-brackish", genus: "Toxotes", waterType: "brackish", minTankLitres: 200 },
  { common: "Green Spotted Puffer", scientific: "Dichotomyctere nigroviridis", groupId: "g-brackish", genus: "Dichotomyctere", waterType: "brackish", minTankLitres: 120 },
  { common: "Figure 8 Puffer", scientific: "Tetraodon biocellatus", groupId: "g-brackish", genus: "Tetraodon", waterType: "brackish", minTankLitres: 80 },
  { common: "Mono Argent", scientific: "Monodactylus argenteus", groupId: "g-brackish", genus: "Monodactylus", waterType: "brackish", aliases: ["Silver Moony"], minTankLitres: 200 },
  { common: "Mono Sebae", scientific: "Monodactylus sebae", groupId: "g-brackish", genus: "Monodactylus", waterType: "brackish", minTankLitres: 200 },
  { common: "Scat", scientific: "Scatophagus argus", groupId: "g-brackish", genus: "Scatophagus", waterType: "brackish", minTankLitres: 250 },
  { common: "Mudskipper", scientific: "Periophthalmus barbarus", groupId: "g-brackish", genus: "Periophthalmus", waterType: "brackish", minTankLitres: 60 },
  { common: "Knight Goby", scientific: "Stigmatogobius sadanundio", groupId: "g-brackish", genus: "Stigmatogobius", waterType: "brackish", minTankLitres: 80 },
  { common: "Bumblebee Goby", scientific: "Brachygobius doriae", groupId: "g-brackish", genus: "Brachygobius", waterType: "brackish", minTankLitres: 40 },

  // Catfish & Eels
  { common: "Glass Catfish", scientific: "Kryptopterus vitreolus", groupId: "g-catfish", genus: "Kryptopterus", minTankLitres: 100 },
  { common: "Pictus Catfish", scientific: "Pimelodus pictus", groupId: "g-catfish", genus: "Pimelodus", minTankLitres: 200 },
  { common: "Iridescent Shark", scientific: "Pangasianodon hypophthalmus", groupId: "g-catfish", genus: "Pangasianodon", minTankLitres: 500 },
  { common: "Synodontis Multipunctatus", scientific: "Synodontis multipunctatus", groupId: "g-catfish", genus: "Synodontis", aliases: ["Cuckoo Catfish"], minTankLitres: 150 },
  { common: "Synodontis Eupterus", scientific: "Synodontis eupterus", groupId: "g-catfish", genus: "Synodontis", aliases: ["Featherfin Synodontis"], minTankLitres: 150 },
  { common: "Otocinclus", scientific: "Otocinclus vittatus", groupId: "g-catfish", genus: "Otocinclus", aliases: ["Oto", "Dwarf Sucker"], minTankLitres: 40 },
  { common: "Chinese Algae Eater", scientific: "Gyrinocheilus aymonieri", groupId: "g-catfish", genus: "Gyrinocheilus", minTankLitres: 150 },
  { common: "Fire Eel", scientific: "Mastacembelus erythrotaenia", groupId: "g-catfish", genus: "Mastacembelus", minTankLitres: 250 },
  { common: "Peacock Eel", scientific: "Macrognathus siamensis", groupId: "g-catfish", genus: "Macrognathus", minTankLitres: 120 },
  { common: "Tire Track Eel", scientific: "Mastoacembelus armatus", groupId: "g-catfish", genus: "Mastacembelus", minTankLitres: 200 },
  { common: "Banjo Catfish", scientific: "Bunocephalus coracoideus", groupId: "g-catfish", genus: "Bunocephalus", minTankLitres: 80 },
  { common: "Striped Raphael Catfish", scientific: "Platydoras armatulus", groupId: "g-catfish", genus: "Platydoras", minTankLitres: 150 },

  // Cichlids
  { common: "Cockatoo Dwarf Cichlid", scientific: "Apistogramma cacatuoides", groupId: "g-cichlids", genus: "Apistogramma", aliases: ["A. cacatuoides"], minTankLitres: 60 },
  { common: "Agassiz's Dwarf Cichlid", scientific: "Apistogramma agassizii", groupId: "g-cichlids", genus: "Apistogramma", minTankLitres: 60 },
  { common: "Borelli's Dwarf Cichlid", scientific: "Apistogramma borellii", groupId: "g-cichlids", genus: "Apistogramma", minTankLitres: 60 },
  { common: "Ram Cichlid", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", aliases: ["German Blue Ram", "Ramirezi"], minTankLitres: 60 },
  { common: "Bolivian Ram", scientific: "Mikrogeophagus altispinosus", groupId: "g-cichlids", genus: "Mikrogeophagus", minTankLitres: 80 },
  { common: "Kribensis", scientific: "Pelvicachromis pulcher", groupId: "g-cichlids", genus: "Pelvicachromis", aliases: ["Rainbow Krib"], minTankLitres: 80 },
  { common: "Oscar", scientific: "Astronotus ocellatus", groupId: "g-cichlids", genus: "Astronotus", aliases: ["Velvet Cichlid"], minTankLitres: 250 },
  { common: "Convict Cichlid", scientific: "Amatitlania nigrofasciata", groupId: "g-cichlids", genus: "Amatitlania", minTankLitres: 100 },
  { common: "Firemouth Cichlid", scientific: "Thorichthys meeki", groupId: "g-cichlids", genus: "Thorichthys", minTankLitres: 120 },
  { common: "Jewel Cichlid", scientific: "Hemichromis lifalili", groupId: "g-cichlids", genus: "Hemichromis", minTankLitres: 100 },
  { common: "Electric Blue Acara", scientific: "Andinoacara pulcher", groupId: "g-cichlids", genus: "Andinoacara", minTankLitres: 120 },
  { common: "Keyhole Cichlid", scientific: "Cleithracara maronii", groupId: "g-cichlids", genus: "Cleithracara", minTankLitres: 80 },
  { common: "Severum", scientific: "Heros efasciatus", groupId: "g-cichlids", genus: "Heros", minTankLitres: 200 },
  { common: "Uaru", scientific: "Uaru amphiacanthoides", groupId: "g-cichlids", genus: "Uaru", minTankLitres: 250 },
  { common: "Green Terror", scientific: "Andinoacara rivulatus", groupId: "g-cichlids", genus: "Andinoacara", minTankLitres: 200 },
  { common: "Jack Dempsey", scientific: "Rocio octofasciata", groupId: "g-cichlids", genus: "Rocio", minTankLitres: 200 },
  { common: "Texas Cichlid", scientific: "Herichthys cyanoguttatus", groupId: "g-cichlids", genus: "Herichthys", minTankLitres: 250 },
  { common: "Frontosa", scientific: "Cyphotilapia frontosa", groupId: "g-cichlids", genus: "Cyphotilapia", minTankLitres: 300 },
  { common: "Yellow Lab", scientific: "Labidochromis caeruleus", groupId: "g-cichlids", genus: "Labidochromis", aliases: ["Electric Yellow"], minTankLitres: 120 },
  { common: "Demasoni", scientific: "Pseudotropheus demasoni", groupId: "g-cichlids", genus: "Pseudotropheus", minTankLitres: 120 },
  { common: "Kenyi Cichlid", scientific: "Maylandia lombardoi", groupId: "g-cichlids", genus: "Maylandia", minTankLitres: 120 },
  { common: "Auratus", scientific: "Melanochromis auratus", groupId: "g-cichlids", genus: "Melanochromis", minTankLitres: 120 },
  { common: "Cobalt Blue Zebra", scientific: "Maylandia callainos", groupId: "g-cichlids", genus: "Maylandia", minTankLitres: 120 },
  { common: "Peacock Cichlid", scientific: "Aulonocara sp.", groupId: "g-cichlids", genus: "Aulonocara", aliases: ["African Peacock"], minTankLitres: 150 },
  { common: "Tropheus Moorii", scientific: "Tropheus moorii", groupId: "g-cichlids", genus: "Tropheus", minTankLitres: 200 },
  { common: "German Blue Ram Pair", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", aliases: ["Blue Ram"], minTankLitres: 60 },

  // Corydoras
  { common: "Bronze Corydora", scientific: "Corydoras aeneus", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Bronze Cory", "Aeneus Cory"], minTankLitres: 60 },
  { common: "Peppered Corydora", scientific: "Corydoras paleatus", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Peppered Cory"], minTankLitres: 60 },
  { common: "Panda Corydora", scientific: "Corydoras panda", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Panda Cory"], minTankLitres: 60 },
  { common: "Sterbai Corydora", scientific: "Corydoras sterbai", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Sterbai Cory"], minTankLitres: 80 },
  { common: "Julii Corydora", scientific: "Corydoras julii", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Leopard Cory"], minTankLitres: 60 },
  { common: "Pygmy Corydora", scientific: "Corydoras pygmaeus", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Pygmy Cory"], minTankLitres: 40 },
  { common: "Habrosus Corydora", scientific: "Corydoras habrosus", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Salt and Pepper Cory"], minTankLitres: 40 },
  { common: "Skunk Corydora", scientific: "Corydoras arcuatus", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 60 },
  { common: "Venezuelan Black Cory", scientific: "Corydoras schultzei", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 60 },
  { common: "Albino Corydora", scientific: "Corydoras aeneus albino", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Albino Cory"], minTankLitres: 60 },
  { common: "Emerald Green Cory", scientific: "Corydoras splendens", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Brochis splendens"], minTankLitres: 80 },
  { common: "Orange Laser Cory", scientific: "Corydoras sp. orange laser", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 60 },
  { common: "CW009 Cory", scientific: "Corydoras sp. CW009", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 60 },
  { common: "Adolfoi Cory", scientific: "Corydoras adolfoi", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 60 },

  // Crabs
  { common: "Thai Micro Crab", scientific: "Limnopilos naiyanetri", groupId: "g-crabs", genus: "Limnopilos", aliases: ["False Spider Crab"], minTankLitres: 20 },
  { common: "Red Claw Crab", scientific: "Perisesarma bidens", groupId: "g-crabs", genus: "Perisesarma", waterType: "brackish", minTankLitres: 40 },
  { common: "Vampire Crab", scientific: "Geosesarma sp.", groupId: "g-crabs", genus: "Geosesarma", minTankLitres: 30 },
  { common: "Panther Crab", scientific: "Parathelphusa pantherina", groupId: "g-crabs", genus: "Parathelphusa", minTankLitres: 40 },

  // Crayfish
  { common: "Electric Blue Crayfish", scientific: "Procambarus alleni", groupId: "g-crayfish", genus: "Procambarus", minTankLitres: 60 },
  { common: "Red Cherry Crayfish", scientific: "Procambarus clarkii", groupId: "g-crayfish", genus: "Procambarus", aliases: ["Red Swamp Crayfish"], minTankLitres: 60 },
  { common: "Mexican Orange Crayfish", scientific: "Procambarus cubensis", groupId: "g-crayfish", genus: "Procambarus", minTankLitres: 60 },
  { common: "Blue Moon Crayfish", scientific: "Cherax quadricarinatus", groupId: "g-crayfish", genus: "Cherax", aliases: ["Redclaw"], minTankLitres: 100 },
  { common: "Yabby", scientific: "Cherax destructor", groupId: "g-crayfish", genus: "Cherax", minTankLitres: 80 },

  // Danios & Rasboras
  { common: "Zebra Danio", scientific: "Danio rerio", groupId: "g-danios", genus: "Danio", aliases: ["Zebrafish"], minTankLitres: 40 },
  { common: "Pearl Danio", scientific: "Danio albolineatus", groupId: "g-danios", genus: "Danio", minTankLitres: 60 },
  { common: "Giant Danio", scientific: "Devario aequipinnatus", groupId: "g-danios", genus: "Devario", minTankLitres: 120 },
  { common: "Celestial Pearl Danio", scientific: "Danio margaritatus", groupId: "g-danios", genus: "Danio", aliases: ["Galaxy Rasbora"], minTankLitres: 40 },
  { common: "Harlequin Rasbora", scientific: "Trigonostigma heteromorpha", groupId: "g-danios", genus: "Trigonostigma", minTankLitres: 60 },
  { common: "Chili Rasbora", scientific: "Boraras brigittae", groupId: "g-danios", genus: "Boraras", aliases: ["Mosquito Rasbora"], minTankLitres: 20 },
  { common: "Phoenix Rasbora", scientific: "Boraras merah", groupId: "g-danios", genus: "Boraras", minTankLitres: 20 },
  { common: "Lambchop Rasbora", scientific: "Trigonostigma espei", groupId: "g-danios", genus: "Trigonostigma", minTankLitres: 60 },
  { common: "Scissortail Rasbora", scientific: "Rasbora trilineata", groupId: "g-danios", genus: "Rasbora", minTankLitres: 80 },
  { common: "Emerald Dwarf Rasbora", scientific: "Celestichthys erythromicron", groupId: "g-danios", genus: "Celestichthys", minTankLitres: 40 },
  { common: "White Cloud Mountain Minnow", scientific: "Tanichthys albonubes", groupId: "g-danios", genus: "Tanichthys", aliases: ["White Cloud"], minTankLitres: 40 },

  // Discus
  { common: "Discus", scientific: "Symphysodon aequifasciatus", groupId: "g-discus", genus: "Symphysodon", aliases: ["Pompadour"], minTankLitres: 200 },
  { common: "Heckel Discus", scientific: "Symphysodon discus", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Blue Diamond Discus", scientific: "Symphysodon sp. blue diamond", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Pigeon Blood Discus", scientific: "Symphysodon sp. pigeon blood", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Red Melon Discus", scientific: "Symphysodon sp. red melon", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Snake Skin Discus", scientific: "Symphysodon sp. snakeskin", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },

  // Goldfish & Koi
  { common: "Common Goldfish", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 100 },
  { common: "Comet Goldfish", scientific: "Carassius auratus comet", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 100 },
  { common: "Fantail Goldfish", scientific: "Carassius auratus fantail", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Ryukin Goldfish", scientific: "Carassius auratus ryukin", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Oranda Goldfish", scientific: "Carassius auratus oranda", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Black Moor Goldfish", scientific: "Carassius auratus black moor", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Ranchu Goldfish", scientific: "Carassius auratus ranchu", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Pearlscale Goldfish", scientific: "Carassius auratus pearlscale", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Koi", scientific: "Cyprinus carpio", groupId: "g-goldfish", genus: "Cyprinus", aliases: ["Nishikigoi"], minTankLitres: 500 },
  { common: "Butterfly Koi", scientific: "Cyprinus carpio butterfly", groupId: "g-goldfish", genus: "Cyprinus", minTankLitres: 500 },

  // Gouramis
  { common: "Pearl Gourami", scientific: "Trichopodus leerii", groupId: "g-gouramis", genus: "Trichopodus", minTankLitres: 100 },
  { common: "Three Spot Gourami", scientific: "Trichopodus trichopterus", groupId: "g-gouramis", genus: "Trichopodus", aliases: ["Blue Gourami", "Opaline Gourami"], minTankLitres: 80 },
  { common: "Dwarf Gourami", scientific: "Trichogaster lalius", groupId: "g-gouramis", genus: "Trichogaster", minTankLitres: 40 },
  { common: "Honey Gourami", scientific: "Trichogaster chuna", groupId: "g-gouramis", genus: "Trichogaster", minTankLitres: 40 },
  { common: "Sparkling Gourami", scientific: "Trichopsis pumila", groupId: "g-gouramis", genus: "Trichopsis", minTankLitres: 30 },
  { common: "Croaking Gourami", scientific: "Trichopsis vittata", groupId: "g-gouramis", genus: "Trichopsis", minTankLitres: 40 },
  { common: "Moonlight Gourami", scientific: "Trichopodus microlepis", groupId: "g-gouramis", genus: "Trichopodus", minTankLitres: 100 },
  { common: "Kissing Gourami", scientific: "Helostoma temminckii", groupId: "g-gouramis", genus: "Helostoma", minTankLitres: 200 },
  { common: "Giant Gourami", scientific: "Osphronemus goramy", groupId: "g-gouramis", genus: "Osphronemus", minTankLitres: 500 },
  { common: "Paradise Fish", scientific: "Macropodus opercularis", groupId: "g-gouramis", genus: "Macropodus", minTankLitres: 60 },

  // Killifish
  { common: "Clown Killifish", scientific: "Epiplatys annulatus", groupId: "g-killifish", genus: "Epiplatys", aliases: ["Rocket Killifish"], minTankLitres: 30 },
  { common: "Blue Lyretail", scientific: "Fundulopanchax gardneri", groupId: "g-killifish", genus: "Fundulopanchax", aliases: ["Gardneri's Killifish"], minTankLitres: 40 },
  { common: "Least Killifish", scientific: "Heterandria formosa", groupId: "g-killifish", genus: "Heterandria", minTankLitres: 20 },
  { common: "Golden Wonder Killifish", scientific: "Aplocheilus lineatus", groupId: "g-killifish", genus: "Aplocheilus", minTankLitres: 60 },
  { common: "American Flagfish", scientific: "Jordanella floridae", groupId: "g-killifish", genus: "Jordanella", minTankLitres: 40 },
  { common: "Striped Panchax", scientific: "Aplocheilus lineatus", groupId: "g-killifish", genus: "Aplocheilus", minTankLitres: 60 },

  // Livebearers
  { common: "Guppy", scientific: "Poecilia reticulata", groupId: "g-livebearers", genus: "Poecilia", aliases: ["Fancy Guppy", "Millions Fish"], minTankLitres: 40 },
  { common: "Endler Guppy", scientific: "Poecilia wingei", groupId: "g-livebearers", genus: "Poecilia", aliases: ["Endler's Livebearer"], minTankLitres: 30 },
  { common: "Molly", scientific: "Poecilia sphenops", groupId: "g-livebearers", genus: "Poecilia", aliases: ["Short-fin Molly"], minTankLitres: 60 },
  { common: "Sailfin Molly", scientific: "Poecilia latipinna", groupId: "g-livebearers", genus: "Poecilia", minTankLitres: 80 },
  { common: "Balloon Molly", scientific: "Poecilia sphenops balloon", groupId: "g-livebearers", genus: "Poecilia", minTankLitres: 60 },
  { common: "Black Molly", scientific: "Poecilia sphenops black", groupId: "g-livebearers", genus: "Poecilia", minTankLitres: 60 },
  { common: "Platy", scientific: "Xiphophorus maculatus", groupId: "g-livebearers", genus: "Xiphophorus", aliases: ["Southern Platy"], minTankLitres: 40 },
  { common: "Variatus Platy", scientific: "Xiphophorus variatus", groupId: "g-livebearers", genus: "Xiphophorus", minTankLitres: 40 },
  { common: "Swordtail", scientific: "Xiphophorus hellerii", groupId: "g-livebearers", genus: "Xiphophorus", aliases: ["Green Swordtail"], minTankLitres: 80 },
  { common: "Pineapple Swordtail", scientific: "Xiphophorus hellerii pineapple", groupId: "g-livebearers", genus: "Xiphophorus", minTankLitres: 80 },
  { common: "Mosquitofish", scientific: "Gambusia holbrooki", groupId: "g-livebearers", genus: "Gambusia", aliases: ["Gambusia"], minTankLitres: 40 },
  { common: "Limia", scientific: "Limia nigrofasciata", groupId: "g-livebearers", genus: "Limia", aliases: ["Humpbacked Limia"], minTankLitres: 40 },

  // Loaches
  { common: "Clown Loach", scientific: "Chromobotia macracanthus", groupId: "g-loaches", genus: "Chromobotia", minTankLitres: 250 },
  { common: "Kuhli Loach", scientific: "Pangio kuhlii", groupId: "g-loaches", genus: "Pangio", aliases: ["Coolie Loach"], minTankLitres: 60 },
  { common: "Yoyo Loach", scientific: "Botia almorhae", groupId: "g-loaches", genus: "Botia", aliases: ["Pakistani Loach"], minTankLitres: 120 },
  { common: "Zebra Loach", scientific: "Botia striata", groupId: "g-loaches", genus: "Botia", minTankLitres: 100 },
  { common: "Dwarf Chain Loach", scientific: "Ambastaia sidthimunki", groupId: "g-loaches", genus: "Ambastaia", minTankLitres: 80 },
  { common: "Hillstream Loach", scientific: "Sewellia lineolata", groupId: "g-loaches", genus: "Sewellia", aliases: ["Tiger Hillstream Loach"], minTankLitres: 80 },
  { common: "Dojo Loach", scientific: "Misgurnus anguillicaudatus", groupId: "g-loaches", genus: "Misgurnus", aliases: ["Weather Loach"], minTankLitres: 100 },
  { common: "Horseface Loach", scientific: "Acantopsis dialuzona", groupId: "g-loaches", genus: "Acantopsis", minTankLitres: 120 },
  { common: "Sky Blue Dwarf Loach", scientific: "Ambastaia sidthimunki", groupId: "g-loaches", genus: "Ambastaia", minTankLitres: 80 },

  // Pencilfishes
  { common: "Three Lined Pencilfish", scientific: "Nannostomus trifasciatus", groupId: "g-pencilfishes", genus: "Nannostomus", minTankLitres: 50 },
  { common: "Coral Red Pencilfish", scientific: "Nannostomus mortenthaleri", groupId: "g-pencilfishes", genus: "Nannostomus", minTankLitres: 50 },
  { common: "Diagonal Pencilfish", scientific: "Nannostomus eques", groupId: "g-pencilfishes", genus: "Nannostomus", minTankLitres: 50 },
  { common: "Harrison's Pencilfish", scientific: "Nannostomus harrisoni", groupId: "g-pencilfishes", genus: "Nannostomus", minTankLitres: 50 },
  { common: "Beckford's Pencilfish", scientific: "Nannostomus beckfordi", groupId: "g-pencilfishes", genus: "Nannostomus", minTankLitres: 50 },

  // Plecos
  { common: "Bristlenose Pleco", scientific: "Ancistrus cf. cirrhosus", groupId: "g-plecos", genus: "Ancistrus", aliases: ["BN Pleco", "Ancistrus"], minTankLitres: 80 },
  { common: "Common Pleco", scientific: "Hypostomus plecostomus", groupId: "g-plecos", genus: "Hypostomus", minTankLitres: 300 },
  { common: "Clown Pleco", scientific: "Panaqolus maccus", groupId: "g-plecos", genus: "Panaqolus", aliases: ["L104"], minTankLitres: 80 },
  { common: "Zebra Pleco", scientific: "Hypancistrus zebra", groupId: "g-plecos", genus: "Hypancistrus", aliases: ["L046"], tradeStatus: "local_only", tradeNotes: "Import restricted — sell from local stock only.", minTankLitres: 80 },
  { common: "Rubber Lip Pleco", scientific: "Chaetostoma formosae", groupId: "g-plecos", genus: "Chaetostoma", minTankLitres: 80 },
  { common: "Gold Nugget Pleco", scientific: "Baryancistrus xanthellus", groupId: "g-plecos", genus: "Baryancistrus", aliases: ["L018", "L085"], minTankLitres: 150 },
  { common: "Sailfin Pleco", scientific: "Pterygoplichthys gibbiceps", groupId: "g-plecos", genus: "Pterygoplichthys", minTankLitres: 300 },
  { common: "Snowball Pleco", scientific: "Hypancistrus inspector", groupId: "g-plecos", genus: "Hypancistrus", aliases: ["L102"], minTankLitres: 80 },
  { common: "King Tiger Pleco", scientific: "Hypancistrus sp. L333", groupId: "g-plecos", genus: "Hypancistrus", aliases: ["L333"], minTankLitres: 80 },
  { common: "Blue Phantom Pleco", scientific: "Hemiancistrus sp. L128", groupId: "g-plecos", genus: "Hemiancistrus", aliases: ["L128"], minTankLitres: 100 },
  { common: "Longfin Bristlenose", scientific: "Ancistrus sp. longfin", groupId: "g-plecos", genus: "Ancistrus", minTankLitres: 80 },
  { common: "Super Red Bristlenose", scientific: "Ancistrus sp. super red", groupId: "g-plecos", genus: "Ancistrus", minTankLitres: 80 },

  // Rainbowfish — base species + AU locality forms (Coburg-style naming)
  { common: "Boesemani Rainbowfish", scientific: "Melanotaenia boesemani", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Boesemani Rainbow", "Boesmans Rainbow"], minTankLitres: 120 },
  { common: "Neon Rainbowfish", scientific: "Melanotaenia praecox", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Dwarf Neon Rainbow"], minTankLitres: 80 },
  { common: "Murray River Rainbowfish", scientific: "Melanotaenia fluviatilis", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Australian Rainbowfish", "M. fluviatilis"], minTankLitres: 100 },
  { common: "Eastern Rainbowfish", scientific: "Melanotaenia splendida splendida", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["M. s. splendida"], minTankLitres: 100 },
  { common: "Eastern Rainbowfish - Wallaby Creek", scientific: "Melanotaenia splendida splendida", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Wallaby Creek Rainbow"], minTankLitres: 100 },
  { common: "Western Rainbowfish - Drysdale River", scientific: "Melanotaenia splendida australis", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["M. s. australis", "Drysdale R Rainbow"], minTankLitres: 100 },
  { common: "Red-striped Rainbowfish", scientific: "Melanotaenia splendida rubrostriata", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["M. s. rubrostriata"], minTankLitres: 100 },
  { common: "Banded Rainbowfish - Goyder River", scientific: "Melanotaenia trifasciata", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Goyder River Rainbow", "M. trifasciata"], minTankLitres: 100 },
  { common: "Banded Rainbowfish - Flat Rock Creek", scientific: "Melanotaenia trifasciata", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Flat Rock Creek Rainbow"], minTankLitres: 100 },
  { common: "Banded Rainbowfish - Batavia Rainforest", scientific: "Melanotaenia trifasciata", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Batavia Rainforest Rainbow"], minTankLitres: 100 },
  { common: "Black-banded Rainbowfish", scientific: "Melanotaenia nigrans", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["M. nigrans", "Black Banded Rainbow"], minTankLitres: 100 },
  { common: "Threadfin Rainbowfish", scientific: "Iriatherina werneri", groupId: "g-rainbowfish", genus: "Iriatherina", minTankLitres: 60 },
  { common: "Lake Kutubu Rainbowfish", scientific: "Melanotaenia lacustris", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Turquoise Rainbow", "M. lacustris"], minTankLitres: 120 },
  { common: "Lake Wanam Rainbowfish", scientific: "Glossolepis wanamensis", groupId: "g-rainbowfish", genus: "Glossolepis", aliases: ["G. wanamensis"], minTankLitres: 120 },
  { common: "Red Rainbowfish", scientific: "Glossolepis incisus", groupId: "g-rainbowfish", genus: "Glossolepis", aliases: ["Salmon Red Rainbow"], minTankLitres: 120 },
  { common: "Parkinson's Rainbowfish", scientific: "Melanotaenia parkinsoni", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Parkinsons Rainbow"], minTankLitres: 100 },
  { common: "Parkinson's Rainbowfish - Yellow Form", scientific: "Melanotaenia parkinsoni", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Yellow Parkinson Rainbow"], minTankLitres: 100 },
  { common: "Duboulayi Rainbowfish", scientific: "Melanotaenia duboulayi", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Crimson Spotted Rainbow", "Duboulays Rainbow"], minTankLitres: 100 },
  { common: "Duboulayi Rainbowfish - Schnapper Creek", scientific: "Melanotaenia duboulayi", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Schnapper Creek Rainbow"], minTankLitres: 100 },
  { common: "McCulloch's Rainbowfish - Skull Creek", scientific: "Melanotaenia maccullochi", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Mccullochs Rainbow", "Skull Creek"], minTankLitres: 80 },
  { common: "McCulloch's Rainbowfish - Hopevale", scientific: "Melanotaenia maccullochi", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Hopevale Rainbow"], minTankLitres: 80 },
  { common: "Graceful Rainbowfish", scientific: "Melanotaenia gracilis", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["M. gracilis"], minTankLitres: 80 },
  { common: "Barred Rainbowfish - Clearwater Creek", scientific: "Chilatherina fasciata", groupId: "g-rainbowfish", genus: "Chilatherina", aliases: ["C. fasciata", "Clearwater Ck Rainbow", "Barred Rainbow"], minTankLitres: 100 },
  { common: "Little River Rainbowfish", scientific: "Melanotaenia wilsoni", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["M. wilsoni"], minTankLitres: 80 },
  { common: "Maalan Tiger Rainbowfish", scientific: "Melanotaenia eachamensis", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Maalan Ck", "M. eachamensis", "Lake Eacham Rainbow"], minTankLitres: 80 },
  { common: "Malanda Gold Rainbowfish - Williams Creek", scientific: "Melanotaenia sp. malanda gold", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Williams Creek Rainbow", "Malanda Gold"], minTankLitres: 80 },
  { common: "Utchee Creek Rainbowfish", scientific: "Melanotaenia utcheensis", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Utchee Creek"], minTankLitres: 80 },
  { common: "Afrikanos Rainbowfish", scientific: "Bedotia madagascariensis", groupId: "g-rainbowfish", genus: "Bedotia", aliases: ["Madagascar Rainbow"], minTankLitres: 100 },

  // Blue-eyes (Pseudomugil) — keep distinct from rainbowfish; locality matters
  { common: "Pacific Blue-eye", scientific: "Pseudomugil signifer", groupId: "g-aus-natives", genus: "Pseudomugil", aliases: ["Blue-eye", "P. signifer"], minTankLitres: 40 },
  { common: "Spotted Blue-eye", scientific: "Pseudomugil gertrudae", groupId: "g-aus-natives", genus: "Pseudomugil", aliases: ["P. gertrudae"], minTankLitres: 40 },
  { common: "Forktail Blue-eye", scientific: "Pseudomugil furcatus", groupId: "g-aus-natives", genus: "Pseudomugil", aliases: ["Forktail Rainbowfish", "P. furcatus"], minTankLitres: 40 },
  { common: "Blue-eye - cyanodorsalis", scientific: "Pseudomugil cyanodorsalis", groupId: "g-aus-natives", genus: "Pseudomugil", aliases: ["P. cyanodorsalis"], minTankLitres: 40 },
  { common: "Red-finned Blue-eye", scientific: "Scaturiginichthys vermeilipinnis", groupId: "g-aus-natives", genus: "Scaturiginichthys", aliases: ["Redfin Blue-eye", "S. vermeilipinnis"], tradeStatus: "local_only", tradeNotes: "Restricted/conservation-sensitive — verify current status before listing. Local stock only.", minTankLitres: 40 },
  { common: "Delicate Blue-eye", scientific: "Pseudomugil tenellus", groupId: "g-aus-natives", genus: "Pseudomugil", aliases: ["P. tenellus"], minTankLitres: 40 },
  { common: "Cape Blue-eye", scientific: "Pseudomugil majeri", groupId: "g-aus-natives", genus: "Pseudomugil", aliases: ["P. majeri"], minTankLitres: 40 },
  { common: "Honey Blue-eye", scientific: "Pseudomugil mellis", groupId: "g-aus-natives", genus: "Pseudomugil", aliases: ["P. mellis"], minTankLitres: 40 },

  // Extra AU natives from Coburg-style range
  { common: "Murray Cod", scientific: "Maccullochella peelii", groupId: "g-aus-natives", genus: "Maccullochella", minTankLitres: 500 },
  { common: "Golden Perch", scientific: "Macquaria ambigua", groupId: "g-aus-natives", genus: "Macquaria", aliases: ["Yellowbelly"], minTankLitres: 300 },
  { common: "Southern Pygmy Perch", scientific: "Nannoperca australis", groupId: "g-aus-natives", genus: "Nannoperca", minTankLitres: 40 },
  { common: "Western Pygmy Perch", scientific: "Nannoperca vittata", groupId: "g-aus-natives", genus: "Nannoperca", minTankLitres: 40 },
  { common: "Tandanus Catfish", scientific: "Tandanus tandanus", groupId: "g-aus-natives", genus: "Tandanus", aliases: ["Eel-tailed Catfish"], minTankLitres: 200 },
  { common: "Hyrtl's Catfish", scientific: "Neosilurus hyrtlii", groupId: "g-aus-natives", genus: "Neosilurus", aliases: ["Golden Eeltail Catfish"], minTankLitres: 150 },
  { common: "Australian Smelt", scientific: "Retropinna semoni", groupId: "g-aus-natives", genus: "Retropinna", minTankLitres: 60 },
  { common: "Saratoga - jardinii", scientific: "Scleropages jardinii", groupId: "g-aus-natives", genus: "Scleropages", aliases: ["Northern Saratoga"], tradeStatus: "local_only", tradeNotes: "Verify state and CITES/trade rules before listing.", minTankLitres: 500 },
  { common: "Archer Fish", scientific: "Toxotes chatareus", groupId: "g-aus-natives", genus: "Toxotes", aliases: ["Seven-spot Archer"], waterType: "brackish", minTankLitres: 200 },
  { common: "Purple Spotted Gudgeon", scientific: "Mogurnda mogurnda", groupId: "g-aus-natives", genus: "Mogurnda", minTankLitres: 80 },

  // Sharks
  { common: "Bala Shark", scientific: "Balantiocheilus melanopterus", groupId: "g-sharks", genus: "Balantiocheilus", aliases: ["Silver Shark"], minTankLitres: 400 },
  { common: "Red Tail Shark", scientific: "Epalzeorhynchos bicolor", groupId: "g-sharks", genus: "Epalzeorhynchos", minTankLitres: 150 },
  { common: "Rainbow Shark", scientific: "Epalzeorhynchos frenatum", groupId: "g-sharks", genus: "Epalzeorhynchos", minTankLitres: 120 },
  { common: "Black Shark", scientific: "Labeo chrysophekadion", groupId: "g-sharks", genus: "Labeo", minTankLitres: 300 },
  { common: "Harlequin Shark", scientific: "Labeo cyclorhynchus", groupId: "g-sharks", genus: "Labeo", minTankLitres: 200 },
  { common: "Siamese Algae Eater", scientific: "Crossocheilus oblongus", groupId: "g-sharks", genus: "Crossocheilus", aliases: ["SAE"], minTankLitres: 80 },
  { common: "Flying Fox", scientific: "Epalzeorhynchos kalopterus", groupId: "g-sharks", genus: "Epalzeorhynchos", minTankLitres: 120 },

  // Shrimp
  { common: "Cherry Shrimp", scientific: "Neocaridina davidi", groupId: "g-shrimp", genus: "Neocaridina", aliases: ["Red Cherry Shrimp", "RCS"], minTankLitres: 20 },
  { common: "Blue Dream Shrimp", scientific: "Neocaridina davidi blue", groupId: "g-shrimp", genus: "Neocaridina", minTankLitres: 20 },
  { common: "Yellow Shrimp", scientific: "Neocaridina davidi yellow", groupId: "g-shrimp", genus: "Neocaridina", minTankLitres: 20 },
  { common: "Orange Sakura Shrimp", scientific: "Neocaridina davidi orange", groupId: "g-shrimp", genus: "Neocaridina", minTankLitres: 20 },
  { common: "Green Jade Shrimp", scientific: "Neocaridina davidi green", groupId: "g-shrimp", genus: "Neocaridina", minTankLitres: 20 },
  { common: "Snowball Shrimp", scientific: "Neocaridina davidi white", groupId: "g-shrimp", genus: "Neocaridina", minTankLitres: 20 },
  { common: "Rili Shrimp", scientific: "Neocaridina davidi rili", groupId: "g-shrimp", genus: "Neocaridina", minTankLitres: 20 },
  { common: "Crystal Red Shrimp", scientific: "Caridina cantonensis", groupId: "g-shrimp", genus: "Caridina", aliases: ["CRS"], minTankLitres: 20 },
  { common: "Crystal Black Shrimp", scientific: "Caridina cantonensis black", groupId: "g-shrimp", genus: "Caridina", aliases: ["CBS"], minTankLitres: 20 },
  { common: "Taiwan Bee Shrimp", scientific: "Caridina cantonensis tb", groupId: "g-shrimp", genus: "Caridina", aliases: ["Shadow Bee", "Pure Red Line"], minTankLitres: 20 },
  { common: "Amano Shrimp", scientific: "Caridina multidentata", groupId: "g-shrimp", genus: "Caridina", aliases: ["Yamato Shrimp", "Algae Shrimp"], minTankLitres: 40 },
  { common: "Bamboo Shrimp", scientific: "Atyopsis moluccensis", groupId: "g-shrimp", genus: "Atyopsis", aliases: ["Filter Shrimp", "Wood Shrimp"], minTankLitres: 60 },
  { common: "Vampire Shrimp", scientific: "Atya gabonensis", groupId: "g-shrimp", genus: "Atya", minTankLitres: 80 },
  { common: "Ghost Shrimp", scientific: "Palaemonetes paludosus", groupId: "g-shrimp", genus: "Palaemonetes", aliases: ["Glass Shrimp"], minTankLitres: 20 },
  { common: "Sulawesi Shrimp", scientific: "Caridina dennerli", groupId: "g-shrimp", genus: "Caridina", aliases: ["Cardinal Shrimp"], minTankLitres: 30 },
  { common: "Tangerine Tiger Shrimp", scientific: "Caridina serrata", groupId: "g-shrimp", genus: "Caridina", minTankLitres: 20 },

  // Snails
  { common: "Mystery Snail", scientific: "Pomacea bridgesii", groupId: "g-snails", genus: "Pomacea", aliases: ["Apple Snail"], minTankLitres: 20 },
  { common: "Nerite Snail", scientific: "Neritina natalensis", groupId: "g-snails", genus: "Neritina", aliases: ["Zebra Nerite", "Tiger Nerite"], minTankLitres: 10 },
  { common: "Ramshorn Snail", scientific: "Planorbella duryi", groupId: "g-snails", genus: "Planorbella", minTankLitres: 10 },
  { common: "Malaysian Trumpet Snail", scientific: "Melanoides tuberculata", groupId: "g-snails", genus: "Melanoides", aliases: ["MTS"], minTankLitres: 10 },
  { common: "Assassin Snail", scientific: "Anentome helena", groupId: "g-snails", genus: "Anentome", minTankLitres: 20 },
  { common: "Rabbit Snail", scientific: "Tylomelania sp.", groupId: "g-snails", genus: "Tylomelania", minTankLitres: 40 },
  { common: "Horned Nerite Snail", scientific: "Clithon corona", groupId: "g-snails", genus: "Clithon", minTankLitres: 10 },
  { common: "Ivory Snail", scientific: "Pomacea bridgesii ivory", groupId: "g-snails", genus: "Pomacea", minTankLitres: 20 },
  { common: "Japanese Trapdoor Snail", scientific: "Sinotaia quadrata", groupId: "g-snails", genus: "Sinotaia", minTankLitres: 20 },

  // Tetras
  { common: "Neon Tetra", scientific: "Paracheirodon innesi", groupId: "g-tetras", genus: "Paracheirodon", aliases: ["Neons"], minTankLitres: 60 },
  { common: "Cardinal Tetra", scientific: "Paracheirodon axelrodi", groupId: "g-tetras", genus: "Paracheirodon", aliases: ["Cardinals"], minTankLitres: 80 },
  { common: "Green Neon Tetra", scientific: "Paracheirodon simulans", groupId: "g-tetras", genus: "Paracheirodon", minTankLitres: 60 },
  { common: "Black Neon Tetra", scientific: "Hyphessobrycon herbertaxelrodi", groupId: "g-tetras", genus: "Hyphessobrycon", minTankLitres: 60 },
  { common: "Glowlight Tetra", scientific: "Hemigrammus erythrozonus", groupId: "g-tetras", genus: "Hemigrammus", minTankLitres: 60 },
  { common: "Rummy Nose Tetra", scientific: "Hemigrammus rhodostomus", groupId: "g-tetras", genus: "Hemigrammus", minTankLitres: 80 },
  { common: "Black Phantom Tetra", scientific: "Hyphessobrycon megalopterus", groupId: "g-tetras", genus: "Hyphessobrycon", minTankLitres: 60 },
  { common: "Red Phantom Tetra", scientific: "Hyphessobrycon sweglesi", groupId: "g-tetras", genus: "Hyphessobrycon", minTankLitres: 60 },
  { common: "Buenos Aires Tetra", scientific: "Hyphessobrycon anisitsi", groupId: "g-tetras", genus: "Hyphessobrycon", minTankLitres: 80 },
  { common: "Serpae Tetra", scientific: "Hyphessobrycon eques", groupId: "g-tetras", genus: "Hyphessobrycon", aliases: ["Jewel Tetra"], minTankLitres: 60 },
  { common: "Lemon Tetra", scientific: "Hyphessobrycon pulchripinnis", groupId: "g-tetras", genus: "Hyphessobrycon", minTankLitres: 60 },
  { common: "Ember Tetra", scientific: "Hyphessobrycon amandae", groupId: "g-tetras", genus: "Hyphessobrycon", minTankLitres: 40 },
  { common: "Bloodfin Tetra", scientific: "Aphyocharax anisitsi", groupId: "g-tetras", genus: "Aphyocharax", minTankLitres: 60 },
  { common: "Congo Tetra", scientific: "Phenacogrammus interruptus", groupId: "g-tetras", genus: "Phenacogrammus", minTankLitres: 150 },
  { common: "Diamond Tetra", scientific: "Moenkhausia pittieri", groupId: "g-tetras", genus: "Moenkhausia", minTankLitres: 80 },
  { common: "Penguin Tetra", scientific: "Thayeria boehlkei", groupId: "g-tetras", genus: "Thayeria", aliases: ["Hockey Stick Tetra"], minTankLitres: 60 },
  { common: "X-Ray Tetra", scientific: "Pristella maxillaris", groupId: "g-tetras", genus: "Pristella", aliases: ["Pristella Tetra"], minTankLitres: 50 },
  { common: "Silver Tip Tetra", scientific: "Hasemania nana", groupId: "g-tetras", genus: "Hasemania", minTankLitres: 50 },
  { common: "Emperor Tetra", scientific: "Nematobrycon palmeri", groupId: "g-tetras", genus: "Nematobrycon", minTankLitres: 60 },
  { common: "Bleeding Heart Tetra", scientific: "Hyphessobrycon erythrostigma", groupId: "g-tetras", genus: "Hyphessobrycon", minTankLitres: 80 },
  { common: "Colombia Tetra", scientific: "Hyphessobrycon columbianus", groupId: "g-tetras", genus: "Hyphessobrycon", aliases: ["Blueberry Tetra"], minTankLitres: 80 },
  { common: "Flame Tetra", scientific: "Hyphessobrycon flammeus", groupId: "g-tetras", genus: "Hyphessobrycon", aliases: ["Von Rio Tetra"], minTankLitres: 50 },
  { common: "Maylandia Tetra", scientific: "Hyphessobrycon sp.", groupId: "g-tetras", genus: "Hyphessobrycon", minTankLitres: 60 },
  { common: "Diamond Head Neon", scientific: "Paracheirodon innesi diamond", groupId: "g-tetras", genus: "Paracheirodon", minTankLitres: 60 },

  // Miscellaneous
  { common: "Freshwater Stingray", scientific: "Potamotrygon sp.", groupId: "g-misc", genus: "Potamotrygon", tradeStatus: "local_only", tradeNotes: "Specialist keepers only — verify local regulations.", minTankLitres: 500 },
  { common: "African Butterflyfish", scientific: "Pantodon buchholzi", groupId: "g-misc", genus: "Pantodon", minTankLitres: 100 },
  { common: "Elephant Nose Fish", scientific: "Gnathonemus petersii", groupId: "g-misc", genus: "Gnathonemus", minTankLitres: 150 },
  { common: "Ropefish", scientific: "Erpetoichthys calabaricus", groupId: "g-misc", genus: "Erpetoichthys", aliases: ["Reedfish"], minTankLitres: 200 },
  { common: "Bichir", scientific: "Polypterus senegalus", groupId: "g-misc", genus: "Polypterus", aliases: ["Dinopterus"], minTankLitres: 200 },
  { common: "Freshwater Flatfish", scientific: "Catathyridium jenynsii", groupId: "g-misc", genus: "Catathyridium", minTankLitres: 80 },
  { common: "Leaf Fish", scientific: "Monocirrhus polyacanthus", groupId: "g-misc", genus: "Monocirrhus", minTankLitres: 60 },
  { common: "Silver Dollar", scientific: "Metynnis argenteus", groupId: "g-misc", genus: "Metynnis", minTankLitres: 200 },
  { common: "Pacu", scientific: "Piaractus brachypomus", groupId: "g-misc", genus: "Piaractus", aliases: ["Red Belly Pacu"], minTankLitres: 500 },
  { common: "Arowana", scientific: "Osteoglossum bicirrhosum", groupId: "g-misc", genus: "Osteoglossum", aliases: ["Silver Arowana"], tradeStatus: "local_only", tradeNotes: "CITES considerations may apply — verify before listing.", minTankLitres: 500 },
  { common: "Datnoid", scientific: "Datnioides microlepis", groupId: "g-misc", genus: "Datnioides", aliases: ["Tiger Fish"], minTankLitres: 300 },
  { common: "Freshwater Pipefish", scientific: "Microphis brachyurus", groupId: "g-misc", genus: "Microphis", waterType: "brackish", minTankLitres: 60 },
  { common: "Chocolate Gourami", scientific: "Sphaerichthys osphromenoides", groupId: "g-misc", genus: "Sphaerichthys", minTankLitres: 50 },
  { common: "Black Ghost Knifefish", scientific: "Apteronotus albifrons", groupId: "g-misc", genus: "Apteronotus", aliases: ["Knife Fish Black Ghost"], minTankLitres: 200 },
  { common: "Axolotl", scientific: "Ambystoma mexicanum", groupId: "g-misc", genus: "Ambystoma", aliases: ["Walking Fish"], minTankLitres: 60 },
  { common: "Axolotl - Golden", scientific: "Ambystoma mexicanum", groupId: "g-misc", genus: "Ambystoma", aliases: ["Walking Fish Golden"], minTankLitres: 60 },
  { common: "Axolotl - White / Leucistic", scientific: "Ambystoma mexicanum", groupId: "g-misc", genus: "Ambystoma", aliases: ["Walking Fish White"], minTankLitres: 60 },
  { common: "Axolotl - Black", scientific: "Ambystoma mexicanum", groupId: "g-misc", genus: "Ambystoma", aliases: ["Walking Fish Black"], minTankLitres: 60 },
  { common: "Medaka", scientific: "Oryzias latipes", groupId: "g-misc", genus: "Oryzias", aliases: ["Japanese Rice Fish"], minTankLitres: 30 },
  { common: "Halfbeak - Gold", scientific: "Dermogenys pusilla", groupId: "g-misc", genus: "Dermogenys", minTankLitres: 40 },

  // --- Wholesaler stock book morphs / varieties (Jul 2026) ---
  // Discus forms
  { common: "Assorted Discus - Local", scientific: "Symphysodon aequifasciatus", groupId: "g-discus", genus: "Symphysodon", aliases: ["Local Discus"], minTankLitres: 200 },
  { common: "Assorted Discus - Imported", scientific: "Symphysodon aequifasciatus", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Yellow Pigeon Checkerboard Discus", scientific: "Symphysodon sp. yellow pigeon checkerboard", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Solid Blue Diamond Discus", scientific: "Symphysodon sp. solid blue diamond", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Checkerboard Discus", scientific: "Symphysodon sp. checkerboard", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Pigeon Blood Gold Hifin Discus", scientific: "Symphysodon sp. pigeon blood gold hifin", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Blue Diamond Discus", scientific: "Symphysodon sp. blue diamond", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Pigeon Blood Discus", scientific: "Symphysodon sp. pigeon blood", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Red Melon Discus", scientific: "Symphysodon sp. red melon", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Snake Skin Discus", scientific: "Symphysodon sp. snakeskin", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },
  { common: "Heckel Discus", scientific: "Symphysodon discus", groupId: "g-discus", genus: "Symphysodon", minTankLitres: 200 },

  // Angelfish forms
  { common: "Assorted Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", aliases: ["Assorted Angel"], minTankLitres: 120 },
  { common: "Local Assorted Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", minTankLitres: 120 },
  { common: "Koi Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", aliases: ["Koi Angel"], minTankLitres: 120 },
  { common: "Veiltail Assorted Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", aliases: ["V.T Assorted Angel", "VT Angel"], minTankLitres: 120 },
  { common: "Albino Red Eye Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", minTankLitres: 120 },
  { common: "Santa Isabel Red Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", aliases: ["Santa Izabell Red Angel"], minTankLitres: 120 },
  { common: "Peruensis Altum Angelfish", scientific: "Pterophyllum sp. peruensis", groupId: "g-angelfish", genus: "Pterophyllum", aliases: ["Peruensis Altum Angel"], tradeStatus: "local_only", tradeNotes: "Sell from local stock only — verify import status.", minTankLitres: 200 },
  { common: "Marble Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", minTankLitres: 120 },
  { common: "Black Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", minTankLitres: 120 },
  { common: "Gold Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", minTankLitres: 120 },
  { common: "Silver Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", minTankLitres: 120 },
  { common: "Blushing Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", minTankLitres: 120 },
  { common: "Pearlscale Angelfish", scientific: "Pterophyllum scalare", groupId: "g-angelfish", genus: "Pterophyllum", minTankLitres: 120 },

  // Oscars
  { common: "Albino Tiger Oscar", scientific: "Astronotus ocellatus", groupId: "g-cichlids", genus: "Astronotus", minTankLitres: 250 },
  { common: "Red Oscar", scientific: "Astronotus ocellatus", groupId: "g-cichlids", genus: "Astronotus", minTankLitres: 250 },
  { common: "Chilli Red Oscar", scientific: "Astronotus ocellatus", groupId: "g-cichlids", genus: "Astronotus", minTankLitres: 250 },
  { common: "Red Copper Oscar", scientific: "Astronotus ocellatus", groupId: "g-cichlids", genus: "Astronotus", minTankLitres: 250 },
  { common: "Tiger Oscar", scientific: "Astronotus ocellatus", groupId: "g-cichlids", genus: "Astronotus", minTankLitres: 250 },
  { common: "Red Tiger Oscar", scientific: "Astronotus ocellatus", groupId: "g-cichlids", genus: "Astronotus", aliases: ["Oscar - Super Red Tiger"], minTankLitres: 250 },
  { common: "Red Tiger Oscar - Nemo", scientific: "Astronotus ocellatus", groupId: "g-cichlids", genus: "Astronotus", minTankLitres: 250 },
  { common: "Lemon Oscar", scientific: "Astronotus ocellatus", groupId: "g-cichlids", genus: "Astronotus", minTankLitres: 250 },

  // Rams / Apistos morphs
  { common: "Ramirezi Assorted", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", aliases: ["German Blue Ram Assorted"], minTankLitres: 60 },
  { common: "Ramirezi Longfin Assorted", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", minTankLitres: 60 },
  { common: "Ramirezi Balloon Assorted", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", minTankLitres: 60 },
  { common: "Ramirezi Blue", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", minTankLitres: 60 },
  { common: "Ramirezi Electric Blue", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", minTankLitres: 60 },
  { common: "Balloon Ramirezi Electric Blue", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", minTankLitres: 60 },
  { common: "Balloon Ramirezi Electric Gold", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", aliases: ["Ramirezi Balloon Electric Gold"], minTankLitres: 60 },
  { common: "Balloon Ramirezi Black", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", minTankLitres: 60 },
  { common: "Balloon Platinum Ram", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", minTankLitres: 60 },
  { common: "Ramirezi Golden", scientific: "Mikrogeophagus ramirezi", groupId: "g-cichlids", genus: "Mikrogeophagus", minTankLitres: 60 },
  { common: "Apistogramma cacatuoides Super Red", scientific: "Apistogramma cacatuoides", groupId: "g-cichlids", genus: "Apistogramma", aliases: ["Apisto Cacatuoides Super Red", "Apistogramma Cacatuoides Orange"], minTankLitres: 60 },
  { common: "Apistogramma agassizii Gold Fire Red", scientific: "Apistogramma agassizii", groupId: "g-cichlids", genus: "Apistogramma", minTankLitres: 60 },
  { common: "Apistogramma agassizii Tefe Red Back", scientific: "Apistogramma agassizii", groupId: "g-cichlids", genus: "Apistogramma", minTankLitres: 60 },
  { common: "Apistogramma borellii Yellow", scientific: "Apistogramma borellii", groupId: "g-cichlids", genus: "Apistogramma", minTankLitres: 60 },
  { common: "Apistogramma hongsloi", scientific: "Apistogramma hongsloi", groupId: "g-cichlids", genus: "Apistogramma", minTankLitres: 60 },
  { common: "Apistogramma viejita Red Neck", scientific: "Apistogramma viejita", groupId: "g-cichlids", genus: "Apistogramma", minTankLitres: 60 },
  { common: "Neon Blue Acara", scientific: "Andinoacara pulcher", groupId: "g-cichlids", genus: "Andinoacara", minTankLitres: 100 },
  { common: "Bolivian Butterfly Cichlid", scientific: "Mikrogeophagus altispinosus", groupId: "g-cichlids", genus: "Mikrogeophagus", aliases: ["Bolivian Ram"], minTankLitres: 80 },
  { common: "Chocolate Cichlid - Red Ucayali", scientific: "Hypselecara temporalis", groupId: "g-cichlids", genus: "Hypselecara", minTankLitres: 150 },
  { common: "Severum Rotkeil", scientific: "Heros efasciatus", groupId: "g-cichlids", genus: "Heros", minTankLitres: 200 },
  { common: "Kribensis Striped - Kienke", scientific: "Pelvicachromis kribensis", groupId: "g-cichlids", genus: "Pelvicachromis", minTankLitres: 80 },

  // Malawi / peacock forms
  { common: "Electric Yellow Lab", scientific: "Labidochromis caeruleus", groupId: "g-cichlids", genus: "Labidochromis", aliases: ["Electric Yellow", "Yellow Lab"], minTankLitres: 120 },
  { common: "Electric Yellow - Local", scientific: "Labidochromis caeruleus", groupId: "g-cichlids", genus: "Labidochromis", minTankLitres: 120 },
  { common: "Blue Dolphin Cichlid", scientific: "Cyrtocara moorii", groupId: "g-cichlids", genus: "Cyrtocara", aliases: ["Cyrtocara moorii"], minTankLitres: 200 },
  { common: "Copadichromis Kadango Red", scientific: "Copadichromis borleyi", groupId: "g-cichlids", genus: "Copadichromis", minTankLitres: 150 },
  { common: "Assorted Peacock Cichlid", scientific: "Aulonocara sp.", groupId: "g-cichlids", genus: "Aulonocara", minTankLitres: 150 },
  { common: "Peacock Benga German Strain", scientific: "Aulonocara baenschi", groupId: "g-cichlids", genus: "Aulonocara", minTankLitres: 150 },
  { common: "Peacock Blue", scientific: "Aulonocara sp. blue", groupId: "g-cichlids", genus: "Aulonocara", minTankLitres: 150 },
  { common: "Peacock Blue Neon", scientific: "Aulonocara sp. blue neon", groupId: "g-cichlids", genus: "Aulonocara", minTankLitres: 150 },
  { common: "Peacock Dragon Blood", scientific: "Aulonocara sp. dragon blood", groupId: "g-cichlids", genus: "Aulonocara", minTankLitres: 150 },
  { common: "Peacock Eureka Red", scientific: "Aulonocara sp. eureka red", groupId: "g-cichlids", genus: "Aulonocara", minTankLitres: 150 },
  { common: "Peacock Jacobfreibergi", scientific: "Aulonocara jacobfreibergi", groupId: "g-cichlids", genus: "Aulonocara", minTankLitres: 150 },
  { common: "Peacock Strawberry", scientific: "Aulonocara sp. strawberry", groupId: "g-cichlids", genus: "Aulonocara", minTankLitres: 150 },
  { common: "Peacock Sulphur Crested", scientific: "Aulonocara maylandi", groupId: "g-cichlids", genus: "Aulonocara", minTankLitres: 150 },
  { common: "Protomelas Red Empress", scientific: "Protomelas taeniolatus", groupId: "g-cichlids", genus: "Protomelas", minTankLitres: 150 },
  { common: "Rusty Cichlid", scientific: "Iodotropheus sprengerae", groupId: "g-cichlids", genus: "Iodotropheus", minTankLitres: 100 },
  { common: "Electric Blue Hap", scientific: "Sciaenochromis ahli", groupId: "g-cichlids", genus: "Sciaenochromis", aliases: ["Electric Blue"], minTankLitres: 150 },
  { common: "Zebra Cobalt Blue", scientific: "Maylandia callainos", groupId: "g-cichlids", genus: "Maylandia", minTankLitres: 120 },
  { common: "Zebra Orange Blotch", scientific: "Maylandia zebra", groupId: "g-cichlids", genus: "Maylandia", aliases: ["OB Zebra"], minTankLitres: 120 },
  { common: "Metriaclima lombardoi", scientific: "Maylandia lombardoi", groupId: "g-cichlids", genus: "Maylandia", aliases: ["Kenyi"], minTankLitres: 120 },
  { common: "Melanochromis auratus", scientific: "Melanochromis auratus", groupId: "g-cichlids", genus: "Melanochromis", minTankLitres: 120 },

  // Tanganyika
  { common: "Altolamprologus calvus Black", scientific: "Altolamprologus calvus", groupId: "g-cichlids", genus: "Altolamprologus", minTankLitres: 120 },
  { common: "Julidochromis marlieri", scientific: "Julidochromis marlieri", groupId: "g-cichlids", genus: "Julidochromis", minTankLitres: 100 },
  { common: "Lemon Cichlid Orange", scientific: "Neolamprologus leleupi", groupId: "g-cichlids", genus: "Neolamprologus", minTankLitres: 100 },
  { common: "Ophthalmotilapia ventralis", scientific: "Ophthalmotilapia ventralis", groupId: "g-cichlids", genus: "Ophthalmotilapia", minTankLitres: 150 },
  { common: "Princess of Burundi", scientific: "Neolamprologus brichardi", groupId: "g-cichlids", genus: "Neolamprologus", aliases: ["Princess Cichlid"], minTankLitres: 100 },
  { common: "Tropheus Black - Bemba Red", scientific: "Tropheus moorii", groupId: "g-cichlids", genus: "Tropheus", minTankLitres: 200 },
  { common: "Tropheus duboisi", scientific: "Tropheus duboisi", groupId: "g-cichlids", genus: "Tropheus", minTankLitres: 200 },
  { common: "Tropheus Cherry Spot", scientific: "Tropheus sp. cherry spot", groupId: "g-cichlids", genus: "Tropheus", minTankLitres: 200 },

  // Goldfish varieties from stock book
  { common: "Butterfly Tail Goldfish", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", aliases: ["Assorted Butterfly Tail"], minTankLitres: 80 },
  { common: "Calico Fantail Goldfish", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Comet Red & White", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 100 },
  { common: "Comet Golden", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 100 },
  { common: "Fantail Red", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Nymph Goldfish", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Assorted Oranda", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Crown Head Oranda", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Oranda Black Red Cap", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Oranda Black & White", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Oranda Calico", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Oranda Multi Colour", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Oranda Red Cap", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Oranda Sakura", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Oranda Short Tail", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Pearlscale Ping Pong", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Assorted Ranchu", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Ranchu Calico", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Assorted Ryukin", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Ryukin Calico", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Ryukin Calico Dragon Eye", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Shubunkin", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 100 },
  { common: "Calico Dragon Eye Shorttail", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Bubble Eye Goldfish", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },
  { common: "Lionhead Goldfish", scientific: "Carassius auratus", groupId: "g-goldfish", genus: "Carassius", minTankLitres: 80 },

  // Betta forms (common types sellers list)
  { common: "Betta Male Halfmoon", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Crowntail", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Plakat Assorted", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Doubletail", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Super Delta", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Elephant Ear", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Halfmoon Rosetail", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Plakat Galaxy Koi", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Plakat Nemo", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Veiltail Nemo Koi", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Male Samurai Assorted", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Female Assorted", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },
  { common: "Betta Female Halfmoon", scientific: "Betta splendens", groupId: "g-bettas", genus: "Betta", minTankLitres: 20 },

  // Extra stock-book community fish morphs
  { common: "Golden Tiger Barb", scientific: "Puntigrus tetrazona", groupId: "g-barbs", genus: "Puntigrus", minTankLitres: 80 },
  { common: "Moss Green Tiger Barb", scientific: "Puntigrus tetrazona", groupId: "g-barbs", genus: "Puntigrus", minTankLitres: 80 },
  { common: "Odessa Barb Longfin", scientific: "Pethia padamya", groupId: "g-barbs", genus: "Pethia", minTankLitres: 80 },
  { common: "Black Ruby Barb", scientific: "Pethia nigrofasciata", groupId: "g-barbs", genus: "Pethia", minTankLitres: 60 },
  { common: "Albino Cory Longfin", scientific: "Corydoras aeneus", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 60 },
  { common: "Albino Peppered Cory", scientific: "Corydoras paleatus", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 60 },
  { common: "Corydoras duplicareus", scientific: "Corydoras duplicareus", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 60 },
  { common: "Corydoras elegans", scientific: "Corydoras elegans", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 60 },
  { common: "Corydoras metae - Bandit", scientific: "Corydoras metae", groupId: "g-corydoras", genus: "Corydoras", aliases: ["Bandit Cory"], minTankLitres: 60 },
  { common: "Corydoras pygmaeus Albino", scientific: "Corydoras pygmaeus", groupId: "g-corydoras", genus: "Corydoras", minTankLitres: 40 },
  { common: "Albino Bristlenose", scientific: "Ancistrus cf. cirrhosus", groupId: "g-plecos", genus: "Ancistrus", minTankLitres: 80 },
  { common: "Marble Bristlenose", scientific: "Ancistrus cf. cirrhosus", groupId: "g-plecos", genus: "Ancistrus", minTankLitres: 80 },
  { common: "Red Bristlenose", scientific: "Ancistrus cf. cirrhosus", groupId: "g-plecos", genus: "Ancistrus", aliases: ["Super Red Bristlenose"], minTankLitres: 80 },
  { common: "Peppermint Bristlenose L071", scientific: "Ancistrus sp. L071", groupId: "g-plecos", genus: "Ancistrus", minTankLitres: 80 },
  { common: "Mega Clown Pleco L340", scientific: "Hypancistrus sp. L340", groupId: "g-plecos", genus: "Hypancistrus", minTankLitres: 80 },
  { common: "Longfin Zebra Danio", scientific: "Danio rerio", groupId: "g-danios", genus: "Danio", minTankLitres: 40 },
  { common: "Golden Zebra Danio", scientific: "Danio rerio", groupId: "g-danios", genus: "Danio", minTankLitres: 40 },
  { common: "Leopard Danio", scientific: "Danio rerio", groupId: "g-danios", genus: "Danio", minTankLitres: 40 },
  { common: "Albino Neon Tetra", scientific: "Paracheirodon innesi", groupId: "g-tetras", genus: "Paracheirodon", minTankLitres: 60 },
  { common: "Albino Cardinal Tetra", scientific: "Paracheirodon axelrodi", groupId: "g-tetras", genus: "Paracheirodon", minTankLitres: 80 },
  { common: "Black Widow Tetra", scientific: "Gymnocorymbus ternetzi", groupId: "g-tetras", genus: "Gymnocorymbus", aliases: ["Black Tetra"], minTankLitres: 60 },
  { common: "Golden Black Widow Tetra", scientific: "Gymnocorymbus ternetzi", groupId: "g-tetras", genus: "Gymnocorymbus", minTankLitres: 60 },
  { common: "Longfin Black Widow Tetra", scientific: "Gymnocorymbus ternetzi", groupId: "g-tetras", genus: "Gymnocorymbus", minTankLitres: 60 },
  { common: "Albino Emperor Tetra", scientific: "Nematobrycon palmeri", groupId: "g-tetras", genus: "Nematobrycon", minTankLitres: 60 },
  { common: "Black Emperor Tetra", scientific: "Nematobrycon palmeri", groupId: "g-tetras", genus: "Nematobrycon", minTankLitres: 60 },
  { common: "Kerri Tetra - Blue Emperor", scientific: "Inpaichthys kerri", groupId: "g-tetras", genus: "Inpaichthys", aliases: ["Blue Emperor Tetra"], minTankLitres: 60 },
  { common: "Rosy Tetra", scientific: "Hyphessobrycon rosaceus", groupId: "g-tetras", genus: "Hyphessobrycon", minTankLitres: 60 },
  { common: "Neon Tetra - Rosy", scientific: "Paracheirodon innesi", groupId: "g-tetras", genus: "Paracheirodon", aliases: ["Rosy Neon"], minTankLitres: 60 },
  { common: "Glowlight Tetra Albino", scientific: "Hemigrammus erythrozonus", groupId: "g-tetras", genus: "Hemigrammus", minTankLitres: 60 },
  { common: "Thicklip Gourami - Sunset", scientific: "Trichogaster labiosa", groupId: "g-gouramis", genus: "Trichogaster", aliases: ["Gourami Thicklip Orange"], minTankLitres: 60 },
  { common: "Dwarf Flame Gourami", scientific: "Trichogaster lalius", groupId: "g-gouramis", genus: "Trichogaster", minTankLitres: 40 },
  { common: "Dwarf Neon Gourami", scientific: "Trichogaster lalius", groupId: "g-gouramis", genus: "Trichogaster", minTankLitres: 40 },
  { common: "Dwarf Blue Coral Gourami", scientific: "Trichogaster lalius", groupId: "g-gouramis", genus: "Trichogaster", minTankLitres: 40 },

  // Extra rainbow locality lines from this stock book
  { common: "Mary Chequered Rainbowfish", scientific: "Melanotaenia sp. mary chequered", groupId: "g-rainbowfish", genus: "Melanotaenia", minTankLitres: 100 },
  { common: "Deepwater Creek Rainbowfish", scientific: "Melanotaenia sp. deepwater creek", groupId: "g-rainbowfish", genus: "Melanotaenia", minTankLitres: 100 },
  { common: "Pioneer River Rainbowfish", scientific: "Melanotaenia sp. pioneer river", groupId: "g-rainbowfish", genus: "Melanotaenia", minTankLitres: 100 },
  { common: "Purple Spotted Gudgeon - Prior Creek", scientific: "Mogurnda adspersa", groupId: "g-aus-natives", genus: "Mogurnda", minTankLitres: 80 },

  // Aquatic Plants (listable as livestock-adjacent in plants group)
  { common: "Java Fern", scientific: "Microsorum pteropus", groupId: "g-plants", genus: "Microsorum", minTankLitres: 20 },
  { common: "Anubias Nana", scientific: "Anubias barteri var. nana", groupId: "g-plants", genus: "Anubias", minTankLitres: 20 },
  { common: "Amazon Sword", scientific: "Echinodorus grisebachii", groupId: "g-plants", genus: "Echinodorus", minTankLitres: 60 },
  { common: "Cryptocoryne Wendtii", scientific: "Cryptocoryne wendtii", groupId: "g-plants", genus: "Cryptocoryne", minTankLitres: 30 },
  { common: "Vallisneria", scientific: "Vallisneria spiralis", groupId: "g-plants", genus: "Vallisneria", aliases: ["Jungle Val"], minTankLitres: 40 },
  { common: "Hornwort", scientific: "Ceratophyllum demersum", groupId: "g-plants", genus: "Ceratophyllum", minTankLitres: 20 },
  { common: "Java Moss", scientific: "Taxiphyllum barbieri", groupId: "g-plants", genus: "Taxiphyllum", minTankLitres: 10 },
  { common: "Christmas Moss", scientific: "Vesicularia montagnei", groupId: "g-plants", genus: "Vesicularia", minTankLitres: 10 },
  { common: "Water Sprite", scientific: "Ceratopteris thalictroides", groupId: "g-plants", genus: "Ceratopteris", minTankLitres: 20 },
  { common: "Duckweed", scientific: "Lemna minor", groupId: "g-plants", genus: "Lemna", minTankLitres: 5 },
  { common: "Frogbit", scientific: "Limnobium laevigatum", groupId: "g-plants", genus: "Limnobium", aliases: ["Amazon Frogbit"], minTankLitres: 10 },
  { common: "Red Root Floater", scientific: "Phyllanthus fluitans", groupId: "g-plants", genus: "Phyllanthus", minTankLitres: 10 },
  { common: "Rotala Rotundifolia", scientific: "Rotala rotundifolia", groupId: "g-plants", genus: "Rotala", minTankLitres: 30 },
  { common: "Ludwigia Repens", scientific: "Ludwigia repens", groupId: "g-plants", genus: "Ludwigia", minTankLitres: 30 },
  { common: "Dwarf Hairgrass", scientific: "Eleocharis acicularis", groupId: "g-plants", genus: "Eleocharis", minTankLitres: 20 },
  { common: "Monte Carlo", scientific: "Micranthemum tweediei", groupId: "g-plants", genus: "Micranthemum", minTankLitres: 20 },
  { common: "Dwarf Baby Tears", scientific: "Hemianthus callitrichoides", groupId: "g-plants", genus: "Hemianthus", aliases: ["HC Cuba"], minTankLitres: 20 },
  { common: "Bucephalandra", scientific: "Bucephalandra sp.", groupId: "g-plants", genus: "Bucephalandra", minTankLitres: 20 },
  { common: "Aponogeton Madagascariensis", scientific: "Aponogeton madagascariensis", groupId: "g-plants", genus: "Aponogeton", aliases: ["Madagascar Lace Plant"], minTankLitres: 60 },
  { common: "Tiger Lotus", scientific: "Nymphaea zenkeri", groupId: "g-plants", genus: "Nymphaea", minTankLitres: 80 },
];

function buildCatalogue() {
  const genusMap = new Map<string, TaxonomyGenus>();
  const speciesList: Species[] = [];

  for (const seed of SEEDS) {
    const genusKey = `${seed.groupId}:${seed.genus.toLowerCase()}`;
    let genus = genusMap.get(genusKey);
    if (!genus) {
      genus = {
        id: `ge-${slugify(seed.genus)}-${seed.groupId.replace("g-", "")}`,
        groupId: seed.groupId,
        name: seed.genus,
        slug: slugify(seed.genus),
      };
      genusMap.set(genusKey, genus);
    }

    const slug = slugify(seed.common);
    speciesList.push({
      id: `sp-${slug}`,
      slug,
      commonName: seed.common,
      commonNameAliases: seed.aliases ?? [],
      scientificName: seed.scientific,
      groupId: seed.groupId,
      genusId: genus.id,
      tradeStatus: seed.tradeStatus ?? "open",
      tradeNotes: seed.tradeNotes,
      waterType: seed.waterType ?? "freshwater",
      tempMin: seed.tempMin ?? 22,
      tempMax: seed.tempMax ?? 28,
      phMin: seed.phMin ?? 6.0,
      phMax: seed.phMax ?? 8.0,
      diet: seed.diet,
      minTankLitres: seed.minTankLitres,
      compatibility: seed.compatibility,
      careSummary:
        seed.careSummary ??
        `${seed.common} (${seed.scientific}) — available for private listing on Snapperhouse.`,
      approved: true,
    });
  }

  // Deduplicate by slug (keep first)
  const seen = new Set<string>();
  const unique = speciesList.filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });

  return {
    taxonomyGenera: [...genusMap.values()],
    species: unique,
  };
}

const catalogue = buildCatalogue();
export const taxonomyGenera = catalogue.taxonomyGenera;
export const species = catalogue.species;

export function getGroup(idOrSlug: string) {
  return taxonomyGroups.find((g) => g.id === idOrSlug || g.slug === idOrSlug);
}

export function getGenus(id: string) {
  return taxonomyGenera.find((g) => g.id === id);
}

export function getSpecies(idOrSlug: string) {
  return species.find((s) => s.id === idOrSlug || s.slug === idOrSlug);
}

export function getSpeciesByGroup(groupId: string) {
  return species.filter((s) => s.groupId === groupId && s.approved);
}

export function searchSpeciesCatalogue(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return species.filter((s) => s.approved);
  return species.filter((s) => {
    if (!s.approved) return false;
    const hay = [s.commonName, s.scientificName, ...s.commonNameAliases]
      .join(" ")
      .toLowerCase();
    return hay.includes(q) || q.split(/\s+/).every((part) => hay.includes(part));
  });
}
