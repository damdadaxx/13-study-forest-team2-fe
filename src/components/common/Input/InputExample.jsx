import { useState } from 'react';

import Input from '@/components/common/Input/Input';
import Textarea from '@/components/common/Textarea/Textarea';

import visibilityOff from '@/assets/images/icons/ic_visibility_off.svg';
import visibilityOn from '@/assets/images/icons/ic_visibility_on.svg';

// TODO: 1차 개발 완료 전에 삭제하기
export default function InputExample() {
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [intro, setIntro] = useState('');
  const [showPw, setShowPw] = useState(false);

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <h2>Input / Textarea 미리보기</h2>

      {/* 기본 */}
      <Input
        label="스터디 이름"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="스터디 이름을 입력해 주세요"
      />

      {/* 에러 상태 */}
      <Input
        label="스터이 이름 (에러)"
        id="name-error"
        value=""
        onChange={() => {}}
        placeholder="스터디 이름을 입력해 주세요"
        error="스터디 이름을 입력해주세요"
      />

      {/* 우측 아이콘 (비번 토글) */}
      <Input
        label="비밀번호"
        id="pw"
        type={showPw ? 'text' : 'password'}
        value={pw}
        onChange={(e) => setPw(e.target.value)}
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
      />

      {/* Textarea */}
      <Textarea
        label="소개"
        id="intro"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
        placeholder="소개를 입력해 주세요"
      />

      {/* Textarea 에러 */}
      <Textarea
        label="소개 (에러)"
        id="intro-error"
        value=""
        onChange={() => {}}
        placeholder="소개를 입력해 주세요"
        error="소개를 입력해주세요"
      />
    </div>
  );
}
