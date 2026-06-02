import { useEffect } from 'react';

import styles from '@/components/common/Toast/Toast.module.css';

export default function Toast({
  color = 'success',
  message = '',
  className,
  isDisplay = false,
  onClose,
}) {
  const classNames = [styles.toastContainer, styles[color], className]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    if (isDisplay) {
      const timer = setTimeout(() => onClose?.(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isDisplay, onClose]);

  return isDisplay ? (
    <div className={classNames}>
      <span>{message}</span>
    </div>
  ) : null;
}
