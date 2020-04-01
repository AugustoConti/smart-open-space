import React from 'react';
import { Box, Text, Button } from 'grommet';
import PropTypes from 'prop-types';

import ButtonNew from '#shared/ButtonNew';
import HourHeader from '#shared/HourHeader';
import { TrashIcon } from '#shared/icons';

const TALK_SLOT = 'TalkSlot';
const OTHER_SLOT = 'OtherSlot';

const Slot = ({ color, onRemove, start, text }) => (
  <>
    <HourHeader hour={start} />
    <Box
      background={{ color, opacity: 'medium' }}
      direction="row"
      justify="center"
      pad={onRemove ? 'small' : 'medium'}
      round="small"
    >
      <Text alignSelf="center" color="dark-1">
        {text}
      </Text>
      {onRemove && <Button icon={<TrashIcon color="neutral-4" />} onClick={onRemove} />}
    </Box>
  </>
);
Slot.propTypes = {
  color: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  start: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const CloseSlot = ({ time }) => (
  <Slot color="accent-1" key={`cierre-${time}`} start={time} text="Cierre" />
);
CloseSlot.propTypes = {
  time: PropTypes.string.isRequired,
};

const TimeSelector = ({ onChange, onNewSlot, value }) => {
  const lastEnd = value.length > 0 ? value.slice(-1)[0].endTime : undefined;

  const addSlot = (type) =>
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
            },
          ],
        },
      });
    });

  return (
    <Box>
      <Box>
        {value.map(({ type, startTime, description }, i) => (
          <Slot
            color={type === TALK_SLOT ? 'brand' : 'accent-1'}
            key={startTime}
            start={startTime}
            text={type === TALK_SLOT ? 'Charla' : description}
            onRemove={
              i === value.length - 1
                ? () => onChange({ target: { value: value.slice(0, -1) } })
                : null
            }
          />
        ))}
        {value.length > 0 && <CloseSlot time={lastEnd} />}
      </Box>
      <Box direction="row" margin={{ vertical: 'medium' }} justify="evenly">
        <ButtonNew label="Charla" onClick={() => addSlot(TALK_SLOT)} />
        <ButtonNew label="Otro" color="accent-1" onClick={() => addSlot(OTHER_SLOT)} />
      </Box>
    </Box>
  );
};
TimeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  onNewSlot: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.shape),
};

export default TimeSelector;
