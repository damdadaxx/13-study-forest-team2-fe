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
}) {
  const isImageBg = ['img5', 'img6', 'img7', 'img8'].includes(background);

  return (
    <div
      className={`${styles.card} ${styles[background]} ${isImageBg ? styles.dimmed : ''}`}
    >
      <div className={styles.top}>
        <div>
          <div className={styles.titleBox}>
            <p className={styles.title}>
              <span className={styles.nickname}>{nickname}</span>의 {title}{' '}
              스터디
            </p>
            <TagPoint
              className={styles.point}
              color={isImageBg ? 'dark' : 'light'}
              size="sm"
              point={point}
            />
          </div>
          <div className={styles.dayCount}>{dayCount}일째 진행 중</div>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.bottom}>
        {emojiAndCount.map((e) => (
          <TagEmoji key={e.emoji} size="sm" emoji={e.emoji} count={e.count} />
        ))}
      </div>
    </div>
  );
}
