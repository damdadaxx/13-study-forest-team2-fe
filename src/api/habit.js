// src/api/habit.js
import { get, post, patch, del } from './client';

//해당 스터디의 습관 조회
export const getHabits = (studyId) => get(`/studies/${studyId}/habits`);

//습관 생성
export const createHabit = (studyId, content) =>
  post(`/studies/${studyId}/habits`, { content });

//습관 수정
export const updateHabit = (studyId, habitId, content) =>
  patch(`/studies/${studyId}/habits/${habitId}`, { content });

//습관 삭제
export const deleteHabit = (studyId, habitId) =>
  del(`/studies/${studyId}/habits/${habitId}`);
