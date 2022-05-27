import { Box, Button, Select, TextArea, TextInput } from 'grommet';
import { AddIcon, CircleIcon, DownIcon, UpIcon } from '#shared/icons';
import React, { useState } from 'react';
import { Collapsible } from 'grommet';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';
import { TextAreaWithCharacterCounter } from '#shared/TextAreaWithCharacterCounter';
import RowBetween from '#shared/RowBetween';

const Tracks = ({ value, onChange }) => {
  const [track, setTrack] = useState({ name: '', description: '', color: '#ddaecc' });
  const [isOpen, setIsOpen] = useState(false);
  const colors = [
    '#ddaecc',
    '#88d2f2',
    '#d0c9e1',
    '#fab29e',
    '#fbf7b8',
    '#a2d0b7',
    '#aea3c9',
    '#93b7dc',
    '#c1867b',
    '#e2edd4',
  ];
  const hasNotTrackName = track.name.trim().length < 1;

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
              value={<CircleIcon size="43px" color={track.color} />}
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
          disabled={hasNotTrackName}
          onClick={() => {
            if (hasNotTrackName) return;
            onChange({ target: { value: [...value, track] } });
            setTrack({ name: '', description: '', color: '#ddaecc' });
          }}
        />
      </Collapsible>
      <ListWithRemoveButton
        items={value.map((track) => ({ name: track.name, color: track.color }))}
        onChange={onChange}
      />
    </Box>
  );
};

export default Tracks;
