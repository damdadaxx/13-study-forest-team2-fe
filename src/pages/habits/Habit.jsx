import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import Container from '@/layouts/Container/Container';

import { getHabits, checkHabit } from '@/api/habit';

import { usePasswordGuard } from '@/hooks/usePasswordGuard.js';
import { useStudy } from '@/hooks/useStudy';

import styles from '@/pages/habits/Habit.module.css';
import HabitChip from '@/pages/habits/HabitChip';
import HabitModal from '@/pages/habits/HabitModal';

import ButtonHabit from '@/components/common/Button/ButtonHabit';
import ButtonText from '@/components/common/Button/ButtonText';
import PasswordModal from '@/components/common/Modal/PasswordModal';

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
  const navigate = useNavigate();
  usePasswordGuard(`/studies/${studyId}`);

  // 스터디명 연동 (useStudy는 언래핑 안 함 -> data.title로 깐다)
  const studyData = useStudy(studyId);
  const { nickname, title } = studyData?.data ?? {};

  // 습관 목록 + 로딩/에러
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // 습관 조회 - getHabits() 가 res.json() 통째 반환 -> result.data.habits 로 깐다
  async function fetchHabits() {
    setLoading(true);
    setLoadError(null);
    try {
      const result = await getHabits(studyId);
      setHabits(result.data.habits);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const load = async () => {
      await fetchHabits();
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyId]);

  // 체크 토글 - 낙관적 업데이트 후 실패 시 롤백
  async function handleToggle(habitId, current) {
    const next = !current;

    // 1) 낙관적: 화면 먼저 바꾼다
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, isChecked: next } : h)),
    );

    // 2) 서버 반영
    try {
      await checkHabit(studyId, habitId, next);
    } catch {
      // 3) 실패 시 롤백
      setHabits((prev) =>
        prev.map((h) => (h.id === habitId ? { ...h, isChecked: current } : h)),
      );
    }
  }

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
          <h1 className={styles.studyName}>
            <span>{nickname}</span>의 {title}
          </h1>
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

          {loadError && <p className={styles.message}>{loadError}</p>}

          {loading && !loadError && (
            <p className={styles.message}>불러오는 중...</p>
          )}

          {!loadError && !loading && habits.length === 0 && (
            <div className={styles.empty}>
              <p>아직 습관이 없어요</p>
              <p>목록 수정을 눌러 습관을 생성해보세요</p>
            </div>
          )}

          {!loadError && habits.length > 0 && (
            <ul className={styles.habitList}>
              {habits.map((habit) => (
                <li key={habit.id}>
                  <HabitChip
                    content={habit.content}
                    isChecked={habit.isChecked}
                    onClick={() => {
                      handleToggle(habit.id, habit.isChecked);
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* 습관 목록 편집 모달 */}
      <HabitModal
        isOpen={modals.listModal}
        onClose={() => {
          setModals({ ...modals, listModal: false });
          fetchHabits(); // 수정완료 후 목록 즉시 반영
        }}
        studyId={studyId}
      />

      {/* 오늘의 집중 진입 비밀번호 검증 모달 */}
      <PasswordModal
        isOpen={modals.formModal}
        onClose={() => setModals({ ...modals, formModal: false })}
        nickname={nickname}
        title={title}
        studyId={studyId}
        onConfirm={(pw) =>
          navigate(`/studies/${studyId}/focus`, { state: { password: pw } })
        }
        confirmText="오늘의 집중으로 가기"
      />
    </Container>
  );
}
