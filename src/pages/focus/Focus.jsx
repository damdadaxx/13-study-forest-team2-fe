import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import { useStudy } from '@/hooks/useStudy.js';

import { formatTimerDisplay } from '@/utils/time.js';

import styles from '@/pages/focus/Focus.module.css';
import FocusInfo from '@/pages/focus/FocusInfo';
import FocusTimer from '@/pages/focus/FocusTimer';

import Toast from '@/components/common/Toast/Toast';

const BASE_DURATION = 11;

export default function Focus() {
  const { studyId } = useParams();
  const studyResponse = useStudy(studyId);
  const study = studyResponse?.data;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const pauseButton = () => {
    setIsRunning(false);
    setIsToastOpen(true);
  };

  const resetButton = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
  };

  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => {
      setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  const displaySeconds = BASE_DURATION - elapsedSeconds;
  let displayTime = formatTimerDisplay(displaySeconds);
  if (displaySeconds < 0) {
    displayTime = `-${formatTimerDisplay(Math.abs(displaySeconds))}`;
  }

  const isCountDown = displaySeconds <= 10 && displaySeconds >= 0;
  const baseTime = formatTimerDisplay(BASE_DURATION);

  if (!study) return null;

  return (
    <Container className={styles.focusContainer}>
      <div className={styles.focusPage}>
        <FocusInfo study={study} />
        <FocusTimer
          displayTime={displayTime}
          baseTime={baseTime}
          isRunning={isRunning}
          isCountDown={isCountDown}
          onStart={() => setIsRunning(true)}
          pauseButton={pauseButton}
          resetButton={resetButton}
        />
        <Toast
          message="🚨 집중이 중단되었습니다."
          isDisplay={isToastOpen}
          onClose={() => setIsToastOpen(false)}
          color="warning"
        />
      </div>
    </Container>
  );
}
