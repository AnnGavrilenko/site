import { Link } from 'react-router-dom';
import { SiteLayout } from '../../components/layout/SiteLayout/SiteLayout';
import { WithSideCatalogLayout } from '../../components/layout/WithSideCatalogLayout/WithSideCatalogLayout';
import { catalogPageCategories } from '../../shared/config/homePageData';
import styles from './CatalogPage.module.css';

export function CatalogPage(): JSX.Element {
  return (
    <SiteLayout>
      <WithSideCatalogLayout>
        <div className={styles.content}>
          <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
            <Link to="/">Главная</Link>
            <span>/</span>
            <span>Каталог</span>
          </nav>

          <h1>Каталог</h1>

          <div className={styles.grid}>
            {catalogPageCategories.map((category) => (
              category.href.startsWith('/') ? (
                <Link className={styles.card} key={category.title} to={category.href}>
                  <img alt={category.title} src={category.image} />
                  <span className={styles.overlayTitle}>{category.title}</span>
                </Link>
              ) : (
                <a className={styles.card} href={category.href} key={category.title}>
                  <img alt={category.title} src={category.image} />
                  <span className={styles.overlayTitle}>{category.title}</span>
                </a>
              )
            ))}
          </div>
        </div>
      </WithSideCatalogLayout>
    </SiteLayout>
  );
}
