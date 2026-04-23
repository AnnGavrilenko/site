import logoImage from '../../../images/HomePage/logo.jpg';
import { topMenuItems } from '../../../shared/config/homePageData';
import { Icon } from '../../ui/Icon/Icon';
import { TopNavigation } from '../TopNavigation/TopNavigation';
import styles from './Header.module.css';

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.topLine}>
        <a className={styles.logoLink} href="#">
          <img alt="Насенне" className={styles.logo} src={logoImage} />
        </a>

        <div className={styles.contacts}>
          <p className={styles.shopLabel}>Интернет-магазин</p>
          <div className={styles.phoneRow}>
            <span className={styles.a1}>A1</span>
            <a className={styles.phone} href="#">
              8 (029) 607-13-24
            </a>
            <a className={styles.phone} href="#">
              8 (017) 343-85-85
            </a>
          </div>
        </div>

        <form className={styles.searchForm} role="search">
          <input aria-label="Поиск по сайту" placeholder="Поиск по сайту..." />
          <button aria-label="Найти" type="button">
            <Icon name="search" />
          </button>
        </form>

        <a className={styles.cart} href="#">
          <span className={styles.cartIcon}>
            <Icon name="cart" />
          </span>
          <span className={styles.cartText}>
            <strong>Ваш заказ:</strong>
            <span>0 руб.</span>
          </span>
        </a>
      </div>

      <TopNavigation items={topMenuItems} />
    </header>
  );
}
