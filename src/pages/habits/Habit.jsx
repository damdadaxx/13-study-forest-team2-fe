import { useState } from 'react';

import Container from '@/layouts/Container/Container';

import HabitModal from '@/pages/habits/HabitModal';

export default function Habit() {
  const [modals, setModals] = useState({
    listModal: false,
    formModal: false,
  });
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
      />
    </Container>
  );
}
