import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import { deleteStudy } from '@/api/study';

import { useStudy } from '@/hooks/useStudy';

import { copyToClipboard } from '@/utils/copyToClipboard';

import styles from '@/pages/studies/StudyDetail.module.css';
import StudyEmoji from '@/pages/studies/StudyEmoji';
import StudyHabitLog from '@/pages/studies/StudyHabitLog';

import Button from '@/components/common/Button/Button';
import ButtonHabit from '@/components/common/Button/ButtonHabit';
import ButtonText from '@/components/common/Button/ButtonText';
import Modal from '@/components/common/Modal/Modal';
import PasswordModal from '@/components/common/Modal/PasswordModal';
import TagPoint from '@/components/common/Tag/TagPoint';

export default function StudyDetail() {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const studyData = useStudy(studyId);
  const { nickname, title, description, totalPoint } = studyData?.data ?? {};

  const [clipboardModal, setClipboardModal] = useState(false);
  const [passwordModalType, setPasswordModalType] = useState(null);

  const location = useLocation();

  const denied = !!location.state?.denied;

  // 신호 비우기: 닫을 때 한 번만
  const closeDenied = () =>
    navigate(location.pathname, { replace: true, state: {} });

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
        confirmText: '오늘의 습관 확인하기',
        onConfirm: (pw) => {
          navigate(`/studies/${studyId}/habits`, { state: { password: pw } });
        },
      },
      focus: {
        confirmText: '오늘의 집중 시작하기',
        onConfirm: (pw) => {
          navigate(`/studies/${studyId}/focus`, { state: { password: pw } });
        },
      },
    }),
    [studyId, navigate],
  );

  const currentConfig = PASSWORD_MODAL_CONFIG[passwordModalType];

  return (
    <Container>
      {!studyData ? (
        <div className={styles.studyDetail}>
          {' '}
          <p className={`${styles.empty} ${styles.emptyRecent}`}>
            등록된 스터디가 없습니다.
          </p>
        </div>
      ) : (
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

          {/* 습관 기록표 */}
          <StudyHabitLog studyId={studyId} habitsData={studyData.data.habits} />
        </div>
      )}

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
        onConfirm={PASSWORD_MODAL_CONFIG[passwordModalType]?.onConfirm}
      />

      {/* 패스워드 가드 모달 */}
      <Modal
        title="접근 불가"
        isOpen={denied}
        onClose={closeDenied}
        btnComponents={<Button onClick={closeDenied} text="확인" />}
      >
        <p className={styles.guardText}>비밀번호 인증이 필요합니다.</p>
      </Modal>
    </Container>
  );
}
