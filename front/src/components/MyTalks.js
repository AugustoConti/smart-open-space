import React, { useState } from 'react';

import { Box, Button, Layer } from 'grommet';
import PropTypes from 'prop-types';

import takingNotesImg from '#assets/taking_notes.svg';
import {
  scheduleTalk,
  useGetTalksByUser,
  useGetOS,
  useGetSlots,
} from '#helpers/api/os-client';
import MyProps from '#helpers/MyProps';
import Card from '#shared/Card';
import Detail from '#shared/Detail';
import EmptyData from '#shared/EmptyData';
import { ClockIcon, HomeIcon, TalkIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';
import MyForm from '#shared/MyForm';
import Title from '#shared/Title';

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

const SelectSlot = ({ name, onExit, freeSlots, onSubmit }) => {
  const [freeHours, setFreeHours] = useState([]);
  return (
    <Layer onEsc={onExit} onClickOutside={onExit}>
      <Box pad="medium">
        <Box margin={{ vertical: 'medium' }}>
          <Title level="2">Agendate!</Title>
          <Detail size="large" text={name} textAlign="center" />
        </Box>
        <MyForm onSecondary={onExit} onSubmit={onSubmit}>
          <MyForm.Select
            icon={<HomeIcon />}
            label="Sala"
            name="room"
            options={freeSlots.map(p => p.first)}
            labelKey="name"
            onChange={({ selected }) => {
              setFreeHours(freeSlots[selected].second.map(String));
            }}
          />
          <MyForm.Select
            icon={<ClockIcon />}
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
  const [{ activeQueue, freeSlots, name }] = useGetOS(id);
  const [slots] = useGetSlots(id);
  const [talks] = useGetTalksByUser(id);

  const toOS = () => history.push(`/os/${id}`);
  const onNew = () => history.push(`/newTalk/${id}`);
  const isAssigned = idTalk => !!slots.find(s => s.talk.id === idTalk);

  return (
    <>
      <MainHeader>
        <MainHeader.TitleLink label={name} onClick={toOS} />
        <MainHeader.SubTitle icon={TalkIcon} label="MIS CHARLAS" />
        {talks.length > 0 && <MainHeader.ButtonNew label="Charla" onClick={onNew} />}
      </MainHeader>
      {talks.length === 0 ? (
        <EmptyTalk onClick={onNew} />
      ) : (
        <MyGrid>
          {talks.map(talk => (
            <Talk
              activeQueue={activeQueue}
              assigned={isAssigned(talk.id)}
              freeSlots={freeSlots}
              key={talk.id}
              onSchedule={toOS}
              {...talk}
            />
          ))}
        </MyGrid>
      )}
    </>
  );
};
MyTalks.propTypes = { match: MyProps.match, history: MyProps.history };

export default MyTalks;
