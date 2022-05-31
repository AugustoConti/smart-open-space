import { Button } from 'grommet';
import { AddIcon } from '#shared/icons';
import React from 'react';

export const PlusButton = ({
  conditionToAdd,
  onChange,
  value,
  item,
  initialItem,
  setItem,
  ...props
}) => {
  return (
    <Button
      icon={<AddIcon />}
      disabled={conditionToAdd}
      onClick={() => {
        if (conditionToAdd) return;
        onChange({ target: { value: [...value, item] } });
        setItem(initialItem);
      }}
      {...props}
    />
  );
};
