import type { GardenEvent } from '../../../features/myGarden/types';
import { actionIconByType } from '../../../features/myGarden/templates';
import styles from './GardenCalendar.module.css';

type GardenCalendarProps = {
  monthDate: Date;
  selectedDate: string;
  events: GardenEvent[];
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function toDateKey(date: Date): string {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function GardenCalendar({
  monthDate,
  selectedDate,
  events,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: GardenCalendarProps): JSX.Element {
  const monthStart = startOfMonth(monthDate);
  const firstWeekDay = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const eventIconsByDate = events.reduce<Record<string, string[]>>((acc, event) => {
    const icon = actionIconByType[event.actionType];
    if (!icon) {
      return acc;
    }

    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(icon);
    return acc;
  }, {});

  const monthTitle = monthDate.toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <button aria-label="Предыдущий месяц" className={styles.monthButton} onClick={onPrevMonth} type="button">
          ←
        </button>
        <h2>{monthTitle}</h2>
        <button aria-label="Следующий месяц" className={styles.monthButton} onClick={onNextMonth} type="button">
          →
        </button>
      </header>

      <div className={styles.weekDays}>
        {weekDays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className={styles.grid}>
        {Array.from({ length: firstWeekDay }).map((_, idx) => (
          <span className={styles.emptyCell} key={`empty-${idx}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), idx + 1);
          const dateKey = toDateKey(date);
          const dayIcons = eventIconsByDate[dateKey] ?? [];
          const visibleIcons = dayIcons.slice(0, 3);
          const restCount = dayIcons.length - visibleIcons.length;
          const isActive = selectedDate === dateKey;

          return (
            <button
              className={`${styles.dayCell} ${isActive ? styles.dayCellActive : ''}`}
              key={dateKey}
              onClick={() => onSelectDate(dateKey)}
              type="button"
            >
              <span className={styles.dayNumber}>{idx + 1}</span>
              {visibleIcons.length > 0 ? (
                <span className={styles.stickers}>
                  {visibleIcons.map((icon, iconIdx) => (
                    <span key={`${dateKey}-icon-${iconIdx}`}>{icon}</span>
                  ))}
                  {restCount > 0 ? <span className={styles.more}>+{restCount}</span> : null}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
