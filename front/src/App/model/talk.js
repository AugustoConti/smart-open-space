export default class Talk {
  constructor(id, name, description, meetingLink, speaker) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.meetingLink = meetingLink;
    this.speaker = speaker;
  }

  canBeQueued() {
    return !this.isAssigned && !this.isToSchedule;
  }

  checkIsAssigned(slots) {
    this.isAssigned = this.isIn(slots.map((slot) => slot.talk));
  }

  checkIsInqueue(queue) {
    this.isInqueue = this.isIn(queue);
  }

  checkIsToSchedule(openSpace) {
    this.isToSchedule = this.isIn(openSpace.toSchedule);
  }

  isIn(talks) {
    return talks.some((talk) => talk.id === this.id);
  }
}
