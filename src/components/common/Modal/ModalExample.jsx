import { useState } from 'react';

import Button from '@/components/common/Button/Button.jsx';

import { Modal, ModalHeader, ModalBody, ModalFooter } from './UseModal.jsx';

export default function App() {
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

      {/* 목록형 모달 */}
      <Modal isOpen={listOpen} onClose={() => setListOpen(false)}>
        <ModalHeader title="습관 목록" />
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {habits.map((habit, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <input
                  value={habit}
                  onChange={(e) => handleHabitChange(i, e.target.value)}
                  placeholder={`추가할 습관을 입력해주세요 ${i + 1}`}
                />
                <button onClick={() => handleHabitDelete(i)}>🗑️</button>
              </div>
            ))}
            <button
              onClick={() => setHabits([...habits, ''])}
              disabled={habits.length >= 6}
            >
              +
            </button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => setListOpen(false)}
            text="취소"
            color="gray"
            width="288px"
          />
          <Button
            type="submit"
            onClick={() => setListOpen(false)}
            text="수정완료"
            width="288px"
          />
        </ModalFooter>
      </Modal>

      {/* 폼형 모달 */}
      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)}>
        <ModalHeader
          title="스터디 만들기에서 입력한 스터디 이름"
          onClose={() => setFormOpen(false)}
          closeLabel="나가기"
        />
        <ModalBody>
          <p>권한이 필요해요!</p>
          <input type="password" placeholder="비밀번호를 입력해 주세요" />
        </ModalBody>
        <ModalFooter direction="column">
          <button onClick={() => setFormOpen(false)}>수정하러 가기</button>
          <button onClick={() => setFormOpen(false)}>나가기</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
