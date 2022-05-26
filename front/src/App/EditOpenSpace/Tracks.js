import { Box, Button, Select, TextArea, TextInput } from 'grommet';
import { AddIcon, CircleIcon, DownIcon, UpIcon } from '#shared/icons';
import React, { useState } from 'react';
import { Collapsible } from 'grommet';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';
import { TextAreaWithCharacterCounter } from '#shared/TextAreaWithCharacterCounter';
import RowBetween from '#shared/RowBetween';

const Tracks = ({ value, onChange }) => {
  const [track, setTrack] = useState({ name: '', description: '', color: 'brand' });
  const [isOpen, setIsOpen] = useState(false);
  const colors = ['brand', 'accent-1', 'accent-2'];

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
              onChange={(event) => setTrack({ ...track, name: event.target.value })}
              placeholder="Nombre de track"
              value={track.name}
            />
            <Select
              options={colors.map((color) => (
                <CircleIcon color={color} />
              ))}
              value={<CircleIcon color={track.color} />}
              onChange={({ option }) => setTrack({ ...track, color: option.props.color })}
            />
          </RowBetween>
          <Box>
            <TextAreaWithCharacterCounter
              placeholder="Descripcion"
              value={track.description}
              maxLength={500}
              onChange={(event) =>
                setTrack({ ...track, description: event.target.value })
              }
            />
          </Box>
        </Box>
        <Button
          alignSelf="end"
          icon={<AddIcon />}
          onClick={() => {
            if (track.name.trim().length < 1 && track.color.length < 1) return;
            onChange({ target: { value: [...value, track] } });
            setTrack({ name: '', description: '', color: '' });
          }}
        />
      </Collapsible>
      <ListWithRemoveButton
        items={value.map((track) => track.name)}
        onChange={onChange}
      />
    </Box>
  );
};

export default Tracks;
