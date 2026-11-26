import type { ImageMetadata } from 'astro';
import beakerMeasure from '../assets/photos/beaker-measure.jpg';
import bokChoyIndoorUnit from '../assets/photos/bok-choy-indoor-unit.jpg';
import butterheadLettuceHands from '../assets/photos/butterhead-lettuce-hands.jpg';
import cuttingInWater from '../assets/photos/cutting-in-water.jpg';
import diyPvcNftFrame from '../assets/photos/diy-pvc-nft-frame.jpg';
import dwcNetPotRoots from '../assets/photos/dwc-net-pot-roots.jpg';
import labGlassware from '../assets/photos/lab-glassware.jpg';
import ledLettuceSeedlings from '../assets/photos/led-lettuce-seedlings.jpg';
import lettuceChannelNetPot from '../assets/photos/lettuce-channel-net-pot.jpg';
import lettuceNetPotsClay from '../assets/photos/lettuce-net-pots-clay.jpg';
import meterProbe from '../assets/photos/meter-probe.jpg';
import redVeinedChard from '../assets/photos/red-veined-chard.jpg';
import seedlingsFloatingRaft from '../assets/photos/seedlings-floating-raft.jpg';
import seedlingsRootsHand from '../assets/photos/seedlings-roots-hand.jpg';
import strawberriesGutter from '../assets/photos/strawberries-gutter.jpg';
import strawberriesHangingClose from '../assets/photos/strawberries-hanging-close.jpg';
import strawberriesHangingRows from '../assets/photos/strawberries-hanging-rows.jpg';
import systemsHomeNftLights from '../assets/photos/systems-home-nft-lights.jpg';
import systemsHomeNftLightsTall from '../assets/photos/systems-home-nft-lights-tall.jpg';
import testTubeCuttings from '../assets/photos/test-tube-cuttings.jpg';
import tomatoTruss from '../assets/photos/tomato-truss.jpg';
import tomatoesHighWire from '../assets/photos/tomatoes-high-wire.jpg';
import towerGardenGreens from '../assets/photos/tower-garden-greens.jpg';
import towerLettuceCloseup from '../assets/photos/tower-lettuce-closeup.jpg';
import towerPinkLed from '../assets/photos/tower-pink-led.jpg';
import waterPourGlass from '../assets/photos/water-pour-glass.jpg';
import youngTomatoPlant from '../assets/photos/young-tomato-plant.jpg';

/**
 * Every photo here was downloaded from Unsplash under the free Unsplash License
 * (no Unsplash+ images). Credit the photographer wherever the photo appears.
 * To add a photo: save a 1600x900 JPEG crop to src/assets/photos/, import it
 * above, and add an entry with honest alt text that describes what is visible.
 */
export interface SitePhoto {
  image: ImageMetadata;
  alt: string;
  photographer: string;
  username: string;
}

const photo = (image: ImageMetadata, alt: string, photographer: string, username: string): SitePhoto => ({
  image,
  alt,
  photographer,
  username,
});

export const photos = {
  'beaker-measure': photo(beakerMeasure, 'A gloved hand holding a measuring beaker of clear liquid', 'RephiLe water', 'revolution_in_filtration'),
  'bok-choy-indoor-unit': photo(bokChoyIndoorUnit, 'A hand reaching toward bok choy growing from a white indoor growing unit', 'Ona Creative', 'onacreative'),
  'butterhead-lettuce-hands': photo(butterheadLettuceHands, 'Hands cupping heads of butterhead lettuce in a dense planting', 'PHÚC LONG', 'phuclong'),
  'cutting-in-water': photo(cuttingInWater, 'A sprouted seed growing roots in a clear glass of water', 'Suri Huang', 'fukayamamo'),
  'diy-pvc-nft-frame': photo(diyPvcNftFrame, 'Overhead view of a pipe-frame hydroponic system planted with lettuce and herbs', 'Tasha Kostyuk', 'tashakostyuk'),
  'dwc-net-pot-roots': photo(dwcNetPotRoots, 'A grower lifts a net pot to show the long white roots that grew into the water below', 'Gabriella Clare Marino', 'gabiontheroad'),
  'lab-glassware': photo(labGlassware, 'Clear laboratory beakers and a flask on a white bench', 'Hans Reniers', 'hansreniers'),
  'led-lettuce-seedlings': photo(ledLettuceSeedlings, 'Lettuce seedlings growing under a bar of LED grow lights', 'Laura Geror', 'laura_geror'),
  'lettuce-channel-net-pot': photo(lettuceChannelNetPot, 'A young lettuce plant in a net pot set into a hydroponic growing channel', 'Mor Shani', 'morsha'),
  'lettuce-net-pots-clay': photo(lettuceNetPotsClay, 'Green and red lettuce growing in mesh net pots filled with clay pebbles', 'Mor Shani', 'morsha'),
  'meter-probe': photo(meterProbe, 'A gloved hand holding a digital meter probe', 'Shedrack Salami', 'xtrovarts'),
  'red-veined-chard': photo(redVeinedChard, 'Chard leaves with bright red stems and veins growing indoors', 'Sharat Arackal', 'sharat_arackal'),
  'seedlings-floating-raft': photo(seedlingsFloatingRaft, 'Young seedlings standing above a shallow, glistening water surface', 'Elly M', 'ellyendeavours'),
  'seedlings-roots-hand': photo(seedlingsRootsHand, 'A hand holding young seedlings with their roots and growing plugs exposed', 'Zoe Richardson', 'farmsteadphoto'),
  'strawberries-gutter': photo(strawberriesGutter, 'Ripe strawberries hanging over the edge of a raised growing gutter', 'Soo Ann Woon', 'woonsa'),
  'strawberries-hanging-close': photo(strawberriesHangingClose, 'Ripe and unripe strawberries hanging from plants in a raised greenhouse gutter', 'V U', 'vulgism'),
  'strawberries-hanging-rows': photo(strawberriesHangingRows, 'Rows of strawberry plants in elevated gutters with ripe fruit hanging down', 'V U', 'vulgism'),
  'systems-home-nft-lights': photo(systemsHomeNftLights, 'Leafy greens and herbs growing in white channels on shelves lit by LED grow lights', 'Tasha Kostyuk', 'tashakostyuk'),
  'systems-home-nft-lights-tall': photo(systemsHomeNftLightsTall, 'Leafy greens and herbs growing in white channels on shelves lit by LED grow lights', 'Tasha Kostyuk', 'tashakostyuk'),
  'test-tube-cuttings': photo(testTubeCuttings, 'Plant cuttings rooting in a row of hanging glass test tubes', 'Reza Madani', 'qarqa_'),
  'tomato-truss': photo(tomatoTruss, 'A truss of ripening tomatoes on the vine in a greenhouse', 'Fernanda Martinez', 'fermtz05'),
  'tomatoes-high-wire': photo(tomatoesHighWire, 'Long rows of vine tomatoes trained up high wires in a greenhouse', 'George Dagerotip', 'dagerotip'),
  'tower-garden-greens': photo(towerGardenGreens, 'Lettuce and greens growing from the pockets of a white vertical tower garden', 'Nadine Primeau', 'nadineprimeau'),
  'tower-lettuce-closeup': photo(towerLettuceCloseup, 'Young lettuce leaves spilling from the pockets of a white vertical growing tower', 'Nadine Primeau', 'nadineprimeau'),
  'tower-pink-led': photo(towerPinkLed, 'Red lettuce growing on a vertical tower lit by pink LED grow lights', 'Mick Haupt', 'rocinante_11'),
  'water-pour-glass': photo(waterPourGlass, 'Water pouring into a clear glass', 'KOBU Agency', 'kobuagency'),
  'young-tomato-plant': photo(youngTomatoPlant, 'A young tomato plant growing in a raised bed', 'Markus Spiske', 'markusspiske'),
} satisfies Record<string, SitePhoto>;

export type PhotoKey = keyof typeof photos;

/** Hero photo for each published guide, keyed by route. */
export const guidePhotoKeys: Record<string, PhotoKey> = {
  'indoor-hydroponic-systems-for-home': 'systems-home-nft-lights',
  'hydroponic-systems-for-beginners': 'lettuce-net-pots-clay',
  'indoor-hydroponic-system-kits': 'tower-garden-greens',
  'deep-water-culture-hydroponics': 'dwc-net-pot-roots',
  'diy-hydroponic-system-for-beginners': 'diy-pvc-nft-frame',
  'hydroponic-strawberries': 'strawberries-gutter',
  'nft-hydroponic-strawberries': 'strawberries-hanging-rows',
  'hydroponic-lettuce': 'butterhead-lettuce-hands',
  'hydroponic-lettuce-systems': 'lettuce-channel-net-pot',
  'hydroponic-lettuce-seeds': 'led-lettuce-seedlings',
  'hydroponic-tomatoes': 'tomato-truss',
  'hydroponic-tomato-seeds': 'young-tomato-plant',
  'hydroponic-nutrients': 'meter-probe',
  'hydroponic-nutrient-solution': 'lab-glassware',
  'organic-hydroponic-nutrients': 'seedlings-roots-hand',
  'hydroponic-nutrients-for-home-growers': 'seedlings-floating-raft',
  'powder-vs-liquid-hydroponic-nutrients': 'water-pour-glass',
  'hydroponic-nutrients-for-vegetables': 'red-veined-chard',
  'hydroponic-nutrients-for-tomatoes': 'tomatoes-high-wire',
  'how-to-mix-hydroponic-nutrients': 'beaker-measure',
  'masterblend-hydroponic-nutrients': 'test-tube-cuttings',
  'general-hydroponics-nutrients': 'cutting-in-water',
  'hydroponic-systems-for-sale': 'tower-pink-led',
  'hydroponic-system-for-home-growers': 'tower-lettuce-closeup',
  'smart-indoor-hydroponic-systems': 'bok-choy-indoor-unit',
  'hydroponic-tower-garden': 'tower-garden-greens',
  // No basil photo in the registry yet; lettuce and herbs on a pipe frame until an owner or Unsplash basil photo is added.
  'hydroponic-basil': 'diy-pvc-nft-frame',
  // No Kratky bucket or jar photo in the registry yet; lettuce in net pots until an owner or Unsplash photo is added.
  'kratky-hydroponics': 'lettuce-net-pots-clay',
  // No photo of a pH meter in the registry yet; a measuring beaker until an owner or Unsplash photo is added.
  'hydroponic-ph-meter': 'beaker-measure',
  // A seed rooting in a glass of water: plant growth without soil, the page's subject.
  'what-is-hydroponics': 'cutting-in-water',
  // A lettuce plant in a growing channel: one of the system types the page compares.
  'types-of-hydroponic-systems': 'lettuce-channel-net-pot',
  // Leafy greens and herbs in white NFT-style channels under LED lights: a home NFT system.
  'nft-hydroponic-system': 'systems-home-nft-lights',
  // Lettuce in net pots of expanded clay pebbles, the medium Illinois and Oregon State name for ebb and flow; no flood-tray photo in the registry yet.
  'ebb-and-flow-hydroponics': 'lettuce-net-pots-clay',
  // Vine tomatoes trained up high wires: the indeterminate, single-stem crop Dutch buckets are built for; no bucket photo in the registry yet.
  'dutch-bucket-hydroponics': 'tomatoes-high-wire',
  // A truss of greenhouse tomatoes, the long-season media crop drip systems are mostly used for; no drip-emitter photo in the registry yet.
  'drip-hydroponic-system': 'tomato-truss',
  // Long white roots hanging below a lifted net pot: the bare root zone aeroponics mists and water culture submerges; no misting-chamber photo in the registry yet.
  'aeroponics-vs-hydroponics': 'dwc-net-pot-roots',
  // Seedlings above a still water surface: the stored solution this guide sizes; no reservoir photo in the registry yet.
  'hydroponic-reservoir-size': 'seedlings-floating-raft',
  // A pipe-frame system with lettuce and herbs: the channels and plumbing a recirculating pump feeds; no pump photo in the registry yet.
  'hydroponic-water-pumps': 'diy-pvc-nft-frame',
  // Long white roots lifted from aerated water: the root health a DWC air pump protects; no air pump or air stone photo in the registry yet.
  'air-pump-for-dwc-hydroponics': 'dwc-net-pot-roots',
  // Lettuce in mesh net pots filled with expanded clay pebbles: one of the media the page compares; no rockwool or coir photo in the registry yet.
  'hydroponic-growing-media': 'lettuce-net-pots-clay',
  // A grower lifts a net pot to show the roots that grew through its slots into the water: the part the page is about.
  'hydroponic-net-pots': 'dwc-net-pot-roots',
  // Seedlings held with their roots and growing plugs exposed: the starter-plug role rockwool and coir share; no rockwool cube or coir brick photo in the registry yet.
  // Lettuce in net pots of expanded clay pebbles: the medium this page covers.
  'leca-hydroponics': 'lettuce-net-pots-clay',
  'rockwool-vs-coco-coir': 'seedlings-roots-hand',
  // A young tomato plant, a close relative grown the same way (staked, fruiting, long season); no pepper photo in the registry yet.
  'hydroponic-peppers': 'young-tomato-plant',
  // Vine crops trained up high wires: the same string-and-wire training this page describes; no cucumber photo in the registry yet.
  'hydroponic-cucumbers': 'tomatoes-high-wire',
  // Dense young seedlings under an LED bar: the nearest registry match to a microgreen tray; no microgreens photo yet.
  'hydroponic-microgreens': 'led-lettuce-seedlings',
  // Leafy greens and herbs in white channels under LED lights: a home herb system; no single-herb close-up in the registry yet.
  'best-herbs-for-hydroponics': 'systems-home-nft-lights',
  'hydroponic-kale': 'red-veined-chard',
  // Leafy greens in tower pockets: the nearest registry match to a spinach crop; no spinach photo yet.
  'hydroponic-spinach': 'tower-garden-greens',
  // Long white roots under a net pot: a DWC plant like the green onion setup; no green onion photo in the registry yet.
  'hydroponic-green-onions': 'dwc-net-pot-roots',
  // Leafy greens and herbs in NFT channels under LEDs: the system type of the Iowa State cilantro trial; no cilantro photo in the registry yet.
  'hydroponic-cilantro': 'systems-home-nft-lights',
  // Cuttings rooting in glass tubes: mint is grown from rooted cuttings; no mint photo in the registry yet.
  'hydroponic-mint': 'test-tube-cuttings',
};

/** Banner photo for each section landing, keyed by section id. */
export const sectionPhotoKeys: Record<string, PhotoKey> = {
  systems: 'tower-garden-greens',
  crops: 'red-veined-chard',
  nutrients: 'test-tube-cuttings',
  equipment: 'led-lettuce-seedlings',
  best: 'diy-pvc-nft-frame',
  reviews: 'lab-glassware',
  compare: 'systems-home-nft-lights',
  problems: 'seedlings-roots-hand',
  tools: 'meter-probe',
};

export function photoForGuide(route: string): SitePhoto | undefined {
  const key = guidePhotoKeys[route];
  return key ? photos[key] : undefined;
}

export function photoForSection(id: string): SitePhoto | undefined {
  const key = sectionPhotoKeys[id];
  return key ? photos[key] : undefined;
}

export function photographerUrl(username: string): string {
  return `https://unsplash.com/@${username}?utm_source=hydrorigor&utm_medium=referral`;
}

export const UNSPLASH_URL = 'https://unsplash.com/?utm_source=hydrorigor&utm_medium=referral';
