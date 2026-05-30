import { useState } from 'react';

import Button from '@/components/common/Button/Button.jsx';
import Input from '@/components/common/Input/Input.jsx';
import Label from '@/components/common/Label/Label.jsx';
import styles from '@/components/common/Modal/ModalExample.module.css';

import trash from '@/assets/images/icons/ic_trash.svg';
import visibilityOff from '@/assets/images/icons/ic_visibility_off.svg';
import visibilityOn from '@/assets/images/icons/ic_visibility_on.svg';

import Modal from './Modal.jsx';

export default function ModalExample() {
  const [modals, setModals] = useState({
    listModal: false,
    formModal: false,
  });
  const [habits, setHabits] = useState([]);
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleHabitChange = (index, value) => {
    const updated = [...habits];
    updated[index] = value;
    setHabits(updated);
  };

  const handleOpenModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const handleCloseModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  return (
    <div style={{ padding: 40, display: 'flex', gap: 12 }}>
      <button
        style={{
          border: '3px solid black',
          padding: 24,
          borderRadius: 12,
          cursor: 'pointer',
          backgroundColor: 'lightgreen',
          boxShadow: '0px 5px 0px 0px #007144',
        }}
        onClick={() => handleOpenModal('listModal')}
      >
        <p style={{ color: 'black', fontWeight: 600, fontSize: '18px' }}>
          목록 모달 열기
        </p>
      </button>

      <button
        style={{
          border: '3px solid black',
          padding: 24,
          borderRadius: 12,
          cursor: 'pointer',
          backgroundColor: 'lightgreen',
          boxShadow: '0px 5px 0px 0px #007144',
        }}
        onClick={() => handleOpenModal('formModal')}
      >
        <p style={{ color: 'black', fontWeight: 600, fontSize: '18px' }}>
          폼 모달 열기
        </p>
      </button>

      {/* 목록형 모달 */}
      <Modal
        title="습관 목록"
        isOpen={modals.listModal}
        onClose={() => handleCloseModal('listModal')}
        btnComponents={
          <>
            <Button
              onClick={() => handleCloseModal('listModal')}
              color="gray"
              size="md"
              text="취소"
              className={styles.modalBtn}
            />
            <Button
              type="submit"
              onClick={() => handleCloseModal('listModal')}
              text="수정완료"
              size="md"
              className={styles.modalBtn}
            />
          </>
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

      {/* 폼형 모달 */}
      <Modal
        title="스터디 만들기에서 입력한 스터디 이름"
        isOpen={modals.formModal}
        onClose={() => handleCloseModal('formModal')}
        hasCloseBtn={true}
        btnComponents={
          <Button text="수정하러 가기" onClick={() => setModals('formModal')} />
        }
      >
        <p>권한이 필요해요!</p>
        <Label text="비밀번호">
          <Input
            type={showPw ? 'text' : 'password'}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
            rightIcon={
              <img
                src={showPw ? visibilityOn : visibilityOff}
                alt={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                width={24}
                height={24}
              />
            }
            onRightIconClick={() => setShowPw((v) => !v)}
          />
        </Label>
      </Modal>
    </div>
  );
}
