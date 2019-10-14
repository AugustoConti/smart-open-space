import React from 'react';
import { Redirect } from 'react-router-dom';

import { useGetMyTalks } from '#helpers/api/os-client';
import MyProps from '#helpers/MyProps';
import { TalkIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';
import Spinner from '#shared/Spinner';

import EmptyTalk from './EmptyTalk';
import Talk from './Talk';

const MyTalks = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const { data: [os, slots, talks] = [], isPending, isRejected } = useGetMyTalks(id);

  if (isRejected) return <Redirect to="/" />;

  const toOS = () => history.push(`/os/${id}`);
  const onNew = () => history.push(`/newTalk/${id}`);
  const isAssigned = idTalk => !!slots.find(s => s.talk.id === idTalk);

  return (
    <>
      <MainHeader>
        <MainHeader.TitleLink onClick={toOS}>
          {isPending ? <Spinner center={false} size="medium" /> : os.name}
        </MainHeader.TitleLink>
        <MainHeader.SubTitle icon={TalkIcon} label="MIS CHARLAS" />
        {talks && talks.length > 0 && (
          <MainHeader.ButtonNew label="Charla" onClick={onNew} />
        )}
      </MainHeader>
      {isPending ? (
        <Spinner />
      ) : talks.length === 0 ? (
        <EmptyTalk onClick={onNew} />
      ) : (
        <MyGrid>
          {talks.map(talk => (
            <Talk
              activeQueue={os.activeQueue}
              assigned={isAssigned(talk.id)}
              freeSlots={os.freeSlots}
              key={talk.id}
              onSchedule={toOS}
              {...talk}
            />
          ))}
        </MyGrid>
      )}
    </>
  );
};
MyTalks.propTypes = { match: MyProps.match, history: MyProps.history };

export default MyTalks;
