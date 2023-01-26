import React, { useState } from 'react';

import { DownIcon, UpIcon } from '#shared/icons';
import { Box, TextInput, Button, Collapsible } from 'grommet';
import PropTypes from 'prop-types';
import RowBetween from '#shared/RowBetween';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';
import { PlusButton } from '#shared/PlusButton';
import MyForm from '#shared/MyForm';

const Rooms = ({ value, onChange }) => {
  const initialValue = { name: '', link: '' };
  const [room, setRoom] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const hasNoRoomName = room.name.trim().length < 1;

  return (
    <Box>
      <Button
        alignSelf="center"
        icon={isOpen ? <UpIcon /> : <DownIcon />}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Collapsible open={isOpen}>
        <Box justify="around" direction="column" height="small">
          <RowBetween>
            <TextInput
              onChange={(event) => setRoom({ ...room, name: event.target.value })}
              placeholder="Nombre de sala"
              value={room.name}
            />
          </RowBetween>
          <Box>
            <MyForm.Link
              label="Link"
              placeholder="Link a la sala virtual (meet/zoom)"
              value={room.link}
            />
          </Box>
        </Box>
        <PlusButton
          conditionToDisable={hasNoRoomName}
          onChange={onChange}
          value={value}
          item={room}
          initialItem={initialValue}
          setItem={setRoom}
          alignSelf="end"
        />
      </Collapsible>
      <ListWithRemoveButton items={value} onChange={onChange} />
    </Box>
  );
};
Rooms.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Rooms;
