import { useEffect } from 'react';
import styles from './MobileSearchPanel.module.css';

type MobileSearchPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileSearchPanel({ isOpen, onClose }: MobileSearchPanelProps): JSX.Element {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen ? <button aria-label="Закрыть поиск" className={styles.overlay} onClick={onClose} type="button" /> : null}
      <section aria-hidden={!isOpen} className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.head}>
          <button aria-label="Закрыть поиск" className={styles.close} onClick={onClose} type="button">
            ×
          </button>
          <input aria-label="Поиск" className={styles.field} placeholder="Поиск по сайту..." type="text" />
        </div>
        <p className={styles.hint}>Поиск подготовлен для мобильного интерфейса. Логика выдачи подключается на следующем этапе.</p>
      </section>
    </>
  );
}
