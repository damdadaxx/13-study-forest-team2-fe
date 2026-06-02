import { useState } from 'react';

import styles from '@/pages/habits/HabitModal.module.css';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal.jsx';

import trash from '@/assets/images/icons/ic_trash.svg';

export default function HabitModal({ isOpen, onClose }) {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState('');
  const handleError = () => {
    if (habits.length > 0 && habits[habits.length - 1].trim() === '') {
      setError('습관을 입력해주세요.');
      return;
    }
    setError('');
    setHabits([...habits, '']);
  };
  const handleHabitChange = (index, value) => {
    const updated = [...habits];
    updated[index] = value;
    setHabits(updated);
  };
  const handleHabitDelete = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };
  return (
    <Modal
      title="습관 목록"
      isOpen={isOpen}
      onClose={onClose}
      btnComponents={
        <>
          <Button
            onClick={onClose}
            color="gray"
            size="md"
            text="취소"
            className={styles.modalBtn}
          />
          <Button
            type="submit"
            onClick={onClose}
            text="수정완료"
            size="md"
            className={styles.modalBtn}
          />
        </>
      }
    >
      <div className={styles.bodyContainer}>
        {habits.map((habit, i) => (
          <div key={i} className={styles.inputContainer}>
            <input
              className={`${styles.habitInput} ${error ? styles.shake : ''}`}
              value={habit}
              onChange={(e) => handleHabitChange(i, e.target.value)}
              placeholder={`${i + 1}번째 습관을 추가해주세요`}
              maxLength={20}
              minLength={1}
            />
            <button
              onClick={() => handleHabitDelete(i)}
              className={styles.rmBtn}
              aria-label="습관 삭제"
            >
              <img src={trash} alt="삭제" />
            </button>
          </div>
        ))}
        <div className={styles.btnContainer}>
          {error && <p className={styles.errorMsg}>{error}</p>}
          <button
            className={styles.addBtn}
            onClick={handleError}
            disabled={habits.length >= 8}
          >
            <span style={{ fontSize: '24px' }}>+</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
