import React, { useState } from 'react';
import { useSlots } from '#api/sockets-client';
import { useGetOpenSpace } from '#api/os-client';
import MainHeader from '#shared/MainHeader';
import { PreviousLinkIcon } from '#shared/icons';
import {
  RedirectToLoginFromOpenSpace,
  RedirectToRoot,
  usePushToOpenSpace,
} from '#helpers/routes';
import Spinner from '#shared/Spinner';
import { useUser } from '#helpers/useAuth';
import { ButtonSingIn } from '#shared/ButtonSingIn';
import { sortTimes } from '#helpers/time';
import { Slots } from './Slots';

const Schedule = () => {
  const user = useUser();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { data: { id, name, slots } = {}, isPending, isRejected } = useGetOpenSpace();
  const slotsSchedule = useSlots();
  const pushToOpenSpace = usePushToOpenSpace(id);

  if (isPending) return <Spinner />;
  if (isRejected) return <RedirectToRoot />;

  const sortedSlots = sortTimes(slots);
  const talksOf = (slotId) => slotsSchedule.filter((slotSchedule) => slotSchedule.slot.id === slotId);

  return (
    <>
      <MainHeader>
        <MainHeader.Title label={name} />
        <MainHeader.Button
          margin={{ top: 'medium' }}
          color="accent-1"
          icon={<PreviousLinkIcon size="30px" />}
          label="Volver"
          onClick={pushToOpenSpace}
        />
        <MainHeader.Buttons>
          {!user && <ButtonSingIn onClick={() => setRedirectToLogin(true)} />}
        </MainHeader.Buttons>
      </MainHeader>
      <Slots talksOf={talksOf} sortedSlots={sortedSlots} />
      {redirectToLogin && <RedirectToLoginFromOpenSpace openSpaceId={id} />}
    </>
  );
};

export default Schedule;
