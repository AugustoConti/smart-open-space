import React from 'react';

import PropTypes from 'prop-types';

import { useGetTalks } from '#helpers/api/os-client';
import MyGrid from '#shared/MyGrid';
import Spinner from '#shared/Spinner';

import Talk from './Talk';

const TalksGrid = ({ id }) => {
  const { data: talks, isPending, isRejected } = useGetTalks(id);
  if (isPending) return <Spinner />;
  if (isRejected) return <></>;
  return (
    <MyGrid>
      {talks.map(talk => (
        <Talk key={talk.id} talk={talk} />
      ))}
    </MyGrid>
  );
};
TalksGrid.propTypes = { id: PropTypes.string.isRequired };

export default TalksGrid;
