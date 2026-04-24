import { buyerLinks, companyLinks, footerLogo } from '../../../shared/config/homePageData';
import { useDisplayMode } from '../../../shared/hooks/useDisplayMode';
import { Icon } from '../../ui/Icon/Icon';
import styles from './Footer.module.css';

export function Footer(): JSX.Element {
  const { isStandalone } = useDisplayMode();

  if (isStandalone) {
    return (
      <footer className={styles.footer}>
        <div className={styles.appCard}>
          <a className={styles.appLogoLink} href="#">
            <img alt="Насенне" className={styles.appLogo} src={footerLogo} />
          </a>
          <a className={styles.appPhone} href="tel:+375296071324">
            8 (029) 607-13-24
          </a>
          <p className={styles.appAddress}>г. Минск, ул. Минная, д. 21, корп. 1</p>
          <a className={styles.appMail} href="mailto:info@msso.by">
            info@msso.by
          </a>
          <button className={styles.contactButton} type="button">
            Написать нам
          </button>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandColumn}>
          <a href="#">
            <img alt="Насенне" className={styles.logo} src={footerLogo} />
          </a>
          <a className={styles.primaryPhone} href="#">
            8 (029) 607-13-24
          </a>
          <div className={styles.worktime}>
            <h4>Режим работы:</h4>
            <p>Пн-Пт с 8.00 до 18.00</p>
            <p>Сб с 8.00 до 15.00</p>
            <p>Оформление заказов на сайте:</p>
            <p>Ежедневно, круглосуточно</p>
          </div>
          <div className={styles.socials}>
            <a aria-label="YouTube" href="#">
              <Icon name="youtube" />
            </a>
            <a aria-label="Instagram" href="#">
              <Icon name="instagram" />
            </a>
            <a aria-label="Facebook" href="#">
              <Icon name="facebook" />
            </a>
            <a aria-label="TikTok" href="#">
              <Icon name="tiktok" />
            </a>
          </div>
        </div>

        <div className={styles.linkColumn}>
          <h3>ПОКУПАТЕЛЯМ</h3>
          <ul>
            {buyerLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linkColumn}>
          <h3>КОМПАНИЯ</h3>
          <ul>
            {companyLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactsColumn}>
          <h3>КОНТАКТЫ</h3>
          <ul>
            <li>
              <Icon name="home" />
              <span>ОАО «МинскСортСемОвощ», 220014, Республика Беларусь, г. Минск, ул. Минная, д. 21, корп. 1</span>
            </li>
            <li>
              <Icon name="phone" />
              <span>8 (017) 374-25-87, факс (017) 373-25-96</span>
            </li>
            <li>
              <Icon name="mail" />
              <span>Email: info@msso.by</span>
            </li>
          </ul>
          <button className={styles.contactButton} type="button">
            Написать нам
          </button>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>Copyright © 2013-2026 ОАО «МинскСортСемОвощ». Все права защищены.</p>
        <p>
          Интернет-магазин зарегистрирован в Торговом Реестре Республики Беларусь №508695 от 28.04.2021.
        </p>
        <p>
          Свидетельство о государственной регистрации № 600052664 от 28.01.2000 выдано Мингорисполкомом.
        </p>
      </div>
    </footer>
  );
}
