import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import { deleteStudy } from '@/api/study';

import { useStudy } from '@/hooks/useStudy';

import { copyToClipboard } from '@/utils/copyToClipboard';

import PasswordModal from '@/pages/studies/PasswordModal';
import styles from '@/pages/studies/StudyDetail.module.css';
import StudyEmoji from '@/pages/studies/StudyEmoji';

import Button from '@/components/common/Button/Button';
import ButtonHabit from '@/components/common/Button/ButtonHabit';
import ButtonText from '@/components/common/Button/ButtonText';
import Modal from '@/components/common/Modal/Modal';
import TagPoint from '@/components/common/Tag/TagPoint';

export default function StudyDetail() {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const studyData = useStudy(studyId);
  const { nickname, title, description, totalPoint } = studyData?.data ?? {};

  const [clipboardModal, setClipboardModal] = useState(false);
  const [passwordModalType, setPasswordModalType] = useState(null);

  const PASSWORD_MODAL_CONFIG = useMemo(
    () => ({
      edit: {
        confirmText: '수정하러 가기',
        onConfirm: (pw) =>
          navigate(`/studies/${studyId}/edit`, { state: { password: pw } }),
      },
      delete: {
        confirmText: '삭제하기',
        onConfirm: async (pw) => {
          await deleteStudy(studyId, { password: pw });
          navigate('/');
        },
      },
      habit: {
        confirmText: '오늘의 습관 시작하기',
        onConfirm: async (_pw) => {
          // TODO: createHabit API 연결
          navigate(`/studies/${studyId}/habit`);
        },
      },
      focus: {
        confirmText: '오늘의 집중 시작하기',
        onConfirm: async (_pw) => {
          // TODO: createFocus API 연결
          navigate(`/studies/${studyId}/focus`);
        },
      },
    }),
    [studyId, navigate],
  );

  if (!studyData) return null;

  const currentConfig = PASSWORD_MODAL_CONFIG[passwordModalType];

  return (
    <Container>
      <div className={styles.studyDetail}>
        <div className={styles.topArea}>
          <StudyEmoji studyId={studyId} />
          <div className={styles.buttons}>
            <ButtonText
              className={styles.button}
              text="공유하기"
              onClick={() => copyToClipboard(() => setClipboardModal(true))}
            />
            <ButtonText
              className={styles.button}
              text="수정하기"
              onClick={() => setPasswordModalType('edit')}
            />
            <ButtonText
              className={styles.button}
              text="스터디 삭제하기"
              color="gray"
              onClick={() => setPasswordModalType('delete')}
            />
          </div>
        </div>

        <article className={styles.studyInfo}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>
              <span>{nickname}</span>의 {title}
            </h1>
            <div className={styles.buttonStudies}>
              <ButtonHabit
                text="오늘의 습관"
                onClick={() => setPasswordModalType('habit')}
              />
              <ButtonHabit
                text="오늘의 집중"
                onClick={() => setPasswordModalType('focus')}
              />
            </div>
          </div>
          <p className={styles.introTitle}>소개</p>
          <p className={styles.description}>{description}</p>
          <p className={styles.pointTitle}>현재까지 획득한 포인트</p>
          <TagPoint point={totalPoint} />
        </article>
      </div>

      {/* 공유하기 모달 */}
      <Modal
        title="공유하기"
        isOpen={clipboardModal}
        onClose={() => setClipboardModal(false)}
        btnComponents={
          <Button onClick={() => setClipboardModal(false)} text="확인" />
        }
      >
        <p className={styles.clipboardText}>URL이 클립보드에 복사되었습니다.</p>
      </Modal>

      {/* 비밀번호 모달 */}
      <PasswordModal
        isOpen={!!passwordModalType}
        onClose={() => setPasswordModalType(null)}
        nickname={nickname}
        title={title}
        studyId={studyId}
        confirmText={currentConfig?.confirmText}
        onConfirm={currentConfig?.onConfirm}
      />
    </Container>
  );
}
