// TODO: 1차 개발 완료 전에 삭제하기
/*
  @ 예시 파일
  * 폰트, 컬러 스타일 적용
*/
import { useState } from 'react';

import styles from '@/pages/Example.module.css';

import Button from '@/components/common/Button/Button';
import Toast from '@/components/common/Toast/Toast';

export default function Example() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  return (
    <div>
      <Button text="모달오픈버튼" onClick={handleClick} />
      <Toast
        variant="warning"
        message="등록에 성공했습니다."
        isDisplay={show}
        onClose={() => setShow(false)}
      />
      <h2 className={styles.textBold32}>[Typography-제주돌담체!]</h2>
      <p className={styles.textJejuNormal18}>
        Efjejudoldam / Normal / 18pt / 0%
      </p>
      <h2 className={styles.textBold32} style={{ paddingTop: '20px' }}>
        [Typography-프리텐다드!]
      </h2>
      <p className={styles.textExtraBold150}>ExtraBold / 150pt / 0%</p>
      <p className={styles.textExtraBold120}>ExtraBold / 120pt / 0%</p>
      <p className={styles.textExtraBold80}>ExtraBold / 80pt / 0%</p>
      <p className={styles.textExtraBold32}>ExtraBold / 32pt / 0%</p>
      <p className={styles.textExtraBold28}>ExtraBold / 28pt / 0%</p>
      <p className={styles.textExtraBold24}>ExtraBold / 24pt / 0%</p>
      <p className={styles.textExtraBold18}>ExtraBold / 18pt / 0%</p>
      <p className={styles.textBold150}>Bold / 150pt / 0%</p>
      <p className={styles.textBold120}>Bold / 120pt / 0%</p>
      <p className={styles.textBold80}>Bold / 80pt / 0%</p>
      <p className={styles.textBold32}>Bold / 32pt / 0%</p>
      <p className={styles.textBold24}>Bold / 24pt / 0%</p>
      <p className={styles.textBold20}>Bold / 20pt / 0%</p>
      <p className={styles.textBold18}>Bold / 18pt / 0%</p>
      <p className={styles.textBold16}>Bold / 16pt / 0%</p>
      <p className={styles.textBold14}>Bold / 14pt / 0%</p>
      <p className={styles.textBold12}>Bold / 12pt / 0%</p>
      <p className={styles.textBold10}>Bold / 10pt / 0%</p>
      <p className={styles.textMedium20}>Medium / 20pt / 0%</p>
      <p className={styles.textMedium18}>Medium / 18pt / 0%</p>
      <p className={styles.textMedium16}>Medium / 16pt / 0%</p>
      <p className={styles.textMedium14}>Medium / 14pt / 0%</p>
      <p className={styles.textMedium12}>Medium / 12pt / 0%</p>
      <p className={styles.textMedium10}>Medium / 10pt / 0%</p>
      <p className={styles.textRegular18}>Regular / 18pt / 0%</p>
      <p className={styles.textRegular16}>Regular / 16pt / 0%</p>
      <p className={styles.textRegular14}>Regular / 14pt / 0%</p>
      <p className={styles.textRegular12}>Regular / 12pt / 0%</p>
      <p className={styles.textRegular10}>Regular / 10pt / 0%</p>
    </div>
  );
}
