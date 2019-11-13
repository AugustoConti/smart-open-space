import React from 'react';
import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';

import { useSlots } from '#api/sockets-client';
import HourHeader from '#shared/HourHeader';

import Talk from './Talk';
import Talks from './Talks';

const pad = n => (n < 10 ? '0' : '') + n;
const toTime = time => time.map(pad).join(':');
const sortTimes = times =>
  times.sort(({ startTime: [h1, m1] }, { startTime: [h2, m2] }) =>
    h1 < h2 || (h1 === h2 && m1 < m2) ? -1 : 1
  );

const OtherSlot = ({ description }) => (
  <Box background={{ color: 'accent-1', opacity: 'medium' }} pad="medium" round="small">
    <Text alignSelf="center" color="dark-1">
      {description}
    </Text>
  </Box>
);
OtherSlot.propTypes = { description: PropTypes.string.isRequired };

const TalkSlot = ({ slots }) =>
  slots.length === 0 ? (
    <Box height="small" />
  ) : (
    <Talks>
      {slots.map(({ talk, room }) => (
        <Talk key={talk.id} talk={talk} room={room} />
      ))}
    </Talks>
  );
TalkSlot.propTypes = { slots: PropTypes.arrayOf(PropTypes.shape()).isRequired };

const Schedule = ({ slots: unsortedSlots }) => {
  const slotsSchedule = useSlots();
  const slots = sortTimes(unsortedSlots);
  const talksOf = slotId => slotsSchedule.filter(s => s.slot.id === slotId);

  return [
    ...slots.map(s => (
      <React.Fragment key={s.id}>
        <HourHeader hour={toTime(s.startTime)} />
        {!s.assignable ? (
          <OtherSlot description={s.description} />
        ) : (
          <TalkSlot slots={talksOf(s.id)} />
        )}
      </React.Fragment>
    )),
    <React.Fragment key="cierre">
      <HourHeader hour={toTime(slots.slice(-1)[0].endTime)} />
      <OtherSlot description="Cierre" />
    </React.Fragment>,
  ];
};

export default Schedule;
