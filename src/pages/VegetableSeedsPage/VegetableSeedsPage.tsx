import { Link } from 'react-router-dom';
import { SiteLayout } from '../../components/layout/SiteLayout/SiteLayout';
import { WithSideCatalogLayout } from '../../components/layout/WithSideCatalogLayout/WithSideCatalogLayout';
import { vegetableSeedsButtons } from '../../shared/config/homePageData';
import styles from './VegetableSeedsPage.module.css';

export function VegetableSeedsPage(): JSX.Element {
  return (
    <SiteLayout>
      <WithSideCatalogLayout>
        <div className={styles.content}>
          <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
            <Link to="/">Главная</Link>
            <span>/</span>
            <Link to="/catalog">Каталог</Link>
            <span>/</span>
            <span>Семена овощей</span>
          </nav>

          <h1>Семена овощей</h1>

          <div className={styles.buttonsRow}>
            {vegetableSeedsButtons.map((button) => (
              button.href.startsWith('/') ? (
                <Link className={styles.categoryButton} key={button.label} to={button.href}>
                  {button.label}
                </Link>
              ) : (
                <a className={styles.categoryButton} href={button.href} key={button.label}>
                  {button.label}
                </a>
              )
            ))}
          </div>
        </div>
      </WithSideCatalogLayout>
    </SiteLayout>
  );
}
