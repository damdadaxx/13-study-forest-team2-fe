import { useEffect, useMemo, useState } from 'react';

import {
  createStudy,
  getStudies,
  getStudyById,
  updateStudy,
} from '@/api/study.js';

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

export function useStudies({ keyword, cursor, limit, sort }) {
  const [studies, setStudies] = useState(null);

  const query = useMemo(
    () => ({
      ...(keyword && { keyword }),
      ...(cursor && { cursor }),
      limit,
      sort,
    }),
    [keyword, cursor, limit, sort],
  );

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const data = await getStudies(query);
        setStudies((prev) => {
          if (!prev || !cursor) return data;
          return { ...data, data: [...prev.data, ...data.data] };
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchStudies();
  }, [query, cursor]);

  return studies;
}

export function useCreateStudy() {
  const create = async (body) => {
    try {
      const data = await createStudy(body);
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };
  return create;
}

export function useUpdateStudy() {
  const update = async (id, body) => {
    const data = await updateStudy(id, body);
    return data;
  };
  return update;
}
