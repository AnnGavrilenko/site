import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icon } from '../../ui/Icon/Icon';
import styles from './MobileBottomNav.module.css';

type MobileBottomNavProps = {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  isSearchActive?: boolean;
  cartCount?: number;
};

export function MobileBottomNav({
  onOpenMenu,
  onOpenSearch,
  isSearchActive = false,
  cartCount = 0,
}: MobileBottomNavProps): JSX.Element {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav aria-label="Мобильная навигация" className={styles.nav}>
      <button className={styles.item} onClick={onOpenMenu} type="button">
        <Icon name="menu" />
        <span className={styles.label}>Меню</span>
      </button>

      <button className={`${styles.item} ${isSearchActive ? styles.active : ''}`} onClick={onOpenSearch} type="button">
        <Icon name="search" />
        <span className={styles.label}>Поиск</span>
      </button>

      <Link className={`${styles.item} ${isHome && !isSearchActive ? styles.active : ''}`} to="/">
        <Icon name="home" />
        <span className={styles.label}>Главная</span>
      </Link>

      <a
        className={`${styles.item} ${styles.cartWrap}`}
        href="#"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <Icon name="cart" />
        <span className={styles.label}>Корзина</span>
        {cartCount > 0 ? <span className={styles.badge}>{cartCount}</span> : null}
      </a>

      <NavLink className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`} to="/my-garden">
        <Icon name="sprout" />
        <span className={styles.label}>Мой огород</span>
      </NavLink>
    </nav>
  );
}
