import { Box } from 'grommet';
import { numbersToTime, sortTimes } from '#helpers/time';
import { Slot } from './Slot';
import React from 'react';
import HourHeader from '#shared/HourHeader';
import { OtherSlot } from './OtherSlot';
import PropTypes from 'prop-types';

export const Slots = ({ talksOf, sortedSlots }) => {
  return (
    <Box margin={{ bottom: 'medium' }}>
      {[
        ...sortedSlots.map((slot) => (
          <Slot key={slot.id} talksOf={talksOf} slot={slot} />
        )),
        <React.Fragment key="cierre">
          <HourHeader hour={numbersToTime(sortedSlots.slice(-1)[0].endTime)} />
          <OtherSlot description="Cierre" />
        </React.Fragment>,
      ]}
    </Box>
  );
};
Slots.prototype = {
  talksOf: PropTypes.func.isRequired,
  sortedSlots: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
