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
      {filteredData ? (
        <p className={styles.noData}>완료한 습관이 없습니다.</p>
      ) : (
        <div className={styles.tracker}>
          <div className={styles.trackerInner}>
            {/* 기록표 헤더 */}
            <div className={styles.logHeader}>
              <span className={styles.emptyDay}></span>
              {filteredData.map((list) => (
                <p key={list.id} className={styles.contentTitle}>
                  {list.content}
                </p>
              ))}
            </div>

            {/* 기록표 바디 */}
            <div className={styles.logBody}>
              <div className={styles.logBodyInner}>
                <div className={styles.days}>
                  {DAYS.map((day, i) => (
                    <div key={day + i} className={styles.day}>
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.habitContainer}>
                  {filteredData.map((list, listId) => (
                    <div key={list.id} className={styles.habits}>
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
