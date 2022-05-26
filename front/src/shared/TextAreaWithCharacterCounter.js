import { Text, TextArea } from 'grommet';
import React from 'react';

function CharacterCounter({ value, maxLength }) {
  return (
    <Text alignSelf={'end'} color={'#777777'}>
      {value.length}/{maxLength}
    </Text>
  );
}

export const TextAreaWithCharacterCounter = ({ ...props }) => {
  return (
    <>
      <TextArea {...props} />
      <CharacterCounter value={props.value} maxLength={props.maxLength} />
    </>
  );
};
