import { compareAsc } from 'date-fns';
import { compareTime, byDate, toDate } from '#helpers/time';

export class Room {
  byTime = (aSlot, otherSlot) => compareTime(aSlot.startTime, otherSlot.startTime);
  constructor(slots, id, name, description) {
    this._slots = slots;
    this.id = id;
    this.name = name;
    this.description = description;
  }

  slots() {
    return this._slots.sort((aSlot, otherSlot) =>
      compareAsc(toDate(aSlot.date), toDate(otherSlot.date))
    );
  }

  slotsAt(date) {
    return this._slots.filter(byDate(date)).sort(this.byTime);
  }
}
