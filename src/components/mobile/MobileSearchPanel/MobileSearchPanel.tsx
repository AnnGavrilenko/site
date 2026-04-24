import { useEffect } from 'react';
import type { PopularProductItem } from '../../../shared/config/homePageData';
import styles from './MobileSearchPanel.module.css';

type MobileSearchPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  items: PopularProductItem[];
};

export function MobileSearchPanel({ isOpen, onClose, items }: MobileSearchPanelProps): JSX.Element {
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
        <h2 className={styles.title}>Популярные товары</h2>
        <div className={styles.grid}>
          {items.map((item) => (
            <a className={styles.card} href={item.href} key={item.title} onClick={onClose}>
              <div className={styles.imageWrap}>
                <img alt={item.title} src={item.image} />
              </div>
              <p className={styles.cardTitle}>{item.title}</p>
              <p className={styles.price}>{item.price}</p>
            </a>
          ))}
        </div>
        <p className={styles.hint}>Логику поиска и фильтры можно добавить на следующем этапе, не меняя текущий экран.</p>
      </section>
    </>
  );
}
