import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Container from '@/layouts/Container/Container';

import { usePasswordGuard } from '@/hooks/usePasswordGuard.js';
import { useStudy, useUpdateStudy } from '@/hooks/useStudy.js';

import styles from '@/pages/studies/StudyEdit.module.css';

import Button from '@/components/common/Button/Button.jsx';
import Input from '@/components/common/Input/Input.jsx';
import Textarea from '@/components/common/Textarea/Textarea.jsx';

import CardImg5 from '@/assets/images/card/img5.jpg';
import CardImg6 from '@/assets/images/card/img6.jpg';
import CardImg7 from '@/assets/images/card/img7.jpg';
import CardImg8 from '@/assets/images/card/img8.jpg';
import IcBgSelected from '@/assets/images/icons/ic_bg_selected.svg';

export default function StudyEdit() {
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bgSelected, setBgSelected] = useState('');

  // study 데이터가 처음 들어올 때만 초기화
  const initialized = useRef(false);
  const navigate = useNavigate();
  const { studyId } = useParams();
  const study = useStudy(studyId);
  const password = usePasswordGuard(`/studies/${studyId}`);

  useEffect(() => {
    if (study?.data && !initialized.current) {
      setNickname(study.data.nickname);
      setTitle(study.data.title);
      setDescription(study.data.description);
      setBgSelected(study.data.background);
      initialized.current = true;
    }
  }, [study]);

  const original = study?.data;

  const isChanged =
    original &&
    (nickname !== original.nickname ||
      title !== original.title ||
      description !== original.description ||
      bgSelected !== original.background ||
      pw !== ''); // 새 비번 입력했으면 변경으로 침

  const isValid =
    nickname.length <= 5 &&
    title.length <= 5 &&
    description.length <= 500 &&
    (pw === '' ||
      (pw.length >= 8 &&
        pw.length <= 15 &&
        pw === pwCheck &&
        pw !== password)) && // 기존 비밀번호와 다를 때만 통과
    isChanged; // 변경사항 있어야 통과

  const update = useUpdateStudy();

  const handleSubmit = async () => {
    if (!isValid) return;

    const body = {
      password,
      ...(nickname.trim() && { nickname }),
      ...(title.trim() && { title }),
      ...(description.trim() && { description }),
      ...(bgSelected && { background: bgSelected }),
      ...(pw && { newPassword: pw }),
    };

    await update(studyId, body);
    navigate(`/studies/${studyId}`, { replace: true });
  };

  return (
    <Container>
      <main className={styles.main}>
        <span className={styles.createStudy}>스터디 수정하기</span>
        <Input
          className={styles.nickname}
          value={nickname}
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          onChange={(e) => setNickname(e.target.value)}
          error={nickname.length > 5 ? '*닉네임은 5글자 이하여야 합니다' : ''}
        />
        <Input
          className={styles.title}
          value={title}
          label="스터디 이름"
          type="text"
          placeholder="스더디 이름을 입력해 주세요"
          onChange={(e) => setTitle(e.target.value)}
          error={title.length > 5 ? '*스터디 이름은 5글자 이하여야 합니다' : ''}
        />
        <Textarea
          className={styles.description}
          value={description}
          label="소개"
          placeholder="소개 멘트를 작성해 주세요"
          onChange={(e) => setDescription(e.target.value)}
          error={
            description.length > 500 ? '*소개 멘트는 500자 이하여야 합니다' : ''
          }
        />
        <span className={styles.bgText}>배경을 선택해주세요</span>
        <div className={styles.bgBox}>
          <div className={styles.bgItem} onClick={() => setBgSelected('img1')}>
            <div className={styles.img1}></div>
            {bgSelected === 'img1' && (
              <img
                className={styles.selectedIcon}
                src={IcBgSelected}
                alt="선택됨"
              />
            )}
          </div>
          <div className={styles.bgItem} onClick={() => setBgSelected('img2')}>
            <div className={styles.img2}></div>
            {bgSelected === 'img2' && (
              <img
                className={styles.selectedIcon}
                src={IcBgSelected}
                alt="선택됨"
              />
            )}
          </div>
          <div className={styles.bgItem} onClick={() => setBgSelected('img3')}>
            <div className={styles.img3}></div>
            {bgSelected === 'img3' && (
              <img
                className={styles.selectedIcon}
                src={IcBgSelected}
                alt="선택됨"
              />
            )}
          </div>
          <div className={styles.bgItem} onClick={() => setBgSelected('img4')}>
            <div className={styles.img4}></div>
            {bgSelected === 'img4' && (
              <img
                className={styles.selectedIcon}
                src={IcBgSelected}
                alt="선택됨"
              />
            )}
          </div>
          <div className={styles.bgItem} onClick={() => setBgSelected('img5')}>
            <img className={styles.img5} src={CardImg5} alt="img5" />
            {bgSelected === 'img5' && (
              <img
                className={styles.selectedIcon}
                src={IcBgSelected}
                alt="선택됨"
              />
            )}
          </div>
          <div className={styles.bgItem} onClick={() => setBgSelected('img6')}>
            <img className={styles.img6} src={CardImg6} alt="img6" />
            {bgSelected === 'img6' && (
              <img
                className={styles.selectedIcon}
                src={IcBgSelected}
                alt="선택됨"
              />
            )}
          </div>
          <div className={styles.bgItem} onClick={() => setBgSelected('img7')}>
            <img className={styles.img7} src={CardImg7} alt="img7" />
            {bgSelected === 'img7' && (
              <img
                className={styles.selectedIcon}
                src={IcBgSelected}
                alt="선택됨"
              />
            )}
          </div>
          <div className={styles.bgItem} onClick={() => setBgSelected('img8')}>
            <img className={styles.img8} src={CardImg8} alt="img8" />
            {bgSelected === 'img8' && (
              <img
                className={styles.selectedIcon}
                src={IcBgSelected}
                alt="선택됨"
              />
            )}
          </div>
        </div>
        <Input
          className={styles.password}
          label="새 비밀번호"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
          error={
            pw === ''
              ? ''
              : pw.length < 8 || pw.length > 15
                ? '*비밀번호는 8자 이상 15자 이하여야 합니다'
                : pw === password
                  ? '*기존 비밀번호와 동일합니다'
                  : ''
          }
        />
        <Input
          className={styles.passwordCheck}
          label="새 비밀번호 확인"
          type="password"
          value={pwCheck}
          onChange={(e) => setPwCheck(e.target.value)}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          error={
            pwCheck === ''
              ? ''
              : pwCheck.length < 8 || pwCheck.length > 15
                ? '*비밀번호는 8자 이상 15자 이하여야 합니다'
                : pw !== pwCheck
                  ? '*비밀번호가 일치하지 않습니다'
                  : ''
          }
        />
        <Button
          className={styles.button}
          text="수정하기"
          onClick={handleSubmit}
          disabled={!isValid}
          color={isValid ? 'brand' : 'gray'}
        />
        {!isChanged && (
          <span className={styles.notice}>*변경된 내용이 없습니다</span>
        )}
      </main>
    </Container>
  );
}
