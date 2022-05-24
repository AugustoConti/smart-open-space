import Talk from '../App/model/talk';

function anyTalk() {
  return new Talk(0, 'a talk', 'desc', undefined, {
    email: 'email@email.com',
    id: 1,
    name: 'speaker',
  });
}

function slotsWith(talk) {
  return [
    {
      slot: { startTime: new Date(), endTime: new Date() },
      room: { name: 'a room', description: '', id: 0 },
      talk: talk,
      id: 0,
    },
  ];
}

function queueWithTalk(talk) {
  return [talk];
}

function anyOpenSpaceWithNoTalksScheduled() {
  return {
    toSchedule: [],
  };
}

function anyOpenSpaceWithTalkScheduled(talk) {
  return {
    toSchedule: [talk],
  };
}

describe('talk', () => {
  it('a talk can be not assigned to a slot', () => {
    const talk = anyTalk();
    const slots = [];
    talk.checkIsAssigned(slots);
    expect(talk.isAssigned).toBe(false);
  });

  it('a talk can be assigned to a slot', () => {
    const talk = anyTalk();
    const slots = slotsWith(talk);
    talk.checkIsAssigned(slots);
    expect(talk.isAssigned).toBe(true);
  });

  it('can be not in the queue', () => {
    const talk = anyTalk();
    const queue = [];

    talk.checkIsInqueue(queue);

    expect(talk.isInqueue).toBe(false);
  });

  it('can be in queue', () => {
    const talk = anyTalk();
    const queue = queueWithTalk(talk);

    talk.checkIsInqueue(queue);

    expect(talk.isInqueue).toBe(true);
  });

  it('can be not to schedule', () => {
    const talk = anyTalk();
    const openSpace = anyOpenSpaceWithNoTalksScheduled();

    talk.checkIsToSchedule(openSpace);

    expect(talk.isToSchedule).toBe(false);
  });

  it('can be to schedule', () => {
    const talk = anyTalk();
    const openSpace = anyOpenSpaceWithTalkScheduled(talk);

    talk.checkIsToSchedule(openSpace);

    expect(talk.isToSchedule).toBe(true);
  });
});
