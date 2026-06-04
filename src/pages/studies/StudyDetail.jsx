import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import { useStudy } from '@/hooks/useStudy';

import { copyToClipboard } from '@/utils/copyToClipboard';

import styles from '@/pages/studies/StudyDetail.module.css';
import StudyEmoji from '@/pages/studies/StudyEmoji';
import StudyHabitLog from '@/pages/studies/StudyHabitLog';

import Button from '@/components/common/Button/Button';
import ButtonHabit from '@/components/common/Button/ButtonHabit';
import ButtonText from '@/components/common/Button/ButtonText';
import Input from '@/components/common/Input/Input';
import Modal from '@/components/common/Modal/Modal';
import TagPoint from '@/components/common/Tag/TagPoint';

export default function StudyDetail() {
  const { studyId } = useParams();
  const studyData = useStudy(studyId);
  const { nickname, title, description, totalPoint, habits } =
    studyData?.data ?? {};

  const [modals, setModals] = useState({
    clipboardModal: false,
    passwordModal: false,
  });
  const [pw, setPw] = useState('');

  /** 여러 모달 오픈 핸들러 함수 */
  const handleOpenModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  /** 여러 모달 클로즈 핸들러 함수 */
  const handleCloseModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  useEffect(() => {}, []);

  if (!studyData) return null;

  console.log(studyData);

  return (
    <Container>
      <div className={styles.studyDetail}>
        {/* 이모지 + 버튼 */}
        <div className={styles.topArea}>
          {/* 이모지 */}
          <StudyEmoji studyId={studyId} />

          {/* 공유하기 / 수정하기 / 스터디 삭제하기 버튼 */}
          <div className={styles.buttons}>
            <ButtonText
              className={styles.button}
              text="공유하기"
              onClick={() => copyToClipboard(handleOpenModal)}
            />
            <ButtonText
              className={styles.button}
              text="수정하기"
              onClick={() => handleOpenModal('passwordModal')}
            />
            <ButtonText
              className={styles.button}
              text="스터디 삭제하기"
              color="gray"
              onClick={() => handleOpenModal('passwordModal')}
            />
          </div>
        </div>

        {/* 스터디 정보 */}
        <article className={styles.studyInfo}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>
              <span>{nickname}</span>의 {title}
            </h1>
            <div className={styles.buttonStudies}>
              <ButtonHabit
                className={styles.BtnStudy}
                text="오늘의 습관"
                onClick={() => handleOpenModal('passwordModal')}
              />
              <ButtonHabit
                className={styles.BtnStudy}
                text="오늘의 집중"
                onClick={() => handleOpenModal('passwordModal')}
              />
            </div>
          </div>
          <p className={styles.introTitle}>소개</p>
          <p className={styles.description}>{description}</p>
          <p className={styles.pointTitle}>현재까지 획득한 포인트</p>
          <TagPoint point={totalPoint} />
        </article>

        {/* TODO: 마크업, 스타일 정리 */}
        {/* 습관 기록표 */}
        <StudyHabitLog studyId={studyId} habitsData={habits} />
      </div>

      {/* 공유하기 모달 */}
      <Modal
        title="공유하기"
        isOpen={modals.clipboardModal}
        onClose={() => handleCloseModal('clipboardModal')}
        btnComponents={
          <Button
            type="submit"
            onClick={() => handleCloseModal('clipboardModal')}
            text="확인"
          />
        }
      >
        <p className={styles.clipboardText}>URL이 클립보드에 복사되었습니다.</p>
      </Modal>

      {/* 비밀번호 모달 */}
      <Modal
        title="스터디명으로 데이터 넣기!"
        isOpen={modals.passwordModal}
        onClose={() => handleCloseModal('passwordModal')}
        btnComponents={
          <Button
            type="submit"
            onClick={() => handleCloseModal('passwordModal')}
            text="확인"
          />
        }
      >
        <p className={styles.passwordText}>권한이 필요해요!</p>
        <Input
          className={styles.passwordInput}
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </Modal>
    </Container>
  );
}
