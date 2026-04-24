import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CatalogItem } from '../../../shared/config/homePageData';
import { Icon } from '../../ui/Icon/Icon';
import styles from './MobileCatalogDrawer.module.css';

type MobileCatalogDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CatalogItem[];
};

export function MobileCatalogDrawer({ isOpen, onClose, items }: MobileCatalogDrawerProps): JSX.Element {
  const [openLabels, setOpenLabels] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  const toggleExpanded = (label: string): void => {
    setOpenLabels((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isInternalPath = (value: string): boolean => value.startsWith('/');

  return (
    <>
      {isOpen ? <button aria-label="Закрыть меню" className={styles.overlay} onClick={onClose} type="button" /> : null}
      <aside aria-hidden={!isOpen} className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.topBar}>
          <span>Каталог товаров</span>
          <button aria-label="Закрыть каталог" className={styles.closeButton} onClick={onClose} type="button">
            ×
          </button>
        </div>

        <div className={styles.scroll}>
          <ul className={styles.list}>
            {items.map((item) => {
              const hasSubmenu = Boolean(item.submenuItems?.length);
              const isExpanded = Boolean(openLabels[item.label]);

              return (
                <li className={styles.item} key={item.label}>
                  {hasSubmenu ? (
                    <button className={styles.rowButton} onClick={() => toggleExpanded(item.label)} type="button">
                      <span className={styles.left}>
                        <span className={styles.dot} />
                        <span>{item.label}</span>
                        {item.isNew ? <span className={styles.newBadge}>NEW</span> : null}
                      </span>
                      <Icon className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`} name="chevronRight" />
                    </button>
                  ) : isInternalPath(item.href) ? (
                    <Link className={styles.rowLink} onClick={onClose} to={item.href}>
                      <span className={styles.left}>
                        <span className={styles.dot} />
                        <span>{item.label}</span>
                        {item.isNew ? <span className={styles.newBadge}>NEW</span> : null}
                      </span>
                    </Link>
                  ) : (
                    <a className={styles.rowLink} href={item.href} onClick={onClose}>
                      <span className={styles.left}>
                        <span className={styles.dot} />
                        <span>{item.label}</span>
                        {item.isNew ? <span className={styles.newBadge}>NEW</span> : null}
                      </span>
                    </a>
                  )}

                  {hasSubmenu && isExpanded ? (
                    <ul className={styles.submenu}>
                      {item.submenuTitle ? <li className={styles.submenuTitle}>{item.submenuTitle}</li> : null}
                      {item.submenuItems?.map((submenuItem) => (
                        <li className={styles.submenuItem} key={submenuItem}>
                          <a href="#" onClick={onClose}>
                            {submenuItem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
