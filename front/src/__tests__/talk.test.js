import Talk from '../App/model/talk';

function anyTalk() {
  return new Talk(0, 'a talk', 'desc', undefined, {
    email: 'email@email.com',
    id: 1,
    name: 'speaker',
  });
}

describe('talk', () => {
  it('a talk can be not assigned to a slot', () => {
    const talk = anyTalk();
    const slots = [];
    expect(talk.isAssigned(slots)).toBe(false);
  });

  it('a talk can be assigned to a slot', () => {
    const talk = anyTalk();
    const slots = [
      {
        slot: { startTime: new Date(), endTime: new Date() },
        room: { name: 'a room', description: '', id: 0 },
        talk: talk,
        id: 0,
      },
    ];
    expect(talk.isAssigned(slots)).toBe(true);
  });

  it('can be not in the queue', () => {
    const talk = anyTalk();
    const queue = [];

    expect(talk.isInqueue(queue)).toBe(false);
  });

  it('can be inqueue', () => {
    const talk = anyTalk();
    const queue = [talk];

    expect(talk.isInqueue(queue)).toBe(true);
  });
});
