import React, { useState } from 'react';

import { Box } from 'grommet';
import PropTypes from 'prop-types';
import RowBetween from '#shared/RowBetween';
import { PlusButton } from '#shared/PlusButton';
import MyCalendar from './MyCalendar';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';

const Dates = ({ value, onChange }) => {
  const initialDate = '';
  const [date, setDate] = useState(initialDate);
  const isDateEmpty = date.trim().length < 1;
  const isDateIncluded = value.some((eachDate) => eachDate === date);
  return (
    <Box pad="small">
      <RowBetween>
        <MyCalendar
          onChange={(event) => setDate(event.target.value)}
          placeholder="Fechas del Open Space"
          value={date}
        />
        <PlusButton
          conditionToDisable={isDateEmpty || isDateIncluded}
          item={new Date(date)}
          setItem={setDate}
          value={value}
          initialItem={date}
          onChange={onChange}
        />
      </RowBetween>
      <ListWithRemoveButton
        items={value}
        onChange={onChange}
        displayName={(item) => new Date(item).toLocaleDateString('es')}
      />
    </Box>
  );
};
Dates.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Dates;
