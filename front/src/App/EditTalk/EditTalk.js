import React from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import { useGetOS, createTalk } from '#api/os-client';
import { TalkIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyForm from '#shared/MyForm';
import { TinySpinner } from '#shared/Spinner';

const EditTalk = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: os, isPending, isRejected } = useGetOS(id);

  if (isRejected) return <Redirect to="/" />;

  const onSubmit = ({ value: { name, description } }) => {
    createTalk(id, { name, description }).then(() => history.push(`/os/${id}/myTalks`));
  };

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
