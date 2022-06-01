import React, { useState } from 'react';

import { Box, Button, TextInput } from 'grommet';
import PropTypes from 'prop-types';
import RowBetween from '#shared/RowBetween';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';
import { PlusButton } from '#shared/PlusButton';

const Rooms = ({ value, onChange }) => {
  const [room, setRoom] = useState({ name: '' });
  const hasRoomName = room.name.trim().length < 1;

  return (
    <Box pad="small">
      <RowBetween>
        <TextInput
          onChange={(event) => setRoom({ name: event.target.value })}
          placeholder="Nombre de sala"
          value={room.name}
        />
        <PlusButton
          conditionToAdd={hasRoomName}
          item={room}
          setItem={setRoom}
          value={value}
          initialItem={{ name: '' }}
          onChange={onChange}
        />
      </RowBetween>
      <ListWithRemoveButton items={value} onChange={onChange} />
    </Box>
  );
};
Rooms.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Rooms;
