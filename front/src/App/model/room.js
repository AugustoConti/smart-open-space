import { compareAsc } from 'date-fns';

export class Room {
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
}
