import React, { useState, useRef, useEffect } from 'react';
import { Button, Text, Box } from 'grommet';
import PropTypes from 'prop-types';

import { nextTalk } from '#api/os-client';
import MyProps from '#helpers/MyProps';

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

const TimeLeft = ({ time }) =>
  time === undefined ? null : time === 0 ? (
    <Text color="status-critical" weight="bold">
      Se acabó tu tiempo!
    </Text>
  ) : time <= 5 ? (
    <>
      Tiempo
      <Text color="status-critical" weight="bold">
        {time}
      </Text>
    </>
  ) : (
    <Text>
      <>
        Tiempo
        {time}
      </>
    </Text>
  );
TimeLeft.propTypes = { time: PropTypes.number };

const OSProjector = ({
  match: {
    params: { id },
  },
}) => {
  const [time, setTime] = useState();

  useInterval(() => {
    if (!time) return;
    if (time === 0) return;
    setTime(time - 1);
  }, 1000);

  return (
    <>
      <h1>OSProjector</h1>
      <Box>
        <TimeLeft time={time} />
        <Button
          color="status-warning"
          label="Comenzar"
          onClick={() => setTime(10)}
          primary
        />
        <Button
          label="Siguiente"
          onClick={() => {
            nextTalk(id);
            setTime(undefined);
          }}
        />
      </Box>
    </>
  );
};
OSProjector.propTypes = { match: MyProps.match };

export default OSProjector;
