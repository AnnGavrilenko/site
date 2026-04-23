import type { PopularCategoryItem } from '../../../shared/config/homePageData';
import styles from './PopularCategoriesSection.module.css';

type PopularCategoriesSectionProps = {
  items: PopularCategoryItem[];
};

export function PopularCategoriesSection({ items }: PopularCategoriesSectionProps): JSX.Element {
  return (
    <section className={styles.section}>
      <h2>Популярные категории</h2>
      <div className={styles.grid}>
        {items.map((item) => (
          <a className={styles.card} href={item.href} key={item.title}>
            <img alt={item.title} src={item.image} />
            <div className={styles.bottomBar}>
              <span>{item.title}</span>
              <span className={styles.hoverButton}>Перейти в каталог</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
