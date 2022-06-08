import { Heading } from 'grommet';
import TalksGrid from './TalksGrid';
import React from 'react';
import * as PropTypes from 'prop-types';

export function TrackWithTalks({ talks, reloadTalks, track }) {
  const filteredTalks = talks.filter((talk) => talk.track.id === track.id);
  return (
    <>
      {filteredTalks.length > 0 && (
        <>
          <Heading color={track.color}> {track.name} </Heading>
          <TalksGrid talks={filteredTalks} reloadTalks={reloadTalks} />
        </>
      )}
    </>
  );
}

TrackWithTalks.propTypes = {
  track: PropTypes.object.isRequired,
};
