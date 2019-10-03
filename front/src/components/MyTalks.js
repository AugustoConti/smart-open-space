import React, { useState } from 'react';

import { Heading, Grid, Box, Text, Button, Layer } from 'grommet';
import PropTypes from 'prop-types';

import RowBetween from './shared/RowBetween';
import ButtonNew from './shared/ButtonNew';
import {
  scheduleTalk,
  useGetTalks,
  useGetOS,
  useGetSlots,
} from '../helpers/api/os-client';
import MyForm from './shared/MyForm';

const TalkCard = ({ assigned, description, name, onSchedule }) => (
  <Box
    justify="between"
    background="white"
    elevation="small"
    fill
    pad="medium"
    round
    overflow="hidden"
    gap="small"
  >
    <Box>
      <Heading level="3" margin="none" size="small">
        {name}
      </Heading>
      <Text color="dark-5" size="small" truncate>
        {description}
      </Text>
    </Box>
    {assigned ? (
      <Box
        border={{ side: 'all', color: 'status-ok', size: 'small' }}
        round
        alignSelf="center"
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
      >
        Agendada
      </Box>
    ) : (
      <Button
        alignSelf="center"
        color="accent-4"
        label="Agendar"
        primary
        margin={{ top: 'medium' }}
        onClick={onSchedule}
      />
    )}
  </Box>
);

TalkCard.defaultProps = { assigned: false };

TalkCard.propTypes = {
  assigned: PropTypes.bool,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSchedule: PropTypes.func.isRequired,
};

const SelectSlotLayout = ({ name, onExit, freeSlots, onSubmit }) => {
  const [freeHours, setFreeHours] = useState([]);
  return (
    <Layer onEsc={onExit} onClickOutside={onExit}>
      <Box pad="medium">
        <Box alignSelf="center" margin={{ vertical: 'medium' }}>
          <Heading level="2" margin="none">
            Agendate!
          </Heading>
          <Text color="dark-5" size="large">
            {name}
          </Text>
        </Box>
        <MyForm onSecondary={onExit} onSubmit={onSubmit}>
          <MyForm.Select
            label="Sala"
            name="room"
            options={freeSlots.map(p => p.first)}
            labelKey="name"
            onChange={({ selected }) => {
              setFreeHours(freeSlots[selected].second.map(String));
            }}
          />
          <MyForm.Select label="Horario" name="time" options={freeHours} />
        </MyForm>
      </Box>
    </Layer>
  );
};

SelectSlotLayout.propTypes = {
  name: PropTypes.string.isRequired,
  onExit: PropTypes.func.isRequired,
  freeSlots: PropTypes.arrayOf(
    PropTypes.shape({
      second: PropTypes.arrayOf(PropTypes.number),
    }).isRequired
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const MyTalks = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [os] = useGetOS(id);
  const [slots] = useGetSlots(id);
  const [talks] = useGetTalks(id);
  const [talkSch, setTalkSch] = useState(null);

  const onSubmit = ({ value: { time, room } }) => {
    scheduleTalk(talkSch.id, room.id, time).then(() => history.push(`/os/${id}`));
  };

  const isAssigned = idTalk => !!slots.find(s => s.talk.id === idTalk);

  return (
    <>
      <RowBetween>
        <Box margin={{ vertical: 'medium' }}>
          <Button
            hoverIndicator
            label={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Heading level="2" margin="none">
                {os.name}
              </Heading>
            }
            onClick={() => history.push(`/os/${id}`)}
            plain
          />
          <Text color="dark-5" size="large">
            Mis charlas
          </Text>
        </Box>
        <ButtonNew label="Charla" onClick={() => history.push(`/newTalk/${id}`)} />
      </RowBetween>
      <Grid columns="small" gap="small" margin={{ bottom: 'medium' }}>
        {talks.map(talk => (
          <TalkCard
            assigned={isAssigned(talk.id)}
            key={talk.id}
            onSchedule={() => setTalkSch(talk)}
            {...talk}
          />
        ))}
      </Grid>
      {talkSch && os.freeSlots && (
        <SelectSlotLayout
          name={talkSch.name}
          onExit={() => setTalkSch(null)}
          freeSlots={os.freeSlots}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

MyTalks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default MyTalks;
