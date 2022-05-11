import { Text, TextArea } from 'grommet';
import React from 'react';

export const TextAreaWithCounter = (props) => {
  return (
    <>
      <TextArea {...props.props} />
      <Text alignSelf={'end'} color={'#777777'}>
        {props.props.value.length}/{props.props.maxLength}
      </Text>
    </>
  );
};
