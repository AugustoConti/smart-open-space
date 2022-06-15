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
import { DateSlots } from './DateSlots';
import { Tab, Tabs } from 'grommet';

const Schedule = () => {
  const user = useUser();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const {
    data: { id, name, slots, dates } = {},
    isPending,
    isRejected,
  } = useGetOpenSpace();
  const slotsSchedule = useSlots();
  const pushToOpenSpace = usePushToOpenSpace(id);

  if (isPending) return <Spinner />;
  if (isRejected) return <RedirectToRoot />;

  const sortedSlots = sortTimes(slots);
  const sortedDates = dates.sort(compareDates);
  const talksOf = (slotId) =>
    slotsSchedule.filter((slotSchedule) => slotSchedule.slot.id === slotId);

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
      <Tabs>
        {sortedDates.map((date) => (
          <Tab title={`${date[0]}-${date[1]}-${date[2]}`}>
            <DateSlots talksOf={talksOf} sortedSlots={dateSlots(date, sortedSlots)} />
          </Tab>
        ))}
      </Tabs>
      {redirectToLogin && <RedirectToLoginFromOpenSpace openSpaceId={id} />}
    </>
  );
};

function dateSlots(date, sortedSlots) {
  return sortedSlots.filter((slot) => equalDates(slot.date, date));
}

function compareDates(date1, date2) {
  if (equalDates(date1, date2)) return 0;
  if (date1.toString() > date2.toString()) return 1;
  if (date1.toString() < date2.toString()) return -1;
  return 0;
}

function equalDates(date1, date2) {
  if (date1 === date2) return true;
  if (!date1 || !date2) return false;

  return date1.map((element, index) => element === date2[index]).reduce((a, b) => a && b);
}

export default Schedule;
