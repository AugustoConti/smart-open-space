import React, { useState } from 'react';

import { Box, Layer } from 'grommet';
import PropTypes from 'prop-types';

import { CalendarIcon, ClockIcon, HomeIcon } from '#shared/icons';
import Detail from '#shared/Detail';
import MyForm from '#shared/MyForm';
import Title from '#shared/Title';
import { Room } from '../../model/room';
import { compareAsc } from 'date-fns';
import { toDate, numbersToTime } from '#helpers/time';

const SelectSlot = ({ rooms, dates, name, onExit, onSubmit, title }) => {
  const [room, setRoom] = useState(new Room([]));
  const [filteredSlotsByDate, setFilteredSlotsByDate] = useState([]);

  const noSlots = room.slots().length === 0;
  const emptyDay = filteredSlotsByDate.length === 0;
  const sortedDates = dates.map((date) => toDate(date)).sort(compareAsc);
  const hasOneDate = dates.length === 1;

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
              setRoom(rooms[selectedIndex]);
              setFilteredSlotsByDate([]);
            }}
          />
          {!hasOneDate && (
            <MyForm.Select
              icon={<CalendarIcon />}
              disabled={noSlots}
              label="Fecha"
              name="date"
              options={sortedDates.map((date) => date.toLocaleDateString('es'))}
              onChange={({ selected: selectedIndex }) =>
                setFilteredSlotsByDate(room.slotsAt(toDate(dates[selectedIndex])))
              }
            />
          )}
          <MyForm.Select
            icon={<ClockIcon />}
            disabled={(emptyDay && !hasOneDate) || noSlots}
            label="Horario"
            emptySearchMessage="No hay horarios disponibles para esta sala en esa fecha"
            name="slotId"
            labelKey="startTime"
            valueKey="id"
            options={
              hasOneDate
                ? room.slotsAt(toDate(dates[0])).map((slot) => ({
                    ...slot,
                    startTime: numbersToTime(slot.startTime),
                  }))
                : filteredSlotsByDate.map((slot) => ({
                    ...slot,
                    startTime: numbersToTime(slot.startTime),
                  }))
            }
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
