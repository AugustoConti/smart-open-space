import React, { useContext } from 'react';

import { Box, Button, Grid, Heading, ResponsiveContext, Text } from 'grommet';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';

import Header from './shared/Header';
import { useGet } from '../helpers/api/useFetch';

const OpenSpaceCard = ({ openSpace: { name, date, startTime, endTime, rooms } }) => (
  <Box background="white" elevation="small" overflow="hidden" round="small">
    <Box pad={{ horizontal: 'small' }}>
      <Box align="center" direction="row" justify="between" margin={{ top: 'small' }}>
        <Box>
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
        </Box>
      </Box>
      {/* <Text size="small" color="dark-5" margin={{ vertical: 'small' }} truncate>
          description
        </Text> */}
    </Box>
  </Box>
);

OpenSpaceCard.propTypes = {
  openSpace: PropTypes.shape({
    date: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rooms: PropTypes.array.isRequired,
    startTime: PropTypes.string.isRequired,
  }).isRequired,
};

const Home = ({ history }) => {
  const [openSpaces] = useGet('', []);
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Header />
      <Box direction="row" justify="between" margin="small">
        <Heading level="2" margin="none">
          Open Spaces
        </Heading>
        <Button
          icon={<Add />}
          label="Nuevo"
          onClick={() => history.push('/new')}
          primary
        />
      </Box>
      <Grid
        align="start"
        columns={size !== 'small' ? { count: 'fill', size: 'medium' } : null}
        gap="medium"
        margin="medium"
      >
        {openSpaces.map(openSpace => (
          <OpenSpaceCard key={openSpace.id} openSpace={openSpace} />
        ))}
      </Grid>
    </>
  );
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
