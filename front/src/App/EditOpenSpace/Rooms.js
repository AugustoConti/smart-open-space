import React, { useState } from 'react';

import { Box, Button, TextInput } from 'grommet';
import PropTypes from 'prop-types';

import { AddIcon, TrashIcon } from '#shared/icons';
import RowBetween from '#shared/RowBetween';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';

const Rooms = ({ value, onChange }) => {
  const [textValue, setTextValue] = useState('');

  return (
    <Box pad="small">
      <RowBetween>
        <TextInput
          onChange={(event) => setTextValue(event.target.value)}
          placeholder="Nombre de sala"
          value={textValue}
        />
        <Button
          disabled={textValue.trim().length < 1}
          icon={<AddIcon />}
          onClick={() => {
            if (textValue.trim().length < 1) return;
            onChange({ target: { value: [...value, textValue.trim()] } });
            setTextValue('');
          }}
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
