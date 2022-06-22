import { Box, Button, Collapsible, TextInput } from 'grommet';
import { DownIcon, UpIcon } from '#shared/icons';
import React, { useState } from 'react';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';
import { TextAreaWithCharacterCounter } from '#shared/TextAreaWithCharacterCounter';
import RowBetween from '#shared/RowBetween';
import { PlusButton } from '#shared/PlusButton';
import { ColorPicker } from '#shared/ColorPicker';

const Tracks = ({ value, onChange }) => {
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
  let initialTrack = { name: '', description: '', color: colors[0] };
  const [track, setTrack] = useState(initialTrack);
  const [isOpen, setIsOpen] = useState(false);
  const hasNoTrackName = track.name.trim().length < 1;

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
            <ColorPicker
              colors={colors}
              initialColor={track.color}
              setColor={(color) => setTrack({ ...track, color: color })}
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
        <PlusButton
          conditionToDisable={hasNoTrackName}
          onChange={onChange}
          value={value}
          item={track}
          initialItem={initialTrack}
          setItem={setTrack}
          alignSelf="end"
        />
      </Collapsible>
      <ListWithRemoveButton items={value} onChange={onChange} />
    </Box>
  );
};

export default Tracks;
