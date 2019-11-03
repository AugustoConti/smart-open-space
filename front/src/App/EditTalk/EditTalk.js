import React from 'react';
import { useHistory } from 'react-router-dom';

import { useGetOS, createTalk } from '#api/os-client';
import { TalkIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyForm from '#shared/MyForm';
import { TinySpinner } from '#shared/Spinner';
import { RedirectToRoot, usePushToMyTalks } from '#helpers/routes';

const EditTalk = () => {
  const history = useHistory();
  const pushToMyTalks = usePushToMyTalks();
  const { data: os, isPending, isRejected } = useGetOS();

  if (isRejected) return <RedirectToRoot />;

  const onSubmit = ({ value: { name, description } }) =>
    createTalk(os.id, { name, description }).then(pushToMyTalks);

  return (
    <>
      <MainHeader>
        <MainHeader.Title icon={TalkIcon} label="Nueva Charla" />
        <MainHeader.SubTitle>{isPending ? <TinySpinner /> : os.name}</MainHeader.SubTitle>
      </MainHeader>
      <MyForm onSecondary={history.goBack} onSubmit={onSubmit}>
        <MyForm.Text label="Título" placeholder="¿De que trata tu charla?" />
        <MyForm.TextArea placeholder="Describí tu charla con mas detalle..." />
      </MyForm>
    </>
  );
};

export default EditTalk;
