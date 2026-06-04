<<<<<<< HEAD
import { useState } from 'react';
import { useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import HabitModal from '@/pages/habits/HabitModal';

export default function Habit() {
  const [modals, setModals] = useState({
    listModal: false,
    formModal: false,
  });
  const { studyId } = useParams();
  console.log('studyId 값:', studyId);
  return (
    <Container>
      <div>오늘의 습관 페이지</div>
      {/* <button
        onClick={() => setModals({ ...modals, formModal: true })}
        style={{ cursor: 'pointer', color: 'red' }}
      >
        오늘의 집중
      </button>*/}
      <button
        onClick={() => setModals({ ...modals, listModal: true })}
        style={{ cursor: 'pointer', color: 'red' }}
      >
        목록 수정
      </button>
      <HabitModal
        isOpen={modals.listModal}
        onClose={() => setModals({ ...modals, listModal: false })}
        studyId={studyId}
      />
=======
import { useEffect, useState } from 'react';

import Container from '@/layouts/Container/Container';

import styles from '@/pages/habits/Habit.module.css';

import ButtonHabit from '@/components/common/Button/ButtonHabit';
import ButtonText from '@/components/common/Button/ButtonText';

// 2026-06-04 오후 3:06 형태로 포맷
function formatNow(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  const hour = date.getHours();
  const meridiem = hour < 12 ? '오전' : '오후';
  const h12 = hour % 12 || 12;
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${meridiem} ${h12}:${min}`;
}

export default function Habit() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Container>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.studyName}>연우의 개발공장</h1>
          <nav className={styles.nav}>
            <ButtonHabit text="오늘의 집중" href="/focus" />
            <ButtonHabit text="홈" href="/" />
          </nav>
        </header>
        <div className={styles.clock}>
          <span className={styles.clockLabel}>현재 시간</span>
          <span className={styles.clockTag}>{formatNow(now)}</span>
        </div>

        <section className={styles.habitSection}>
          <div className={styles.habitHeader}>
            <h2 className={styles.habitTitle}>오늘의 습관</h2>
            <ButtonText
              text="목록 수정"
              color="gray"
              className={styles.editBtn}
            />
          </div>

          {/* TODO: 습관 목록 / 빈 상태 (habit-list 브랜치) */}
        </section>
      </div>
>>>>>>> 6d68919 (feat: 오늘의 습관 페이지 레이아웃 구현)
    </Container>
  );
}
