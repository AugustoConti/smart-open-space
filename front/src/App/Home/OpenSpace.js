import React from 'react';
import { Box, Button, Image } from 'grommet';
import PropTypes from 'prop-types';

import Card from '#shared/Card';
import Detail from '#shared/Detail';
import { CalendarIcon, ClockIcon } from '#shared/icons';
import Title from '#shared/Title';
import { usePushToOS } from '#helpers/routes';

const pad = n => (n < 10 ? '0' : '') + n;
const toTime = time => time.map(pad).join(':');

const OpenSpace = ({ date, endTime, id, name, startTime, urlImage }) => (
  <Button fill onClick={usePushToOS(id)} plain>
    {({ hover }) => (
      <Card
        borderColor={hover ? 'accent-1' : 'brand'}
        elevation={hover ? 'xlarge' : 'small'}
        fill
        justify="start"
        pad=""
      >
        <Box height="xsmall" round={{ corner: 'top' }}>
          <Image
            src={urlImage}
            fit="cover"
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </Box>
        <Box pad="small" justify="start" gap="small">
          <Title level="3">{name}</Title>
          <Detail icon={CalendarIcon} text={new Date(date).toLocaleDateString('es')} />
          <Detail
            icon={ClockIcon}
            text={`${toTime(startTime)} a ${toTime(endTime)} hs`}
          />
        </Box>
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
  urlImage: PropTypes.string.isRequired,
};

export default OpenSpace;
