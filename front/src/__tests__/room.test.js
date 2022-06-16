import { Room } from '../App/model/room';

describe('a room', () => {
  it('when their slots are asked, it sorts them by date', () => {
    const slotOnJanuary2022 = { date: [1, 1, 2022] };
    const slotOnDecember2022 = { date: [2, 12, 2021] };
    const slots = [slotOnJanuary2022, slotOnDecember2022];
    const room = new Room(slots);
    expect(room.slots()[0]).toBe(slotOnDecember2022);
    expect(room.slots()[1]).toBe(slotOnJanuary2022);
  });
  it('has id, description, name and slots', () => {
    const id = 1;
    const slots = [];
    const name = 'a name';
    const description = 'a Description';
    const room = new Room(slots, id, name, description);
    expect(room.slots()).toBe(slots);
    expect(room.id).toBe(id);
    expect(room.name).toBe(name);
    expect(room.description).toBe(description);
  });
});
