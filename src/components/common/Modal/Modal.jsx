import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from '@/components/common/Modal/Modal.module.css';

export default function Modal({
  title,
  isOpen,
  onClose,
  hasCloseBtn = false,
  children,
  btnComponents, //버튼 컴포넌트
}) {
  useEffect(() => {
    if (!isOpen) return;

    // Escape 키 닫기
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.(e);
    };

    // 스크롤 잠금
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const target = document.querySelector('#modal-root') ?? document.body;

  return createPortal(
    <div
      className={styles.modalBackDrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <p className={styles.modalTitle}>{title}</p>
          {/* 헤더 — 데스크톱 닫기 버튼 */}
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
        {/* 모바일 반응형으로 y축 스크롤 추가 및 x축 스크롤 숨김 */}

        {/* 푸터 — 모바일 닫기 버튼 포함 */}
        <div className={styles.modalFooter}>
          <div className={styles.buttons}>{btnComponents}</div>
          {/*  모바일 닫기 버튼 */}
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
