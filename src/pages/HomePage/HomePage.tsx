import { SiteLayout } from '../../components/layout/SiteLayout/SiteLayout';
import { WithSideCatalogLayout } from '../../components/layout/WithSideCatalogLayout/WithSideCatalogLayout';
import { FeaturesSection } from '../../components/sections/FeaturesSection/FeaturesSection';
import { HeroSection } from '../../components/sections/HeroSection/HeroSection';
import { PopularCategoriesSection } from '../../components/sections/PopularCategoriesSection/PopularCategoriesSection';
import { PopularProductsSection } from '../../components/sections/PopularProductsSection/PopularProductsSection';
import {
  featuresItems,
  popularCategories,
  popularProducts,
  rightBannerImage,
  sliderImages,
} from '../../shared/config/homePageData';
import styles from './HomePage.module.css';

export function HomePage(): JSX.Element {
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
    </SiteLayout>
  );
}
