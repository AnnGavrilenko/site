import type { LinkItem } from '../../../shared/config/homePageData';
import styles from './TopNavigation.module.css';

type TopNavigationProps = {
  items: LinkItem[];
};

export function TopNavigation({ items }: TopNavigationProps): JSX.Element {
  return (
    <nav aria-label="Главное меню" className={styles.navigation}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.label}>
            <a className={styles.link} href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
