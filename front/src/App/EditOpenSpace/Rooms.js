import React, { useState } from 'react';

import { Box, Button, TextInput } from 'grommet';
import PropTypes from 'prop-types';

import { AddIcon, TrashIcon } from '#shared/icons';
import RowBetween from '#shared/RowBetween';

const List = props => (
  <Box as="ul" margin={{ top: 'small', bottom: 'none' }} {...props} />
);

const ListItem = props => <RowBetween as="li" border="top" pad="xxsmall" {...props} />;

const RoomItem = ({ room, onRemove }) => (
  <ListItem>
    {room}
    <Button icon={<TrashIcon />} onClick={onRemove} />
  </ListItem>
);
RoomItem.propTypes = {
  onRemove: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
};

const Rooms = ({ value, onChange }) => {
  const [textValue, setTextValue] = useState('');

  return (
    <Box pad="small">
      <RowBetween>
        <TextInput
          onChange={event => setTextValue(event.target.value)}
          placeholder="Nombre de sala"
          value={textValue}
        />
        <Button
          icon={<AddIcon />}
          onClick={() => {
            if (!textValue) return;
            onChange({ value: [...value, textValue] });
            setTextValue('');
          }}
        />
      </RowBetween>
      <List>
        {value.map((room, index) => (
          <RoomItem
            // eslint-disable-next-line react/no-array-index-key
            key={`${room}-${index}`}
            room={room}
            onRemove={() => onChange({ value: value.filter((_, i) => i !== index) })}
          />
        ))}
      </List>
    </Box>
  );
};
Rooms.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Rooms;
