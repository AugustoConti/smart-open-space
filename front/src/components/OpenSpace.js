import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Box, Button, Grid, Heading, Layer, Text } from 'grommet';
import { FormClose, Schedules } from 'grommet-icons';
import Slider from 'react-slick';

import { useGetOS } from '#helpers/api/os-client';
import { useUser } from '#helpers/useAuth';
import useSlots from '#helpers/schedule-socket';
import MainHeader from '#shared/MainHeader';

const sliderSettings = {
  centerMode: true,
  arrows: false,
  dots: false,
  infinite: true,
  speed: 50,
  slidesToShow: 3,
  slidesToScroll: 1,
  focusOnSelect: true,
  adaptiveHeight: true,
  className: 'sarlanga',
  responsive: [
    {
      breakpoint: 960,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const Talks = ({ children }) => <Slider {...sliderSettings}>{children}</Slider>;
Talks.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

const DescriptionInfo = ({ info, onClose }) => (
  <Layer onClickOutside={onClose} onEsc={onClose}>
    <Box pad={{ horizontal: 'medium', bottom: 'medium', top: 'small' }}>
      <Box direction="row" justify="end">
        <Button icon={<FormClose />} onClick={onClose} plain />
      </Box>
      <Text>{info}</Text>
    </Box>
  </Layer>
);
DescriptionInfo.propTypes = {
  info: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ButtonMoreInfo = ({ onClick }) => (
  <Button
    alignSelf="center"
    color="accent-3"
    label="Mas info"
    primary
    onClick={onClick}
  />
);
ButtonMoreInfo.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Talk = ({ talk: { name, description }, room }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      background="light-1"
      elevation="small"
      gap="medium"
      height="small"
      justify="between"
      margin="xsmall"
      overflow="hidden"
      pad="medium"
      round
    >
      <Box>
        <Heading level="4" margin="none" size="small">
          {name}
        </Heading>
        <Text color="dark-5" size="medium">
          {room.name}
        </Text>
      </Box>
      {description && <ButtonMoreInfo onClick={() => setOpen(true)} />}
      {open && <DescriptionInfo info={description} onClose={() => setOpen(false)} />}
    </Box>
  );
};
Talk.propTypes = {
  room: PropTypes.shape().isRequired,
  talk: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

const Dots = ({ gridArea }) => (
  <Box
    alignSelf="center"
    border={{ size: 'xsmall', style: 'dashed' }}
    gridArea={gridArea}
  />
);
Dots.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

const HourHeader = ({ hour }) => (
  <Grid
    areas={[['left', 'main', 'right']]}
    columns={['flex', 'xsmall', 'flex']}
    rows={['xxsmall']}
  >
    <Dots gridArea="left" />
    <Box align="center" alignSelf="center" gridArea="main" flex>
      {`${hour}:00 hs`}
    </Box>
    <Dots gridArea="right" />
  </Grid>
);
HourHeader.propTypes = {
  hour: PropTypes.number.isRequired,
};

const TimeSpan = ({ hour, slots }) => (
  <>
    <HourHeader hour={hour} />
    {slots.length === 0 ? (
      <Box height="small" />
    ) : (
      <Talks>
        {slots.map(({ talk, room }) => (
          <Talk key={talk.id} talk={talk} room={room} />
        ))}
      </Talks>
    )}
  </>
);
TimeSpan.propTypes = {
  hour: PropTypes.number.isRequired,
  slots: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const getHour = time => Number(time.slice(0, 2));
const getRangeHours = (start, end) => [getHour(start), getHour(end) + 1];

const Schedule = ({ slots, startTime, endTime }) => {
  const slotsOf = hour => slots.filter(s => s.hour === hour);
  const [start, end] = getRangeHours(startTime, endTime);
  return [...Array(end - start).keys()].map(i => {
    const hour = i + start;
    const slotsHour = slotsOf(hour);
    const key = `${hour}-${slotsHour.map(s => s.id).join('-')}`;
    return <TimeSpan hour={hour} key={key} slots={slotsHour} />;
  });
};

const OpenSpace = ({
  match: {
    params: { id },
  },
  history,
  location: { pathname },
}) => {
  const [{ name, startTime = '1', endTime = '0' }] = useGetOS(id, () =>
    history.push('/')
  );
  const user = useUser();
  const slots = useSlots(id);

  return (
    <>
      <MainHeader>
        <MainHeader.Title label={name} />
        <MainHeader.SubTitle icon={<Schedules />} label="AGENDA" />
        <MainHeader.Button
          color="accent-1"
          label="Mis charlas"
          onClick={() => history.push(user ? `${pathname}/mis-charlas` : '/login')}
        />
      </MainHeader>
      <Box margin={{ bottom: 'medium' }}>
        <Schedule slots={slots} startTime={startTime} endTime={endTime} />
      </Box>
    </>
  );
};
OpenSpace.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default OpenSpace;
