import { useEffect } from 'react';

import clsx from 'clsx';

import styles from '@/components/common/Toast/Toast.module.css';

export default function Toast({
  color = 'success',
  message = '',
  className,
  isDisplay = false,
  onClose,
}) {
  const classNames = clsx(
    styles.toastContainer, //기본 클래스
    styles[color], // 색상에 따른 클래스
    className, // 페이지 내에서 지정한 클래스
  ); // 기존에 있던 .filter(boolean).join(' ') 은 제거
  // why? clsx라이브러리가 내부적으로 falsy값을 무시

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
