import React, { useState } from 'react';

import { Box } from 'grommet';
import PropTypes from 'prop-types';
import RowBetween from '#shared/RowBetween';
import { PlusButton } from '#shared/PlusButton';
import MyCalendar from './MyCalendar';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';

const Dates = ({ value, onChange }) => {
  const initialValue = { date: '' };
  const [date, setDate] = useState(initialValue);
  const isDateEmpty = date.date.trim().length < 1;
  const isDateIncluded = value.some((eachDate) => eachDate.date === date.date);
  return (
    <Box pad="small">
      <RowBetween>
        <MyCalendar
          onChange={(event) => setDate({ date: event.target.value })}
          placeholder="Fechas del Open Space"
          value={date.date}
        />
        <PlusButton
          conditionToDisable={isDateEmpty || isDateIncluded}
          item={date}
          setItem={setDate}
          value={value}
          initialItem={initialValue}
          onChange={onChange}
        />
      </RowBetween>
      <ListWithRemoveButton
        items={value}
        onChange={onChange}
        displayName={(item) => new Date(item.date).toLocaleDateString('es')}
      />
    </Box>
  );
};
Dates.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Dates;
