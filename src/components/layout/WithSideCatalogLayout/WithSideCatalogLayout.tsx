import type { ReactNode } from 'react';
import { catalogItems } from '../../../shared/config/homePageData';
import { SideCatalog } from '../../sections/SideCatalog/SideCatalog';
import styles from './WithSideCatalogLayout.module.css';

type WithSideCatalogLayoutProps = {
  children: ReactNode;
};

export function WithSideCatalogLayout({ children }: WithSideCatalogLayoutProps): JSX.Element {
  return (
    <section className={styles.layout}>
      <SideCatalog items={catalogItems} />
      <div className={styles.content}>{children}</div>
    </section>
  );
}
