type SupportedNotificationPermission = NotificationPermission | 'unsupported';

type SimpleNotificationOptions = {
  tag?: string;
  url?: string;
};

type GardenNotificationEvent = {
  id: string;
  date: string;
  isCompleted: boolean;
  actionType?: string;
  plantName?: string;
};

type StoreComparableItem = {
  id?: string | number;
  title?: string;
  name?: string;
  label?: string;
};

function todayKey(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function normalizeItemId(item: StoreComparableItem): string {
  if (item.id !== undefined && item.id !== null) {
    return String(item.id);
  }

  return item.title ?? item.name ?? item.label ?? '';
}

export function canUseNotifications(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export async function requestNotificationPermission(): Promise<SupportedNotificationPermission> {
  if (!canUseNotifications()) {
    return 'unsupported';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  return Notification.requestPermission();
}

export function wasNotificationShown(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem(key) === todayKey();
}

export function markNotificationAsShown(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(key, todayKey());
}

export async function showSimpleNotification(title: string, body: string, options?: SimpleNotificationOptions): Promise<void> {
  if (!canUseNotifications() || Notification.permission !== 'granted') {
    return;
  }

  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.showNotification(title, {
        body,
        tag: options?.tag,
        data: { url: options?.url },
      });
      return;
    }
  }

  const notification = new Notification(title, {
    body,
    tag: options?.tag,
  });

  if (options?.url) {
    notification.onclick = () => {
      window.focus();
      window.location.href = options.url as string;
      notification.close();
    };
  }
}

export async function notifyGardenEvents(date: string, events: GardenNotificationEvent[]): Promise<void> {
  if (!events.length) {
    return;
  }

  const pendingEvents = events.filter((event) => event.date === date && !event.isCompleted);
  if (!pendingEvents.length) {
    return;
  }

  const firstPending = pendingEvents[0];
  const uniqueKey = `notification:garden:${todayKey()}:${firstPending.id}`;

  if (wasNotificationShown(uniqueKey)) {
    return;
  }

  const detailedText =
    firstPending.actionType && firstPending.plantName
      ? `У вас есть невыполненное действие: ${firstPending.actionType} для ${firstPending.plantName}`
      : 'На выбранную дату есть невыполненные действия по растениям';

  await showSimpleNotification('Мой огород', detailedText, {
    tag: `garden-${date}`,
    url: '/my-garden',
  });

  markNotificationAsShown(uniqueKey);
}

export async function notifyNewStoreItems(
  items: StoreComparableItem[],
  storageKey: string,
  notificationTitle: string,
  targetUrl: string,
): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedItems = items.map(normalizeItemId).filter(Boolean);
  const previousRaw = localStorage.getItem(storageKey);

  if (!previousRaw) {
    localStorage.setItem(storageKey, JSON.stringify(normalizedItems));
    return;
  }

  let previousItems: string[] = [];
  try {
    previousItems = JSON.parse(previousRaw) as string[];
  } catch {
    previousItems = [];
  }

  const knownSet = new Set(previousItems);
  const newItems = normalizedItems.filter((value) => !knownSet.has(value));

  if (!newItems.length) {
    localStorage.setItem(storageKey, JSON.stringify(normalizedItems));
    return;
  }

  const alreadyShownTodayKey = `notification:store:${storageKey}:${todayKey()}`;
  if (wasNotificationShown(alreadyShownTodayKey)) {
    localStorage.setItem(storageKey, JSON.stringify(normalizedItems));
    return;
  }

  const firstNewName = newItems[0];
  const body =
    notificationTitle === 'Новые акции'
      ? `Новая акция: ${firstNewName}`
      : `Новый товар: ${firstNewName}`;

  await showSimpleNotification(notificationTitle, body, {
    tag: `store-${storageKey}`,
    url: targetUrl,
  });

  markNotificationAsShown(alreadyShownTodayKey);
  localStorage.setItem(storageKey, JSON.stringify(normalizedItems));
}
