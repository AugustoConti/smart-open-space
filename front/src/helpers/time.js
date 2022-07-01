export const numberToTwoDigitNumber = (number) => (number < 10 ? '0' : '') + number;

export const numbersToTime = (number) => number.map(numberToTwoDigitNumber).join(':');

export function compareTime([anHour, aMinute], [otherHour, otherMinute]) {
  return anHour < otherHour || (anHour === otherHour && aMinute < otherMinute) ? -1 : 1;
}

export const sortTimes = (times) =>
  times.sort(({ startTime: [hour1, minute1] }, { startTime: [hour2, minute2] }) =>
    compareTime([hour1, minute1], [hour2, minute2])
  );

export const toDate = ([year, month, day]) => new Date(year, month - 1, day);
