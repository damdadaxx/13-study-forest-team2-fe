import { Link } from 'react-router';

import styles from '@/components/common/Button/ButtonHabit.module.css';

export default function ButtonHabit({
  className = '',
  size = 'md', // md: 오늘의 습관/오늘의 집중 버튼, sm: 홈 버튼
  text = '',
  onClick,
  href,
  ...props
}) {
  const classNames = `${styles.button} ${styles[size]} ${className}`;

  if (href) {
    return (
      <Link to={href} className={classNames} onClick={onClick} {...props}>
        <p className={styles.text}>{text}</p>
      </Link>
    );
  }

  return (
    <button className={classNames} onClick={onClick} {...props}>
      <p className={styles.text}>{text}</p>
    </button>
  );
}
