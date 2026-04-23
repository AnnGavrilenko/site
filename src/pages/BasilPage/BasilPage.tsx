import { Link } from 'react-router-dom';
import { SiteLayout } from '../../components/layout/SiteLayout/SiteLayout';
import { WithSideCatalogLayout } from '../../components/layout/WithSideCatalogLayout/WithSideCatalogLayout';
import { CatalogProductCard } from '../../components/ui/CatalogProductCard/CatalogProductCard';
import { basilProducts } from '../../shared/config/homePageData';
import styles from './BasilPage.module.css';

export function BasilPage(): JSX.Element {
  return (
    <SiteLayout>
      <WithSideCatalogLayout>
        <div className={styles.content}>
          <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
            <Link to="/">Главная</Link>
            <span>/</span>
            <Link to="/catalog">Каталог</Link>
            <span>/</span>
            <Link to="/catalog/vegetable-seeds">Семена овощей</Link>
            <span>/</span>
            <span>Базилик</span>
          </nav>

          <h1>Базилик</h1>

          <section className={styles.productsGrid}>
            {basilProducts.map((product) => (
              <CatalogProductCard item={product} key={product.code} />
            ))}
          </section>
        </div>
      </WithSideCatalogLayout>
    </SiteLayout>
  );
}
