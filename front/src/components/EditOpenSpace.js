import React, { useState } from 'react';

import {
  Box,
  Button,
  Calendar,
  DropButton,
  Form,
  FormField,
  Heading,
  RangeSelector,
  Stack,
  Text,
  TextInput,
} from 'grommet';
import { Add, FormDown, FormTrash } from 'grommet-icons';
import PropTypes from 'prop-types';

import Header from './shared/Header';
import { usePost } from '../helpers/api/useFetch';

const MyCalendar = ({ onChange, value, ...props }) => {
  const [open, setOpen] = useState(false);

  const onSelect = nextDate => {
    onChange({ value: nextDate });
    setOpen(false);
  };

  return (
    <DropButton
      dropContent={<Calendar date={value} onSelect={onSelect} size="small" {...props} />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Box align="center" direction="row" gap="medium" pad="small">
        <Text>{value ? new Date(value).toLocaleDateString() : 'Select date'}</Text>
        <FormDown />
      </Box>
    </DropButton>
  );
};

MyCalendar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const TimeSelector = ({ onChange, value, ...props }) => (
  <Stack>
    <Box direction="row" justify="between">
      {[...Array(16)].map((_, v) => (
        <Box
          align="center"
          border={false}
          height="xxsmall"
          // eslint-disable-next-line react/no-array-index-key
          key={v}
          pad="small"
          width="xxsmall"
        >
          <Text>{v + 8}</Text>
        </Box>
      ))}
    </Box>
    <RangeSelector
      direction="horizontal"
      max={23}
      min={8}
      onChange={values => onChange({ value: values })}
      size="full"
      values={value}
      {...props}
    />
  </Stack>
);

TimeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const List = props => <Box as="ul" {...props} />;

const ListItem = props => (
  <Box as="li" border="top" direction="row" justify="between" pad="xxsmall" {...props} />
);

const Rooms = ({ value, onChange }) => {
  const [textValue, setTextValue] = useState('');

  return (
    <Box pad="small">
      <Box direction="row" justify="between">
        <TextInput
          onChange={event => setTextValue(event.target.value)}
          placeholder="room name"
          value={textValue}
        />
        <Button
          icon={<Add />}
          onClick={() => {
            if (!textValue) return;
            onChange({ value: [...value, textValue] });
            setTextValue('');
          }}
        />
      </Box>
      <List margin={{ top: 'small', bottom: 'none' }}>
        {value.map((room, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={`${room}-${index}`} index={index}>
            <Text alignSelf="center">{room}</Text>
            <Button
              icon={<FormTrash />}
              onClick={() => onChange({ value: value.filter((_, i) => i !== index) })}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

Rooms.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const EditOpenSpace = ({ history }) => {
  const post = usePost('', () => history.push('/'));

  const initialValues = {
    date: new Date().toLocaleDateString(),
    time: [10, 15],
    rooms: [],
  };

  const onSubmit = ({ value }) => {
    const [start, end] = value.time;
    post({
      body: {
        date: new Date(value.date),
        endTime: `${end}:00`,
        name: value.name,
        rooms: value.rooms.map(r => ({ name: r })),
        startTime: `${start}:00`,
      },
    });
  };

  return (
    <>
      <Header />
      <Box align="center" margin={{ bottom: 'medium', horizontal: 'medium' }}>
        <Box width="medium">
          <Heading level={2}>New Open Space</Heading>
          <Form onSubmit={onSubmit} value={initialValues}>
            <FormField label="Name" name="name" required />
            <FormField component={MyCalendar} label="Date" name="date" required />
            <FormField component={TimeSelector} label="Time" name="time" required />
            <FormField component={Rooms} label="Rooms" name="rooms" required />
            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button label="Cancel" onClick={() => history.goBack()} />
              <Button label="Create" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </>
  );
};

EditOpenSpace.propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func, push: PropTypes.func }).isRequired,
};

export default EditOpenSpace;
