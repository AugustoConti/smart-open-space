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

const List = props => (
  <Box as="ul" margin={{ top: 'small', bottom: 'none' }} {...props} />
);

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
      </Box>
      <List>
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

const BoxCenter = ({ children }) => {
  return (
    <Box align="center" margin={{ bottom: 'medium', horizontal: 'medium' }}>
      <Box width="medium">{children}</Box>
    </Box>
  );
};

BoxCenter.propTypes = { children: PropTypes.node.isRequired };

const pad = n => (n < 10 ? '0' : '') + n;

const beforeYesterday = date =>
  new Date(date) < new Date(new Date().setDate(new Date().getDate() - 1));

const initialValues = {
  date: new Date().toLocaleDateString(),
  time: [10, 15],
  rooms: [],
};

const EditOpenSpace = ({ history }) => {
  const post = usePost('', () => history.push('/'));

  const onSubmit = ({ value }) => {
    const [start, end] = value.time;
    post({
      body: {
        date: new Date(value.date),
        endTime: `${pad(end)}:00`,
        name: value.name,
        rooms: value.rooms.map(r => ({ name: r })),
        startTime: `${pad(start)}:00`,
      },
    });
  };

  return (
    <>
      <Header />
      <BoxCenter>
        <Heading level={2}>Nuevo Open Space</Heading>
        <Form
          messages={{ invalid: 'inválido', required: 'requerido' }}
          onSubmit={onSubmit}
          value={initialValues}
        >
          <FormField label="Nombre" name="name" required />
          <FormField
            component={MyCalendar}
            label="Fecha"
            name="date"
            required
            validate={date => beforeYesterday(date) && 'debe ser mayor o igual a hoy'}
          />
          <FormField component={TimeSelector} label="Horario" name="time" required />
          <FormField
            component={Rooms}
            label="Salas"
            name="rooms"
            required
            validate={rooms => rooms.length < 1 && 'se requiere al menos una sala'}
          />
          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button label="Cancelar" onClick={history.goBack} />
            <Button label="Crear" primary type="submit" />
          </Box>
        </Form>
      </BoxCenter>
    </>
  );
};

EditOpenSpace.propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func, push: PropTypes.func }).isRequired,
};

export default EditOpenSpace;
