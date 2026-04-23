import type { ReactNode } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './SiteLayout.module.css';

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps): JSX.Element {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
