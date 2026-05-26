import { Link } from 'react-router';

import styles from '@/components/common/Button/Button.module.css';

export default function Button({
  className = '',
  text = '',
  color = 'brand', // brand, gray
  width = '100%',
  type = 'button',
  disabled = false,
  onClick,
  href,
  ...props
}) {
  const classNames = `${styles.button} ${styles[color]} ${className}`;

  if (href) {
    return (
      <Link
        to={href}
        className={classNames}
        style={{ width }}
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
        style={{ width }}
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
