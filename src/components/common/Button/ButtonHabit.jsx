import { Link } from 'react-router';

import styles from '@/components/common/Button/ButtonHabit.module.css';

export default function ButtonHabit({
  className = '',
  text = '',
  onClick,
  href,
  ...props
}) {
  const classNames = `${styles.button} ${className}`;

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
