import { useState } from 'react';
import { requestNotificationPermission } from '../../../services/notificationService';
import styles from './NotificationsToggle.module.css';

export function NotificationsToggle(): JSX.Element | null {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported';
    }

    return Notification.permission;
  });

  if (permission === 'unsupported' || permission === 'granted') {
    return null;
  }

  const onEnableNotifications = async (): Promise<void> => {
    const nextPermission = await requestNotificationPermission();
    setPermission(nextPermission);
  };

  return (
    <button className={styles.button} onClick={() => void onEnableNotifications()} type="button">
      Включить уведомления
    </button>
  );
}
