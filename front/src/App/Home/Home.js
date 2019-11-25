import React from 'react';

import { useGetAllOS } from '#api/os-client';
import { useUser } from '#helpers/useAuth';
import { OpenSpaceIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyGrid from '#shared/MyGrid';
import Spinner from '#shared/Spinner';
import { RedirectToLogin, usePushToNewOS } from '#helpers/routes';

import EmptyOpenSpaces from './EmptyOpenSpaces';
import OpenSpace from './OpenSpace';

const Home = () => {
  const pushToNewOS = usePushToNewOS();
  const { data: openSpaces, isPending } = useGetAllOS();

  return (
    <>
      <MainHeader>
        <MainHeader.Title icon={OpenSpaceIcon} label="Mis Open Spaces" />
        <MainHeader.Buttons>
          {openSpaces && openSpaces.length > 0 && (
            <MainHeader.ButtonNew onClick={pushToNewOS} />
          )}
        </MainHeader.Buttons>
      </MainHeader>
      {isPending || !openSpaces ? (
        <Spinner />
      ) : openSpaces.length === 0 ? (
        <EmptyOpenSpaces onClick={pushToNewOS} />
      ) : (
        <MyGrid>
          {openSpaces.map(os => (
            <OpenSpace key={os.id} {...os} />
          ))}
        </MyGrid>
      )}
    </>
  );
};

export default () => (useUser() ? <Home /> : <RedirectToLogin />);
