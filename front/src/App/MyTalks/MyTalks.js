import React from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import { Box, Heading, Text, Button } from 'grommet';
import PropTypes from 'prop-types';

import { nextTalk, useGetMyTalks } from '#api/os-client';
import { useQueue } from '#api/sockets-client';
import { TalkIcon } from '#shared/icons';
import Detail from '#shared/Detail';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';
import MyProps from '#helpers/MyProps';
import Row from '#shared/Row';
import Spinner, { TinySpinner } from '#shared/Spinner';
import Title from '#shared/Title';

import EmptyTalk from './EmptyTalk';
import Talk from './Talk';

const slideDownAnimation = {
  type: 'slideDown',
  delay: 0,
  duration: 1000,
  size: 'large',
};

const EnqueuedTalkCard = ({ bgColor, children }) => (
  <Row justify="center" margin={{ bottom: 'large' }}>
    <Box
      align="center"
      animation={slideDownAnimation}
      background={bgColor}
      elevation="medium"
      gap="medium"
      margin="none"
      pad="medium"
      round
    >
      {children}
    </Box>
  </Row>
);
EnqueuedTalkCard.propTypes = {
  bgColor: PropTypes.string.isRequired,
  children: MyProps.children.isRequired,
};

const MyEnqueuedTalk = ({ description, onFinish, place, title }) => {
  return place === 0 ? (
    <EnqueuedTalkCard bgColor="accent-1">
      <Heading margin={{ horizontal: 'medium', vertical: 'none' }}>PASÁ!!</Heading>
      <>
        <Title>{title}</Title>
        <Detail color="dark-2" text={description} truncate />
      </>
      <Button color="status-critical" label="Terminé" onClick={onFinish} primary />
    </EnqueuedTalkCard>
  ) : (
    <EnqueuedTalkCard bgColor="accent-4">
      <Text margin={{ horizontal: 'small', vertical: 'none' }} weight="bold">
        ESPERANDO TURNO
      </Text>
      <>
        Queda
        {place !== 1 && 'n'}
        <Heading margin="none">{place}</Heading>
        {place === 1 && (
          <Text margin={{ horizontal: 'small', vertical: 'none' }} weight="bold">
            Sos el siguiente!!
          </Text>
        )}
      </>
      <>
        <Title>{title}</Title>
        <Detail color="dark-2" text={description} truncate />
      </>
    </EnqueuedTalkCard>
  );
};
MyEnqueuedTalk.propTypes = {
  description: PropTypes.string,
  onFinish: PropTypes.func.isRequired,
  place: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const MyTalks = () => {
  const { id } = useParams();
  const history = useHistory();
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
            <MyEnqueuedTalk
              description={myEnqueuedTalk().description}
              onFinish={() => nextTalk(id)}
              place={place()}
              title={myEnqueuedTalk().name}
            />
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

export default MyTalks;
