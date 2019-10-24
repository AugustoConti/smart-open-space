import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Text, Heading } from 'grommet';
import PropTypes from 'prop-types';

import { nextTalk } from '#api/os-client';
import { useQueue } from '#api/sockets-client';
import Row from '#shared/Row';
import RowBetween from '#shared/RowBetween';
import { ClockIcon, NextIcon, UserIcon } from '#shared/icons';

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

const BoxCritical = ({ label }) => (
  <Box alignSelf="center" background="status-critical" pad="medium" round>
    <Text size="large">{label}</Text>
  </Box>
);
BoxCritical.propTypes = { label: PropTypes.string.isRequired };

const TimeLeft = ({ time }) =>
  time === 0 ? (
    <BoxCritical label="Se acabó tu tiempo!" />
  ) : time <= 5 ? (
    <Box>
      <BoxCritical label={time} />
      <Text>Tiempo restante</Text>
    </Box>
  ) : (
    <Box>
      {time}
      Tiempo
    </Box>
  );
TimeLeft.propTypes = { time: PropTypes.number.isRequired };

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

const TIME_FOR_SPEAKER = 8;

// - Cola sig 3 + total que restan

const OSProjector = () => {
  const { id } = useParams();
  const [time, setTime] = useState(8);
  const queue = useQueue(id);

  const currentTalk = queue ? queue[0] : { speaker: {} };
  const restTalks = queue ? queue.slice(1, 4) : [];

  console.log(currentTalk);
  console.log(restTalks);

  useInterval(() => {
    if (!time || time === 0) return;
    setTime(time - 1);
  }, 500);

  return (
    <>
      <RowBetween margin={{ vertical: 'medium' }}>
        <StartButton onClick={() => setTime(TIME_FOR_SPEAKER)} />
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
        <Box>
          <Text color="dark-3" textAlign="center">
            SIGUIENTES
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
              <Text>{t.name}</Text>
              <Text color="dark-5">{t.speaker.name}</Text>
            </Row>
          ))}
        </Box>
      </RowBetween>
    </>
  );
};

export default OSProjector;
