import React, { useState } from 'react';

import {
  Box,
  Button,
  Calendar,
  DropButton,
  RangeSelector,
  Stack,
  TextInput,
} from 'grommet';
import PropTypes from 'prop-types';

import { createOS } from '#helpers/api/os-client';
import {
  AddIcon,
  CalendarIcon,
  ClockIcon,
  DownIcon,
  HomeIcon,
  OpenSpaceIcon,
  TrashIcon,
} from '#shared/icons';
import MyProps from '#helpers/MyProps';
import MainHeader from '#shared/MainHeader';
import MyForm from '#shared/MyForm';
import Row from '#shared/Row';
import RowBetween from '#shared/RowBetween';

const MyCalendar = ({ onChange, value, ...props }) => {
  const [open, setOpen] = useState(false);

  const onSelect = nextDate => {
    onChange({ value: nextDate });
    setOpen(false);
  };

  return (
    <DropButton
      dropContent={<Calendar date={value} onSelect={onSelect} {...props} />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Row pad="small">
        {value ? new Date(value).toLocaleDateString() : 'Elegir fecha'}
        <DownIcon />
      </Row>
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
          {v + 8}
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
    {room}
    <Button icon={<TrashIcon />} onClick={onRemove} />
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
          placeholder="Nombre de sala"
          value={textValue}
        />
        <Button
          icon={<AddIcon />}
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

const beforeToday = date =>
  new Date(date) < new Date(new Date().setDate(new Date().getDate() - 1));

const initialValues = {
  date: new Date().toLocaleDateString(),
  time: [10, 15],
  rooms: [],
};

const EditOpenSpace = ({ history }) => {
  const onSubmit = ({
    value: {
      date,
      name,
      rooms,
      time: [start, end],
    },
  }) => {
    createOS({
      date: new Date(date),
      endTime: `${pad(end)}:00`,
      name,
      rooms: rooms.map(r => ({ name: r })),
      startTime: `${pad(start)}:00`,
    }).then(() => history.push('/'));
  };

  return (
    <>
      <MainHeader>
        <MainHeader.Title icon={OpenSpaceIcon} label="Nuevo Open Space" />
      </MainHeader>
      <MyForm onSecondary={history.goBack} onSubmit={onSubmit} value={initialValues}>
        <MyForm.Text placeholder="¿Como se va a llamar?" />
        <MyForm.Field
          component={MyCalendar}
          icon={<CalendarIcon />}
          label="Fecha"
          name="date"
          validate={date => beforeToday(date) && 'Ingresa una fecha mayor o igual a hoy'}
        />
        <MyForm.Field
          component={TimeSelector}
          icon={<ClockIcon />}
          label="Horario"
          name="time"
        />
        <MyForm.Field
          component={Rooms}
          icon={<HomeIcon />}
          label="Salas"
          name="rooms"
          validate={rooms => rooms.length < 1 && 'Ingresa al menos una sala'}
        />
      </MyForm>
    </>
  );
};
EditOpenSpace.propTypes = { history: MyProps.history };

export default EditOpenSpace;
