import { useMemo } from 'react';

import { DAYS, HABIT_ICONS, HABIT_ICON_EMPTY } from '@/constants/constants.js';

import { getWeekDates, isThisWeek } from '@/utils/dateUtils.js';

import styles from '@/pages/studies/StudyHabitLog.module.css';

const getHabitRecordState = (records, dayIndex, listId, weekDates) => {
  const record = records.find(
    (r) =>
      isThisWeek(r.updatedAt, weekDates) &&
      new Date(r.date).getDay() === dayIndex,
  );

  if (!record) return HABIT_ICON_EMPTY;

  return record.isChecked
    ? HABIT_ICONS[listId % HABIT_ICONS.length]
    : HABIT_ICON_EMPTY;
};

/** 습관 기록표 */
export default function StudyHabitLog({ habitsData }) {
  const weekDates = useMemo(() => getWeekDates(), []);

  if (!habitsData) return null;

  /**  이번 주에 노출되어야 하는 습관 데이터 필터링
   * deletedAt이 없거나, 있더라도 이번 주에 삭제된 데이터 포함
   */
  const filteredData = habitsData?.filter(
    (habit) =>
      habit.deletedAt === null || isThisWeek(habit.deletedAt, weekDates),
  );

  return (
    <article className={styles.habitLog}>
      <h2 className={styles.habitTitle}>습관 기록표</h2>
      <div className={styles.tracker}>
        <div className={styles.trackerInner}>
          <header className={styles.logHeader}>
            {DAYS.map((day, i) => (
              <span key={day + i} className={styles.day}>
                {day}
              </span>
            ))}
          </header>
          <ul className={styles.logBody}>
            {filteredData.map((list, listId) => (
              <li key={list.id} className={styles.log}>
                <p className={styles.habit}>{list.content}</p>
                {Array.from({ length: 7 }, (_, dayIndex) => (
                  <div
                    key={`${list.id}_${dayIndex}`}
                    className={styles.stickerContainer}
                  >
                    <img
                      className={styles.sticker}
                      src={getHabitRecordState(
                        list.habitRecords,
                        dayIndex,
                        listId,
                        weekDates,
                      )}
                    />
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
