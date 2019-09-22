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

import RowBetween from './shared/RowBetween';

import { post } from '../helpers/api/useFetch';

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
      <Box align="center" direction="row" pad="small">
        <Text>{value ? new Date(value).toLocaleDateString() : 'Elegir fecha'}</Text>
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
    <RowBetween>
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
    </RowBetween>
    <RangeSelector
      direction="horizontal"
      max={23}
      min={8}
      onChange={values => onChange({ value: values })}
      round="small"
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

const List = props => (
  <Box as="ul" margin={{ top: 'small', bottom: 'none' }} {...props} />
);

const ListItem = props => <RowBetween as="li" border="top" pad="xxsmall" {...props} />;

const RoomItem = ({ room, onRemove }) => (
  <ListItem>
    <Text alignSelf="center">{room}</Text>
    <Button icon={<FormTrash />} onClick={onRemove} />
  </ListItem>
);

RoomItem.propTypes = {
  onRemove: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
};

const Rooms = ({ value, onChange }) => {
  const [textValue, setTextValue] = useState('');

  return (
    <Box pad="small">
      <RowBetween>
        <TextInput
          onChange={event => setTextValue(event.target.value)}
          placeholder="nombre de sala"
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
      </RowBetween>
      <List>
        {value.map((room, index) => (
          <RoomItem
            // eslint-disable-next-line react/no-array-index-key
            key={`${room}-${index}`}
            room={room}
            onRemove={() => onChange({ value: value.filter((_, i) => i !== index) })}
          />
        ))}
      </List>
    </Box>
  );
};

Rooms.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const pad = n => (n < 10 ? '0' : '') + n;

const beforeYesterday = date =>
  new Date(date) < new Date(new Date().setDate(new Date().getDate() - 1));

const initialValues = {
  date: new Date().toLocaleDateString(),
  time: [10, 15],
  rooms: [],
};

const EditOpenSpace = ({ history }) => {
  const onSubmit = ({ value: { date, name, rooms, time } }) => {
    const [start, end] = time;
    post('/openSpace', {
      date: new Date(date),
      endTime: `${pad(end)}:00`,
      name,
      rooms: rooms.map(r => ({ name: r })),
      startTime: `${pad(start)}:00`,
    }).then(() => history.push('/'));
  };

  return (
    <>
      <Heading level={2}>Nuevo Open Space</Heading>
      <Form
        messages={{ invalid: 'Inválido', required: 'Obligatorio' }}
        onSubmit={onSubmit}
        value={initialValues}
      >
        <FormField label="Nombre" name="name" required />
        <FormField
          component={MyCalendar}
          label="Fecha"
          name="date"
          required
          validate={
            date => beforeYesterday(date) && 'Ingresa una fecha mayor o igual a hoy'
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <FormField component={TimeSelector} label="Horario" name="time" required />
        <FormField
          component={Rooms}
          label="Salas"
          name="rooms"
          required
          validate={rooms => rooms.length < 1 && 'Ingresa al menos una sala'}
        />
        <RowBetween margin={{ top: 'medium' }} justify="evenly">
          <Button label="Cancelar" onClick={history.goBack} />
          <Button label="Crear" primary type="submit" />
        </RowBetween>
      </Form>
    </>
  );
};

EditOpenSpace.propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func, push: PropTypes.func }).isRequired,
};

export default EditOpenSpace;