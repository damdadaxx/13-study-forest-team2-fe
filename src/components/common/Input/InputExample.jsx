import { useState } from 'react';

import Input from '@/components/common/Input/Input';
import Label from '@/components/common/Label/Label';
import Textarea from '@/components/common/Textarea/Textarea';

// TODO: 1차 개발 완료 전에 삭제하기
export default function InputExample() {
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [intro, setIntro] = useState('');

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
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="스터디 이름을 입력해 주세요."
      />

      {/* 에러 상태 */}
      <Input
        label="스터디 이름 (에러)"
        value=""
        onChange={() => {}}
        placeholder="스터디 이름을 입력해 주세요"
        error="스터디 이름을 입력해주세요"
      />

      {/* 우측 아이콘 (비번 토글) */}
      <Input
        label="비밀번호"
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="비밀번호를 입력해 주세요"
      />

      {/* Textarea */}
      <Textarea
        label="소개"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
        placeholder="소개를 입력해 주세요"
      />

      {/* Textarea 에러 */}
      <Textarea
        label="소개 (에러)"
        value=""
        onChange={() => {}}
        placeholder="소개를 입력해 주세요"
        error="소개를 입력해주세요"
      />

      {/* 단독 라벨 - input 없이 라벨만 (배경 선택 케이스) */}
      <Label text="배경을 선택해주세요" />
    </div>
  );
}
