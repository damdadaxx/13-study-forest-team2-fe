import { decrementEmoji, incrementEmoji } from '@/api/emojis';

/** 이모지 카운트 업데이트 */
const countEmoji = async (studyId, emoji, fetchEmojis) => {
  try {
    const STORAGE_STUDY_ID = `study_${studyId}`; // localstorage key 값
    let liked = {}; // localstorage value 값

    // 저장된 데이터 확인
    const data = JSON.parse(localStorage.getItem(STORAGE_STUDY_ID));
    // 저장된 이모지 데이터 확인
    const hasLiked = data?.emojis?.includes(emoji);

    // 이미 좋아요를 눌렀을 때
    if (hasLiked) {
      // 이모지 제거 및 count 감소
      await decrementEmoji(studyId, emoji);

      // 변경된 내용 저장
      liked = {
        emojis: (data?.emojis ?? []).filter((e) => e !== emoji),
      };
      // 처음 좋아요를 눌렀을 때
    } else {
      // 새로 좋아요한 이모지 카운트 업
      const likedEmoji = await incrementEmoji(studyId, emoji);

      // 변경된 내용 저장
      liked = {
        emojis: [...(data?.emojis ?? []), likedEmoji.data.emoji],
      };
    }

    // 최종 변경된 상태 이모지 localStorage에 저장
    localStorage.setItem(STORAGE_STUDY_ID, JSON.stringify(liked));

    // 저장된 이모지 데이터 업데이트
    await fetchEmojis();
  } catch (error) {
    throw new Error(`❌ 이모지 데이터 업데이트 중 오류 발생 :`, {
      cause: error,
    });
  }
};

export default countEmoji;
