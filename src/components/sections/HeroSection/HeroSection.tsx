import { HomeSlider } from '../HomeSlider/HomeSlider';
import styles from './HeroSection.module.css';

type HeroSectionProps = {
  slides: string[];
  sideBannerImage: string;
  showSideBanner?: boolean;
};

export function HeroSection({ slides, sideBannerImage, showSideBanner = true }: HeroSectionProps): JSX.Element {
  return (
    <section className={styles.hero}>
      <HomeSlider slides={slides} />
      {showSideBanner ? (
        <a className={styles.sideBanner} href="#">
          <img alt="Идеальный газон своими руками" src={sideBannerImage} />
        </a>
      ) : null}
    </section>
  );
}
