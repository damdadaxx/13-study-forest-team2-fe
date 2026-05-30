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

  const classNames = [styles.emojiTag, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.count}>{displayCount}</span>
    </div>
  );
}
