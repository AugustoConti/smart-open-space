import { compareAsc, isEqual } from 'date-fns';
import { compareTime } from '#helpers/time';

export class Room {
  byDate = (date) => (slot) => isEqual(this._toDate(slot.date), date);
  byTime = (aSlot, otherSlot) => compareTime(aSlot.startTime, otherSlot.startTime);
  constructor(slots, id, name, description) {
    this._slots = slots;
    this.id = id;
    this.name = name;
    this.description = description;
  }

  slots() {
    return this._slots.sort((aSlot, otherSlot) =>
      compareAsc(this._toDate(aSlot.date), this._toDate(otherSlot.date))
    );
  }

  _toDate(date) {
    return new Date(date[2], date[1], date[0]);
  }

  slotsAt(date) {
    return this._slots.filter(this.byDate(date)).sort(this.byTime);
  }
}
