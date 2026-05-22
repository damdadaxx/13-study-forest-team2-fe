// TODO: 1차 개발 완료 전에 삭제하기
/*
  @ 예시 파일
  * 폰트, 컬러 스타일 적용
*/
import styles from '@/pages/Example.module.css';

export default function Example() {
  return (
    <div>
      <h2 className={styles.textBold120}>[Typography]</h2>
      <p className={styles.textJejuNormal18}>
        Efjejudoldam / Normal / 18pt / 0%
      </p>
      <p className={styles.textBold32}>Pretendard / Bold / 32pt / 0%</p>
      <p className={styles.textBold24}>Pretendard / Bold / 24pt / 0%</p>
      <p className={styles.textBold20}>Pretendard / Bold / 20pt / 0%</p>
      <p className={styles.textMedium20}>Pretendard / Medium / 20pt / 0%</p>
      <p className={styles.textBold18}>Pretendard / Bold / 18pt / 0%</p>
      <p className={styles.textMedium18}>Pretendard / Medium / 18pt / 0%</p>
      <p className={styles.textRegular18}>Pretendard / Regular / 18pt / 0%</p>
      <p className={styles.textBold16}>Pretendard / Bold / 16pt / 0%</p>
      <p className={styles.textMedium16}>Pretendard / Medium / 16pt / 0%</p>
      <p className={styles.textRegular16}>Pretendard / Regular / 16pt / 0%</p>
      <p className={styles.textBold14}>Pretendard / Bold / 14pt / 0%</p>
      <p className={styles.textMedium14}>Pretendard / Medium / 14pt / 0%</p>
      <p className={styles.textRegular14}>Pretendard / Regular / 14pt / 0%</p>
      <p className={styles.textBold12}>Pretendard / Bold / 12pt / 0%</p>
      <p className={styles.textMedium12}>Pretendard / Medium / 12pt / 0%</p>
      <p className={styles.textRegular12}>Pretendard / Regular / 12pt / 0%</p>
      <p className={styles.textBold10}>Pretendard / Bold / 10pt / 0%</p>
      <p className={styles.textMedium10}>Pretendard / Medium / 10pt / 0%</p>
      <p className={styles.textRegular10}>Pretendard / Regular / 10pt / 0%</p>
      <p className={styles.textBold150}>Pretendard / Bold / 150pt / 0%</p>
      <p className={styles.textBold120}>Pretendard / Bold / 120pt / 0%</p>
      <p className={styles.textBold80}>Pretendard / Bold / 80pt / 0%</p>
    </div>
  );
}
