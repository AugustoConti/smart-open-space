import React, { useState } from 'react';

import { Box, Button } from 'grommet';
import PropTypes from 'prop-types';

import { scheduleTalk } from '#helpers/api/os-client';
import Card from '#shared/Card';
import Detail from '#shared/Detail';
import Title from '#shared/Title';

import SelectSlot from './SelectSlot';

const Badge = ({ text }) => (
  <Box
    alignSelf="center"
    background={{ color: 'status-ok', opacity: 'medium' }}
    pad={{ horizontal: 'small', vertical: 'xsmall' }}
    round
  >
    {text}
  </Box>
);
Badge.propTypes = { text: PropTypes.string };

const ButtonAgendar = props => (
  <Button
    alignSelf="center"
    color="accent-4"
    label="Agendar"
    margin={{ top: 'medium' }}
    primary
    {...props}
  />
);

const Talk = ({
  activeQueue,
  assigned,
  description,
  freeSlots,
  id,
  name,
  onSchedule,
}) => {
  const [open, setOpen] = useState(false);
  const onSubmit = ({ value: { time, room } }) => {
    scheduleTalk(id, room.id, time).then(onSchedule);
  };

  return (
    <Card borderColor={assigned ? 'status-ok' : 'accent-4'}>
      <Box>
        <Title>{name}</Title>
        <Detail size="small" text={description} truncate />
      </Box>
      {assigned ? (
        <Badge text="Agendada" />
      ) : (
        activeQueue && <ButtonAgendar onClick={() => setOpen(true)} />
      )}
      {open && freeSlots && (
        <SelectSlot
          freeSlots={freeSlots}
          name={name}
          onExit={() => setOpen(false)}
          onSubmit={onSubmit}
        />
      )}
    </Card>
  );
};
Talk.propTypes = {
  activeQueue: PropTypes.bool.isRequired,
  assigned: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  freeSlots: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onSchedule: PropTypes.func.isRequired,
};

export default Talk;
