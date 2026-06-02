import { useState } from 'react';

import Container from '@/layouts/Container/Container';

import HabitModal from '@/pages/habits/HabitModal';

export default function Habit() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <div>오늘의 습관 페이지</div>
      <button
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer', color: 'red' }}
      >
        목록 수정
      </button>
      <HabitModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Container>
  );
}
