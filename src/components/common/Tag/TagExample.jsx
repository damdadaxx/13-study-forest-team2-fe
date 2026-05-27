import EmojiTag from '@/components/common/Tag/EmojiTag';
import PointTag from '@/components/common/Tag/PointTag';

// TODO: 1차 개발 완료 전에 삭제하기
export default function TagExample() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '50px',
      }}
    >
      <p style={{ fontSize: '30px' }}>{`<EmojiTag> 컴포넌트`}</p>
      <EmojiTag emoji="👩🏻‍" count={37} size="small" />
      <EmojiTag emoji="👩" count={37} size="large" />
      {/* emoji 없을 때 */}
      <EmojiTag count={37} />

      <p style={{ fontSize: '30px' }}>{`<PointTag> 컴포넌트`}</p>
      <PointTag point={310} size="small" variant="dark" />
      <PointTag point={310} size="small" variant="light" />
      <PointTag point={310} size="large" variant="light" />
      {/* point 0 */}
      <PointTag point={0} size="large" variant="light" />
    </section>
  );
}
