import clsx from 'clsx';

import styles from '@/pages/habits/HabitChip.module.css';

export default function HabitChip({ content, isChecked = false, onClick }) {
  return (
    <button
      type="button"
      className={clsx(styles.chip, isChecked && styles.checked)}
      onClick={onClick}
      aria-pressed={isChecked}
    >
      {content}
    </button>
  );
}
