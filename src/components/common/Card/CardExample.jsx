import Card from '@/components/common/Card/Card';

// TODO: 1차 개발 완료 전에 삭제하기
export default function CardExample() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '50px',
        width: '400px',
      }}
    >
      <Card
        nickname="훈민"
        title="개발"
        totalPoint={100}
        dayCount={62}
        description="스터디 설명입니다."
        emojiAndCount={[
          { emoji: '🔥', count: 3 },
          { emoji: '⭐', count: 3 },
          { emoji: '💪', count: 2 },
        ]}
        background="img1"
      />
      <Card
        nickname="정음"
        title="행정"
        totalPoint={200}
        dayCount={34}
        description="스터디 설명입니다."
        emojiAndCount={[
          { emoji: '📚', count: 5 },
          { emoji: '🔥', count: 3 },
          { emoji: '⭐', count: 3 },
        ]}
        background="img5"
      />
    </div>
  );
}
