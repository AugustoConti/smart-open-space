import React, { useState } from 'react';
import { useSlots } from '#api/sockets-client';
import { useGetOpenSpace } from '#api/os-client';
import MainHeader from '#shared/MainHeader';
import { OpenSpaceIcon, ScheduleIcon } from '#shared/icons';
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
import { ButtonMyTalks } from '../buttons/ButtonMyTalks';

const Schedule = () => {
  const user = useUser();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const {
    data: { id, name, slots, startingDate, organizer } = {},
    isPending,
    isRejected,
  } = useGetOpenSpace();
  const slotsSchedule = useSlots();
  const pushToOpenSpace = usePushToOpenSpace(id);

  if (isPending) return <Spinner />;
  if (isRejected) return <RedirectToRoot />;


  const sortedSlots = sortTimes(slots).filter((slot) =>
    slot.date
      .map((zarasa, index) => zarasa === startingDate[index])
      .reduce((a, b) => a && b)
  );
  const talksOf = (slotId) =>
    slotsSchedule.filter((slotSchedule) => slotSchedule.slot.id === slotId);
    const amTheOrganizer = user && organizer.id === user.id;

  return (
    <>
      <MainHeader>
        <MainHeader.TitleLink onClick={pushToOpenSpace}>{name}</MainHeader.TitleLink>
        <MainHeader.SubTitle
          icon={ScheduleIcon}
          label="Agenda"
        />        
        <MainHeader.Buttons>
        {user ? (
            <ButtonMyTalks amTheOrganizer={amTheOrganizer} />
          ) : (
            <ButtonSingIn onClick={() => setRedirectToLogin(true)} />
          )}
        </MainHeader.Buttons>
      </MainHeader>
      <Slots talksOf={talksOf} sortedSlots={sortedSlots} />
      {redirectToLogin && <RedirectToLoginFromOpenSpace openSpaceId={id} />}
    </>
  );
};

export default Schedule;
