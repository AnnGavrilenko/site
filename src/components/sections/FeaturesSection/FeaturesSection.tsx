import type { FeatureItem } from '../../../shared/config/homePageData';
import { Icon } from '../../ui/Icon/Icon';
import styles from './FeaturesSection.module.css';

type FeaturesSectionProps = {
  items: FeatureItem[];
};

export function FeaturesSection({ items }: FeaturesSectionProps): JSX.Element {
  return (
    <section className={styles.features}>
      {items.map((item) => (
        <article className={styles.card} key={item.title}>
          <Icon className={styles.icon} name={item.icon} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
}
