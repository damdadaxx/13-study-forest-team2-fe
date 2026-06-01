/**
 * ========================================
 * 모든 상수를 한곳에서 export하는 파일
 * ========================================
 *
 * 다른 파일에서 constants/index.js 또는 @/constants로 한 번에 import할 수 있습니다.
 *
 * 사용 예:
 * import { APP_NAME, API_BASE_URL, STUDY_STATUS, SORT_OPTIONS } from '@/constants';
 *
 * 또는 개별 import:
 * import { SORT_OPTIONS } from '@/constants/pagination';
 */

/**
 * CONTAINER_RULES
 * 1. sm : 696px - 상세페이지
 * 2. md (Default) : 1200px - 스터디 상세, 홈
 * 3. lg : 1248px - 오늘의 집중, 오늘의 습관
 */
export const CONTAINER_RULES = [
  { pattern: /\/edit$/, size: 'sm' }, // /edit으로 끝나면
  { pattern: /\/new$/, size: 'sm' }, // /new으로 끝나면
  { pattern: /\/studies\/\d+$/, size: 'md' }, // /studies/숫자로 끝나면
  { pattern: /habits/, size: 'lg' },
  { pattern: /focus/, size: 'lg' },
];
