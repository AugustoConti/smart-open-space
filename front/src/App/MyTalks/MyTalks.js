import React from 'react';

import { Box, Heading, Text } from 'grommet';
import PropTypes from 'prop-types';

import { nextTalk, useGetMyTalks } from '#api/os-client';
import { useQueue } from '#api/sockets-client';
import { TalkIcon } from '#shared/icons';
import Detail from '#shared/Detail';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';
import MyProps from '#helpers/MyProps';
import ButtonLoading from '#shared/ButtonLoading';
import Row from '#shared/Row';
import Spinner, { TinySpinner } from '#shared/Spinner';
import Title from '#shared/Title';
import { RedirectToRoot, usePushToOS, usePushToNewTalk } from '#helpers/routes';

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

const PlaceBox = ({ place }) => (
  <>
    <Box
      border={{
        color: 'dark-2',
        size: 'small',
      }}
      pad="small"
      round
    >
      {`Queda${place > 1 && 'n'}`}
      <Heading alignSelf="center" margin="none">
        {place}
      </Heading>
    </Box>
    {place === 1 && (
      <Text margin={{ horizontal: 'small', vertical: 'none' }} weight="bold">
        Sos el siguiente!!
      </Text>
    )}
  </>
);
PlaceBox.propTypes = { place: PropTypes.number.isRequired };

const EnqueuedTalkCurrent = ({ description, onFinish, title }) => (
  <EnqueuedTalkCard bgColor="accent-1">
    <Heading margin={{ horizontal: 'medium', vertical: 'none' }}>PASÁ!!</Heading>
    <>
      <Title>{title}</Title>
      <Detail color="dark-2" text={description} truncate />
    </>
    <ButtonLoading color="status-critical" label="Terminé" onClick={onFinish} primary />
  </EnqueuedTalkCard>
);
EnqueuedTalkCurrent.propTypes = {
  description: PropTypes.string,
  onFinish: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const EnqueuedTalk = ({ description, place, title }) => (
  <EnqueuedTalkCard bgColor="accent-4">
    <Text
      textAlign="center"
      margin={{ horizontal: 'small', vertical: 'none' }}
      weight="bold"
    >
      ESPERANDO TURNO
    </Text>
    <PlaceBox place={place} />
    <>
      <Title>{title}</Title>
      <Detail color="dark-2" text={description} truncate />
    </>
  </EnqueuedTalkCard>
);
EnqueuedTalk.propTypes = {
  description: PropTypes.string,
  place: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const MyEnqueuedTalk = ({ onFinish, place, ...props }) =>
  place === 0 ? (
    <EnqueuedTalkCurrent onFinish={onFinish} {...props} />
  ) : (
    <EnqueuedTalk place={place} {...props} />
  );
MyEnqueuedTalk.propTypes = {
  description: PropTypes.string,
  onFinish: PropTypes.func.isRequired,
  place: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const MyTalks = () => {
  const pushToOS = usePushToOS();
  const pushToNewTalk = usePushToNewTalk();
  const {
    data: [os, slots, talks = []] = [],
    isPending,
    isRejected,
    reload,
  } = useGetMyTalks();
  const queue = useQueue(reload);

  if (isRejected) return <RedirectToRoot />;

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
        <MainHeader.TitleLink onClick={pushToOS}>
          {!os ? <TinySpinner /> : os.name}
        </MainHeader.TitleLink>
        <MainHeader.SubTitle icon={TalkIcon} label="MIS CHARLAS" />
        {talks.length > 0 && (
          <MainHeader.ButtonNew label="Charla" onClick={pushToNewTalk} />
        )}
      </MainHeader>
      {!queue || (talks.length === 0 && isPending) ? (
        <Spinner />
      ) : talks.length === 0 ? (
        <EmptyTalk onClick={pushToNewTalk} />
      ) : (
        <>
          {queue.length > 0 && myEnqueuedTalk() && (
            <MyEnqueuedTalk
              description={myEnqueuedTalk().description}
              onFinish={() => nextTalk(os.id)}
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
                onSchedule={pushToOS}
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
