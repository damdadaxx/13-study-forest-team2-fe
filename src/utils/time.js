export function formatTimerDisplay(seconds) {
  const isOvertime = seconds < 0;
  const absoluteSeconds = isOvertime ? -seconds : seconds;

  const minutes = Math.floor(absoluteSeconds / 60);
  const restSeconds = absoluteSeconds % 60;

  const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const displaySeconds =
    restSeconds < 10 ? `0${restSeconds}` : `${restSeconds}`;

  return isOvertime
    ? `-${displayMinutes}:${displaySeconds}`
    : `${displayMinutes}:${displaySeconds}`;
}
