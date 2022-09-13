import React, { useState } from 'react';

import { Box, Button, Grid, Markdown, Text } from 'grommet';
import PropTypes from 'prop-types';

import {
  enqueueTalk,
  exchangeTalk,
  scheduleTalk,
  deleteTalk,
  useGetOpenSpace,
} from '#api/os-client';
import { useUser } from '#helpers/useAuth';
import ButtonLoading from '#shared/ButtonLoading';
import Card from '#shared/Card';
import Detail from '#shared/Detail';
import { DeleteIcon, EditIcon, TransactionIcon, TrashIcon, UserIcon } from "#shared/icons";
import Title from '#shared/Title';

import SelectSlot from './SelectSlot';
import {
  usePushToEditTalk,
  usePushToOpenSpace,
  usePushToSchedule,
} from '#helpers/routes';
import { Room } from '../../model/room';

const Badge = ({ color, text }) => (
  <Box alignSelf="center">
    <Text color={color} weight="bold">
      {text}
    </Text>
  </Box>
);
Badge.propTypes = { color: PropTypes.string, text: PropTypes.string };

const ButtonAction = (props) => (
  <ButtonLoading alignSelf="center" margin={{ top: 'small' }} {...props} />
);

function EditButton(props) {
  return (
    <ButtonAction
      icon={<EditIcon />}
      color={props.color}
      label="Editar"
      onClick={props.onClick}
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
  roomsWithAssignableSlots,
  roomsWithFreeSlots,
  hasAnother,
  onEnqueue: reloadTalks,
  currentUserIsOrganizer,
  dates,
}) => {
  const pushToSchedule = usePushToSchedule();
  const pushToOpenSpace = usePushToOpenSpace();
  const pushToEditTalk = usePushToEditTalk(talk.id);
  const { data: openSpace, isPending, isRejected } = useGetOpenSpace();
  const user = useUser();
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openExchange, setOpenExchange] = useState(false);
  const shouldDisplayScheduleTalkButton = currentUserIsOrganizer || talk.isToSchedule();
  const onSubmitSchedule = ({ value: { slotId, room } }) =>
    scheduleTalk(talk.id, user.id, slotId, room.id).then(pushToSchedule);

  const onSubmitExchange = ({ value: { slotId, room } }) =>
    exchangeTalk(talk.id, slotId, room.id).then(pushToOpenSpace);

  const color = talk.colorForTalkManagement();

  const shouldDisplayEditTalkButton = talk.speaker.id === user.id;

  return (
    <Card borderColor={color}>
      <Box>
        <Title>{talk.name}</Title>
        <Markdown
          align="center"
          components={{ p: (props) => <Detail size="small" {...props} truncate /> }}
        >
          {talk.description}
        </Markdown>
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
              onClick={() => enqueueTalk(talk.id).then(reloadTalks)}
            />
          )
        )}
        {shouldDisplayEditTalkButton && (
          <>
            <EditButton color={color} onClick={pushToEditTalk} />
            <ButtonAction
              icon={<DeleteIcon />}
              color={color}
              label="Eliminar"
              onClick={() => deleteTalk(openSpace.id, talk.id).then(reloadTalks)}
            />
          </>
        )}
      </Grid>
      {openSchedule && roomsWithFreeSlots && (
        <SelectSlot
          rooms={roomsWithFreeSlots}
          name={talk.name}
          dates={dates}
          onExit={() => setOpenSchedule(false)}
          onSubmit={onSubmitSchedule}
          title="Agendate!"
        />
      )}
      {openExchange && (
        <SelectSlot
          rooms={roomsWithAssignableSlots}
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
  roomsWithAssignableSlots: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  roomsWithFreeSlots: PropTypes.arrayOf(PropTypes.shape(Room).isRequired).isRequired,
  hasAnother: PropTypes.bool.isRequired,
  onEnqueue: PropTypes.func.isRequired,
};

export default Talk;
