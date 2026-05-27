import styles from '@/layouts/Container/Container.module.css';

/**
 * size Props
 * 1. sm : 1248px - 오늘의 집중, 오늘의 습관
 * 2. md (Default) : 1200px - 스터디 상세, 홈
 * 3. lg : 696px - 상세페이지
 */

export default function Container({ size = 'md', className, children }) {
  const classNames = `${styles.container} ${styles[size]} ${className}`;

  return (
    <section className={classNames}>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
