import React from 'react';
import MyGrid from '#shared/MyGrid';
import Talk from './Talk';
import { Vote } from './Vote';

const TalksGrid = ({ talks, reloadTalks }) => {
  return (
    <MyGrid>
      {talks.map((talk) => (
        <Talk key={talk.id} talk={talk}>
          <Vote talk={talk} reloadTalks={reloadTalks} />
        </Talk>
      ))}
    </MyGrid>
  );
};

export default TalksGrid;
