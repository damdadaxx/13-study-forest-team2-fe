import { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from '@/pages/studies/PasswordModal.module.css';

import { verifyStudyPassword } from '@/api/study.js';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input.jsx';
import Modal from '@/components/common/Modal/Modal.jsx';
import Toast from '@/components/common/Toast/Toast.jsx';

export default function PasswordModal({
  isOpen,
  onClose,
  nickname,
  title,
  studyId,
}) {
  const [pw, setPw] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastState, setToastState] = useState({
    key: 0,
    color: 'error',
    message: '',
    isDisplay: false,
  });

  const navigate = useNavigate();
  const passwordErrorMessage =
    '🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.';

  const showToast = (message, color = 'error') => {
    setToastState((prev) => ({
      key: prev.key + 1,
      color,
      message,
      isDisplay: true,
    }));
  };

  const hideToast = () => {
    setToastState((prev) => ({ ...prev, isDisplay: false }));
  };

  const handleSubmit = async () => {
    if (!pw) {
      showToast(passwordErrorMessage, 'warning');
      return;
    }

    try {
      setIsSubmitting(true);
      const isValidPassword = await verifyStudyPassword(studyId, pw);

      if (!isValidPassword) {
        showToast(passwordErrorMessage, 'warning');
        return;
      }

      onClose();
      navigate(`/studies/${studyId}/edit`, { state: { password: pw } });
    } catch (err) {
      console.error(err);
      showToast('비밀번호 확인 중 오류가 발생했습니다.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast
        key={toastState.key}
        color={toastState.color}
        message={toastState.message}
        isDisplay={toastState.isDisplay}
        onClose={hideToast}
      />
      <Modal
        title={`${nickname}의 ${title}`}
        isOpen={isOpen}
        onClose={onClose}
        hasCloseBtn={true}
        btnComponents={
          <Button
            onClick={handleSubmit}
            text={isSubmitting ? '확인 중...' : '수정하러 가기'}
            size="md"
            disabled={isSubmitting}
          />
        }
      >
        <div className={styles.modalBody}>
          <div className={styles.articleContainer}>
            <p className={styles.article}>권한이 필요해요!</p>
          </div>
          <Input
            label="비밀번호"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
            className={styles.input}
          />
        </div>
      </Modal>
    </>
  );
}
