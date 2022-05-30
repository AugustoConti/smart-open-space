import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';

import { useSlots } from '#api/sockets-client';
import HourHeader from '#shared/HourHeader';

import Talk from './Talk';
import Talks from './Talks';
import { useGetOS } from '#api/os-client';
import MainHeader from '#shared/MainHeader';
import { TalkIcon, UserAddIcon } from '#shared/icons';
import {
  RedirectToLoginFromOpenSpace,
  RedirectToRoot,
  usePushToOpenSpace,
} from '#helpers/routes';
import Spinner from '#shared/Spinner';
import { useUser } from '#helpers/useAuth';

const pad = (n) => (n < 10 ? '0' : '') + n;
const toTime = (time) => time.map(pad).join(':');
const sortTimes = (times) =>
  times.sort(({ startTime: [h1, m1] }, { startTime: [h2, m2] }) =>
    h1 < h2 || (h1 === h2 && m1 < m2) ? -1 : 1
  );

const OtherSlot = ({ description }) => (
  <Box background={{ color: 'accent-1', opacity: 'medium' }} pad="medium" round="small">
    <Text alignSelf="center" color="dark-1">
      {description}
    </Text>
  </Box>
);
OtherSlot.propTypes = { description: PropTypes.string.isRequired };

const TalkSlot = ({ slots }) =>
  slots.length === 0 ? (
    <Box height="small" />
  ) : (
    <Talks>
      {slots.map(({ talk, room }) => (
        <Talk key={talk.id} talk={talk} room={room} />
      ))}
    </Talks>
  );
TalkSlot.propTypes = { slots: PropTypes.arrayOf(PropTypes.shape()).isRequired };

const ButtonSingIn = (props) => (
  <MainHeader.Button
    color="accent-3"
    icon={<UserAddIcon />}
    label="Ingresar"
    {...props}
  />
);

const Schedule = () => {
  const user = useUser();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { data: { id, name, slots } = {}, isPending, isRejected } = useGetOS();
  const slotsSchedule = useSlots();
  const pushToOpenSpace = usePushToOpenSpace(id);

  if (isPending) return <Spinner />;
  if (isRejected) return <RedirectToRoot />;

  const sortedSlots = sortTimes(slots);
  const talksOf = (slotId) => slotsSchedule.filter((s) => s.slot.id === slotId);

  return (
    <>
      <MainHeader>
        <MainHeader.Title label={name} />
        <MainHeader.Button
          margin={{ top: 'medium' }}
          color="accent-1"
          icon={<TalkIcon />}
          label="CHARLAS"
          onClick={pushToOpenSpace}
        />
        <MainHeader.Buttons>
          {!user && <ButtonSingIn onClick={() => setRedirectToLogin(true)} />}
        </MainHeader.Buttons>
      </MainHeader>
      <Box margin={{ bottom: 'medium' }}>
        {[
          ...sortTimes(slots).map((slot) => (
            <React.Fragment key={slot.id}>
              <HourHeader hour={toTime(slot.startTime)} />
              {!slot.assignable ? (
                <OtherSlot description={slot.description} />
              ) : (
                <TalkSlot slots={talksOf(slot.id)} />
              )}
            </React.Fragment>
          )),
          <React.Fragment key="cierre">
            <HourHeader hour={toTime(sortedSlots.slice(-1)[0].endTime)} />
            <OtherSlot description="Cierre" />
          </React.Fragment>,
        ]}
      </Box>
      {redirectToLogin && <RedirectToLoginFromOpenSpace openSpaceId={id} />}
    </>
  );
};

export default Schedule;
