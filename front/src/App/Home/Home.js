import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import { useGetAllOS } from '#api/os-client';
import { useUser } from '#helpers/useAuth';
import { OpenSpaceIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';
import Spinner from '#shared/Spinner';

import EmptyOpenSpaces from './EmptyOpenSpaces';
import OpenSpace from './OpenSpace';

const HomeLogged = () => {
  const history = useHistory();
  const { data: openSpaces, isPending } = useGetAllOS();
  const onNew = () => history.push('/new');
  return (
    <>
      <MainHeader>
        <MainHeader.Title icon={OpenSpaceIcon} label="Mis Open Spaces" />
        {openSpaces && openSpaces.length > 0 && <MainHeader.ButtonNew onClick={onNew} />}
      </MainHeader>
      {isPending || !openSpaces ? (
        <Spinner />
      ) : openSpaces.length === 0 ? (
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

const Home = () => (useUser() ? <HomeLogged /> : <Redirect to="/login" />);

export default Home;
