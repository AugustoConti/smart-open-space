import React, { useState } from 'react';

import { Box, TextInput } from 'grommet';
import PropTypes from 'prop-types';
import RowBetween from '#shared/RowBetween';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';
import { PlusButton } from '#shared/PlusButton';

const Rooms = ({ value, onChange }) => {
  const initialValue = { name: '' };
  const [room, setRoom] = useState(initialValue);
  const hasNoRoomName = room.name.trim().length < 1;

  return (
    <Box pad="small">
      <RowBetween>
        <TextInput
          onChange={(event) => setRoom({ name: event.target.value })}
          placeholder="Nombre de sala"
          value={room.name}
        />
        <PlusButton
          conditionToAdd={hasNoRoomName}
          item={room}
          setItem={setRoom}
          value={value}
          initialItem={initialValue}
          onChange={onChange}
        />
      </RowBetween>
      <ListWithRemoveButton items={value} onChange={onChange} />
    </Box>
  );
};
Rooms.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Rooms;
