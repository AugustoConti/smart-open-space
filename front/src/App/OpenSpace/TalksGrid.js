import React from 'react';

import PropTypes from 'prop-types';

import { useGetTalks } from '#helpers/api/os-client';
import MyGrid from '#shared/MyGrid';

import Talk from './Talk';

const TalksGrid = ({ id }) => {
  const [talks] = useGetTalks(id);
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
