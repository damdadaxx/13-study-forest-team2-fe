import { useEffect } from 'react';

import styles from './Toast.module.css';

export default function Toast({
  variant = 'success', // success, warning
  message = '',
  className,
  isDisplay = false,
  onClose,
}) {
  const classNames = `${styles.toastContainer} ${styles[variant]} ${className}`;

  useEffect(() => {
    if (isDisplay) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isDisplay, onClose]);

  return isDisplay ? (
    <div className={classNames}>
      <span className={styles.message}>{message}</span>
    </div>
  ) : null;
}
