import React from 'react';
import { useHistory } from 'react-router-dom';

import { createOS } from '#api/os-client';
import { CalendarIcon, ClockIcon, HomeIcon, OpenSpaceIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyForm from '#shared/MyForm';
import { usePushToRoot } from '#helpers/routes';

import MyCalendar from './MyCalendar';
import Rooms from './Rooms';
import TimeSelector from './TimeSelector';

const pad = n => (n < 10 ? '0' : '') + n;

const beforeToday = date =>
  new Date(date) < new Date(new Date().setDate(new Date().getDate() - 1));

const initialValues = {
  date: new Date().toLocaleDateString(),
  time: [10, 15],
  rooms: [],
};

const EditOpenSpace = () => {
  const history = useHistory();
  const pushToRoot = usePushToRoot();

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
    }).then(pushToRoot);
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

export default EditOpenSpace;
