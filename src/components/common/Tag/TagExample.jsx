import TagEmoji from '@/components/common/Tag/TagEmoji.jsx';
import TagPoint from '@/components/common/Tag/TagPoint.jsx';

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
      <div>
        <p style={{ fontSize: '30px' }}>{`<EmojiTag> 컴포넌트`}</p>
        <TagEmoji emoji="👩🏻‍" count={39999999999} size="sm" />
        <TagEmoji emoji="👩" count={37} size="lg" />
        {/* emoji 없을 때 */}
        <TagEmoji count={7} />
        <TagEmoji emoji="" count={7} />
      </div>

      <div>
        <p style={{ fontSize: '30px' }}>{`<PointTag> 컴포넌트`}</p>
        <TagPoint point={'rr'} size="sm" variant="dark" />
        <TagPoint point={310} size="sm" variant="light" />
        <TagPoint point={310} size="lg" variant="light" />
        {/* point 0 */}
        <TagPoint point={0} size="lg" variant="light" />
      </div>
    </section>
  );
}
