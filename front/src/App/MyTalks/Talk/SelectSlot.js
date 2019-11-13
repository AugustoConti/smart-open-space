import React, { useState } from 'react';

import { Box, Layer } from 'grommet';
import PropTypes from 'prop-types';

import { ClockIcon, HomeIcon } from '#shared/icons';
import Detail from '#shared/Detail';
import MyForm from '#shared/MyForm';
import Title from '#shared/Title';

const pad = n => (n < 10 ? '0' : '') + n;
const toTime = time => time.map(pad).join(':');
const sortTimes = times =>
  times.sort(([h1, m1], [h2, m2]) => (h1 < h2 || (h1 === h2 && m1 < m2) ? -1 : 1));

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
              setFreeHours(sortTimes(freeSlots[selected].second).map(toTime));
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
      second: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    }).isRequired
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SelectSlot;
