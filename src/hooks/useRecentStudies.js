import { useStudy } from '@/hooks/useStudy.js';

//로컬스토리지 활용하여 최근 조회 목록 구현
export function useRecentStudies() {
  const recentStudyIds = JSON.parse(localStorage.getItem('ids')) || [];
  const recentStudy1 = useStudy(recentStudyIds[0]);
  const recentStudy2 = useStudy(recentStudyIds[1]);
  const recentStudy3 = useStudy(recentStudyIds[2]);
  const recentStudies = [recentStudy1, recentStudy2, recentStudy3];
  return recentStudies;
}
