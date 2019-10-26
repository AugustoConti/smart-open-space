import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { Box, Button, Text, Heading, CheckBox } from 'grommet';
import PropTypes from 'prop-types';

import ideasFlow from '#assets/ideas_flow.svg';
import { nextTalk, useGetOS } from '#api/os-client';
import { useQueue } from '#api/sockets-client';
import { useUser } from '#helpers/useAuth';
import EmptyData from '#shared/EmptyData';
import Row from '#shared/Row';
import RowBetween from '#shared/RowBetween';
import { ClockIcon, NextIcon, TalkIcon, UserIcon } from '#shared/icons';
import Spinner from '#shared/Spinner';

const TIME_FOR_SPEAKER = 30;

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const LabelTimeLeft = () => (
  <Row>
    <ClockIcon />
    <Text>Tiempo restante</Text>
  </Row>
);

const BoxTime = ({ background = 'status-critical', label }) => (
  <Box alignSelf="center" background={background} pad="medium" round>
    <Text size="large">{label}</Text>
  </Box>
);
BoxTime.propTypes = {
  background: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const TimeLeft = ({ time }) => (
  <Box alignSelf="start" margin={{ top: 'medium' }}>
    {time === 0 ? (
      <BoxTime label="Se acabó tu tiempo!" />
    ) : time <= 5 ? (
      <Box>
        <BoxTime label={time} />
        <LabelTimeLeft />
      </Box>
    ) : (
      <Box>
        <BoxTime background="dark-1" label={time} />
        <LabelTimeLeft />
      </Box>
    )}
  </Box>
);
TimeLeft.propTypes = { time: PropTypes.number.isRequired };

const NextTalks = ({ restTalks }) =>
  restTalks.length < 1 ? (
    <Text>Último orador!</Text>
  ) : (
    <Box>
      <Text color="dark-3" textAlign="center">
        SIGUIENTES
        {!!restTalks.length && ` (${restTalks.length})`}
      </Text>
      {restTalks.map(t => (
        <Row
          direction="row-responsive"
          border={{ color: 'dark-2' }}
          key={t.id}
          margin={{ top: 'small' }}
          pad="small"
          round
        >
          <Row alignContent="center">
            <TalkIcon />
            <Text>{t.name}</Text>
          </Row>
          <Text color="dark-5">{t.speaker.name}</Text>
        </Row>
      ))}
    </Box>
  );
NextTalks.propTypes = { restTalks: PropTypes.arrayOf(PropTypes.object).isRequired };

const StartButton = props => (
  <Button
    color="status-warning"
    icon={<ClockIcon />}
    label="Comenzar 30''"
    primary
    {...props}
  />
);

const NextButton = props => (
  <Button gap="none" icon={<NextIcon />} label="Siguiente" primary reverse {...props} />
);

const EmptyProjector = () => {
  const { id } = useParams();
  const history = useHistory();
  return (
    <Box margin={{ top: 'large' }}>
      <EmptyData
        buttonText="Ir al OpenSpace"
        img={ideasFlow}
        onClick={() => history.push(`/os/${id}`)}
        text="No hay oradores para exponer"
      />
    </Box>
  );
};

const OSProjector = () => {
  const { id } = useParams();
  const user = useUser();
  const [time, setTime] = useState();
  const [fast, setFast] = useState(true);
  const { data: { organizer } = {}, isPending } = useGetOS(id);
  const queue = useQueue(id);

  useInterval(
    () => {
      if (!time || time === 0) return;
      setTime(time - 1);
    },
    fast ? 300 : 1000
  );

  if (isPending) return <Spinner />;
  if (organizer.id !== user.id) return <Redirect to={`/os/${id}`} />;
  if (!queue) return <Spinner />;
  if (queue.length < 1) return <EmptyProjector />;

  const currentTalk = queue[0];
  const restTalks = queue.slice(1, 4);

  return (
    <>
      <RowBetween margin={{ vertical: 'medium' }}>
        <StartButton onClick={() => setTime(TIME_FOR_SPEAKER)} />
        <CheckBox
          checked={fast}
          label="Acelerar?"
          onChange={event => setFast(event.target.checked)}
        />
        <NextButton
          onClick={() => {
            nextTalk(id);
            setTime(undefined);
          }}
        />
      </RowBetween>
      <Box align="center">
        <Heading margin="small">{currentTalk.name}</Heading>
        <Text size="large">{currentTalk.description}</Text>
        <Row margin={{ top: 'small' }}>
          <UserIcon />
          <Text>{currentTalk.speaker.name}</Text>
        </Row>
      </Box>
      <RowBetween justify="evenly" margin={{ top: 'large' }}>
        {time !== undefined && <TimeLeft time={time} />}
        <NextTalks restTalks={restTalks} />
      </RowBetween>
    </>
  );
};

export default OSProjector;
