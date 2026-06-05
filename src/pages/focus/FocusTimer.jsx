import clsx from 'clsx';

import styles from '@/pages/focus/Focus.module.css';

import ButtonController from '@/components/common/Button/ButtonController';
import ButtonControllerCircle from '@/components/common/Button/ButtonControllerCircle';

import IcTimer from '@/assets/images/icons/ic_timer.svg';

export default function FocusTimer({
  displayTime,
  baseTime,
  isRunning,
  isStarted,
  isCountDown,
  isOvertime,
  onStart,
  onPause,
  onReset,
  onStop,
}) {
  const shouldShowTimerIcon = isRunning || isStarted;

  return (
    <section className={styles.timerSection}>
      <h2 className={styles.sectionTitle}>오늘의 집중</h2>

      <div
        className={clsx(
          styles.timerIcon,
          !shouldShowTimerIcon && styles.timerIconHidden,
        )}
      >
        <img src={IcTimer} alt="설정 시간 아이콘" />
        <span>{baseTime}</span>
      </div>

      <div className={styles.timerArea}>
        <p
          className={clsx(
            styles.timerText,
            isCountDown && styles.redCount,
            isOvertime && styles.grayCount,
          )}
        >
          {displayTime}
        </p>
      </div>

      <div className={styles.controllerArea}>
        {isOvertime ? (
          <ButtonController variant="secondary" onClick={onStop} />
        ) : !isStarted && !isRunning ? (
          <ButtonController variant="primary" onClick={onStart} />
        ) : (
          <>
            <ButtonControllerCircle
              variant="secondary"
              color="green"
              onClick={isRunning ? onPause : onStart}
            />

            {/* 비활성화 상태 유지 */}
            <ButtonController variant="secondary" disabled={true} />

            {/* 리셋 */}
            <ButtonControllerCircle variant="primary" onClick={onReset} />
          </>
        )}
      </div>
    </section>
  );
}
