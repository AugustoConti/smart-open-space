import React from 'react';

import { Announce } from 'grommet-icons';

import { useGetOS, createTalk } from '#helpers/api/os-client';
import MyProps from '#helpers/MyProps';
import MainHeader from '#shared/MainHeader';
import MyForm from '#shared/MyForm';

const EditTalk = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [os] = useGetOS(id, () => history.push('/'));

  const onSubmit = ({ value: { name, description } }) => {
    createTalk(id, { name, description }).then(() =>
      history.push(`/os/${id}/mis-charlas`)
    );
  };

  return (
    <>
      <MainHeader>
        <MainHeader.Title icon={<Announce />} label="Nueva Charla" />
        <MainHeader.SubTitle label={os.name} />
      </MainHeader>
      <MyForm onSecondary={history.goBack} onSubmit={onSubmit}>
        <MyForm.Text label="Título" placeholder="¿De que trata tu charla?" />
        <MyForm.TextArea placeholder="Describí tu charla con mas detalle..." />
      </MyForm>
    </>
  );
};
EditTalk.propTypes = { match: MyProps.match, history: MyProps.history };

export default EditTalk;
