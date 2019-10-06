import React from 'react';
import { Redirect } from 'react-router-dom';

import { Box, Button, Grid, Heading, Text } from 'grommet';
import PropTypes from 'prop-types';

import { useGetAllOS } from '#helpers/api/os-client';
import { useUser } from '#helpers/useAuth';
import MainHeader from '#shared/MainHeader';

const OpenSpaceCard = ({ date, endTime, name, onClick, rooms, startTime }) => (
  <Button fill onClick={onClick} plain>
    {({ hover }) => (
      <Box
        background="white"
        border={hover ? { color: 'brand', size: 'medium', style: 'outset' } : undefined}
        elevation="small"
        fill
        pad="small"
        round
        overflow="hidden"
      >
        <Heading level="3" margin="none">
          {name}
        </Heading>
        {`${rooms.length} Salas`}
        <Text color="dark-5" size="small">
          {date}
          <br />
          {startTime}
          &#8226;
          {endTime}
        </Text>
        {/* <Text size="small" color="dark-5" margin={{ vertical: 'small' }} truncate>
          description
        </Text> */}
      </Box>
    )}
  </Button>
);
OpenSpaceCard.propTypes = {
  date: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  startTime: PropTypes.string.isRequired,
};

const OpenSpaces = ({ children }) => (
  <Grid columns="small" gap="medium" margin={{ bottom: 'medium' }}>
    {children}
  </Grid>
);
OpenSpaces.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

const HomeLogged = ({ history }) => {
  const [openSpaces] = useGetAllOS();
  return (
    <>
      <MainHeader>
        <MainHeader.Title label="Mis Open Spaces" />
        <MainHeader.ButtonNew onClick={() => history.push('/new')} />
      </MainHeader>
      <OpenSpaces>
        {openSpaces.map(openSpace => (
          <OpenSpaceCard
            key={openSpace.id}
            onClick={() => history.push(`/os/${openSpace.id}`)}
            {...openSpace}
          />
        ))}
      </OpenSpaces>
    </>
  );
};
HomeLogged.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const Home = ({ history }) => {
  const user = useUser();
  return user ? <HomeLogged history={history} /> : <Redirect to="/login" />;
};
Home.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Home;
