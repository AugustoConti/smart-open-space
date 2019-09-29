import React, { useState } from 'react';

import { Heading, Grid, Box, Text, Button, Layer, FormField, Select } from 'grommet';
import PropTypes from 'prop-types';

import RowBetween from './shared/RowBetween';
import ButtonNew from './shared/ButtonNew';
import { scheduleTalk, useGetTalks, useGetOS } from '../helpers/api/os-client';
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

const MyTalks = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [os] = useGetOS(id);
  const [talks] = useGetTalks(id);
  const [talkSch, setTalkSch] = useState(null);
  const [freeHours, setFreeHours] = useState([]);

  const onSubmit = ({ value: { time, room } }) => {
    scheduleTalk(talkSch.id, room.id, time).then(() => history.push(`/os/${id}`));
  };

  const isAssigned = idTalk => !!os.slots.find(s => s.talk.id === idTalk);

  return (
    <>
      <RowBetween>
        <Box margin={{ vertical: 'medium' }}>
          <Heading level="2" margin="none">
            {os.name}
          </Heading>
          <Text color="dark-5" size="large">
            Mis charlas
          </Text>
        </Box>
        <ButtonNew label="Charla" onClick={() => history.push(`/newTalk/${id}`)} />
      </RowBetween>
      <Grid columns="small" gap="small" margin={{ bottom: 'medium' }}>
        {os.slots &&
          talks.map(talk => (
            <TalkCard
              assigned={isAssigned(talk.id)}
              key={talk.id}
              {...talk}
              onSchedule={() => setTalkSch(talk)}
            />
          ))}
      </Grid>
      {talkSch && os.freeSlots && (
        <Layer onEsc={() => setTalkSch(null)} onClickOutside={() => setTalkSch(null)}>
          <Box pad="medium">
            <Box alignSelf="center" margin={{ vertical: 'medium' }}>
              <Heading level="2" margin="none">
                Agendate!
              </Heading>
              <Text color="dark-5" size="large">
                {talkSch.name}
              </Text>
            </Box>
            <MyForm onSecondary={() => setTalkSch(null)} onSubmit={onSubmit}>
              <FormField
                label="Sala"
                name="room"
                component={Select}
                options={os.freeSlots.map(p => p.first)}
                labelKey="name"
                onChange={({ selected }) => {
                  setFreeHours(os.freeSlots[selected].second.map(String));
                }}
                required
              />
              <FormField
                label="Horario"
                name="time"
                component={Select}
                options={freeHours}
                required
              />
            </MyForm>
          </Box>
        </Layer>
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
