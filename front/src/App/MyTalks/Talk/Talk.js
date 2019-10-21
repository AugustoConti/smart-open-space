import React, { useState } from 'react';

import { Box, Button, Text } from 'grommet';
import PropTypes from 'prop-types';

import { enqueueTalk, scheduleTalk } from '#api/os-client';
import Card from '#shared/Card';
import Detail from '#shared/Detail';
import Title from '#shared/Title';

import SelectSlot from './SelectSlot';

const Badge = ({ text, color }) => (
  <Box
    alignSelf="center"
    // background={{ color, opacity: 'medium' }}
    border={{ color, size: 'small' }}
    pad={{ horizontal: 'small', vertical: 'xsmall' }}
    round
  >
    <Text color={color} weight="bold">
      {text}
    </Text>
  </Box>
);
Badge.propTypes = { text: PropTypes.string, color: PropTypes.string };

const ButtonAction = props => (
  <Button alignSelf="center" margin={{ top: 'medium' }} primary {...props} />
);

const Talk = ({
  activeQueue,
  assigned,
  description,
  enqueued,
  freeSlots,
  hasAnother,
  id,
  name,
  onEnqueue,
  onSchedule,
  toSchedule,
}) => {
  const [open, setOpen] = useState(false);
  if (enqueued) return null;
  const onSubmit = ({ value: { time, room } }) => {
    scheduleTalk(id, room.id, time).then(onSchedule);
  };
  const color = assigned
    ? 'status-ok'
    : toSchedule
    ? 'accent-3'
    : enqueued
    ? 'accent-2'
    : 'accent-4';
  return (
    <Card borderColor={color}>
      <Box>
        <Title>{name}</Title>
        <Detail size="small" text={description} truncate />
      </Box>
      {assigned ? (
        <Badge color={color} text="Agendada" />
      ) : enqueued ? (
        <Badge color={color} text="Esperando turno" />
      ) : toSchedule ? (
        <ButtonAction color={color} label="Agendar" onClick={() => setOpen(true)} />
      ) : (
        activeQueue && (
          <ButtonAction
            color={color}
            disabled={hasAnother}
            label="Encolar"
            onClick={() => enqueueTalk(id).then(onEnqueue)}
          />
        )
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
  enqueued: PropTypes.bool.isRequired,
  freeSlots: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  id: PropTypes.number.isRequired,
  hasAnother: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onEnqueue: PropTypes.func.isRequired,
  onSchedule: PropTypes.func.isRequired,
  toSchedule: PropTypes.bool.isRequired,
};

export default Talk;
