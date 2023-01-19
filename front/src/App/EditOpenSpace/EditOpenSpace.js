import React from 'react';
import { useHistory } from 'react-router-dom';

import { useGetOpenSpace, updateOS } from '#api/os-client';
import { useUser } from '#helpers/useAuth';
import { RedirectToRoot, usePushToRoot } from '#helpers/routes';
import { OpenSpaceForm } from './OpenSpaceForm';
import Spinner from '#shared/Spinner';

const EditOpenSpace = () => {
  const history = useHistory();
  const user = useUser();
  const pushToRoot = usePushToRoot();

  const { data: openSpace, isPending } = useGetOpenSpace();
  if (isPending) return <Spinner />;

  if (!user) return <RedirectToRoot />;

  const onSubmit = ({ value: { name } }) => {
    openSpace.name = name;
    updateOS(openSpace.id, openSpace).then(pushToRoot());
  };

  return (
    <OpenSpaceForm
      history={history}
      title={'Editar Open Space'}
      onSubmit={onSubmit}
      initialValues={openSpace}
      isNewOpenSpace={false}
    />
  );
};

export default EditOpenSpace;
