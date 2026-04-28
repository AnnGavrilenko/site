import { useEffect } from 'react';
import { catalogItems, popularProducts } from '../../../shared/config/homePageData';
import { notifyNewStoreItems } from '../../../services/notificationService';

export function NotificationBootstrap(): null {
  useEffect(() => {
    void notifyNewStoreItems(popularProducts, 'store:known-products', 'Новые товары', '/catalog');

    const promotions = catalogItems.filter((item) => item.label.toLowerCase().includes('акци'));
    void notifyNewStoreItems(promotions, 'store:known-promotions', 'Новые акции', '/catalog');
  }, []);

  return null;
}
