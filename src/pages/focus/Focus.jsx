import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import { useStudy } from '@/hooks/useStudy.js';

import { formatTimerDisplay } from '@/utils/time.js';

import styles from '@/pages/focus/Focus.module.css';
import FocusInfo from '@/pages/focus/FocusInfo';
import FocusTimer from '@/pages/focus/FocusTimer';

const BASE_DURATION = 1500;

export default function Focus() {
  const { studyId } = useParams();

  const studyResponse = useStudy(studyId);
  const study = studyResponse?.data;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  // earnedPoint, totalPoint 계산은 BE의 focus.controller.js에서 처리합니다.
  const displaySeconds = BASE_DURATION - elapsedSeconds;
  const displayTime = formatTimerDisplay(displaySeconds);

  // 로딩 , 에러 처리 hook 구조에 맞춰 제거하였습니다. API 응답 전 최소 방어 처리
  if (!study) return null;

  return (
    <Container className={styles.focusContainer}>
      <div className={styles.focusPage}>
        <FocusInfo study={study} />
        <FocusTimer
          displayTime={displayTime}
          isRunning={isRunning}
          onStart={() => setIsRunning(true)}
        />
      </div>
    </Container>
  );
}
