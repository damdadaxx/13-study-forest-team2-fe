import { get } from '@/api/client.js';

export const getStudyById = (id) => get(`/studies/${id}`);
