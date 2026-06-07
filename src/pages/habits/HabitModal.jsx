import { useState, useEffect } from 'react';

import { getHabits, createHabit, updateHabit, deleteHabit } from '@/api/habit';

import styles from '@/pages/habits/HabitModal.module.css';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal.jsx';

import trash from '@/assets/images/icons/ic_trash.svg';

export default function HabitModal({ isOpen, onClose, studyId }) {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (!isOpen || !studyId) return;

    const fetchHabits = async () => {
      try {
        const json = await getHabits(studyId);
        setHabits(
          json.data.habits.map((h) => ({
            id: h.id,
            content: h.content,
            originalContent: h.content,
            isNew: false,
            isDeleted: false,
          })),
        );
      } catch (err) {
        console.error('습관 불러오기 실패:', err);
      }
    };

    fetchHabits();
  }, [isOpen, studyId]);

  const handleAddHabit = () => {
    if (habits.length > 0 && habits[habits.length - 1].content.trim() === '') {
      setError(true);
      return;
    }
    setError(false);
    setApiError('');
    setHabits([
      ...habits,
      { id: `temp-${Date.now()}`, content: '', isNew: true, isDeleted: false },
    ]);
  };

  const handleHabitChange = (index, value) => {
    const updated = [...habits];
    updated[index] = { ...updated[index], content: value };
    setHabits(updated);
    if (error) setError(false);
    if (apiError) setApiError('');
  };
  const handleClose = () => {
    setError(false);
    setApiError('');
    setHabits([]);
    onClose();
  };

  const saveHabits = async (targetHabits) => {
    setLoading(true);
    setApiError('');
    try {
      for (const h of targetHabits) {
        if (h.isNew && !h.isDeleted && h.content.trim()) {
          await createHabit(studyId, h.content);
        } else if (!h.isNew && h.isDeleted) {
          await deleteHabit(studyId, h.id);
        } else if (
          !h.isNew &&
          !h.isDeleted &&
          h.content !== h.originalContent
        ) {
          await updateHabit(studyId, h.id, h.content);
        }
      }
      onClose();
    } catch (err) {
      setApiError(
        err.message || '서버 오류가 발생했습니다. 다시 시도해주세요.',
      );
    } finally {
      setLoading(false);
    }
  };

  // 수정완료 버튼
  const handleSubmit = async () => {
    const visibleHabits = habits.filter((h) => !h.isDeleted);
    if (
      visibleHabits.length > 0 &&
      visibleHabits[visibleHabits.length - 1].content.trim() === ''
    ) {
      setError(true);
      return;
    }
    await saveHabits(habits);
  };

  // 삭제 확인 모달에서 확인 눌렀을 때
  const handleConfirmDelete = async () => {
    const habit = habits[deleteTarget];
    let updatedHabits;

    if (habit.isNew) {
      updatedHabits = habits.filter((_, i) => i !== deleteTarget);
    } else {
      updatedHabits = habits.map((h, i) =>
        i === deleteTarget ? { ...h, isDeleted: true } : h,
      );
    }

    setDeleteTarget(null);
    setError(false);
    setApiError('');

    try {
      // 기존 습관이면 DB에서 삭제
      if (!habit.isNew) {
        await deleteHabit(studyId, habit.id);
      }
      // 성공하면 화면에서도 제거
      setHabits(updatedHabits.filter((h) => !h.isDeleted));
    } catch (err) {
      setApiError(err.message || '삭제에 실패했습니다.');
    }
  };

  const visibleHabits = habits.filter((h) => !h.isDeleted); //삭제한 습관 숨기기

  return (
    <>
      <Modal
        title="습관 목록"
        isOpen={isOpen}
        onClose={handleClose}
        btnComponents={
          <>
            <Button
              onClick={handleClose}
              color="gray"
              size="md"
              text="취소"
              className={styles.modalBtn}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              text={loading ? '저장 중...' : '수정완료'}
              size="md"
              className={styles.modalBtn}
              disabled={loading}
            />
          </>
        }
      >
        <div className={styles.bodyContainer}>
          {visibleHabits.map((habit, i) => (
            <div key={habit.id} className={styles.inputContainer}>
              <input
                className={`${styles.habitInput} ${
                  error && i === visibleHabits.length - 1 ? styles.shake : ''
                }`}
                value={habit.content}
                onChange={(e) =>
                  handleHabitChange(habits.indexOf(habit), e.target.value)
                }
                placeholder="습관을 추가해주세요"
                maxLength={20}
              />
              <button
                onClick={() => setDeleteTarget(habits.indexOf(habit))}
                className={styles.rmBtn}
                aria-label="습관 삭제 버튼"
              >
                <img src={trash} alt="" />
              </button>
            </div>
          ))}

          <div className={styles.btnContainer}>
            {error && <p className={styles.errorMsg}>습관을 입력해주세요</p>}
            {apiError && <p className={styles.errorMsg}>{apiError}</p>}

            {visibleHabits.length < 8 ? (
              <button className={styles.addBtn} onClick={handleAddHabit}>
                <span style={{ fontSize: '24px' }}>+</span>
              </button>
            ) : (
              <p className={styles.maxErrorMsg}>
                습관 생성은 최대 8개까지 가능합니다.
              </p>
            )}
          </div>
        </div>
      </Modal>

      {/* 삭제 확인 모달 */}
      <Modal
        title="습관 삭제"
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        btnComponents={
          <>
            <Button
              onClick={() => setDeleteTarget(null)}
              color="gray"
              size="md"
              text="취소"
              className={styles.modalBtn}
            />
            <Button
              onClick={handleConfirmDelete}
              size="md"
              text="확인"
              className={styles.modalBtn}
              disabled={loading}
            />
          </>
        }
      >
        <p style={{ textAlign: 'center', padding: '16px 0' }}>
          정말 삭제하시겠습니까?
        </p>
      </Modal>
    </>
  );
}
