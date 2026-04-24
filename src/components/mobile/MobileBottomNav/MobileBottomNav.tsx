import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../../ui/Icon/Icon';
import styles from './MobileBottomNav.module.css';

type MobileBottomNavProps = {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  cartCount?: number;
};

export function MobileBottomNav({ onOpenMenu, onOpenSearch, cartCount = 0 }: MobileBottomNavProps): JSX.Element {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav aria-label="Мобильная навигация" className={styles.nav}>
      <button className={styles.item} onClick={onOpenMenu} type="button">
        <Icon name="menu" />
        <span>Меню</span>
      </button>

      <button className={styles.item} onClick={onOpenSearch} type="button">
        <Icon name="search" />
        <span>Поиск</span>
      </button>

      <Link className={`${styles.item} ${isHome ? styles.active : ''}`} to="/">
        <Icon name="home" />
        <span>Главная</span>
      </Link>

      <a
        className={`${styles.item} ${styles.cartWrap}`}
        href="#"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <Icon name="cart" />
        <span>Корзина</span>
        {cartCount > 0 ? <span className={styles.badge}>{cartCount}</span> : null}
      </a>

      <a
        className={styles.item}
        href="#"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <Icon name="sprout" />
        <span>Мой огород</span>
      </a>
    </nav>
  );
}
