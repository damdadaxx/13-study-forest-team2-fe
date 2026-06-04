import { del, get } from '@/api/client.js';

export const getStudyById = (id) => get(`/studies/${id}`);
export const getStudies = (query) =>
  get(`/studies?${new URLSearchParams(query)}`);
export const deleteStudy = (id) => del(`/studies/${id}`); // delete는 훅만들 필욘 없을 것 같아서 여까지만
