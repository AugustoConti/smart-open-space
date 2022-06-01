export const numberToTwoDigitNumber = (number) => (number < 10 ? '0' : '') + number;

export const numbersToTime = (number) => number.map(numberToTwoDigitNumber).join(':');

export function theFirstTimeIsLessThanTheSecond(hour1, minute1, hour2, minute2) {
  return hour1 < hour2 || (hour1 === hour2 && minute1 < minute2);
}

export const sortTimes = (times) =>
  times.sort(({ startTime: [hour1, minute1] }, { startTime: [hour2, minute2] }) =>
    theFirstTimeIsLessThanTheSecond(hour1, minute1, hour2, minute2) ? -1 : 1
  );
