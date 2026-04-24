export type PlantCategory = 'Семена овощей' | 'Саженцы';

export type PlantCulture =
  | 'Томат ранний урожайный'
  | 'Гортензия метельчатая Граффити';

export type GardenActionType =
  | 'Посадка'
  | 'Полив'
  | 'Подкормка'
  | 'Пересадка'
  | 'Обрезка'
  | 'Обработка';

export type GardenEventSource = 'manual' | 'template' | 'planting';

export type Plant = {
  id: string;
  category: PlantCategory;
  culture: PlantCulture;
  plantedAt: string;
  recommendationsEnabled: boolean;
};

export type GardenEvent = {
  id: string;
  plantId: string;
  actionType: GardenActionType;
  date: string;
  isCompleted: boolean;
  source: GardenEventSource;
};

export type PlantTemplateStep = {
  offsetDays: number;
  actionType: GardenActionType;
};

export type PlantTemplate = {
  culture: PlantCulture;
  steps: PlantTemplateStep[];
};
