import React, { useState } from 'react';

import { Box, Button, TextInput } from 'grommet';
import PropTypes from 'prop-types';
import RowBetween from '#shared/RowBetween';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';
import { PlusButton } from '#shared/PlusButton';

const Rooms = ({ value, onChange }) => {
  const [textValue, setTextValue] = useState('');
  const hasRoomName = textValue.trim().length < 1;

  return (
    <Box pad="small">
      <RowBetween>
        <TextInput
          onChange={(event) => setTextValue(event.target.value)}
          placeholder="Nombre de sala"
          value={textValue}
        />
        <PlusButton
          conditionToAdd={hasRoomName}
          item={textValue.trim()}
          setItem={setTextValue}
          value={value}
          initialItem={''}
          onChange={onChange}
        />
      </RowBetween>
      <ListWithRemoveButton
        items={value.map((room) => ({ name: room }))}
        onChange={onChange}
      />
    </Box>
  );
};
Rooms.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Rooms;
