import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import { getHabits } from '@/api/habit';

import styles from '@/pages/habits/Habit.module.css';
import HabitModal from '@/pages/habits/HabitModal';

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
  const { studyId } = useParams();

  // 습관 목록 + 로딩/에러
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // 습관 조회 - getHabits() 가 res.json() 통째 반환 -> result.data.habits 로 깐다
  useEffect(() => {
    let ignore = false;

    async function fetchHabits() {
      setLoading(true);
      setLoadError(null);
      try {
        const result = await getHabits(studyId);
        if (!ignore) setHabits(result.data.habits);
      } catch (err) {
        if (!ignore) setLoadError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchHabits();
    return () => {
      ignore = true;
    };
  }, [studyId]);

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // listModal: 습관 목록 편집 (HabitModal) / formModal: 오늘의 집중 진입 비밀번호 검증
  const [modals, setModals] = useState({
    listModal: false,
    formModal: false,
  });

  return (
    <Container>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.studyName}>연우의 개발공장</h1>
          {/* 스터디 명 하드코딩, 추후 연동 */}
          <nav className={styles.nav}>
            {/* 오늘의 집중 이동 전 비밀번호 검증 필요 -> 모달 오픈 */}
            <ButtonHabit
              text="오늘의 집중"
              onClick={() => setModals({ ...modals, formModal: true })}
            />
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
              onClick={() => setModals({ ...modals, listModal: true })}
            />
          </div>

          {/* TODO: 습관 목록 / 빈 상태 (habit-list 브랜치) */}
        </section>
      </div>

      {/* 습관 목록 편집 모달 */}
      <HabitModal
        isOpen={modals.listModal}
        onClose={() => setModals({ ...modals, listModal: false })}
        studyId={studyId}
      />

      {/* TODO: 오늘의 집중 진입 비밀번호 검증 보달 (formModal)
          인증 성공 시 setModals 로 닫고 navigate('/focus')*/}
    </Container>
  );
}
