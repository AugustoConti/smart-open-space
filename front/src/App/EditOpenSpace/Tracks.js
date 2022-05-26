import { Box, Button, Select, TextArea, TextInput } from 'grommet';
import { AddIcon, DownIcon, UpIcon } from '#shared/icons';
import React, { useState } from 'react';
import { Collapsible } from 'grommet';
import ListWithRemoveButton from '#shared/ListWithRemoveButton';

const Tracks = ({ value, onChange }) => {
  const [track, setTrack] = useState({ name: '', description: '', color: '' });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Button
        alignSelf="center"
        icon={isOpen ? <UpIcon /> : <DownIcon />}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Collapsible open={isOpen}>
        <Box justify="around" direction="column" height="medium">
          <TextInput
            onChange={(event) => setTrack({ ...track, name: event.target.value })}
            placeholder="Nombre de track"
            value={track.name}
          />
          <TextArea
            placeholder="Descripcion"
            value={track.description}
            onChange={(event) => setTrack({ ...track, description: event.target.value })}
          />
          <Select
            options={['small', 'medium', 'large']}
            value={track.color}
            onChange={({ option }) => setTrack({ ...track, color: option })}
          />
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
