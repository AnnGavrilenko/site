import { useState } from 'react';
import { MobileBottomNav } from '../../components/mobile/MobileBottomNav/MobileBottomNav';
import { MobileCatalogDrawer } from '../../components/mobile/MobileCatalogDrawer/MobileCatalogDrawer';
import { MobileSearchPanel } from '../../components/mobile/MobileSearchPanel/MobileSearchPanel';
import { SiteLayout } from '../../components/layout/SiteLayout/SiteLayout';
import { WithSideCatalogLayout } from '../../components/layout/WithSideCatalogLayout/WithSideCatalogLayout';
import { FeaturesSection } from '../../components/sections/FeaturesSection/FeaturesSection';
import { HeroSection } from '../../components/sections/HeroSection/HeroSection';
import { PopularCategoriesSection } from '../../components/sections/PopularCategoriesSection/PopularCategoriesSection';
import { PopularProductsSection } from '../../components/sections/PopularProductsSection/PopularProductsSection';
import {
  catalogItems,
  featuresItems,
  popularCategories,
  popularProducts,
  rightBannerImage,
  sliderImages,
} from '../../shared/config/homePageData';
import styles from './HomePage.module.css';

export function HomePage(): JSX.Element {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openCatalog = (): void => {
    setIsSearchOpen(false);
    setIsCatalogOpen(true);
  };

  const openSearch = (): void => {
    setIsCatalogOpen(false);
    setIsSearchOpen(true);
  };

  return (
    <SiteLayout>
      <WithSideCatalogLayout>
        <HeroSection sideBannerImage={rightBannerImage} slides={sliderImages} />
        <div className={styles.popularProductsWrap}>
          <PopularProductsSection items={popularProducts} />
        </div>
      </WithSideCatalogLayout>

      <section className={styles.mainZone}>
        <FeaturesSection items={featuresItems} />
      </section>

      <section className={styles.mainZone}>
        <PopularCategoriesSection items={popularCategories} />
      </section>

      <MobileCatalogDrawer isOpen={isCatalogOpen} items={catalogItems} onClose={() => setIsCatalogOpen(false)} />
      <MobileSearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileBottomNav onOpenMenu={openCatalog} onOpenSearch={openSearch} />
    </SiteLayout>
  );
}
