import styles from '@/pages/focus/Focus.module.css';

import ButtonController from '@/components/common/Button/ButtonController';

export default function FocusTimer({ displayTime, isRunning, onStart }) {
  return (
    <section className={styles.timerSection}>
      <h2 className={styles.sectionTitle}>오늘의 집중</h2>

      <div className={styles.timerArea}>
        <p className={styles.timerText}>{displayTime}</p>
      </div>

      <div className={styles.controllerArea}>
        {/*
          현재 layout 범위에서는 Start 활성화/비활성화까지만 처리합니다.
          추후 작동 중 화면 이후 overtime 브랜치에서 마무리 예정입니다.
        */}
        <ButtonController
          variant="primary"
          disabled={isRunning}
          onClick={onStart}
        />
      </div>
    </section>
  );
}
