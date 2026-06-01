import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import styles from './Focus.module.css';
import FocusInfo from './FocusInfo';
import FocusTimer from './FocusTimer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_DURATION = 1500;

function formatTimerDisplay(seconds) {
  const isOvertime = seconds < 0;
  const absoluteSeconds = isOvertime ? -seconds : seconds;

  const minutes = Math.floor(absoluteSeconds / 60);
  const restSeconds = absoluteSeconds % 60;

  const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const displaySeconds =
    restSeconds < 10 ? `0${restSeconds}` : `${restSeconds}`;

  return isOvertime
    ? `-${displayMinutes}:${displaySeconds}`
    : `${displayMinutes}:${displaySeconds}`;
}

export default function Focus() {
  const { studyId } = useParams();

  const [study, setStudy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    async function fetchStudy() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await fetch(`${API_BASE_URL}/studies/${studyId}`);

        if (!response.ok) {
          throw new Error('스터디 정보를 불러오지 못했습니다.');
        }

        const result = await response.json();
        setStudy(result.data);
      } catch (error) {
        setErrorMessage(error?.message || '스터디 정보를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudy();
  }, [studyId]);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  function handleStart() {
    setIsRunning(true);
  }

  // earnedPoint, totalPoint 계산은 BE의 focus.controller.js에서 처리합니다.
  const displaySeconds = BASE_DURATION - elapsedSeconds;
  const displayTime = formatTimerDisplay(displaySeconds);

  if (isLoading) {
    return (
      <Container size="lg" className={styles.focusContainer}>
        <p className={styles.message}>스터디 정보를 불러오는 중입니다.</p>
      </Container>
    );
  }

  if (errorMessage) {
    return (
      <Container size="lg" className={styles.focusContainer}>
        <p className={styles.message}>{errorMessage}</p>
      </Container>
    );
  }

  if (!study) return null;

  return (
    <Container size="lg" className={styles.focusContainer}>
      <div className={styles.focusPage}>
        <FocusInfo study={study} />

        <FocusTimer
          displayTime={displayTime}
          isRunning={isRunning}
          onStart={handleStart}
        />
      </div>
    </Container>
  );
}
