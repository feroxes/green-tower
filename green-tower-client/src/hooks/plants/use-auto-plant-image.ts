import Fuse from 'fuse.js';
import { useMemo } from 'react';

export const plantImageMap: Record<string, string> = {
  alfalfa: 'alfalfa.webp',
  amaranth: 'amaranth.webp',
  arugula: 'arugula.webp',
  barley: 'barley.webp',
  'basil green': 'basil_green.webp',
  'basil violet': 'basil_violet.webp',
  beet: 'beet.webp',
  borago: 'borago.webp',
  broccoli: 'broccoli.webp',
  buckwheat: 'buckwheat.webp',
  carrot: 'carrot.webp',
  chervil: 'chervil.webp',
  cilantro: 'cilantro.webp',
  cumin: 'cumin.webp',
  dill: 'dill.webp',
  'edible flowers': 'edible_flowers.webp',
  general: 'general.webp',
  kohlrabi: 'kohlrabi_cabbage.webp',
  linen: 'linen.webp',
  melissa: 'melissa.webp',
  mung: 'mung_beans.webp',
  mustard: 'mustard.webp',
  oat: 'oat.webp',
  onion: 'onion.webp',
  parsley: 'parsley.webp',
  pea: 'pea.webp',
  radish: 'radish.webp',
  silybum: 'silybum.webp',
  sorrel: 'sorrel.webp',
  'red sorrel': 'sorrel_red_merry.webp',
  sunflower: 'sunflower.webp',
  wheat: 'wheat.webp',
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
