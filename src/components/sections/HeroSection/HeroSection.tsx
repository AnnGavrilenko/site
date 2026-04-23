import { HomeSlider } from '../HomeSlider/HomeSlider';
import styles from './HeroSection.module.css';

type HeroSectionProps = {
  slides: string[];
  sideBannerImage: string;
};

export function HeroSection({ slides, sideBannerImage }: HeroSectionProps): JSX.Element {
  return (
    <section className={styles.hero}>
      <HomeSlider slides={slides} />
      <a className={styles.sideBanner} href="#">
        <img alt="Идеальный газон своими руками" src={sideBannerImage} />
      </a>
    </section>
  );
}
