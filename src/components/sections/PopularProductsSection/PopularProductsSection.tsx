import type { PopularProductItem } from '../../../shared/config/homePageData';
import styles from './PopularProductsSection.module.css';

type PopularProductsSectionProps = {
  items: PopularProductItem[];
};

export function PopularProductsSection({ items }: PopularProductsSectionProps): JSX.Element {
  return (
    <section className={styles.section}>
      <h2>Популярная продукция</h2>
      <div className={styles.cardsRow}>
        {items.map((item) => (
          <a className={styles.card} href={item.href} key={item.title}>
            <span className={styles.badge}>ХИТ</span>
            <div className={styles.imageWrap}>
              <img alt={item.title} src={item.image} />
            </div>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.price}>{item.price}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
