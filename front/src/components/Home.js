import React from 'react';

import { Box, Button, Grid, Heading, Text } from 'grommet';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';

import RowBetween from './shared/RowBetween';

import { useGet } from '../helpers/api/useFetch';

const OpenSpaceCard = ({ name, date, startTime, endTime, rooms }) => (
  <Box
    background="white"
    elevation="small"
    fill
    overflow="hidden"
    pad="small"
    round="small"
  >
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
    {/* <Text size="small" color="dark-5" margin={{ vertical: 'small' }} truncate>
          description
        </Text> */}
  </Box>
);

OpenSpaceCard.propTypes = {
  date: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  startTime: PropTypes.string.isRequired,
};

const ButtonNew = ({ onClick }) => (
  <Button icon={<Add />} label="Nuevo" onClick={onClick} primary />
);
ButtonNew.propTypes = { onClick: PropTypes.func.isRequired };

const Home = ({ history }) => {
  const [openSpaces] = useGet('/openSpace', []);

  return (
    <>
      <RowBetween>
        <Heading>Open Spaces</Heading>
        <ButtonNew onClick={() => history.push('/new')} />
      </RowBetween>
      <Grid columns="small" gap="small">
        {openSpaces.map(openSpace => (
          <OpenSpaceCard key={openSpace.id} {...openSpace} />
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
