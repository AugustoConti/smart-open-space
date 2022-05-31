import { Select } from 'grommet';
import { CircleIcon } from '#shared/icons';
import React from 'react';

export const ColorPicker = ({ colors, setColor, initialColor }) => {
  return (
    <Select
      options={colors.map((color) => (
        <CircleIcon color={color} />
      ))}
      value={<CircleIcon size="43px" color={initialColor} />}
      onChange={({ option }) => setColor(option.props.color)}
    />
  );
};
