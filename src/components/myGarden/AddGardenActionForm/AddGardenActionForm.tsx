import { useEffect, useState } from 'react';
import { actionTypeOptions } from '../../../features/myGarden/templates';
import type { GardenActionType, Plant } from '../../../features/myGarden/types';
import styles from './AddGardenActionForm.module.css';

export type AddGardenActionPayload = {
  plantId: string;
  actionType: GardenActionType;
  date: string;
};

type AddGardenActionFormProps = {
  isOpen: boolean;
  plants: Plant[];
  onClose: () => void;
  onSubmit: (payload: AddGardenActionPayload) => void;
};

export function AddGardenActionForm({ isOpen, plants, onClose, onSubmit }: AddGardenActionFormProps): JSX.Element | null {
  const [plantId, setPlantId] = useState<string>('');
  const [actionType, setActionType] = useState<GardenActionType>('Посадка');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
    setPlantId(plants[0]?.id ?? '');
    setActionType('Посадка');
  }, [isOpen, plants]);

  if (!isOpen) {
    return null;
  }

  const canSave = Boolean(plantId && date && plants.length > 0);

  return (
    <div className={styles.overlay} role="presentation">
      <button aria-label="Закрыть форму" className={styles.dismiss} onClick={onClose} type="button" />
      <section className={styles.sheet}>
        <h2>Добавить действие</h2>

        {plants.length === 0 ? <p className={styles.emptyText}>Сначала добавьте растение</p> : null}

        <label className={styles.field}>
          <span>Растение</span>
          <select disabled={plants.length === 0} onChange={(event) => setPlantId(event.target.value)} value={plantId}>
            {plants.map((plant) => (
              <option key={plant.id} value={plant.id}>
                {plant.culture}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Тип действия</span>
          <select onChange={(event) => setActionType(event.target.value as GardenActionType)} value={actionType}>
            {actionTypeOptions.map((option) => (
              <option key={option.type} value={option.type}>
                {option.icon} {option.type}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Дата</span>
          <input onChange={(event) => setDate(event.target.value)} type="date" value={date} />
        </label>

        <button
          className={styles.saveButton}
          disabled={!canSave}
          onClick={() => onSubmit({ plantId, actionType, date })}
          type="button"
        >
          Сохранить
        </button>
      </section>
    </div>
  );
}
