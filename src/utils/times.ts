function addZero(i: number) {
  if (i < 10) {
    return `0${i}`;
  }
  return i;
}

export function getCurrentTimeString() {
  const currentDate = new Date();
  return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
}

export function getTime(inputDate: Date) {
  const hour = inputDate.getHours();
  const minute = inputDate.getMinutes();
  return `${addZero(hour)}:${addZero(minute)}`;
}
