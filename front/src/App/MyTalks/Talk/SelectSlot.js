import React, { useState } from 'react';

import { Box, Layer } from 'grommet';
import PropTypes from 'prop-types';

import { CalendarIcon, ClockIcon, HomeIcon } from '#shared/icons';
import Detail from '#shared/Detail';
import MyForm from '#shared/MyForm';
import Title from '#shared/Title';
import { compareTime } from '#helpers/time';

const pad = (n) => (n < 10 ? '0' : '') + n;
const toTime = (time) => time.map(pad).join(':');
const toDate = ([year, month, day]) => new Date(year, month, day);

const SelectSlot = ({ rooms, dates, name, onExit, onSubmit, title }) => {
  const [freeSlotsOfRoom, setFreeSlotsOfRoom] = useState([]);
  const [freeSlotsOnCertainDate, setFreeSlotsOnCertainDate] = useState([]);

  const emptyRoom = freeSlotsOfRoom.length === 0;
  const emptyDay = freeSlotsOnCertainDate.length === 0;

  function getSlotsForDate(selected) {
    return freeSlotsOfRoom.filter(
      (slot) =>
        toDate(slot.date).toLocaleDateString('es') ===
        toDate(dates[selected]).toLocaleDateString('es')
    );
  }

  function getSortTimes(selected) {
    return getSlotsForDate(selected).sort((aSlot, otherSlot) =>
      compareTime(aSlot.startTime, otherSlot.startTime)
    );
  }

  return (
    <Layer onEsc={onExit} onClickOutside={onExit}>
      <Box pad="medium">
        <Box margin={{ vertical: 'medium' }}>
          <Title level="2">{title}</Title>
          <Detail size="large" text={name} textAlign="center" />
        </Box>
        <MyForm onSecondary={onExit} onSubmit={onSubmit}>
          <MyForm.Select
            icon={<HomeIcon />}
            label="Sala"
            name="room"
            options={rooms}
            labelKey="name"
            onChange={({ selected: selectedIndex }) => {
              setFreeSlotsOfRoom(rooms[selectedIndex].slots());
            }}
          />
          <MyForm.Select
            icon={<CalendarIcon />}
            disabled={emptyRoom}
            label="Fecha"
            name="date"
            options={dates.map((date) => toDate(date).toLocaleDateString('es'))}
            onChange={({ selected: selectedIndex }) =>
              setFreeSlotsOnCertainDate(getSortTimes(selectedIndex))
            }
          />
          <MyForm.Select
            icon={<ClockIcon />}
            disabled={emptyDay}
            label="Horario"
            emptySearchMessage="No hay horarios disponibles para esta sala en esa fecha"
            name="slotId"
            labelKey="startTime"
            valueKey="id"
            options={freeSlotsOnCertainDate.map((slot) => ({
              ...slot,
              startTime: toTime(slot.startTime),
            }))}
          />
        </MyForm>
      </Box>
    </Layer>
  );
};
SelectSlot.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      second: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    }).isRequired
  ).isRequired,
  name: PropTypes.string.isRequired,
  onExit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default SelectSlot;
