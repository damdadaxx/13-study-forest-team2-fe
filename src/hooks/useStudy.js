import { useEffect, useState } from 'react';

import { getStudyById } from '@/api/study.js';

export function useStudy(id) {
  const [study, setStudy] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchStudy = async () => {
      try {
        const data = await getStudyById(id);
        setStudy(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchStudy();
  }, [id]);

  return study;
}
