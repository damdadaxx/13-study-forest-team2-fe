import { post } from '@/api/client.js';

export const createFocus = (id, duration) =>
  post(`/studies/${id}/focus`, { duration });
