import styles from '@/components/common/Tag/EmojiTag.module.css';

export default function EmojiTag({
  className = '',
  emoji,
  count = 0,
  size = 'large',
  ...props
}) {
  if (!emoji) return null;

  const numericCount = Number(count);

  const classNames = [styles.emojiTag, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.count}>{numericCount}</span>
    </div>
  );
}
