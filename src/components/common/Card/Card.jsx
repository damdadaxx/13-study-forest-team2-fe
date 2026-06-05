import clsx from 'clsx';

import styles from '@/components/common/Card/Card.module.css';
import TagEmoji from '@/components/common/Tag/TagEmoji.jsx';
import TagPoint from '@/components/common/Tag/TagPoint.jsx';

export default function Card({
  nickname = '',
  title = '',
  point = 0,
  dayCount = 0,
  description = '',
  emojiAndCount = [],
  background = '',
  onClick = () => {},
}) {
  const isImageBg = ['img5', 'img6', 'img7', 'img8'].includes(background);

  return (
    <div
      className={clsx(
        styles.card, // 기본 클래스
        styles[background], // background prop에 따른 스타일
        isImageBg && styles.dimmed, // 조건부 dimmed 스타일
      )}
      onClick={onClick}
    >
      <div className={styles.top}>
        <div className={styles.titleBox}>
          <p className={styles.title}>
            <span className={styles.nickname}>{nickname}</span>의 {title}
          </p>
          <TagPoint
            className={styles.point}
            color={isImageBg ? 'dark' : 'light'}
            size="sm"
            point={point}
          />
        </div>
        <div className={styles.dayCount}>{dayCount}일째 진행 중</div>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.bottom}>
        {[...emojiAndCount]
          .sort((a, b) => b.count - a.count)
          .slice(0, 3)
          .map((e) => (
            <TagEmoji key={e.emoji} size="sm" emoji={e.emoji} count={e.count} />
          ))}
      </div>
    </div>
  );
}
