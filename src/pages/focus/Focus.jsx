import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import { createFocus } from '@/api/focus.js';

import {
  BASE_DURATION,
  TOAST_COLOR,
  TOAST_MESSAGE,
} from '@/constants/constants.js';

import { useStudy } from '@/hooks/useStudy.js';

import { formatTimerDisplay } from '@/utils/time.js';

import styles from '@/pages/focus/Focus.module.css';
import FocusInfo from '@/pages/focus/FocusInfo';
import FocusTimer from '@/pages/focus/FocusTimer';

import PasswordModal from '@/components/common/Modal/PasswordModal';
import Toast from '@/components/common/Toast/Toast';

export default function Focus() {
  const { studyId } = useParams();
  const navigate = useNavigate();

  // 데이터 조회
  const studyResponse = useStudy(studyId);
  const study = studyResponse?.data;

  // 타이머 상태
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 포인트 상태
  const [currentTotalPoint, setCurrentTotalPoint] = useState(null);

  // Toast 상태
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState(TOAST_COLOR.success);

  // 비밀번호 모달 상태
  const [isHabitPasswordModalOpen, setIsHabitPasswordModalOpen] =
    useState(false);

  function showToast(message, color = TOAST_COLOR.success) {
    setToastMessage(message);
    setToastColor(color);
    setIsToastOpen(true);
  }

  function closeToast() {
    setIsToastOpen(false);
    setToastMessage('');
    setToastColor(TOAST_COLOR.success);
  }

  // handle~ 이름으로 정리
  function handlePause() {
    setIsRunning(false);
    showToast(TOAST_MESSAGE.pause, TOAST_COLOR.warning);
  }

  function handleReset() {
    setIsRunning(false);
    setElapsedSeconds(0);
  }

  async function handleStop() {
    setIsRunning(false);

    try {
      const result = await createFocus(studyId, elapsedSeconds);
      const { earnedPoint, totalPoint } = result.data;

      setCurrentTotalPoint(totalPoint);
      setElapsedSeconds(0);

      showToast(`🎉 ${earnedPoint}P 획득했습니다!`, TOAST_COLOR.success);
    } catch (error) {
      console.error('집중 기록 생성 실패:', error);
      showToast(TOAST_MESSAGE.saveError, TOAST_COLOR.warning);
    }
  }

  function handleOpenHabitPasswordModal() {
    setIsHabitPasswordModalOpen(true);
  }

  function handleCloseHabitPasswordModal() {
    setIsHabitPasswordModalOpen(false);
  }

  function handleConfirmHabitPassword() {
    navigate(`/studies/${studyId}/habits`);
  }

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  const displaySeconds = BASE_DURATION - elapsedSeconds;

  // 음수 중복처리 제거 time.js에서 적용 중
  const displayTime = formatTimerDisplay(displaySeconds);
  const baseTime = formatTimerDisplay(BASE_DURATION);

  // 실제 경과 시간 elapsedSeconds 기준
  const isStarted = elapsedSeconds > 0;
  // 10초 이하부터 00:00까지 빨간색으로 표시
  const isCountDown = displaySeconds <= 10 && displaySeconds >= 0;
  // -00:01부터 초과 상태
  const isOvertime = displaySeconds < 0;

  if (!study) return null;

  const totalPoint =
    currentTotalPoint !== null ? currentTotalPoint : study.totalPoint;

  return (
    <Container className={styles.focusContainer}>
      <div className={styles.focusPage}>
        <FocusInfo
          study={study}
          totalPoint={totalPoint}
          onClickHabit={handleOpenHabitPasswordModal}
        />
        <FocusTimer
          displayTime={displayTime}
          baseTime={baseTime}
          isRunning={isRunning}
          isStarted={isStarted}
          isCountDown={isCountDown}
          isOvertime={isOvertime}
          onStart={() => setIsRunning(true)}
          onPause={handlePause}
          onReset={handleReset}
          onStop={handleStop}
        />
        <Toast
          message={toastMessage}
          isDisplay={isToastOpen}
          onClose={closeToast}
          color={toastColor}
        />

        <PasswordModal
          isOpen={isHabitPasswordModalOpen}
          onClose={handleCloseHabitPasswordModal}
          nickname={study.nickname}
          title={study.title}
          studyId={studyId}
          confirmText="오늘의 습관 시작하기"
          onConfirm={handleConfirmHabitPassword}
        />
      </div>
    </Container>
  );
}
