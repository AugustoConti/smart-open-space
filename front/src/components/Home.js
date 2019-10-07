import React from 'react';
import { Redirect } from 'react-router-dom';

import { Box, Button, Grid, Heading, Text } from 'grommet';
import PropTypes from 'prop-types';

import { Workshop } from 'grommet-icons';
import preparationImg from '#assets/preparation.svg';
import { useGetAllOS } from '#helpers/api/os-client';
import { useUser } from '#helpers/useAuth';
import EmptyData from '#shared/EmptyData';
import MainHeader from '#shared/MainHeader';

const OpenSpace = ({ date, endTime, name, onClick, rooms, startTime }) => (
  <Button fill onClick={onClick} plain>
    {({ hover }) => (
      <Box
        background="light-1"
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
OpenSpace.propTypes = {
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

const EmptyOpenSpaces = ({ onClick }) => (
  <EmptyData
    buttonText="Cargar OpenSpace"
    img={preparationImg}
    onClick={onClick}
    text="Cargá tu primer Open Space y aprovecha toda la inteligencia de Smart-OS"
  />
);
EmptyOpenSpaces.propTypes = { onClick: PropTypes.func.isRequired };

const HomeLogged = ({ history }) => {
  const [openSpaces] = useGetAllOS();
  const onNew = () => history.push('/new');
  return (
    <>
      <MainHeader>
        <MainHeader.Title icon={<Workshop />} label="Mis Open Spaces" />
        {openSpaces.length > 0 && <MainHeader.ButtonNew onClick={onNew} />}
      </MainHeader>
      {openSpaces.length === 0 ? (
        <EmptyOpenSpaces onClick={onNew} />
      ) : (
        <OpenSpaces>
          {openSpaces.map(os => (
            <OpenSpace key={os.id} onClick={() => history.push(`/os/${os.id}`)} {...os} />
          ))}
        </OpenSpaces>
      )}
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
