import React, { useEffect } from 'react';

import styles from './Toast.module.css';

export default function Toast({
  color = 'success',
  message = '',
  className = '',
  onClose,
}) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const classNames =
    `${styles.toastContainer} ${styles[color] || ''} ${className}`.trim();

  return (
    <div className={classNames}>
      <span className={styles.message}>{message}</span>
    </div>
  );
}
