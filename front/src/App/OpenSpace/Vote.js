import RowBetween from '#shared/RowBetween';
import { Button } from 'grommet';
import { VoteIcon } from '#shared/icons';
import { voteTalk } from '#api/os-client';
import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '#helpers/useAuth';

export const Vote = ({ talk: { id, votingUsers, votes }, reloadTalks }) => {
  const currentUser = useUser();
  const isCurrentUser = (user) => user.id === currentUser.id;
  const alreadyVotedByTheCurrentUser = votingUsers.some((user) => isCurrentUser(user));

  return (
    <RowBetween alignSelf="end">
      {votes}
      {!alreadyVotedByTheCurrentUser && (
        <Button
          icon={<VoteIcon color="#d22809" />}
          onClick={() => voteTalk(id).then(() => reloadTalks())}
        />
      )}
    </RowBetween>
  );
};

Vote.propTypes = {
  votes: PropTypes.any,
  alreadyVotedByTheCurrentUser: PropTypes.any,
  onClick: PropTypes.func,
};
