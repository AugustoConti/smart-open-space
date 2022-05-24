export default class Talk {
  constructor(id, name, description, meetingLink, speaker) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.meetingLink = meetingLink;
    this.speaker = speaker;
  }

  checkIsAssigned(slots) {
    this.isAssigned = slots.some((slot) => slot.talk.id === this.id);
  }

  checkIsInqueue(queue) {
    this.isInqueue = queue.some((talk) => talk === this);
  }

  checkIsToSchedule(openSpace) {
    this.isToSchedule = openSpace.toSchedule.some((talk) => talk.id === this.id);
  }
}
