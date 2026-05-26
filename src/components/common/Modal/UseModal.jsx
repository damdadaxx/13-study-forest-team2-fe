import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from '@/components/common/Modal/Modal.module.css';

/**
 * ============================================================
 *  공통 Modal 컴포넌트
 * ============================================================
 *
 *  <Modal>          — Portal + Backdrop 베이스
 *  <ModalHeader>    — 타이틀 + 닫기 버튼
 *  <ModalBody>      — 스크롤 가능한 본문 영역
 *  <ModalFooter>    — 버튼 영역 (세로 / 가로 배치 지원)
 * ============================================================
 */

/**
 * ModalHeader
 * @prop {string}   title      — 모달 제목
 * @prop {Function} onClose    — 닫기 핸들러
 * @prop {string}   closeLabel — 닫기 버튼 텍스트 (없으면 버튼 미노출)
 */
export function ModalHeader({ title, onClose, closeLabel }) {
  return (
    <div className={styles['modal-header']}>
      <p className="modal-header__title">{title}</p>
      {closeLabel && (
        <button className="modal-header__close" onClick={onClose}>
          {closeLabel}
        </button>
      )}
    </div>
  );
}

/**
 * ModalBody
 * @prop {ReactNode} children
 */
export function ModalBody({ children }) {
  return <div className={styles['modal-body']}>{children}</div>;
}

/**
 * ModalFooter
 * @prop {ReactNode}        children
 * @prop {"column" | "row"} direction — 버튼 배치 방향 (기본: "column")
 */
export function ModalFooter({ children, direction = 'column' }) {
  return <div className={styles['modal-footer']}>{children}</div>;
}

/**
 * Modal (베이스 컴포넌트)
 * @prop {boolean}        isOpen          — 모달 열림 여부
 * @prop {Function}       onClose         — 닫기 핸들러
 * @prop {ReactNode}      children
 * @prop {boolean}        closeOnBackdrop — 백드롭 클릭 시 닫기 여부 (기본: true)
 * @prop {string|Element} portalTarget    — Portal 마운트 대상 (기본: document.body)
 */
export function Modal({
  isOpen,
  onClose,
  children,
  closeOnBackdrop = true,
  portalTarget,
}) {
  const cardRef = useRef(null);

  /* ESC 키로 닫기 */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  /* 모달 열릴 때 body 스크롤 잠금 */
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
      className={styles['modal-backdrop']}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div ref={cardRef} className={styles['modal-card']}>
        {children}
      </div>
    </div>,
    target,
  );
}

/* ─────────────────────────────────────────
   사용 예시 (참고용)
───────────────────────────────────────── */

/**
 * [예시 1] 목록형 모달
 *
 *   <Modal isOpen={listOpen} onClose={() => setListOpen(false)}>
        <ModalHeader title="습관 목록" />
        <ModalBody>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {habits.map((habit, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <input
                  value={habit}
                  onChange={(e) => handleHabitChange(i, e.target.value)}
                  placeholder={`추가할 습관을 입력해주세요 ${i + 1}`}
                />
                <button onClick={() => handleHabitDelete(i)}>🗑️</button>
              </div>
            ))}
            <button
              onClick={() => setHabits([...habits, ""])}
              disabled={habits.length >= 6}
            >
              + 추가
            </button>
          </div>
        </ModalBody>
        <ModalFooter direction="row">
          <button onClick={() => setListOpen(false)}>취소</button>
          <button type="submit" onClick={() => setListOpen(false)}>
            수정 완료
          </button>
        </ModalFooter>
      </Modal>
 *
 *
 * [예시 2] 폼형 모달 (우상단 닫기 + 하단 텍스트 버튼)
 *
   <Modal isOpen={formOpen} onClose={() => setFormOpen(false)}>
        <ModalHeader
          title="스터디 만들기에서 입력한 스터디 이름"
          onClose={() => setFormOpen(false)}
          closeLabel="나가기"
        />
        <ModalBody>
          <p>권한이 필요해요!</p>
          <input type="password" placeholder="비밀번호를 입력해 주세요" />
        </ModalBody>
        <ModalFooter direction="column">
          <button onClick={() => setFormOpen(false)}>수정하러 가기</button>
          <button onClick={() => setFormOpen(false)}>나가기</button>
        </ModalFooter>
      </Modal>
 */
