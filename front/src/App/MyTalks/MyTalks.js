import React from 'react';

import { useGetTalksByUser, useGetOS, useGetSlots } from '#helpers/api/os-client';
import MyProps from '#helpers/MyProps';
import { TalkIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';

import EmptyTalk from './EmptyTalk';
import Talk from './Talk';

const MyTalks = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [{ activeQueue, freeSlots, name }] = useGetOS(id);
  const [slots] = useGetSlots(id);
  const [talks] = useGetTalksByUser(id);

  const toOS = () => history.push(`/os/${id}`);
  const onNew = () => history.push(`/newTalk/${id}`);
  const isAssigned = idTalk => !!slots.find(s => s.talk.id === idTalk);

  return (
    <>
      <MainHeader>
        <MainHeader.TitleLink label={name} onClick={toOS} />
        <MainHeader.SubTitle icon={TalkIcon} label="MIS CHARLAS" />
        {talks.length > 0 && <MainHeader.ButtonNew label="Charla" onClick={onNew} />}
      </MainHeader>
      {talks.length === 0 ? (
        <EmptyTalk onClick={onNew} />
      ) : (
        <MyGrid>
          {talks.map(talk => (
            <Talk
              activeQueue={activeQueue}
              assigned={isAssigned(talk.id)}
              freeSlots={freeSlots}
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
