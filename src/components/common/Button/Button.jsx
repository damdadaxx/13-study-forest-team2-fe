import { Link } from 'react-router';

import clsx from 'clsx';

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
  const classNames = clsx(
    styles.button, // 기본 클래스
    styles[size], // 사이즈에 따라 적용하는 스타일
    styles[color], // 색상에 따라 적용하는 스타일
    className, //페이지 내에서 적용하는 스타일
  );

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
