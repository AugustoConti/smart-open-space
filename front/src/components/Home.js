import React, { useContext } from 'react';

import { Box, Button, Grid, Heading, ResponsiveContext, Text } from 'grommet';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';

import Header from './shared/Header';
import { useGet } from '../helpers/api/useFetch';

const OpenSpaceCard = ({ openSpace: { name, date, startTime, endTime, rooms } }) => (
  <Box round="small" elevation="small" overflow="hidden" background="white">
    <Box pad={{ horizontal: 'small' }}>
      <Box margin={{ top: 'small' }} direction="row" align="center" justify="between">
        <Box>
          <Heading level="3" margin="none">
            {name}
          </Heading>
          {`${rooms.length} Rooms`}
          <Text color="dark-5" size="small">
            {date}
          </Text>
          <Text color="dark-5" size="small">
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
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    rooms: PropTypes.array.isRequired,
  }).isRequired,
};

const Home = ({ history }) => {
  const [openSpaces] = useGet('', []);
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Header />
      <Box margin="small" justify="between" direction="row">
        <Heading level="2" margin="none">
          Open Spaces
        </Heading>
        <Button primary icon={<Add />} label="New" onClick={() => history.push('/new')} />
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
