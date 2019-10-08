import React from 'react';
import { Redirect } from 'react-router-dom';

import { Box, Button, Grid, Heading, Text } from 'grommet';
import { Workshop, Plan, Clock } from 'grommet-icons';
import PropTypes from 'prop-types';

import preparationImg from '#assets/preparation.svg';
import { useGetAllOS } from '#helpers/api/os-client';
import { useUser } from '#helpers/useAuth';
import EmptyData from '#shared/EmptyData';
import MainHeader from '#shared/MainHeader';
import Row from '#shared/Row';

const getHour = time => Number(time.slice(0, 2));

const OpenSpace = ({ date, endTime, name, onClick, startTime }) => (
  <Button fill onClick={onClick} plain>
    {({ hover }) => (
      <Box
        background="light-1"
        border={
          hover
            ? { color: 'accent-1', size: 'medium', style: 'outset' }
            : { color: 'brand', size: 'medium', side: 'top' }
        }
        elevation="small"
        fill
        gap="small"
        overflow="hidden"
        pad="small"
        round
      >
        <Heading textAlign="center" level="3" margin="none">
          {name}
        </Heading>
        <Row>
          <Plan color="dark-5" />
          <Text color="dark-5">{date}</Text>
        </Row>
        <Row>
          <Clock color="dark-5" />
          <Text color="dark-5">
            {`${getHour(startTime)} a ${getHour(endTime) + 1} hs`}
          </Text>
        </Row>
      </Box>
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
