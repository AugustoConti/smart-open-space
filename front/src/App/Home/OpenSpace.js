import React, { useState } from 'react';

import { Box, Button } from 'grommet';
import PropTypes from 'prop-types';

import Card from '#shared/Card';
import Detail from '#shared/Detail';
import { CalendarIcon, ClockIcon } from '#shared/icons';
import Title from '#shared/Title';

const getHour = time => Number(time.slice(0, 2));
const getTime = (start, end) => `${getHour(start)} a ${getHour(end) + 1} hs`;

const OpenSpace = ({ date, endTime, name, onClick, startTime }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Box
      elevation={isHover ? 'xlarge' : 'small'}
      margin={isHover ? 'none' : 'xsmall'}
      round
    >
      <Button
        fill
        onBlur={() => setIsHover(false)}
        onClick={onClick}
        onFocus={() => setIsHover(true)}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        plain
      >
        <Card borderColor="brand" elevation="none" fill gap="small">
          <Title level="3">{name}</Title>
          <Detail icon={CalendarIcon} text={date} />
          <Detail icon={ClockIcon} text={getTime(startTime, endTime)} />
        </Card>
      </Button>
    </Box>
  );
};
OpenSpace.propTypes = {
  date: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  startTime: PropTypes.string.isRequired,
};

export default OpenSpace;
