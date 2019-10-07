import React, { useState } from 'react';

import { Heading, Grid, Box, Text, Button, Layer } from 'grommet';
import { Announce, Home, Clock } from 'grommet-icons';
import PropTypes from 'prop-types';

import takingNotesImg from '#assets/taking_notes.svg';
import { scheduleTalk, useGetTalks, useGetOS, useGetSlots } from '#helpers/api/os-client';
import EmptyData from '#shared/EmptyData';
import MyForm from '#shared/MyForm';
import MainHeader from '#shared/MainHeader';

const Talk = ({ assigned, description, freeSlots, id, name, onSchedule }) => {
  const [open, setOpen] = useState(false);

  const onSubmit = ({ value: { time, room } }) => {
    scheduleTalk(id, room.id, time).then(onSchedule);
  };

  return (
    <Box
      background="light-1"
      elevation="small"
      fill
      gap="small"
      justify="between"
      overflow="hidden"
      pad="medium"
      round
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
          alignSelf="center"
          background={{ color: 'status-ok', opacity: 'medium' }}
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          round
        >
          Agendada
        </Box>
      ) : (
        <Button
          alignSelf="center"
          color="accent-4"
          label="Agendar"
          margin={{ top: 'medium' }}
          onClick={() => setOpen(true)}
          primary
        />
      )}
      {open && freeSlots && (
        <SelectSlot
          freeSlots={freeSlots}
          name={name}
          onExit={() => setOpen(false)}
          onSubmit={onSubmit}
        />
      )}
    </Box>
  );
};
Talk.propTypes = {
  assigned: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  freeSlots: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onSchedule: PropTypes.func.isRequired,
};

const SelectSlot = ({ name, onExit, freeSlots, onSubmit }) => {
  const [freeHours, setFreeHours] = useState([]);
  return (
    <Layer onEsc={onExit} onClickOutside={onExit}>
      <Box pad="medium">
        <Box align="center" alignSelf="center" margin={{ vertical: 'medium' }}>
          <Heading level="2" margin="none">
            Agendate!
          </Heading>
          <Text color="dark-5" size="large">
            {name}
          </Text>
        </Box>
        <MyForm onSecondary={onExit} onSubmit={onSubmit}>
          <MyForm.Select
            icon={<Home />}
            label="Sala"
            name="room"
            options={freeSlots.map(p => p.first)}
            labelKey="name"
            onChange={({ selected }) => {
              setFreeHours(freeSlots[selected].second.map(String));
            }}
          />
          <MyForm.Select
            icon={<Clock />}
            label="Horario"
            emptySearchMessage="No hay horarios disponibles para esta sala"
            name="time"
            options={freeHours}
          />
        </MyForm>
      </Box>
    </Layer>
  );
};
SelectSlot.propTypes = {
  name: PropTypes.string.isRequired,
  onExit: PropTypes.func.isRequired,
  freeSlots: PropTypes.arrayOf(
    PropTypes.shape({
      second: PropTypes.arrayOf(PropTypes.number),
    }).isRequired
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const Talks = ({ children }) => (
  <Grid columns="small" gap="small" margin={{ bottom: 'medium' }}>
    {children}
  </Grid>
);
Talks.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

const EmptyTalk = ({ onClick }) => (
  <EmptyData
    buttonText="Cargar charla"
    img={takingNotesImg}
    onClick={onClick}
    text="Cargá tu charla para este Open Space"
  />
);
EmptyTalk.propTypes = { onClick: PropTypes.func.isRequired };

const MyTalks = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [{ freeSlots = [], name }] = useGetOS(id);
  const [slots] = useGetSlots(id);
  const [talks] = useGetTalks(id);

  const toOS = () => history.push(`/os/${id}`);
  const onNew = () => history.push(`/newTalk/${id}`);
  const isAssigned = idTalk => !!slots.find(s => s.talk.id === idTalk);

  return (
    <>
      <MainHeader>
        <MainHeader.TitleLink label={name} onClick={toOS} />
        <MainHeader.SubTitle icon={<Announce />} label="MIS CHARLAS" />
        {talks.length > 0 && <MainHeader.ButtonNew label="Charla" onClick={onNew} />}
      </MainHeader>
      {talks.length === 0 ? (
        <EmptyTalk onClick={onNew} />
      ) : (
        <Talks>
          {talks.map(talk => (
            <Talk
              assigned={isAssigned(talk.id)}
              freeSlots={freeSlots}
              key={talk.id}
              onSchedule={toOS}
              {...talk}
            />
          ))}
        </Talks>
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
