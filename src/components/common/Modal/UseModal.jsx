import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from '@/components/common/Modal/UseModal.module.css';

export function ModalHeader({ title, onClose, closeLabel }) {
  return (
    <div className={styles.modalHeader}>
      <p className={styles.modalHeaderTitle}>{title}</p>
      {closeLabel && (
        <button className={styles.modalHeaderClose} onClick={onClose}>
          {closeLabel}
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children }) {
  return <div className={styles.modalBody}>{children}</div>;
}

export function ModalFooter({ children, direction = 'column' }) {
  return <div className={styles.modalFooter}>{children}</div>;
}

export function Modal({
  isOpen,
  onClose,
  children,
  closeOnBackdrop = true,
  portalTarget,
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const target =
    portalTarget instanceof Element
      ? portalTarget
      : typeof portalTarget === 'string'
        ? document.querySelector(portalTarget)
        : document.body;

  return createPortal(
    <div
      className={styles.modalBackdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div ref={cardRef} className={styles.modalCard}>
        {children}
      </div>
    </div>,
    target,
  );
}
