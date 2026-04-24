import type { PlantCareTemplate, PlantCategory, PlantCulture } from './types';
import type { GardenActionType } from './types';

export const plantCategories: PlantCategory[] = ['Семена овощей', 'Саженцы'];

export const culturesByCategory: Record<PlantCategory, PlantCulture[]> = {
  'Семена овощей': ['Томат ранний урожайный'],
  Саженцы: ['Гортензия метельчатая Граффити'],
};

export const actionTypeOptions = [
  { type: 'Посадка', icon: '🌱' },
  { type: 'Полив', icon: '💧' },
  { type: 'Подкормка', icon: '🌿' },
  { type: 'Пересадка', icon: '🌾' },
  { type: 'Обрезка', icon: '✂️' },
  { type: 'Обработка', icon: '🐛' },
] as const;

export const actionIconByType = actionTypeOptions.reduce<Record<GardenActionType, string>>((acc, option) => {
  acc[option.type] = option.icon;
  return acc;
}, {} as Record<GardenActionType, string>);

export const plantCareTemplates: PlantCareTemplate[] = [
  {
    culture: 'Томат ранний урожайный',
    steps: [
      { offsetDays: 0, actionType: 'Посадка' },
      { offsetDays: 3, actionType: 'Полив' },
      { offsetDays: 6, actionType: 'Полив' },
      { offsetDays: 9, actionType: 'Полив' },
      { offsetDays: 10, actionType: 'Подкормка' },
      { offsetDays: 15, actionType: 'Полив' },
      { offsetDays: 18, actionType: 'Обработка' },
      { offsetDays: 25, actionType: 'Обрезка' },
      { offsetDays: 28, actionType: 'Подкормка' },
      { offsetDays: 40, actionType: 'Обработка' },
    ],
  },
  {
    culture: 'Гортензия метельчатая Граффити',
    steps: [
      { offsetDays: 0, actionType: 'Посадка' },
      { offsetDays: 3, actionType: 'Полив' },
      { offsetDays: 7, actionType: 'Полив' },
      { offsetDays: 14, actionType: 'Подкормка' },
      { offsetDays: 20, actionType: 'Обработка' },
      { offsetDays: 30, actionType: 'Полив' },
      { offsetDays: 45, actionType: 'Подкормка' },
      { offsetDays: 60, actionType: 'Обрезка' },
      { offsetDays: 75, actionType: 'Обработка' },
    ],
  },
];
