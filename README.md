# 공부의 숲

효율적인 스터디 관리 플랫폼

---

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [개발 가이드](#개발-가이드)
- [환경 변수 설정](#환경-변수-설정)

---

## 프로젝트 개요

공부의 숲은 사용자가 스터디를 생성, 관리, 참여할 수 있는 플랫폼입니다.

**주요 특징:**

- 직관적인 UI/UX
- 반응형 디자인
- 실시간 데이터 동기화
- 토스트 알림 시스템

---

## 기술 스택

### Core

- **React 18+** - UI 라이브러리
- **Vite** - 빌드 도구 및 개발 서버
- **React Router** - 클라이언트 라우팅

### Styling

- **CSS Module** - 컴포넌트별 스타일 관리
- **Pretendard Font** - 한글 웹폰트

### Utilities

- **React Responsive** - 반응형 디자인 지원

### Development

- **Git** - 버전 관리
- **Prettier** - 코드 포맷팅

---

## 설치 및 실행

### 1단계: 저장소 클론

```bash
git clone https://github.com/damdadaxx/13-study-forest-team2-fe.git
cd 13-study-forest-team2-fe
```

### 2단계: 의존성 설치

```bash
npm install
```

### 3단계: 환경 변수 설정

```bash
# .env.development 파일 생성 (개발 환경)
cp .env.example .env.development

# .env.production 파일 생성 (프로덕션 환경)
cp .env.example .env.production
```

환경 변수 설정 방법은 [환경 변수 설정](#환경-변수-설정) 섹션을 참고하세요.

### 4단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

---

## 프로젝트 구조

```
src/
├── api/                        # API 호출 관련
│
├── assets/                     # 리소스 (이미지, 폰트)
│   └── images/
│       ├── common/            # 공통 이미지
│       ├── icons/             # 아이콘
│       └── study/             # 컴포넌트별 이미지
│
├── components/                 # 재사용 가능한 UI 컴포넌트
│   ├── common/                # 공통 컴포넌트 (Button 등)
│   ├── layout/                # 레이아웃 컴포넌트
│   └── study/                 # 기능별 컴포넌트 (StudyList 등)
│
├── constants/                  # 상수 관리
│   └── constants.js           # 색상, 상태값, 정렬 옵션 등
│
├── contexts/                   # 전역 상태 관리
│
├── hooks/                      # Custom Hooks
│
├── layout/                     # App 레이아웃
│
├── pages/                      # 라우팅 페이지
│
├── styles/                     # 디자인 시스템 및 리셋
│   ├── font.css              # Pretendard 폰트 정의
│   ├── reset.css             # CSS 리셋
│   └── tokens.css            # 디자인 토큰 (색상, 타이포그래피, z-index)
│
├── utils/                      # 공용 유틸리티 함수
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## 주요 기능

### 1. 스터디 관리

- 스터디 생성 및 삭제
- 스터디 상세 정보 조회
- 스터디 수정

### 2. 오늘의 습관

- 습관 조회: 비밀번호 인증 후 오늘의 습관 목록 조회
- 습관 생성: 매일 반복될 습관 설정
- 습관 체크: 습관 완료 여부 체크 (매일 초기화)
- 습관 수정/삭제: 습관명 변경 시 모든 기록 반영, 삭제 시 이전 기록 유지
- 습관 기록표: 스터디 상세 페이지에서 일주일 단위 습관 기록 조회

### 3. 오늘의 집중

- 집중 세션 시작: 타이머로 공부 시간 설정 및 시작
- 포인트 시스템: 기본 3포인트 + 10분당 추가 1포인트 획득
- 집중 기록: 스터디 상세 페이지에 자동 저장

### 4. 필터링 및 정렬

- 상태별 필터링 (진행중, 완료, 대기)
- 정렬 옵션 (최신순, 오래된순, 많은 포인트 순, 적은 포인트 순)

### 5. 응원 시스템

- 스터디 상세 페이지에서 응원 이모지 추가
- 팀원 격려 및 모티베이션 부스팅

### 6. 반응형 디자인

- 데스크톱, 태블릿, 모바일 지원
- React Responsive 라이브러리 사용

---

## 개발 가이드

### 폴더 및 파일 명명 규칙

#### 컴포넌트

```
components/[category]/[ComponentName]/
├── ComponentName.jsx          # 컴포넌트
└── ComponentName.module.css   # 스타일
```

#### 페이지

```
pages/[PageName]/
├── PageName.jsx              # 페이지
└── PageName.module.css       # 스타일
```

#### 이미지

```
assets/images/[category]/[component_name].svg
예: assets/images/study/img_bg_1.png
```

### 절대 경로 Import

jsconfig.json에서 `@` 별칭 설정:

```javascript
import { fetchStudies } from '@/api/studies';

import { STUDY_STATUS } from '@/constants/constants';

import Button from '@/components/common/Button/Button';
```

### CSS Module 사용

```jsx
import styles from '@components/common/Button/Button.module.css';

export default function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}
```

```css
/* Button.module.css */
.button {
  font: var(--typography-800-16);
  background-color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
```

### 디자인 토큰 사용

#### 타이포그래피

```css
font: var(--typography-800-32); /* Bold 32px */
font: var(--typography-600-18); /* Medium 18px */
font: var(--typography-500-16); /* Regular 16px */
```

#### 색상

```css
color: var(--black-414141);
background-color: var(--brand-99c08e);
border: 1px solid var(--gray-dddddd);
```

#### Z-Index

```css
z-index: var(--z-index-modal); /* 1000 */
z-index: var(--z-index-header); /* 900 */
z-index: var(--z-index-dropdown); /* 950 */
```

### API 호출

```javascript
// src/api/studies.js
import { API_BASE_URL } from '@/constants/constants';

export async function fetchStudies() {
  const response = await fetch(`${API_BASE_URL}/studies`);
  return response.json();
}
```

### Custom Hook 사용

```javascript
// src/hooks/fetchStudies.js
import { useState, useEffect } from 'react';

import { fetchStudies } from '@/api/studies';

export function useStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudies()
      .then(setStudies)
      .finally(() => setLoading(false));
  }, []);

  return { studies, loading };
}
```

---

## 환경 변수 설정

### .env 파일 구조

프로젝트 루트에 다음 파일들을 생성하세요:

#### .env.development

```bash
# API 서버 기본 주소 (개발 환경)
VITE_API_BASE_URL=https://localhost:3000
```

#### .env.production

```bash
# API 서버 기본 주소 (프로덕션 환경)
VITE_API_BASE_URL=https://api.example.com
```


### 환경 변수 사용

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchStudies() {
  const response = await fetch(`${API_BASE_URL}/studies`);
  return response.json();
}
```

### 환경별 동작

- **개발 환경**: `npm run dev` 실행 시 `.env.development` 사용
- **프로덕션**: `npm run build` 실행 시 `.env.production` 사용

---

## Import 정렬 규칙

`.prettierrc` 설정에 따라 자동 정렬됩니다:

```javascript
// ✅ 정렬된 import
import React from 'react';
import { useState } from 'react';

import { fetchStudies } from '@/api/studies';

import Button from '@/components/common/Button/Button';

import styles from './Main.module.css';
```

**정렬 순서:**

1. React 및 외부 라이브러리
2. API, 상수, 훅
3. 컴포넌트
4. CSS Module

---

## Git 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 코드 추가/수정
chore: 빌드, 패키지 매니저 설정 변경
```

**예시:**

```bash
git commit -m "feat: 스터디 필터링 기능 추가"
git commit -m "fix: 스터디 목록 로딩 버그 수정"
```

---

## 자주 묻는 질문

### Q: 폰트가 로드되지 않습니다.

**A:** 다음을 확인하세요.

1. `src/assets/fonts/Pretendard/` 폴더에 폰트 파일이 있는지 확인
2. `src/styles/font.css`의 경로가 올바른지 확인 (`/assets/fonts/...`)
3. 개발 서버를 재시작하세요 (`Ctrl + C` → `npm run dev`)

### Q: 환경 변수가 적용되지 않습니다.

**A:** 다음을 시도하세요.

1. `.env` 파일 생성 확인
2. 변수명이 `VITE_` 접두사로 시작하는지 확인
3. 서버를 재시작하세요

### Q: API 호출이 실패합니다.

**A:** 다음을 확인하세요.

1. 백엔드 서버가 실행 중인지 확인
2. `.env` 파일의 API URL이 올바른지 확인
3. CORS 설정 확인

---

## 성능 최적화

- 이미지는 압축된 형식 사용 (SVG 권장)
- 동적 import를 통한 코드 스플리팅
- CSS Module을 통한 스타일 격리
- React DevTools를 통한 성능 모니터링



---
**마지막 업데이트**: 2026년 5월

---
본 프로젝트는 [코드잇](https://www.codeit.kr)의 소유이며, 교육 목적으로만 사용됩니다. © 2026 Codeit. All rights reserved.


