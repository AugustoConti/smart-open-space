import { useUser } from '#helpers/useAuth';
import { useGetOpenSpace, useGetTalk } from '#api/os-client';
import Spinner, { TinySpinner } from '#shared/Spinner';
import { RedirectToRoot, usePushToMyTalks } from '#helpers/routes';
import { TalkForm } from './TalkForm';
import React from 'react';

const EditTalk = () => {
  const user = useUser();
  const {
    data: talk,
    isPending: isTalkPending,
    isRejected: isTalkRejected,
  } = useGetTalk();
  const { data: openSpace, isPending, isRejected } = useGetOpenSpace();
  //const pushToMyTalks = usePushToMyTalks();

  if (isTalkPending) return <Spinner />;
  if (!user || isRejected || isTalkRejected) return <RedirectToRoot />;
  if (openSpace && openSpace.finishedQueue) return <RedirectToRoot />;

  const subtitle = isPending ? <TinySpinner /> : openSpace.name;
  const onSubmit = ({ value: { name, description, meetingLink, trackId } }) => {
    alert(name);
    alert(description);
    alert(meetingLink);
    alert(trackId);
  };
  return (
    <TalkForm
      initialValues={talk}
      onSubmit={onSubmit}
      openSpace={openSpace}
      subtitle={subtitle}
      title={'Editar charla'}
    />
  );
};

export default EditTalk;
