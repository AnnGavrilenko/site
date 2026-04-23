import { Link } from 'react-router-dom';
import type { CatalogProductItem } from '../../../shared/config/homePageData';
import styles from './CatalogProductCard.module.css';

type CatalogProductCardProps = {
  item: CatalogProductItem;
};

export function CatalogProductCard({ item }: CatalogProductCardProps): JSX.Element {
  const hasDetailsPage = Boolean(item.detailsTo?.startsWith('/'));

  return (
    <article className={styles.card}>
      {hasDetailsPage ? (
        <Link className={styles.mainInfoLink} to={item.detailsTo as string}>
          <div className={styles.imageWrap}>
            {item.isHit ? <span className={styles.hitBadge}>ХИТ</span> : null}
            <img alt={item.title} src={item.image} />
          </div>
          <h3>{item.title}</h3>
        </Link>
      ) : (
        <>
          <div className={styles.imageWrap}>
            {item.isHit ? <span className={styles.hitBadge}>ХИТ</span> : null}
            <img alt={item.title} src={item.image} />
          </div>
          <h3>{item.title}</h3>
        </>
      )}
      <p className={styles.code}>Код: {item.code}</p>
      <p className={styles.price}>{item.price}</p>

      <div aria-label="Количество" className={styles.counter} role="group">
        <button type="button">-</button>
        <span>1</span>
        <button type="button">+</button>
      </div>

      <button className={styles.buyButton} type="button">
        КУПИТЬ
      </button>
    </article>
  );
}
