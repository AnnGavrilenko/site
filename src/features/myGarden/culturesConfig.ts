import type { PlantCategory, PlantCulture } from './types';

export const plantCategories: PlantCategory[] = ['Семена овощей', 'Саженцы'];

export const culturesByCategory: Record<PlantCategory, PlantCulture[]> = {
  'Семена овощей': ['Томат ранний урожайный'],
  Саженцы: ['Гортензия метельчатая Граффити'],
};
