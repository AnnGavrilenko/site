import { Link } from 'react-router-dom';
import type { CatalogItem } from '../../../shared/config/homePageData';
import { Icon } from '../../ui/Icon/Icon';
import styles from './SideCatalog.module.css';

type SideCatalogProps = {
  items: CatalogItem[];
};

export function SideCatalog({ items }: SideCatalogProps): JSX.Element {
  const isInternalPath = (value: string): boolean => value.startsWith('/');

  return (
    <aside className={styles.catalog}>
      <Link className={styles.header} to="/catalog">
        <span>КАТАЛОГ ТОВАРОВ</span>
        <Icon className={styles.menuIcon} name="menu" />
      </Link>

      <ul className={styles.list}>
        {items.map((item) => {
          const hasSubmenu = Boolean(item.submenuItems?.length);
          const isInternalItemLink = isInternalPath(item.href);

          return (
            <li
              key={item.label}
              className={hasSubmenu ? `${styles.item} ${styles.itemWithDropdown}` : styles.item}
            >
              {isInternalItemLink ? (
                <Link className={hasSubmenu ? `${styles.link} ${styles.linkWithDropdown}` : styles.link} to={item.href}>
                  <span className={styles.labelBox}>
                    <span className={styles.itemIcon} />
                    {item.isNew ? <span className={styles.newBadge}>NEW</span> : null}
                    <span>{item.label}</span>
                  </span>
                  {item.isExpandable ? (
                    <Icon className={styles.expandIcon} name={hasSubmenu ? 'chevronRight' : 'chevronDown'} />
                  ) : null}
                </Link>
              ) : (
                <a className={hasSubmenu ? `${styles.link} ${styles.linkWithDropdown}` : styles.link} href={item.href}>
                  <span className={styles.labelBox}>
                    <span className={styles.itemIcon} />
                    {item.isNew ? <span className={styles.newBadge}>NEW</span> : null}
                    <span>{item.label}</span>
                  </span>
                  {item.isExpandable ? (
                    <Icon className={styles.expandIcon} name={hasSubmenu ? 'chevronRight' : 'chevronDown'} />
                  ) : null}
                </a>
              )}

              {hasSubmenu ? (
                <div className={styles.dropdown} role="presentation">
                  {item.submenuTitleTo && isInternalPath(item.submenuTitleTo) ? (
                    <Link className={styles.dropdownTitleLink} to={item.submenuTitleTo}>
                      {item.submenuTitle}
                    </Link>
                  ) : (
                    <p className={styles.dropdownTitle}>{item.submenuTitle}</p>
                  )}
                  <ul className={styles.dropdownList}>
                    {item.submenuItems?.map((submenuItem) => (
                      <li key={submenuItem}>
                        <a href="#">{submenuItem}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
