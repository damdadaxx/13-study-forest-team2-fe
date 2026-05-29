import { useState } from 'react';

import Button from '@/components/common/Button/Button.jsx';
import styles from '@/components/common/Modal/ModalExample.module.css';

import trash from '@/assets/images/icons/ic_trash.svg';

import Modal from './Modal.jsx';

export default function ModalExample() {
  const [listOpen, setListOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  const handleHabitChange = (index, value) => {
    const updated = [...habits];
    updated[index] = value;
    setHabits(updated);
  };

  const handleHabitDelete = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: 40, display: 'flex', gap: 12 }}>
      <button onClick={() => setListOpen(true)}>목록 모달 열기</button>
      <button onClick={() => setFormOpen(true)}>폼 모달 열기</button>

      {/* 목록형 모달 — 닫기 버튼 없음 */}
      <Modal
        title="습관 목록"
        isOpen={listOpen}
        onClose={() => setListOpen(false)}
        btnComponents={
          <div className={styles.footerContainer}>
            <Button
              onClick={() => setListOpen(false)}
              text="취소"
              color="gray"
              size="md"
              className={styles.modalBtn}
            />
            <Button
              type="submit"
              onClick={() => setListOpen(false)}
              text="수정완료"
              size="md"
              className={styles.modalBtn}
            />
          </div>
        }
      >
        <div className={styles.listWrapper}>
          {habits.map((habit, i) => (
            <div key={i} className={styles.listContainer}>
              <input
                className={styles.addInput}
                value={habit}
                onChange={(e) => handleHabitChange(i, e.target.value)}
                placeholder={`추가할 습관을 입력해주세요 ${i + 1}`}
                maxLength={20}
                minLength={1}
              />
              <button
                onClick={() => handleHabitDelete(i)}
                className={styles.removeBtn}
                aria-label="습관 삭제"
              >
                <img src={trash} alt="삭제" />
              </button>
            </div>
          ))}
          <div className={styles.btnContainer}>
            <button
              className={styles.addBtn}
              onClick={() => setHabits([...habits, ''])}
              disabled={habits.length >= 8}
            >
              +
            </button>
          </div>
        </div>
      </Modal>

      {/* 폼형 모달 — 닫기 버튼 있음 (데스크톱: 헤더, 모바일: 푸터) */}
      <Modal
        title="스터디 만들기에서 입력한 스터디 이름"
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        hasCloseBtn={true}
        btnComponents={
          <button onClick={() => setFormOpen(false)}>수정하러 가기</button>
        }
      >
        <p>권한이 필요해요!</p>
        <input type="password" placeholder="비밀번호를 입력해 주세요" />
      </Modal>
    </div>
  );
}
