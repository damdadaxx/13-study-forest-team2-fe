import { del, get, post } from '@/api/client';

// GET /studies/:studyId/emojis
export const getAllEmojis = (id) => get(`/studies/${id}/emojis`);

// POST /studies/:studyId/emojis
export const incrementEmoji = (studyId, emoji) =>
  post(`/studies/${studyId}/emojis`, {
    emoji,
  });

// DELETE /emojis/:emojiId
export const decrementEmoji = (studyId, emoji) =>
  del(`/studies/${studyId}/emojis`, {
    emoji,
  });
