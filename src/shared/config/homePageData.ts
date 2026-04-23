import logoImage from '../../images/HomePage/logo.jpg';
import slider1 from '../../images/HomePage/Slider1.jpg';
import slider2 from '../../images/HomePage/Slider2.jpg';
import slider3 from '../../images/HomePage/Slider3.jpg';
import grassBanner from '../../images/HomePage/Grass.jpg';
import seedlingsImage from '../../images/HomePage/sazhents.jpg';
import rosesImage from '../../images/HomePage/rose.jpg';
import groundImage from '../../images/HomePage/ground.jpg';
import seedlingGoodsImage from '../../images/HomePage/passada.jpg';
import potatoImage from '../../images/HomePage/potato.jpg';
import flowerImage from '../../images/HomePage/flower.jpg';
import popularProduct1 from '../../images/HomePage/popular1.jpg';
import popularProduct2 from '../../images/HomePage/popular2.jpg';
import popularProduct3 from '../../images/HomePage/popular3.jpg';
import popularProduct4 from '../../images/HomePage/popular4.jpg';
import popularProduct5 from '../../images/HomePage/popular5.jpg';
import popularProduct6 from '../../images/HomePage/popular6.jpg';
import popularProduct7 from '../../images/HomePage/popular7.jpg';
import popularProduct8 from '../../images/HomePage/popular8.jpg';
import vegetablesImage from '../../images/HomePage/vegetables.jpg';
import seedImage from '../../images/HomePage/seed.jpg';
import onionImage from '../../images/HomePage/onion.jpg';
import basilProductImage1 from '../../images/HomePage/bazilik1.jpg';
import basilProductImage2 from '../../images/HomePage/bazilik2.jpg';
import basilProductImage3 from '../../images/HomePage/bazilik3.jpg';

export type LinkItem = {
  label: string;
  href: string;
};

export type CatalogItem = {
  label: string;
  href: string;
  isExpandable?: boolean;
  isNew?: boolean;
  submenuTitle?: string;
  submenuItems?: string[];
  submenuTitleTo?: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: 'truck' | 'wreath' | 'sprout' | 'shield';
};

export type PopularCategoryItem = {
  title: string;
  image: string;
  href: string;
};

export type PopularProductItem = {
  title: string;
  image: string;
  price: string;
  href: string;
};

export type CatalogCategoryCardItem = {
  title: string;
  image: string;
  href: string;
};

export type VegetableSeedButtonItem = {
  label: string;
  href: string;
};

export type CatalogProductItem = {
  title: string;
  image: string;
  code: string;
  price: string;
  isHit?: boolean;
  detailsTo?: string;
};

export type ProductCharacteristicItem = {
  label: string;
  value: string;
};

export type ProductDetailsPageData = {
  title: string;
  image: string;
  code: string;
  price: string;
  ratingLabel: string;
  characteristics: ProductCharacteristicItem[];
  tabs: string[];
  description: string;
};

export const topMenuItems: LinkItem[] = [
  { label: 'О нас', href: '#' },
  { label: 'Новости', href: '#' },
  { label: 'Статьи', href: '#' },
  { label: 'Оптовым клиентам', href: '#' },
  { label: 'Доставка и оплата', href: '#' },
  { label: 'Магазины', href: '#' },
  { label: 'Контакты', href: '#' },
  { label: 'Вакансии', href: '#' },
];

export const catalogItems: CatalogItem[] = [
  { label: 'Акции', href: '#' },
  { label: 'Новинки', href: '#', isNew: true },
  { label: 'Семена Пан Гаспадар', href: '#', isNew: true },
  { label: 'Семена Эксперт', href: '#', isNew: true },
  {
    label: 'Семена овощей',
    href: '/catalog/vegetable-seeds',
    isExpandable: true,
    submenuTitle: 'ОВОЩНЫЕ КУЛЬТУРЫ',
    submenuItems: ['Базилик', 'Лук', 'Огурец', 'Перец', 'Томат'],
    submenuTitleTo: '/catalog/vegetable-seeds',
  },
  {
    label: 'Семена цветов',
    href: '#',
    isExpandable: true,
    submenuTitle: 'СЕМЕНА ЦВЕТОВ',
    submenuItems: ['Георгина', 'Флокс', 'Петуния'],
  },
  { label: 'Микрозелень', href: '#' },
  { label: 'Семена сидератов', href: '#' },
  { label: 'Семена газонной травы', href: '#' },
  { label: 'Лук-севок, чеснок', href: '#' },
  {
    label: 'Саженцы',
    href: '#',
    isExpandable: true,
    submenuTitle: 'САЖЕНЦЫ',
    submenuItems: ['Гортензии', 'Яблони', 'Клубника'],
  },
  { label: 'Саженцы роз', href: '#', isExpandable: true },
  { label: 'Семенной картофель', href: '#' },
  { label: 'Луковичные цветы', href: '#', isExpandable: true },
  { label: 'Удобрения', href: '#', isExpandable: true },
  { label: 'Биопрепараты', href: '#', isExpandable: true },
  { label: 'Средства защиты растений', href: '#', isExpandable: true },
  { label: 'Инструмент для сада и огорода', href: '#', isExpandable: true },
  { label: 'Грунты', href: '#', isExpandable: true },
  { label: 'Всё для рассады', href: '#', isExpandable: true },
  { label: 'Парники, укрывной материал', href: '#', isExpandable: true },
  { label: 'Поливочный инвентарь', href: '#', isExpandable: true },
  { label: 'Декор и обустройство сада', href: '#', isExpandable: true },
  { label: 'Хозяйственные товары', href: '#', isExpandable: true },
  { label: 'Товары для летнего отдыха', href: '#', isExpandable: true },
];

export const sliderImages: string[] = [slider1, slider2, slider3];

export const rightBannerImage = grassBanner;

export const featuresItems: FeatureItem[] = [
  {
    title: 'Доставка по всей Беларуси',
    description: 'Сроки доставки и способы оплаты',
    icon: 'truck',
  },
  {
    title: 'Более 50 лет опыта работы',
    description: 'Лидер в РБ по реализации высококачественных семян',
    icon: 'wreath',
  },
  {
    title: 'Качество гарантируем!',
    description: 'Поставляем только отборный материал.',
    icon: 'sprout',
  },
  {
    title: 'Оформление заказа',
    description: 'Без регистрации',
    icon: 'shield',
  },
];

export const popularCategories: PopularCategoryItem[] = [
  { title: 'Саженцы', image: seedlingsImage, href: '#' },
  { title: 'Саженцы роз', image: rosesImage, href: '#' },
  { title: 'Грунты', image: groundImage, href: '#' },
  { title: 'Всё для рассады', image: seedlingGoodsImage, href: '#' },
  { title: 'Семенной картофель', image: potatoImage, href: '#' },
  { title: 'Семена цветов', image: flowerImage, href: '#' },
];

export const popularProducts: PopularProductItem[] = [
  {
    title: 'Полиантес tuberosa The Pearl',
    image: popularProduct1,
    price: '33.25 руб/упак',
    href: '#',
  },
  {
    title: 'Фунгицид Азофос (марка М)',
    image: popularProduct2,
    price: '6.44 руб/шт',
    href: '#',
  },
  {
    title: 'Биотлин 3мл',
    image: popularProduct3,
    price: '2.10 руб/шт',
    href: '#',
  },
  {
    title: 'Растение Пеларгония',
    image: popularProduct4,
    price: '10.00 руб/шт',
    href: '#',
  },
  {
    title: 'Полиантес tuberosa The Pearl',
    image: popularProduct5,
    price: '33.25 руб/упак',
    href: '#',
  },
  {
    title: 'Свекла Маноло F1 столовая 1.5г',
    image: popularProduct6,
    price: '1.70 руб/пак',
    href: '#',
  },
  {
    title: 'Удобрение минеральное',
    image: popularProduct7,
    price: '5.95 руб/шт',
    href: '#',
  },
  {
    title: 'Грунт Двина Плюс 80л',
    image: popularProduct8,
    price: '17.40 руб/шт',
    href: '#',
  },
];

export const catalogPageCategories: CatalogCategoryCardItem[] = [
  { title: 'Семена овощей', image: vegetablesImage, href: '/catalog/vegetable-seeds' },
  { title: 'Семена цветов', image: flowerImage, href: '#' },
  { title: 'Семена сидератов', image: seedImage, href: '#' },
  { title: 'Лук-севок, чеснок', image: onionImage, href: '#' },
  { title: 'Саженцы', image: seedlingsImage, href: '#' },
  { title: 'Семенной картофель', image: potatoImage, href: '#' },
];

export const vegetableSeedsButtons: VegetableSeedButtonItem[] = [
  { label: 'Базилик', href: '/catalog/vegetable-seeds/basil' },
  { label: 'Перец', href: '#' },
  { label: 'Лук', href: '#' },
  { label: 'Томат', href: '#' },
  { label: 'Огурец', href: '#' },
];

export const basilProducts: CatalogProductItem[] = [
  {
    title: 'Базилик Аромат лимона 0.3г',
    image: basilProductImage1,
    code: '13391',
    price: '1.15 руб/пак',
    isHit: true,
    detailsTo: '/catalog/vegetable-seeds/basil/lemon',
  },
  {
    title: 'Базилик Генова зеленый 0.5г',
    image: basilProductImage2,
    code: '4392',
    price: '1.15 руб/пак',
    isHit: true,
  },
  {
    title: 'Базилик Гранат фиолетовый 0.2г',
    image: basilProductImage3,
    code: '4393',
    price: '1.15 руб/пак',
    isHit: true,
  },
];

export const basilLemonProductDetails: ProductDetailsPageData = {
  title: 'Базилик Аромат лимона 0.3г',
  image: basilProductImage1,
  code: '13391',
  price: '1.15 руб/пак',
  ratingLabel: '5 | Отзывов:1',
  characteristics: [
    { label: 'Назначение', value: 'приправа, ароматизатор' },
    { label: 'Высадка (посев) в грунт', value: 'середина мая - середина июня' },
    { label: 'Сбор урожая', value: 'середина июля - середина сентября' },
    { label: 'Схема посадки (см)', value: '35x15' },
    { label: 'Количество семян', value: '0,3 г' },
    {
      label: 'Производитель',
      value: 'satimex QUEDLINBURG GmbH, Gross Orden 19, 06484 Quedlinburg, Германия',
    },
  ],
  tabs: ['ОПИСАНИЕ', 'ГДЕ КУПИТЬ?', 'ОТЗЫВЫ(1)'],
  description:
    'Однолетнее растение высотой до 50 см. Сорт среднеранний. Обладает неповторимым лимонным вкусом и приятным, хорошо выраженным цитрусовым ароматом. Зеленые листья и молодые стебли используются в сушеном и свежем виде как приправа и ароматизатор к различным блюдам и напиткам. Тепло-, свето- и влаголюбив. Выращивают рассадным способом или посевом семян прямо в грунт. Не переносит заморозков! Качество семян проверено и соответствует Постановлению МСХиП РБ №37 от 29.10.2015г.',
};

export const buyerLinks: LinkItem[] = [
  { label: 'Акции', href: '#' },
  { label: 'Доставка и оплата', href: '#' },
  { label: 'Магазины', href: '#' },
  { label: 'Оптовым клиентам', href: '#' },
  { label: 'Статьи', href: '#' },
  { label: 'Подарочный сертификат', href: '#' },
  { label: 'Купон', href: '#' },
  { label: 'Защита персональных данных', href: '#' },
  { label: 'Договор публичной оферты', href: '#' },
  { label: 'Конкурс "Народный блогер"', href: '#' },
];

export const companyLinks: LinkItem[] = [
  { label: 'О нас', href: '#' },
  { label: 'Новости', href: '#' },
  { label: 'Контакты', href: '#' },
  { label: 'Акционерам', href: '#' },
  { label: 'Вакансии', href: '#' },
  { label: 'Поставщикам', href: '#' },
  { label: 'Импортозамещение', href: '#' },
];

export const footerLogo = logoImage;
