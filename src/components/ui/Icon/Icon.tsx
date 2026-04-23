import styles from './Icon.module.css';

type IconName =
  | 'menu'
  | 'search'
  | 'cart'
  | 'chevronDown'
  | 'chevronRight'
  | 'truck'
  | 'wreath'
  | 'sprout'
  | 'shield'
  | 'phone'
  | 'pin'
  | 'mail'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'tiktok'
  | 'home';

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps): JSX.Element {
  const iconClassName = className ? `${styles.icon} ${className}` : styles.icon;

  switch (name) {
    case 'menu':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case 'search':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4.3-4.3" />
        </svg>
      );
    case 'cart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M3 4h2l2.1 10.4h9.6L19 7H7.5" />
          <circle cx="10" cy="19" r="1.6" />
          <circle cx="17" cy="19" r="1.6" />
        </svg>
      );
    case 'chevronDown':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case 'chevronRight':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M2 6h11v8H2zM13 9h4l3 3v2h-7z" />
          <circle cx="7" cy="17" r="1.8" />
          <circle cx="17" cy="17" r="1.8" />
        </svg>
      );
    case 'wreath':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M12 4v16M6.5 8.5c1.2 1.6 2.3 2.5 3.8 2.8M17.5 8.5c-1.2 1.6-2.3 2.5-3.8 2.8M5.5 15.5c1.4-1.2 2.8-1.8 4.2-1.8M18.5 15.5c-1.4-1.2-2.8-1.8-4.2-1.8" />
        </svg>
      );
    case 'sprout':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M12 20v-8M12 12c0-4.2 3.3-6.5 7-7-0.4 3.7-2.8 7-7 7zM12 14c0-3.4-2.8-5.4-6.5-5.9 0.5 3.3 2.6 5.9 6.5 5.9z" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M12 3l8 3v6c0 5-3.2 7.8-8 9-4.8-1.2-8-4-8-9V6l8-3z" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M5 4h4l1 4-2.3 2.3a14.2 14.2 0 0 0 6 6L16 14l4 1v4c0 0.6-0.4 1-1 1C10.7 20 4 13.3 4 5c0-0.6 0.4-1 1-1z" />
        </svg>
      );
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M12 21s6-5.8 6-11a6 6 0 1 0-12 0c0 5.2 6 11 6 11z" />
          <circle cx="12" cy="10" r="2" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M4 6h16v12H4zM4 8l8 6 8-6" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.4" />
          <circle cx="17.3" cy="6.7" r="1" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M14 8h3V4h-3c-2.6 0-4 1.7-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M21 8.5s-0.2-1.7-0.9-2.4c-0.9-0.9-1.9-0.9-2.4-1C14.4 5 12 5 12 5h0s-2.4 0-5.7 0.1c-0.5 0.1-1.5 0.1-2.4 1C3.2 6.8 3 8.5 3 8.5S2.8 10.4 2.8 12.2v1.6c0 1.8 0.2 3.7 0.2 3.7s0.2 1.7 0.9 2.4c0.9 0.9 2.1 0.9 2.6 1C8.4 21 12 21 12 21s2.4 0 5.7-0.1c0.5-0.1 1.5-0.1 2.4-1 0.7-0.7 0.9-2.4 0.9-2.4s0.2-1.8 0.2-3.7v-1.6C21.2 10.4 21 8.5 21 8.5z" />
          <path d="M10 15.5V8.9l5.5 3.3z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M14 4c0.5 2.1 1.8 3.5 4 4v3c-1.4 0-2.7-0.4-4-1.2v5.4a5.2 5.2 0 1 1-4.6-5.1v3a2.2 2.2 0 1 0 1.6 2.1V4h3z" />
        </svg>
      );
    case 'home':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClassName}>
          <path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" />
        </svg>
      );
  }
}
