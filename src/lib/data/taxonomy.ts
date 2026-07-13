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
  { common: "Pacific Blue-eye", scientific: "Pseudomugil signifer", groupId: "g-aus-natives", genus: "Pseudomugil", aliases: ["Blue-eye"], minTankLitres: 40 },
  { common: "Desert Goby", scientific: "Chlamydogobius eremius", groupId: "g-aus-natives", genus: "Chlamydogobius", minTankLitres: 40 },
  { common: "Empire Gudgeon", scientific: "Hypseleotris compressa", groupId: "g-aus-natives", genus: "Hypseleotris", minTankLitres: 60 },
  { common: "Firetail Gudgeon", scientific: "Hypseleotris galii", groupId: "g-aus-natives", genus: "Hypseleotris", minTankLitres: 40 },
  { common: "Southern Purple-spotted Gudgeon", scientific: "Mogurnda adspersa", groupId: "g-aus-natives", genus: "Mogurnda", minTankLitres: 80 },
  { common: "Olive Perchlet", scientific: "Ambassis agassizii", groupId: "g-aus-natives", genus: "Ambassis", minTankLitres: 60 },
  { common: "Australian Bass", scientific: "Macquaria novemaculeata", groupId: "g-aus-natives", genus: "Macquaria", minTankLitres: 300 },
  { common: "Silver Perch", scientific: "Bidyanus bidyanus", groupId: "g-aus-natives", genus: "Bidyanus", minTankLitres: 300 },
  { common: "Jade Perch", scientific: "Scortum barcoo", groupId: "g-aus-natives", genus: "Scortum", minTankLitres: 300 },
  { common: "Spotted Blue-eye", scientific: "Pseudomugil gertrudae", groupId: "g-aus-natives", genus: "Pseudomugil", minTankLitres: 40 },
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

  // Rainbowfish
  { common: "Boesemani Rainbowfish", scientific: "Melanotaenia boesemani", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Boesemani Rainbow"], minTankLitres: 120 },
  { common: "Neon Rainbowfish", scientific: "Melanotaenia praecox", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Dwarf Neon Rainbow"], minTankLitres: 80 },
  { common: "Australian Rainbowfish", scientific: "Melanotaenia fluviatilis", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Murray River Rainbow"], minTankLitres: 100 },
  { common: "Eastern Rainbowfish", scientific: "Melanotaenia splendida splendida", groupId: "g-rainbowfish", genus: "Melanotaenia", minTankLitres: 100 },
  { common: "Threadfin Rainbowfish", scientific: "Iriatherina werneri", groupId: "g-rainbowfish", genus: "Iriatherina", minTankLitres: 60 },
  { common: "Turquoise Rainbowfish", scientific: "Melanotaenia lacustris", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Lake Kutubu Rainbow"], minTankLitres: 120 },
  { common: "Red Rainbowfish", scientific: "Glossolepis incisus", groupId: "g-rainbowfish", genus: "Glossolepis", aliases: ["Salmon Red Rainbow"], minTankLitres: 120 },
  { common: "Parkinson's Rainbowfish", scientific: "Melanotaenia parkinsoni", groupId: "g-rainbowfish", genus: "Melanotaenia", minTankLitres: 100 },
  { common: "Duboulayi Rainbowfish", scientific: "Melanotaenia duboulayi", groupId: "g-rainbowfish", genus: "Melanotaenia", aliases: ["Crimson Spotted Rainbow"], minTankLitres: 100 },
  { common: "Afrikanos Rainbowfish", scientific: "Bedotia madagascariensis", groupId: "g-rainbowfish", genus: "Bedotia", aliases: ["Madagascar Rainbow"], minTankLitres: 100 },
  { common: "Forktail Rainbowfish", scientific: "Pseudomugil furcatus", groupId: "g-rainbowfish", genus: "Pseudomugil", minTankLitres: 40 },
  { common: "Blue-eye Rainbowfish", scientific: "Pseudomugil cyanodorsalis", groupId: "g-rainbowfish", genus: "Pseudomugil", minTankLitres: 40 },

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
  { common: "Rainbowfish Blue-eye Pair", scientific: "Pseudomugil gertrudae", groupId: "g-misc", genus: "Pseudomugil", minTankLitres: 40 },

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
