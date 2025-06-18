import Fuse from 'fuse.js';
import { useMemo } from 'react';

export const plantImageMap: Record<string, string> = {
  alfalfa: 'assets/plants/alfalfa.webp',
  amaranth: 'assets/plants/amaranth.webp',
  arugula: 'assets/plants/arugula.webp',
  barley: 'assets/plants/barley.webp',
  'basil green': 'assets/plants/basil_green.webp',
  'basil violet': 'assets/plants/basil_violet.webp',
  beet: 'assets/plants/beet.webp',
  borago: 'assets/plants/borago.webp',
  broccoli: 'assets/plants/broccoli.webp',
  buckwheat: 'assets/plants/buckwheat.webp',
  carrot: 'assets/plants/carrot.webp',
  chervil: 'assets/plants/chervil.webp',
  cilantro: 'assets/plants/cilantro.webp',
  cumin: 'assets/plants/cumin.webp',
  dill: 'assets/plants/dill.webp',
  'edible flowers': 'assets/plants/edible_flowers.webp',
  general: 'assets/plants/general.webp',
  kohlrabi: 'assets/plants/kohlrabi_cabbage.webp',
  linen: 'assets/plants/linen.webp',
  melissa: 'assets/plants/melissa.webp',
  mung: 'assets/plants/mung_beans.webp',
  mustard: 'assets/plants/mustard.webp',
  oat: 'assets/plants/oat.webp',
  onion: 'assets/plants/onion.webp',
  parsley: 'assets/plants/parsley.webp',
  pea: 'assets/plants/pea.webp',
  radish: 'assets/plants/radish.webp',
  silybum: 'assets/plants/silybum.webp',
  sorrel: 'assets/plants/sorrel.webp',
  'red sorrel': 'assets/plants/sorrel_red_merry.webp',
  sunflower: 'assets/plants/sunflower.webp',
  wheat: 'assets/plants/wheat.webp',
};

const plantSearchMap: Record<string, string> = {
  люцерна: 'alfalfa',
  амарант: 'amaranth',
  рукола: 'arugula',
  ячмінь: 'barley',
  базилік: 'basil green',
  'базилік зелений': 'basil green',
  'базилік фіолетовий': 'basil violet',
  буряк: 'beet',
  огірочник: 'borago',
  броколі: 'broccoli',
  гречка: 'buckwheat',
  морква: 'carrot',
  кербель: 'chervil',
  кінза: 'cilantro',
  кумин: 'cumin',
  кріп: 'dill',
  'їстівні квіти': 'edible flowers',
  'капуста кольрабі': 'kohlrabi',
  льон: 'linen',
  меліса: 'melissa',
  мунг: 'mung',
  гірчиця: 'mustard',
  овес: 'oat',
  цибуля: 'onion',
  петрушка: 'parsley',
  горох: 'pea',
  редиска: 'radish',
  розторопша: 'silybum',
  щавель: 'sorrel',
  'червоний щавель': 'red sorrel',
  соняшник: 'sunflower',
  пшениця: 'wheat',
};

const searchKeys = [...Object.keys(plantImageMap), ...Object.keys(plantSearchMap)];

const fuse = new Fuse(searchKeys, { threshold: 0.4 });

export function useAutoPlantImage(name?: string): string {
  return useMemo(() => {
    if (!name) return plantImageMap['general'];

    const normalized = name.trim().toLowerCase();

    const match = fuse.search(normalized)[0]?.item;
    if (!match) return plantImageMap['general'];

    const fileKey = plantSearchMap[match] || match;

    return plantImageMap[fileKey] || plantImageMap['general'];
  }, [name]);
}
