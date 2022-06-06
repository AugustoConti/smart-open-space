import RowBetween from '#shared/RowBetween';
import { Button } from 'grommet';
import { voteTalk } from '#api/os-client';
import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '#helpers/useAuth';
import { PlusHeartIcon } from '#shared/PlusHeartIcon';
import Detail from '#shared/Detail';

export const Vote = ({ talk: { id, votingUsers, votes }, reloadTalks }) => {
  const currentUser = useUser();
  const isCurrentUser = (user) => user.id === currentUser.id;
  const alreadyVotedByTheCurrentUser = votingUsers.some((user) => isCurrentUser(user));

  return (
    <RowBetween alignSelf="end">
      {!alreadyVotedByTheCurrentUser && (
        <Button
          icon={<PlusHeartIcon />}
          onClick={() => voteTalk(id).then(() => reloadTalks())}
        />
      )}
      <Detail>{votes} votos</Detail>
    </RowBetween>
  );
};

Vote.propTypes = {
  votes: PropTypes.any,
  alreadyVotedByTheCurrentUser: PropTypes.any,
  onClick: PropTypes.func,
};
