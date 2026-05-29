import { useState } from 'react';

import Input from '@/components/common/Input/Input';
import Label from '@/components/common/Label/Label';
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
      <Label text="스터디 이름">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="스터디 이름을 입력해 주세요"
        />
      </Label>

      {/* 에러 상태 */}
      <Label text="스터디 이름 (에러)">
        <Input
          value=""
          onChange={() => {}}
          placeholder="스터디 이름을 입력해 주세요"
          error="스터디 이름을 입력해주세요"
        />
      </Label>

      {/* 우측 아이콘 (비번 토글) */}
      <Label text="비밀번호">
        <Input
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
      </Label>

      {/* Textarea */}
      <Label text="소개">
        <Textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="소개를 입력해 주세요"
        />
      </Label>

      {/* Textarea 에러 */}
      <Label text="소개 (에러)">
        <Textarea
          value=""
          onChange={() => {}}
          placeholder="소개를 입력해 주세요"
          error="소개를 입력해주세요"
        />
      </Label>

      {/* 단독 라벨 - input 없이 라벨만 (배경 선택 케이스) */}
      <Label text="배경을 선택해주세요" />
    </div>
  );
}
