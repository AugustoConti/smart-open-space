import React, { useCallback } from 'react';

import { useGetTalks } from '#api/os-client';
import { RedirectToRoot } from '#helpers/routes';
import MyGrid from '#shared/MyGrid';
import Spinner from '#shared/Spinner';
import Talk from './Talk';
import { Vote } from './Vote';

const noCriteria = () => true;

const TalksGrid = ({ filterBy = noCriteria }) => {
  const { data: talks, isPending, isRejected, reload: reloadTalks } = useGetTalks();
  const reload = useCallback(() => {
    reloadTalks();
  }, [reloadTalks]);
  if (isPending) return <Spinner />;
  if (isRejected) return <RedirectToRoot />;

  return (
    <MyGrid>
      {talks.filter(filterBy).map((talk) => (
        <Talk key={talk.id} talk={talk} >
          <Vote talk={talk} reloadTalks={reload} />
        </Talk>
      ))}
    </MyGrid>
  );
};

export default TalksGrid;
