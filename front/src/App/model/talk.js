export default class Talk {
  constructor(id, name, description, meetingLink, speaker) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.meetingLink = meetingLink;
    this.speaker = speaker;
  }

  isAssigned(slots) {
    return slots.some((slot) => slot.talk.id === this.id);
  }

  isInqueue(queue) {
    return queue.some((talk) => talk === this);
  }
}
