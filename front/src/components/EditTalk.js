import React from 'react';

import PropTypes from 'prop-types';

import MainHeader from '#shared/MainHeader';
import MyForm from '#shared/MyForm';
import { useGetOS, createTalk } from '#helpers/api/os-client';

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
        <MainHeader.Title label="Nueva Charla" />
        <MainHeader.SubTitle label={os.name} />
      </MainHeader>
      <MyForm onSecondary={history.goBack} onSubmit={onSubmit}>
        <MyForm.Text label="Título" />
        <MyForm.TextArea />
      </MyForm>
    </>
  );
};

EditTalk.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func, push: PropTypes.func }).isRequired,
};

export default EditTalk;
