import React from 'react';

import { Button } from 'grommet';
import PropTypes from 'prop-types';

import Card from '#shared/Card';
import Detail from '#shared/Detail';
import { CalendarIcon, ClockIcon } from '#shared/icons';
import Title from '#shared/Title';

const getHour = time => Number(time.slice(0, 2));
const getTime = (start, end) => `${getHour(start)} a ${getHour(end) + 1} hs`;

const OpenSpace = ({ date, endTime, name, onClick, startTime }) => (
  <Button fill onClick={onClick} plain>
    {({ hover }) => (
      <Card
        borderColor={hover ? 'accent-1' : 'brand'}
        borderSide={hover ? 'all' : undefined}
        fill
        gap="small"
      >
        <Title level="3">{name}</Title>
        <Detail icon={CalendarIcon} text={date} />
        <Detail icon={ClockIcon} text={getTime(startTime, endTime)} />
      </Card>
    )}
  </Button>
);
OpenSpace.propTypes = {
  date: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  startTime: PropTypes.string.isRequired,
};

export default OpenSpace;
