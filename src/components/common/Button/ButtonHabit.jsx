import { Link } from 'react-router';

import clsx from 'clsx';

import styles from '@/components/common/Button/ButtonHabit.module.css';

export default function ButtonHabit({
  className = '',
  text = '',
  onClick,
  href,
  ...props
}) {
  const classNames = clsx(
    styles.button, // 기본 클래스
    className, // 페이지 내에서 적용하는 클래스
  );

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
