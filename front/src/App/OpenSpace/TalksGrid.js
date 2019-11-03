import React from 'react';

import { useGetTalks } from '#api/os-client';
import MyGrid from '#shared/MyGrid';
import Spinner from '#shared/Spinner';
import onlineOrganizerImg from '#assets/online_organizer.svg';
import EmptyData from '#shared/EmptyData';

import Talk from './Talk';

const EmptyOpenSpace = () => (
  <EmptyData img={onlineOrganizerImg} text="Cargá la primer charla de este Open Space!" />
);

const TalksGrid = () => {
  const { data: talks, isPending, isRejected } = useGetTalks();
  if (isPending) return <Spinner />;
  if (isRejected) return <></>;
  return talks.length === 0 ? (
    <EmptyOpenSpace />
  ) : (
    <MyGrid>
      {talks.map(talk => (
        <Talk key={talk.id} talk={talk} />
      ))}
    </MyGrid>
  );
};

export default TalksGrid;
