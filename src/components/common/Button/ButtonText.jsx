import styles from '@/components/common/Button/ButtonText.module.css';

export default function ButtonText({
  className = '',
  color = 'green', // green, gray
  text = '',
  onClick,
  ...props
}) {
  const classNames = `${styles.button} ${styles[color]} ${className}`;

  return (
    <button className={classNames} onClick={onClick} {...props}>
      <p className={styles.text}>{text}</p>
    </button>
  );
}
