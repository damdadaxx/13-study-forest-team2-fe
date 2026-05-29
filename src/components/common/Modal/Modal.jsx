import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from '@/components/common/Modal/Modal.module.css';

export default function Modal({
  title,
  isOpen,
  onClose,
  hasCloseBtn = false,
  children,
  btnComponents, //
}) {
  // Escape 키 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const target = document.querySelector('#modal-root') ?? document.body;

  return createPortal(
    <div
      className={styles.modalBackDrop}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className={styles.modalCard}>
        {/* 헤더 — 데스크톱 닫기 버튼 */}
        <div className={styles.modalHeader}>
          <p className={styles.modalTitle}>{title}</p>
          {hasCloseBtn && (
            <button
              className={`${styles.closeBtn} ${styles.closeDesktop}`}
              onClick={onClose}
            >
              나가기
            </button>
          )}
        </div>

        {/* 바디 */}
        <div className={styles.modalBody}>{children}</div>

        {/* 푸터 — 모바일 닫기 버튼 포함 */}
        <div className={styles.modalFooter}>
          {btnComponents}
          {hasCloseBtn && (
            <button
              className={`${styles.closeBtn} ${styles.closeMobile}`}
              onClick={onClose}
            >
              나가기
            </button>
          )}
        </div>
      </div>
    </div>,
    target,
  );
}
