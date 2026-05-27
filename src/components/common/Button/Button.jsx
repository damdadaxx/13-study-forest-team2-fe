import { Link } from 'react-router';

import styles from '@/components/common/Button/Button.module.css';

export default function Button({
  className = '',
  text = '',
  /**
   * [size Props]
   * 1. md
   * - width: 100%
   * 컨텐츠의 크기에 맞춰 버튼 크기가 결정
   * 2. sm
   * - PC) width: 252px, Tablet) width: 160px, Mobile) width: 106px
   * - Header 컴포넌트에서 사용
   */
  size = 'md',
  color = 'brand', // brand, gray
  type = 'button',
  disabled = false,
  onClick,
  href,
  ...props
}) {
  const classNames = `${styles.button} ${styles[size]} ${styles[color]} ${className}`;

  if (href) {
    return (
      <Link
        to={href}
        className={classNames}
        type={type}
        onClick={onClick}
        aria-label={`${text} 버튼`}
        {...props}
      >
        <p className={styles.text}>{text}</p>
      </Link>
    );
  }

  return (
    <>
      <button
        className={classNames}
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={`${text} 버튼`}
        {...props}
      >
        <p className={styles.text}>{text}</p>
      </button>
    </>
  );
}
