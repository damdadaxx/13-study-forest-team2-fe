import Card from '@/components/common/Card/Card.jsx';

// TODO: 1차 개발 완료 전에 삭제하기
export default function CardExample() {
  return (
    <div style={{ width: '100%', display: 'flex', gap: '5px' }}>
      <Card
        nickname="훈민"
        title="개발"
        point={120}
        dayCount={60}
        description="소개소개소개소개두줄이 넘어도두줄만보이게했씁니다두줄세줄두세줄두줄세줄두줄세줄두세줄두줄세줄두줄세줄두세줄두줄세줄두줄세줄두세줄두줄세줄"
        emojiAndCount={[
          { emoji: '👩🏻‍💻', count: 5 },
          { emoji: '👩🏻‍💻', count: 4 },
          { emoji: '👩🏻‍💻', count: 3 },
        ]}
        background="img1"
      />
      <Card
        nickname="훈민"
        title="개발"
        point={120}
        dayCount={60}
        description="소개소개소개소개"
        emojiAndCount={[
          { emoji: '👩🏻‍💻', count: 5 },
          { emoji: '👩🏻‍💻', count: 4 },
          { emoji: '👩🏻‍💻', count: 3 },
        ]}
        background="img5"
      />
    </div>
  );
}
