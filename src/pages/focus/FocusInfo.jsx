import styles from '@/pages/focus/Focus.module.css';

import ButtonHabit from '@/components/common/Button/ButtonHabit';
import TagPoint from '@/components/common/Tag/TagPoint';

export default function FocusInfo({ study, totalPoint }) {
  return (
    <section className={styles.focusTop}>
      <div className={styles.titleRow}>
        <h1 className={styles.studyTitle}>
          <span>{study.nickname}</span>
          <span>의 {study.title}</span>
        </h1>

        <div className={styles.actions}>
          <ButtonHabit text="오늘의 습관" href="/habits" />
          <ButtonHabit text="홈" href="/" />
        </div>
      </div>

      <div className={styles.pointInfo}>
        <p className={styles.pointLabel}>현재까지 획득한 포인트</p>
        <TagPoint point={totalPoint} size="lg" color="light" />
      </div>
    </section>
  );
}
