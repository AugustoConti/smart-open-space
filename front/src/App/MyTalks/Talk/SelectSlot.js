import React, { useState } from 'react';

import { Box, Layer } from 'grommet';
import PropTypes from 'prop-types';

import { ClockIcon, HomeIcon } from '#shared/icons';
import Detail from '#shared/Detail';
import MyForm from '#shared/MyForm';
import Title from '#shared/Title';

const pad = (n) => (n < 10 ? '0' : '') + n;
const toTime = (time) => time.map(pad).join(':');
let compareTime = ([anHour, aMinute], [otherHour, otherMinute]) =>
  anHour < otherHour || (anHour === otherHour && aMinute < otherMinute) ? -1 : 1;
const toDate = ([year, month, day]) => {
  return new Date(year, month, day);
};

const SelectSlot = ({ freeSlots, dates, name, onExit, onSubmit, title }) => {
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [slots, setSlots] = useState([]);

  console.log(
    slots.map((slot) => ({
      ...slot,
      startTime: toTime(slot.startTime),
    }))
  );

  function getSlotsForDate(selected) {
    return selectedSlot.filter(
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
            options={freeSlots.map((p) => p.first)}
            labelKey="name"
            onChange={({ selected }) => {
              setSelectedSlot(freeSlots[selected].second);
            }}
          />
          <MyForm.Select
            icon={<HomeIcon />}
            label="Fecha"
            name="date"
            options={dates.map((date) => toDate(date).toLocaleDateString('es'))}
            onChange={({ selected }) => {
              console.log(selected);
              setSlots(getSortTimes(selected));
            }}
          />
          <MyForm.Select
            icon={<ClockIcon />}
            label="Horario"
            emptySearchMessage="No hay horarios disponibles para esta sala en esa fecha"
            name="slotId"
            labelKey="startTime"
            valueKey="id"
            options={slots.map((slot) => ({
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
  freeSlots: PropTypes.arrayOf(
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
