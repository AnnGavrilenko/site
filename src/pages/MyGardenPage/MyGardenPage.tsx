import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AddGardenActionForm } from '../../components/myGarden/AddGardenActionForm/AddGardenActionForm';
import type { AddGardenActionPayload } from '../../components/myGarden/AddGardenActionForm/AddGardenActionForm';
import { AddPlantForm } from '../../components/myGarden/AddPlantForm/AddPlantForm';
import type { AddPlantPayload } from '../../components/myGarden/AddPlantForm/AddPlantForm';
import { GardenAddMenu } from '../../components/myGarden/GardenAddMenu/GardenAddMenu';
import { GardenCalendar } from '../../components/myGarden/GardenCalendar/GardenCalendar';
import { MobileBottomNav } from '../../components/mobile/MobileBottomNav/MobileBottomNav';
import { MobileCatalogDrawer } from '../../components/mobile/MobileCatalogDrawer/MobileCatalogDrawer';
import { MobileSearchPanel } from '../../components/mobile/MobileSearchPanel/MobileSearchPanel';
import { SiteLayout } from '../../components/layout/SiteLayout/SiteLayout';
import { NotificationsToggle } from '../../components/pwa/NotificationsToggle/NotificationsToggle';
import { plantCareTemplates, actionIconByType } from '../../features/myGarden/templates';
import type { GardenEvent, Plant } from '../../features/myGarden/types';
import { notifyGardenEvents } from '../../services/notificationService';
import { catalogItems, popularProducts } from '../../shared/config/homePageData';
import { useDisplayMode } from '../../shared/hooks/useDisplayMode';
import styles from './MyGardenPage.module.css';

type EventView = GardenEvent & { plantName: string };

function toDateKey(date: Date): string {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function addDays(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

function formatDate(dateKey: string): string {
  return new Date(`${dateKey}T00:00:00`).toLocaleDateString('ru-RU');
}

function buildId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function MyGardenPage(): JSX.Element {
  const { isStandalone, isMobileDevice } = useDisplayMode();
  const [monthDate, setMonthDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(toDateKey(new Date()));
  const [plants, setPlants] = useState<Plant[]>([]);
  const [events, setEvents] = useState<GardenEvent[]>([]);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState<boolean>(false);
  const [isAddPlantOpen, setIsAddPlantOpen] = useState<boolean>(false);
  const [isAddActionOpen, setIsAddActionOpen] = useState<boolean>(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const eventsBySelectedDate = useMemo(() => {
    const plantById = plants.reduce<Record<string, Plant>>((acc, plant) => {
      acc[plant.id] = plant;
      return acc;
    }, {});

    return events
      .filter((event) => event.date === selectedDate)
      .map<EventView>((event) => ({
        ...event,
        plantName: plantById[event.plantId]?.culture ?? 'Неизвестное растение',
      }));
  }, [events, plants, selectedDate]);

  useEffect(() => {
    const eventsForNotifications = events.map((event) => {
      const plantName = plants.find((plant) => plant.id === event.plantId)?.culture;
      return {
        id: event.id,
        date: event.date,
        isCompleted: event.isCompleted,
        actionType: event.actionType,
        plantName,
      };
    });

    void notifyGardenEvents(selectedDate, eventsForNotifications);
  }, [events, plants, selectedDate]);

  const toggleEventStatus = (eventId: string): void => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === eventId ? { ...event, isCompleted: !event.isCompleted } : event)),
    );
  };

  const deletePlantWithEvents = (plantId: string): void => {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
    setEvents((prevEvents) => prevEvents.filter((event) => event.plantId !== plantId));
  };

  const deleteGardenEvent = (eventId: string): void => {
    const targetEvent = events.find((event) => event.id === eventId);
    if (!targetEvent) {
      return;
    }

    if (targetEvent.actionType === 'Посадка') {
      deletePlantWithEvents(targetEvent.plantId);
      return;
    }

    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  const closeForms = (): void => {
    setIsAddPlantOpen(false);
    setIsAddActionOpen(false);
  };

  const openPlantForm = (): void => {
    setIsAddMenuOpen(false);
    setIsAddActionOpen(false);
    setIsAddPlantOpen(true);
  };

  const openActionForm = (): void => {
    setIsAddMenuOpen(false);
    setIsAddPlantOpen(false);
    setIsAddActionOpen(true);
  };

  const savePlant = (payload: AddPlantPayload): void => {
    const plantId = buildId();
    const plant: Plant = {
      id: plantId,
      category: payload.category,
      culture: payload.culture,
      plantedAt: payload.plantedAt,
      recommendationsEnabled: payload.recommendationsEnabled,
    };
    const plantingEvent: GardenEvent = {
      id: buildId(),
      plantId,
      actionType: 'Посадка',
      date: payload.plantedAt,
      isCompleted: false,
      source: 'planting',
    };

    const template = plantCareTemplates.find((item) => item.culture === payload.culture);
    const templateEvents: GardenEvent[] =
      payload.recommendationsEnabled && template
        ? template.steps
            .filter((step) => step.offsetDays > 0)
            .map((step) => ({
              id: buildId(),
              plantId,
              actionType: step.actionType,
              date: addDays(payload.plantedAt, step.offsetDays),
              isCompleted: false,
              source: 'template',
            }))
        : [];

    setPlants((prev) => [...prev, plant]);
    setEvents((prev) => [...prev, plantingEvent, ...templateEvents]);
    setSelectedDate(payload.plantedAt);
    setMonthDate(new Date(`${payload.plantedAt}T00:00:00`));
    closeForms();
  };

  const saveAction = (payload: AddGardenActionPayload): void => {
    const event: GardenEvent = {
      id: buildId(),
      plantId: payload.plantId,
      actionType: payload.actionType,
      date: payload.date,
      isCompleted: false,
      source: 'manual',
    };
    setEvents((prev) => [...prev, event]);
    setSelectedDate(payload.date);
    setMonthDate(new Date(`${payload.date}T00:00:00`));
    closeForms();
  };

  const openCatalog = (): void => {
    setIsSearchOpen(false);
    setIsCatalogOpen(true);
  };

  const openSearch = (): void => {
    setIsCatalogOpen(false);
    setIsSearchOpen(true);
  };

  if (!isStandalone || !isMobileDevice) {
    return <Navigate replace to="/" />;
  }

  return (
    <SiteLayout>
      <div className={styles.page}>
        <NotificationsToggle />
        <GardenCalendar
          events={events}
          monthDate={monthDate}
          onNextMonth={() => setMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
          onPrevMonth={() => setMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />

        {plants.length === 0 && events.length === 0 ? <p className={styles.emptyState}>У вас пока нет растений</p> : null}

        {plants.length > 0 || events.length > 0 ? (
          <section className={styles.eventsCard}>
            <h2>События на {formatDate(selectedDate)}</h2>
            {eventsBySelectedDate.length === 0 ? (
              <p className={styles.noEvents}>Нет событий</p>
            ) : (
              <ul className={styles.eventsList}>
                {eventsBySelectedDate.map((event) => {
                  const icon = actionIconByType[event.actionType] ?? '•';
                  return (
                    <li className={styles.eventItem} key={event.id}>
                      <button
                        aria-label="Удалить событие"
                        className={styles.deleteButton}
                        onClick={() => deleteGardenEvent(event.id)}
                        type="button"
                      >
                        ×
                      </button>
                      <div className={styles.eventContent}>
                        <p className={styles.eventTitle}>
                          <span>{icon}</span> {event.actionType}
                        </p>
                        <p className={styles.eventMeta}>{event.plantName}</p>
                      </div>
                      <label className={styles.checkbox}>
                        <input checked={event.isCompleted} onChange={() => toggleEventStatus(event.id)} type="checkbox" />
                        <span>{event.isCompleted ? 'Выполнено' : 'Выполнить'}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ) : null}
      </div>

      <GardenAddMenu
        isOpen={isAddMenuOpen}
        onAddAction={openActionForm}
        onAddPlant={openPlantForm}
        onToggle={() => setIsAddMenuOpen((prev) => !prev)}
      />

      <AddPlantForm isOpen={isAddPlantOpen} onClose={closeForms} onSubmit={savePlant} />
      <AddGardenActionForm isOpen={isAddActionOpen} onClose={closeForms} onSubmit={saveAction} plants={plants} />

      <MobileCatalogDrawer isOpen={isCatalogOpen} items={catalogItems} onClose={() => setIsCatalogOpen(false)} />
      <MobileSearchPanel isOpen={isSearchOpen} items={popularProducts} onClose={() => setIsSearchOpen(false)} />
      <MobileBottomNav isSearchActive={isSearchOpen} onOpenMenu={openCatalog} onOpenSearch={openSearch} />
    </SiteLayout>
  );
}
