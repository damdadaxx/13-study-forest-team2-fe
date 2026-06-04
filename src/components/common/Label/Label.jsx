import styles from '@/components/common/Label/Label.module.css';

export default function Label({
  className = '',
  text = '', // 라벨 텍스트
  children, // 감쌀 input/textarea (없으면 라벨만 렌더 - 배경 선택 등)
  ...props
}) {
  return (
    <label className={clsx(styles.field, className)} {...props}>
      {text && <span className={styles.label}>{text}</span>}
      {children}
    </label>
  );
}
