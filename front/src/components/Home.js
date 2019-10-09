import React from 'react';
import { Redirect } from 'react-router-dom';

import { Button } from 'grommet';
import { Workshop, Plan, Clock } from 'grommet-icons';
import PropTypes from 'prop-types';

import preparationImg from '#assets/preparation.svg';
import { useGetAllOS } from '#helpers/api/os-client';
import { useUser } from '#helpers/useAuth';
import MyProps from '#helpers/MyProps';
import Card from '#shared/Card';
import Detail from '#shared/Detail';
import EmptyData from '#shared/EmptyData';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';
import Title from '#shared/Title';

const getHour = time => Number(time.slice(0, 2));
const getTime = (start, end) => `${getHour(start)} a ${getHour(end) + 1} hs`;

const OpenSpace = ({ date, endTime, name, onClick, startTime }) => (
  <Button fill onClick={onClick} plain>
    {({ hover }) => (
      <Card
        borderColor={hover ? 'accent-1' : 'brand'}
        borderSide={hover ? 'all' : undefined}
        fill
        gap="small"
      >
        <Title level="3">{name}</Title>
        <Detail icon={Plan} text={date} />
        <Detail icon={Clock} text={getTime(startTime, endTime)} />
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
HomeLogged.propTypes = { history: MyProps.history };

const Home = props => (useUser() ? <HomeLogged {...props} /> : <Redirect to="/login" />);
Home.propTypes = { history: MyProps.history };

export default Home;
