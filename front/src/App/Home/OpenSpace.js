import React from 'react';
import { Button } from 'grommet';
import PropTypes from 'prop-types';

import Card from '#shared/Card';
import Detail from '#shared/Detail';
import { CalendarIcon, ClockIcon } from '#shared/icons';
import Title from '#shared/Title';
import { usePushToOS } from '#helpers/routes';

const getTime = (start, end) => `${start[0]} a ${end[0] + 1} hs`;

const OpenSpace = ({ date, endTime, id, name, startTime }) => (
  <Button fill onClick={usePushToOS(id)} plain>
    {({ hover }) => (
      <Card
        borderColor={hover ? 'accent-1' : 'brand'}
        elevation={hover ? 'xlarge' : 'small'}
        fill
        gap="small"
        justify="start"
      >
        <Title level="3">{name}</Title>
        <Detail icon={CalendarIcon} text={new Date(date).toLocaleDateString()} />
        <Detail icon={ClockIcon} text={getTime(startTime, endTime)} />
      </Card>
    )}
  </Button>
);
OpenSpace.propTypes = {
  date: PropTypes.arrayOf(PropTypes.number).isRequired,
  endTime: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  startTime: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default OpenSpace;
