import { useEffect, useMemo, useState } from 'react';
import { culturesByCategory, plantCategories } from '../../../features/myGarden/templates';
import type { PlantCategory, PlantCulture } from '../../../features/myGarden/types';
import styles from './AddPlantForm.module.css';

export type AddPlantPayload = {
  category: PlantCategory;
  culture: PlantCulture;
  plantedAt: string;
  recommendationsEnabled: boolean;
};

type AddPlantFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: AddPlantPayload) => void;
};

export function AddPlantForm({ isOpen, onClose, onSubmit }: AddPlantFormProps): JSX.Element | null {
  const [category, setCategory] = useState<PlantCategory>('Семена овощей');
  const [culture, setCulture] = useState<PlantCulture>('Томат ранний урожайный');
  const [plantedAt, setPlantedAt] = useState<string>('');
  const [recommendationsEnabled, setRecommendationsEnabled] = useState<boolean>(true);

  const availableCultures = useMemo(() => culturesByCategory[category], [category]);

  useEffect(() => {
    setCulture(availableCultures[0]);
  }, [availableCultures]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    setPlantedAt(today);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} role="presentation">
      <button aria-label="Закрыть форму" className={styles.dismiss} onClick={onClose} type="button" />
      <section className={styles.sheet}>
        <h2>Добавить растение</h2>

        <label className={styles.field}>
          <span>Категория</span>
          <select onChange={(event) => setCategory(event.target.value as PlantCategory)} value={category}>
            {plantCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Культура / сорт</span>
          <select onChange={(event) => setCulture(event.target.value as PlantCulture)} value={culture}>
            {availableCultures.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Дата посадки</span>
          <input onChange={(event) => setPlantedAt(event.target.value)} type="date" value={plantedAt} />
        </label>

        <label className={styles.switchRow}>
          <input
            checked={recommendationsEnabled}
            onChange={(event) => setRecommendationsEnabled(event.target.checked)}
            type="checkbox"
          />
          <span>Получать рекомендации по выращиванию</span>
        </label>

        <button
          className={styles.saveButton}
          onClick={() => onSubmit({ category, culture, plantedAt, recommendationsEnabled })}
          type="button"
        >
          Сохранить
        </button>
      </section>
    </div>
  );
}
