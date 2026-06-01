import ButtonController from '@/components/common/Button/ButtonController';

import styles from './Focus.module.css';

export default function FocusTimer({ displayTime, isRunning, onStart }) {
  return (
    <section className={styles.timerSection}>
      <h2 className={styles.sectionTitle}>오늘의 집중</h2>

      <div className={styles.timerArea}>
        <p className={styles.timerText}>{displayTime}</p>
      </div>

      <div className={styles.controllerArea}>
        <ButtonController
          variant="primary"
          disabled={isRunning}
          onClick={onStart}
        />
      </div>
    </section>
  );
}
