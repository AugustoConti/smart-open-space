import React from 'react';
import { Redirect } from 'react-router-dom';

import { Box, Heading, Text, Button } from 'grommet';
import PropTypes from 'prop-types';

import { useGetMyTalks } from '#api/os-client';
import { useQueue } from '#api/sockets-client';
import MyProps from '#helpers/MyProps';
import { TalkIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';
import Spinner, { TinySpinner } from '#shared/Spinner';
import Row from '#shared/Row';
import Title from '#shared/Title';

import EmptyTalk from './EmptyTalk';
import Talk from './Talk';

const MyEnqueuedTalk = ({ place, title }) =>
  place === 0 ? (
    <Row justify="center" margin={{ bottom: 'large' }}>
      <Box
        align="center"
        animation={{
          type: 'slideDown',
          delay: 0,
          duration: 1000,
          size: 'large',
        }}
        background="accent-1"
        elevation="medium"
        gap="small"
        margin="none"
        pad="medium"
        round
      >
        <Heading margin="none">PASÁ!!</Heading>
        <Title>{title}</Title>
        <Button color="status-critical" label="Terminé" primary />
      </Box>
    </Row>
  ) : (
    <Row justify="center" margin={{ bottom: 'large' }}>
      <Box
        align="center"
        background="accent-1"
        elevation="medium"
        gap="small"
        margin="none"
        pad="medium"
        round
      >
        <Text weight="bold">ESPERANDO TURNO</Text>
        <>
          Queda
          {place !== 1 && 'n'}
          <Heading margin="none">{place}</Heading>
        </>
        <Title>{title}</Title>
      </Box>
    </Row>
  );
MyEnqueuedTalk.propTypes = {
  place: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const MyTalks = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const {
    data: [os, slots, talks = []] = [],
    isPending,
    isRejected,
    reload,
  } = useGetMyTalks(id);
  const queue = useQueue(id, reload);

  if (isRejected) return <Redirect to="/" />;

  const toOS = () => history.push(`/os/${id}`);
  const onNew = () => history.push(`/newTalk/${id}`);
  const isAssigned = idTalk => slots.some(s => s.talk.id === idTalk);
  const isEnqueue = idTalk => queue.some(t => t.id === idTalk);
  const isMyTalk = talk => talks.some(t => t.id === talk.id);
  const myEnqueuedTalk = () => queue.find(isMyTalk);
  const hasAnother = idTalk => !!myEnqueuedTalk() && myEnqueuedTalk().id !== idTalk;
  const place = () => queue.findIndex(isMyTalk);
  const isToSchedule = idTalk => os.toSchedule.some(t => t.id === idTalk);

  console.log(os, slots, talks, queue, isPending, isRejected);

  return (
    <>
      <MainHeader>
        <MainHeader.TitleLink onClick={toOS}>
          {!os ? <TinySpinner /> : os.name}
        </MainHeader.TitleLink>
        <MainHeader.SubTitle icon={TalkIcon} label="MIS CHARLAS" />
        {talks.length > 0 && <MainHeader.ButtonNew label="Charla" onClick={onNew} />}
      </MainHeader>
      {!queue || (talks.length === 0 && isPending) ? (
        <Spinner />
      ) : talks.length === 0 ? (
        <EmptyTalk onClick={onNew} />
      ) : (
        <>
          {queue.length > 0 && myEnqueuedTalk() && (
            <MyEnqueuedTalk place={place()} title={myEnqueuedTalk().name} />
          )}
          <MyGrid>
            {talks.map(talk => (
              <Talk
                activeQueue={os.activeQueue}
                assigned={isAssigned(talk.id)}
                enqueued={isEnqueue(talk.id)}
                freeSlots={os.freeSlots}
                hasAnother={hasAnother(talk.id)}
                key={talk.id}
                onEnqueue={reload}
                onSchedule={toOS}
                toSchedule={isToSchedule(talk.id)}
                {...talk}
              />
            ))}
          </MyGrid>
        </>
      )}
    </>
  );
};
MyTalks.propTypes = { match: MyProps.match, history: MyProps.history };

export default MyTalks;
