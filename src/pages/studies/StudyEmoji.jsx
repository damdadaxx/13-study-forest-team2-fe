import { useEffect, useState } from 'react';

import EmojiPicker from 'emoji-picker-react';

import useEmojis from '@/hooks/useEmojis';

import countEmoji from '@/utils/countEmoji';

import styles from '@/pages/studies/StudyEmoji.module.css';

import TagEmoji from '@/components/common/Tag/TagEmoji';

import IcPlus from '@/assets/images/icons/ic_plus.svg';

export default function StudyEmoji({ studyId }) {
  const [emojiModal, setEmojiModal] = useState(null);

  const { emojiData, fetchEmojis } = useEmojis(studyId);

  /** 이모지 더보기 모달, 라이브러리 모달 토글 */
  const toggleEmojiModal = (modal) => {
    setEmojiModal(emojiModal === modal ? null : modal);
  };

  /** 이모지 클릭 핸들러 함수 */
  const handleClickEmoji = (emoji) => {
    countEmoji(studyId, emoji, fetchEmojis);
  };

  useEffect(() => {
    // Escape 키 닫기
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setEmojiModal();
    };

    const handleClickWindow = () => {
      setEmojiModal(null);
    };

    document.addEventListener('click', handleClickWindow);
    document.addEventListener('keydown', handleKeyDown);

    fetchEmojis();

    return () => {
      document.removeEventListener('click', handleClickWindow);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [studyId]);

  return (
    <div className={styles.topArea}>
      {/* 이모지 */}
      <div className={styles.emojiArea}>
        <div className={styles.emojis}>
          {emojiData.slice(0, 3).map((e) => (
            <TagEmoji
              key={e.id}
              emoji={e.emoji}
              count={e.count}
              onClick={() => {
                handleClickEmoji(e.emoji);
              }}
            />
          ))}

          {/* 이모지 더보기 버튼 */}
          {emojiData?.length > 4 && (
            <button
              className={styles.btnMoreEmoji}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleEmojiModal('moreEmoji');
              }}
            >
              <img
                className={styles.plusIcon}
                src={IcPlus}
                alt="플러스 아이콘"
              />
              <p
                className={styles.emojiCount}
              >{`${emojiData?.length - 3}..`}</p>
            </button>
          )}

          {/* 이모지 더보기 판넬 */}
          {emojiModal === 'moreEmoji' && (
            <div
              className={styles.moreEmojiPanel}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.emojis}>
                {emojiData.slice(3).map((e) => (
                  <TagEmoji
                    key={e.id}
                    emoji={e.emoji}
                    count={e.count}
                    onClick={() => {
                      handleClickEmoji(e.emoji);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 이모지 추가 */}
        <div className={styles.EmojiPickerContainer}>
          <button
            className={styles.btnAddEmoji}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleEmojiModal('emojiPicker');
            }}
          >
            추가
          </button>
          {emojiModal === 'emojiPicker' && (
            <div onClick={(e) => e.stopPropagation()}>
              <EmojiPicker
                className={styles.EmojiPicker}
                onEmojiClick={(emojiObject) =>
                  handleClickEmoji(emojiObject.emoji)
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
