import Fuse from 'fuse.js';
import { useMemo } from 'react';

import { Config } from '../../config/config';


export const plantImageMap: Record<string, string> = {
  alfalfa: `${Config.s3PlantsBucketBaseUri}/alfalfa.webp`,
  amaranth: `${Config.s3PlantsBucketBaseUri}/amaranth.webp`,
  arugula: `${Config.s3PlantsBucketBaseUri}/arugula.webp`,
  barley: `${Config.s3PlantsBucketBaseUri}/barley.webp`,
  'basil green': `${Config.s3PlantsBucketBaseUri}/basil_green.webp`,
  'basil violet': `${Config.s3PlantsBucketBaseUri}/basil_violet.webp`,
  beet: `${Config.s3PlantsBucketBaseUri}/beet.webp`,
  borago: `${Config.s3PlantsBucketBaseUri}/borago.webp`,
  broccoli: `${Config.s3PlantsBucketBaseUri}/broccoli.webp`,
  buckwheat: `${Config.s3PlantsBucketBaseUri}/buckwheat.webp`,
  carrot: `${Config.s3PlantsBucketBaseUri}/carrot.webp`,
  chervil: `${Config.s3PlantsBucketBaseUri}/chervil.webp`,
  cilantro: `${Config.s3PlantsBucketBaseUri}/cilantro.webp`,
  cumin: `${Config.s3PlantsBucketBaseUri}/cumin.webp`,
  dill: `${Config.s3PlantsBucketBaseUri}/dill.webp`,
  'edible flowers': `${Config.s3PlantsBucketBaseUri}/edible_flowers.webp`,
  general: `${Config.s3PlantsBucketBaseUri}/general.webp`,
  kohlrabi: `${Config.s3PlantsBucketBaseUri}/kohlrabi_cabbage.webp`,
  linen: `${Config.s3PlantsBucketBaseUri}/linen.webp`,
  melissa: `${Config.s3PlantsBucketBaseUri}/melissa.webp`,
  mung: `${Config.s3PlantsBucketBaseUri}/mung_beans.webp`,
  mustard: `${Config.s3PlantsBucketBaseUri}/mustard.webp`,
  oat: `${Config.s3PlantsBucketBaseUri}/oat.webp`,
  onion: `${Config.s3PlantsBucketBaseUri}/onion.webp`,
  parsley: `${Config.s3PlantsBucketBaseUri}/parsley.webp`,
  pea: `${Config.s3PlantsBucketBaseUri}/pea.webp`,
  radish: `${Config.s3PlantsBucketBaseUri}/radish.webp`,
  silybum: `${Config.s3PlantsBucketBaseUri}/silybum.webp`,
  sorrel: `${Config.s3PlantsBucketBaseUri}/sorrel.webp`,
  'red sorrel': `${Config.s3PlantsBucketBaseUri}/sorrel_red_merry.webp`,
  sunflower: `${Config.s3PlantsBucketBaseUri}/sunflower.webp`,
  wheat: `${Config.s3PlantsBucketBaseUri}/wheat.webp`,
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
