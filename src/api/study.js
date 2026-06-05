import { del, get, patch, post } from '@/api/client.js';

export const getStudyById = (id) => get(`/studies/${id}`);
export const getStudies = (query) =>
  get(`/studies?${new URLSearchParams(query)}`);
export const deleteStudy = (id, body) => del(`/studies/${id}`, body);
export const createStudy = (body) => post(`/studies`, body);
export const updateStudy = (id, body) => patch(`/studies/${id}`, body);
export const verifyStudyPassword = (id, body) =>
  post(`/studies/${id}/verifyPassword`, body);

export const createFocus = (id, duration) =>
  post(`/studies/${id}/focus`, { duration });
