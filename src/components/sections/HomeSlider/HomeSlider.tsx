import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../../ui/Icon/Icon';
import styles from './HomeSlider.module.css';

type HomeSliderProps = {
  slides: string[];
};

const AUTOPLAY_DELAY = 5000;

export function HomeSlider({ slides }: HomeSliderProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleSlides = slides.length > 1;

  const safeSlides = useMemo(() => (slides.length > 0 ? slides : ['']), [slides]);

  useEffect(() => {
    if (!hasMultipleSlides) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hasMultipleSlides, safeSlides.length]);

  const goToSlide = (index: number): void => {
    setActiveIndex(index);
  };

  const goPrev = (): void => {
    setActiveIndex((prev) => (prev - 1 + safeSlides.length) % safeSlides.length);
  };

  const goNext = (): void => {
    setActiveIndex((prev) => (prev + 1) % safeSlides.length);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {safeSlides.map((slide, index) => (
            <div className={styles.slide} key={`${slide}-${index}`}>
              <img alt={`Слайд ${index + 1}`} src={slide} />
            </div>
          ))}
        </div>
      </div>

      {hasMultipleSlides ? (
        <>
          <button aria-label="Предыдущий слайд" className={`${styles.arrow} ${styles.arrowLeft}`} onClick={goPrev} type="button">
            <Icon name="chevronRight" />
          </button>
          <button aria-label="Следующий слайд" className={`${styles.arrow} ${styles.arrowRight}`} onClick={goNext} type="button">
            <Icon name="chevronRight" />
          </button>
          <div className={styles.dots}>
            {safeSlides.map((_, index) => (
              <button
                aria-label={`Переключить на слайд ${index + 1}`}
                className={index === activeIndex ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                key={index}
                onClick={() => goToSlide(index)}
                type="button"
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
