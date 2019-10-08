import React from 'react';
import { Redirect } from 'react-router-dom';

import { Button, Heading, Text } from 'grommet';
import { Workshop, Plan, Clock } from 'grommet-icons';
import PropTypes from 'prop-types';

import preparationImg from '#assets/preparation.svg';
import { useGetAllOS } from '#helpers/api/os-client';
import { useUser } from '#helpers/useAuth';
import Card from '#shared/Card';
import EmptyData from '#shared/EmptyData';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';
import Row from '#shared/Row';

const getHour = time => Number(time.slice(0, 2));

const OpenSpace = ({ date, endTime, name, onClick, startTime }) => (
  <Button fill onClick={onClick} plain>
    {({ hover }) => (
      <Card
        borderColor={hover ? 'accent-1' : 'brand'}
        borderSide={hover ? 'all' : undefined}
        fill
        gap="small"
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
        <MyGrid>
          {openSpaces.map(os => (
            <OpenSpace key={os.id} onClick={() => history.push(`/os/${os.id}`)} {...os} />
          ))}
        </MyGrid>
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
