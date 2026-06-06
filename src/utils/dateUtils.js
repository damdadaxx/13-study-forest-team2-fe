/** 이번 주 날짜 배열 반환 함수 (월~일) */
const getWeekDates = () => {
  const today = new Date();

  // 월요일=0 ~ 일요일=6
  const day = (today.getDay() + 6) % 7;

  // 이번 주 월요일
  const monday = new Date(today);
  monday.setDate(today.getDate() - day);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
};

/** 날짜가 이번 주에 포함되는지 확인하는 함수 */
const isThisWeek = (dateStr, weekDates) => {
  const date = new Date(dateStr);
  const monday = new Date(weekDates[0]);
  const sunday = new Date(weekDates[6]);

  monday.setHours(0, 0, 0, 0);
  sunday.setHours(23, 59, 59, 999);

  return date >= monday && date <= sunday;
};

export { getWeekDates, isThisWeek };
