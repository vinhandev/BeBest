import { log } from './logs';

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

export function getTime(inputDate: Date | string | number) {
  const tmpDate = new Date(inputDate);
  const hour = tmpDate.getHours();
  const minute = tmpDate.getMinutes();
  return `${addZero(hour)}:${addZero(minute)}`;
}

export function compileDueTime(due: Date, time: Date) {
  return new Date(
    due.getFullYear(),
    due.getMonth(),
    due.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
}

export function compareDate(a: Date, b: Date) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function checkNotSameDate(
  a: Date | null | undefined,
  b: Date | null | undefined
) {
  log.debug(a);
  if (!(a instanceof Date)) return true;
  if (!(b instanceof Date)) return true;
  if (a.getFullYear() !== b.getFullYear()) {
    return true;
  }
  if (a.getMonth() !== b.getMonth()) {
    return true;
  }
  if (a.getDate() !== b.getDate()) {
    return true;
  }
  return false;
}
