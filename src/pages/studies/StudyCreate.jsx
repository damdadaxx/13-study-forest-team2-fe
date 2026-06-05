import { useState } from 'react';
import { useNavigate } from 'react-router';

import Container from '@/layouts/Container/Container';

import { useCreateStudy } from '@/hooks/useStudy.js';

import styles from '@/pages/studies/StudyCreate.module.css';

import Button from '@/components/common/Button/Button.jsx';
import Input from '@/components/common/Input/Input.jsx';
import Textarea from '@/components/common/Textarea/Textarea.jsx';

import CardImg5 from '@/assets/images/card/img5.jpg';
import CardImg6 from '@/assets/images/card/img6.jpg';
import CardImg7 from '@/assets/images/card/img7.jpg';
import CardImg8 from '@/assets/images/card/img8.jpg';
import IcBgSelected from '@/assets/images/icons/ic_bg_selected.svg';
import visibilityOff from '@/assets/images/icons/ic_visibility_off.svg';
import visibilityOn from '@/assets/images/icons/ic_visibility_on.svg';

export default function StudyCreate() {
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bgSelected, setBgSelected] = useState('img1');
  const [touched, setTouched] = useState({});
  const create = useCreateStudy();
  const navigate = useNavigate();
  const isTouched = Object.keys(touched).length > 0;
  const isValid =
    nickname.trim() &&
    nickname.length <= 5 &&
    title.trim() &&
    title.length <= 5 &&
    description.trim() &&
    description.length <= 500 &&
    pw.length >= 8 &&
    pw.length <= 15 &&
    pw === pwCheck;
  const handleSubmit = async () => {
    if (!isValid) {
      setTouched({
        nickname: true,
        title: true,
        description: true,
        pw: true,
        pwCheck: true,
      });
      return; // 한개라도 비거나 조건 안맞으면 안 보냄
    }
    const data = await create({
      nickname,
      title,
      description,
      background: bgSelected,
      password: pw,
    });
    navigate(`/studies/${data.data.id}`);
  };

  return (
    <Container>
      <main className={styles.main}>
        <span className={styles.createStudy}>스터디 만들기</span>
        <Input
          className={styles.nickname}
          value={nickname}
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          onChange={(e) => {
            setNickname(e.target.value);
            setTouched((prev) => ({ ...prev, nickname: true }));
          }}
          error={
            !touched.nickname
              ? ''
              : !nickname.trim()
                ? '*닉네임을 입력해주세요'
                : nickname.length > 5
                  ? '*닉네임은 5글자 이하여야 합니다'
                  : ''
          }
        />
        <Input
          className={styles.title}
          value={title}
          label="스터디 이름"
          type="text"
          placeholder="스더디 이름을 입력해 주세요"
          onChange={(e) => {
            setTitle(e.target.value);
            setTouched((prev) => ({ ...prev, title: true }));
          }}
          error={
            !touched.title
              ? ''
              : !title.trim()
                ? '*스터디 이름을 입력해주세요'
                : title.length > 5
                  ? '*스터디 이름은 5글자 이하여야 합니다'
                  : ''
          }
        />
        <Textarea
          className={styles.description}
          value={description}
          label="소개"
          placeholder="소개 멘트를 작성해 주세요"
          onChange={(e) => {
            setDescription(e.target.value);
            setTouched((prev) => ({ ...prev, description: true }));
          }}
          error={
            !touched.description
              ? ''
              : !description.trim()
                ? '*소개 멘트를 작성해주세요'
                : description.length > 500
                  ? '*소개 멘트는 500자 이하여야 합니다'
                  : ''
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
          label="비밀번호"
          type={showPw ? 'text' : 'password'}
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setTouched((prev) => ({ ...prev, pw: true }));
          }}
          placeholder="비밀번호를 입력해 주세요"
          rightIcon={
            <img
              src={showPw ? visibilityOn : visibilityOff}
              alt={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
              width={24}
              height={24}
            />
          }
          onRightIconClick={() => setShowPw((v) => !v)}
          error={
            !touched.pw
              ? ''
              : !pw.trim()
                ? '*비밀번호를 입력해 주세요'
                : pw.length < 8 || pw.length > 15
                  ? '*비밀번호는 8자 이상 15자 이하여야 합니다'
                  : ''
          }
        />
        <Input
          className={styles.passwordCheck}
          label="비밀번호 확인"
          type={showPwCheck ? 'text' : 'password'}
          value={pwCheck}
          onChange={(e) => {
            setPwCheck(e.target.value);
            setTouched((prev) => ({ ...prev, pwCheck: true }));
          }}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          rightIcon={
            <img
              src={showPwCheck ? visibilityOn : visibilityOff}
              alt={showPwCheck ? '비밀번호 숨기기' : '비밀번호 보기'}
              width={24}
              height={24}
            />
          }
          onRightIconClick={() => setShowPwCheck((v) => !v)}
          error={
            !touched.pwCheck
              ? ''
              : !pwCheck.trim()
                ? '*비밀번호를 다시 한 번 입력해 주세요'
                : pwCheck.length < 8 || pwCheck.length > 15
                  ? '*비밀번호는 8자 이상 15자 이하여야 합니다'
                  : pw !== pwCheck
                    ? '*비밀번호가 일치하지 않습니다'
                    : ''
          }
        />
        <Button
          className={styles.button}
          text="만들기"
          onClick={handleSubmit}
          disabled={isTouched && !isValid}
          color={!isTouched || isValid ? 'brand' : 'gray'}
        />
      </main>
    </Container>
  );
}
