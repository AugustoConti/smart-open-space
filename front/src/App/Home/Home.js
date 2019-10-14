import React from 'react';
import { Redirect } from 'react-router-dom';

import { useGetAllOS } from '#helpers/api/os-client';
import { useUser } from '#helpers/useAuth';
import MyProps from '#helpers/MyProps';
import { OpenSpaceIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';

import EmptyOpenSpaces from './EmptyOpenSpaces';
import OpenSpace from './OpenSpace';

const HomeLogged = ({ history }) => {
  const [openSpaces] = useGetAllOS();
  const onNew = () => history.push('/new');
  return (
    <>
      <MainHeader>
        <MainHeader.Title icon={OpenSpaceIcon} label="Mis Open Spaces" />
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
