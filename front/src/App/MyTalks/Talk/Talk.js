import React, { useState } from 'react';

import { Box, Button, Grid, Text } from 'grommet';
import PropTypes from 'prop-types';

import { enqueueTalk, exchangeTalk, scheduleTalk } from '#api/os-client';
import { useUser } from '#helpers/useAuth';
import ButtonLoading from '#shared/ButtonLoading';
import Card from '#shared/Card';
import Detail from '#shared/Detail';
import { EditIcon, TransactionIcon, UserIcon } from '#shared/icons';
import Title from '#shared/Title';

import SelectSlot from './SelectSlot';
import {
  usePushToEditTalk,
  usePushToOpenSpace,
  usePushToSchedule,
} from '#helpers/routes';

const Badge = ({ color, text }) => (
  <Box alignSelf="center">
    <Text color={color} weight="bold">
      {text}
    </Text>
  </Box>
);
Badge.propTypes = { color: PropTypes.string, text: PropTypes.string };

const ButtonAction = (props) => (
  <ButtonLoading alignSelf="center" margin={{ top: 'medium' }} {...props} />
);

function EditButton(props) {
  return (
    <Button
      icon={<EditIcon />}
      alignSelf="center"
      color={props.color}
      label="Editar"
      onClick={props.onClick}
      primary
    />
  );
}

EditButton.propTypes = {
  color: PropTypes.any,
  onClick: PropTypes.func,
};
const Talk = ({
  talk,
  activeQueue,
  assignableSlots,
  freeSlots,
  hasAnother,
  onEnqueue,
  currentUserIsOrganizer,
  dates,
}) => {
  const pushToSchedule = usePushToSchedule();
  const pushToOpenSpace = usePushToOpenSpace();
  const pushToEditTalk = usePushToEditTalk(talk.id);
  const user = useUser();
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openExchange, setOpenExchange] = useState(false);
  const shouldDisplayScheduleTalkButton = currentUserIsOrganizer || talk.isToSchedule();

  const onSubmitSchedule = ({ value: { time, date, room } }) =>
    scheduleTalk(talk.id, room.id, date, time, user.id).then(pushToSchedule);

  const onSubmitExchange = ({ value: { time, date, room } }) =>
    exchangeTalk(talk.id, room.id, time, date).then(pushToOpenSpace);

  const color = talk.colorForTalkManagement();

  const shouldDisplayEditTalkButton = talk.speaker.id === user.id;

  return (
    <Card borderColor={color}>
      <Box>
        <Title>{talk.name}</Title>
        <Detail size="small" text={talk.description} truncate />
        {currentUserIsOrganizer && (
          <>
            <Detail icon={UserIcon} text={talk.speaker.name} />
            <Detail size="small" text={talk.speaker.email} />
          </>
        )}
      </Box>
      <Grid gap={'xsmall'}>
        {talk.isAssigned() ? (
          <Box direction="row" justify="evenly">
            <Badge color={color} text="Agendada" />
            {currentUserIsOrganizer && (
              <Button
                hoverIndicator
                icon={<TransactionIcon />}
                onClick={() => setOpenExchange(true)}
                plain
              />
            )}
          </Box>
        ) : (
          shouldDisplayScheduleTalkButton && (
            <ButtonAction
              color={color}
              label="Agendar"
              onClick={() => setOpenSchedule(true)}
            />
          )
        )}
        {talk.isInqueue() ? (
          <Badge color={color} text="Esperando turno" />
        ) : (
          talk.canBeQueued() &&
          activeQueue && (
            <ButtonAction
              color={color}
              disabled={!currentUserIsOrganizer && hasAnother}
              label="Encolar"
              onClick={() => enqueueTalk(talk.id).then(onEnqueue)}
            />
          )
        )}
        {shouldDisplayEditTalkButton && (
          <EditButton color={color} onClick={pushToEditTalk} />
        )}
      </Grid>
      {openSchedule && freeSlots && (
        <SelectSlot
          freeSlots={freeSlots}
          name={talk.name}
          dates={dates}
          onExit={() => setOpenSchedule(false)}
          onSubmit={onSubmitSchedule}
          title="Agendate!"
        />
      )}
      {openExchange && (
        <SelectSlot
          freeSlots={assignableSlots}
          name={talk.name}
          dates={dates}
          onExit={() => setOpenExchange(false)}
          onSubmit={onSubmitExchange}
          title="Mover a:"
        />
      )}
    </Card>
  );
};
Talk.propTypes = {
  activeQueue: PropTypes.bool.isRequired,
  assignableSlots: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  freeSlots: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  hasAnother: PropTypes.bool.isRequired,
  onEnqueue: PropTypes.func.isRequired,
};

export default Talk;
