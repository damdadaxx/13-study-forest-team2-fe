import { useCallback, useEffect, useState } from 'react';

import { getAllEmojis } from '@/api/emojis';

/** 이모지 데이터 조회 */

const useEmojis = (studyId) => {
  const [emojiData, setEmojiData] = useState([]);

  const fetchEmojis = useCallback(async () => {
    try {
      const data = await getAllEmojis(parseInt(studyId, 10));
      setEmojiData(data.data);
    } catch (error) {
      throw new Error(`❌ 이모지 조회 중 오류 발생 :`, { cause: error });
    }
  }, [studyId]);

  useEffect(() => {
    fetchEmojis(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [studyId]);

  return { emojiData, fetchEmojis };
};

export default useEmojis;
