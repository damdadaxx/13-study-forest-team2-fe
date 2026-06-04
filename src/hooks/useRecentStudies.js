import { useStudy } from '@/hooks/useStudy.js';

export function useGetRecentStudies() {
  const recentStudyIds = JSON.parse(localStorage.getItem('ids')) || [];
  const recentStudy1 = useStudy(recentStudyIds[0]);
  const recentStudy2 = useStudy(recentStudyIds[1]);
  const recentStudy3 = useStudy(recentStudyIds[2]);
  const recentStudies = [recentStudy1, recentStudy2, recentStudy3];
  return recentStudies;
}
