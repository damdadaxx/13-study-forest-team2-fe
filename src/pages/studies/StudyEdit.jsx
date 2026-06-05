import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import { getStudyById } from '@/api/study.js';

import PasswordModal from '@/components/common/Modal/PasswordModal';

export default function StudyEdit() {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [modals, setModals] = useState({
    listModal: false,
    formModal: false,
  });

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const data = await getStudyById(studyId);
        setStudy(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudy();
  }, [studyId]);

  return (
    <Container>
      <div>스터디 수정 페이지</div>
      <button
        onClick={() => setModals({ ...modals, formModal: true })}
        style={{ cursor: 'pointer', color: 'red' }}
      >
        수정하기
      </button>
      {study && (
        <PasswordModal
          isOpen={modals.formModal}
          onClose={() => setModals({ ...modals, formModal: false })}
          nickname={study.nickname}
          title={study.title}
          studyId={studyId}
        />
      )}
    </Container>
  );
}
