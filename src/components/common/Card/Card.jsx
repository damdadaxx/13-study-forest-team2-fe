import styles from '@/components/common/Card/Card.module.css';

import img5 from '@/assets/images/Card/img5.png';
import img6 from '@/assets/images/Card/img6.png';
import img7 from '@/assets/images/Card/img7.png';
import img8 from '@/assets/images/Card/img8.png';
import totalPointImg from '@/assets/images/Card/totalPointImg.svg';

const backgroundStyles = {
  img1: { background: 'var(--green-green_E1EDDE, #E1EDDE)' },
  img2: { background: 'var(--yellow-yellow_FFF1CC, #FFF1CC)' },
  img3: { background: 'var(--blue-blue_E0F1F5, #E0F1F5)' },
  img4: { background: 'var(--pink-pink_FDE0E9, #FDE0E9)' },
  img5: { backgroundImage: `url(${img5})`, backgroundSize: 'cover' },
  img6: { backgroundImage: `url(${img6})`, backgroundSize: 'cover' },
  img7: { backgroundImage: `url(${img7})`, backgroundSize: 'cover' },
  img8: { backgroundImage: `url(${img8})`, backgroundSize: 'cover' },
};

export default function Card({
  nickname,
  title,
  totalPoint,
  dayCount,
  description,
  emojiAndCount = [],
  background,
}) {
  const isImageBg = ['img5', 'img6', 'img7', 'img8'].includes(background);
  const textColor = isImageBg ? '#fff' : 'var(--black-black_414141)';
  const nicknameColor = isImageBg ? '#fff' : 'var(--green-green_text_578246)';
  return (
    <div
      style={{
        ...backgroundStyles[background],
        width: '100%',
        color: textColor,
      }}
      className={styles.card}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.titleRow}>
            <h4 className={styles.titleAndPoint}>
              <span style={{ color: nicknameColor, marginRight: '2px' }}>
                {nickname}
              </span>
              <span>의 {title} 스터디</span>
            </h4>
            <div className={styles.point}>
              <img src={totalPointImg} alt="totalPoint" />
              {totalPoint} 획득
            </div>
          </div>
          <p className={styles.dayCount}>{dayCount}일째 진행 중</p>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.emojis}>
        {emojiAndCount.map((e) => (
          <div key={e.emoji}>
            {e.emoji}
            {e.count}
          </div>
        ))}
      </div>
    </div>
  );
}
