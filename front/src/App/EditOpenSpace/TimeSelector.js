import React from 'react';
import { Box, Tabs, Tab } from 'grommet';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { toDate } from '#helpers/time';
import { isEqual } from 'date-fns';
import { DateTab } from './DateTab';

const byDate = (date) => (slot) => isEqual(toDate(slot.date), date);

const TimeSelector = ({ onChange, onNewSlot, value, dates }) => {
  const addSlot = (type, date, lastEnd) =>
    onNewSlot(type, lastEnd, ({ value: { startTime, endTime, description } }) => {
      onChange({
        target: {
          value: [
            ...value,
            {
              type,
              startTime: lastEnd || startTime,
              endTime,
              description,
              date: [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()],
            },
          ],
        },
      });
    });

  const removeSlot = (date, lastEnd) =>
    onChange({
      target: {
        value: value.filter((slot) => !byDate(date)(slot) || slot.endTime != lastEnd),
      },
    });

  return (
    <Box>
      <Tabs>
        {dates.map((date) => (
          <Tab title={format(date, 'yyyy-MM-dd')}>
            <DateTab
              key={date}
              value={value.filter(byDate(date))}
              addSlot={addSlot}
              date={date}
              removeSlot={removeSlot}
            />
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
TimeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  onNewSlot: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.shape),
};

export default TimeSelector;
