import { Link } from 'react-router-dom';
import { SiteLayout } from '../../components/layout/SiteLayout/SiteLayout';
import { WithSideCatalogLayout } from '../../components/layout/WithSideCatalogLayout/WithSideCatalogLayout';
import { basilLemonProductDetails } from '../../shared/config/homePageData';
import styles from './BasilLemonProductPage.module.css';

export function BasilLemonProductPage(): JSX.Element {
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
            <Link to="/catalog/vegetable-seeds/basil">Базилик</Link>
            <span>/</span>
            <span>{basilLemonProductDetails.title}</span>
          </nav>

          <section className={styles.topBlock}>
            <div className={styles.imageColumn}>
              <img alt={basilLemonProductDetails.title} src={basilLemonProductDetails.image} />
            </div>

            <div className={styles.infoColumn}>
              <h1>{basilLemonProductDetails.title}</h1>

              <div className={styles.ratingRow}>
                <span className={styles.stars}>★★★★★</span>
                <span>{basilLemonProductDetails.ratingLabel}</span>
              </div>

              <dl className={styles.characteristics}>
                {basilLemonProductDetails.characteristics.map((item) => (
                  <div className={styles.characteristicRow} key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>

              <p className={styles.code}>Код: {basilLemonProductDetails.code}</p>

              <p className={styles.priceRow}>
                <span>Цена:</span>
                <strong>{basilLemonProductDetails.price}</strong>
              </p>

              <div className={styles.buyRow}>
                <div aria-label="Количество" className={styles.counter} role="group">
                  <button type="button">-</button>
                  <span>1</span>
                  <button type="button">+</button>
                </div>
                <button className={styles.buyButton} type="button">
                  КУПИТЬ
                </button>
              </div>
            </div>
          </section>

          <div className={styles.tabs}>
            {basilLemonProductDetails.tabs.map((tab, index) => (
              <button
                className={index === 0 ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                key={tab}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <p className={styles.description}>{basilLemonProductDetails.description}</p>
        </div>
      </WithSideCatalogLayout>
    </SiteLayout>
  );
}
