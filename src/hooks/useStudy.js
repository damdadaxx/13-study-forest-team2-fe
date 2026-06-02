import { useEffect, useState } from 'react';

import { getStudyById } from '@/api/study.js';

export function useStudyById(id) {
  const [study, setStudy] = useState(null);

  useEffect(() => {
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
