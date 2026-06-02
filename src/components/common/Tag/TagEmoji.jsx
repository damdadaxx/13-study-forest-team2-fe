import clsx from 'clsx';

import styles from '@/components/common/Tag/TagEmoji.module.css';

export default function TagEmoji({
  className = '',
  emoji = '',
  count = 1,
  size = 'lg',
  ...props
}) {
  const countNum = Number(count);
  const numericCount = !isNaN(countNum) ? countNum : undefined;
  const displayCount = numericCount?.toLocaleString();

  const classNames = clsx(
    styles.emojiTag, // 기본 클래스
    styles[size], // size에 따른 스타일 (예: styles.lg, styles.sm)
    className, // 사용하는 페이지 내에서 적용하는 클래스네임
  );

  return (
    <div className={classNames} {...props}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.count}>{displayCount}</span>
    </div>
  );
}
