/** 공유하기 버튼 */
export const copyToClipboard = (handler) => {
  // 현재 페이지의 URL 가져오기
  const currentUrl = window.location.href;

  // 클립보드
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      handler('clipboardModal');
    })
    .catch((err) => {
      console.error('복사 실패: ', err);
    });
};
