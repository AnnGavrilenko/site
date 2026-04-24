import { useEffect, useRef } from 'react';
import styles from './GardenAddMenu.module.css';

type GardenAddMenuProps = {
  isOpen: boolean;
  onToggle: () => void;
  onAddPlant: () => void;
  onAddAction: () => void;
};

export function GardenAddMenu({ isOpen, onToggle, onAddPlant, onAddAction }: GardenAddMenuProps): JSX.Element {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      if (!menuRef.current?.contains(event.target as Node)) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onToggle]);

  return (
    <div className={styles.wrapper} ref={menuRef}>
      {isOpen ? (
        <div className={styles.menu}>
          <button className={styles.menuItem} onClick={onAddPlant} type="button">
            Добавить растение
          </button>
          <button className={styles.menuItem} onClick={onAddAction} type="button">
            Добавить действие
          </button>
        </div>
      ) : null}
      <button aria-expanded={isOpen} aria-label="Открыть меню добавления" className={styles.fab} onClick={onToggle} type="button">
        +
      </button>
    </div>
  );
}
