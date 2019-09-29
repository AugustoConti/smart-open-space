import React from 'react';

import PropTypes from 'prop-types';
import { Heading, Text, Box } from 'grommet';

import MyForm from './shared/MyForm';
import { useGetOS, createTalk } from '../helpers/api/os-client';

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
      <Box margin={{ vertical: 'medium' }}>
        <Heading level={2} margin="none">
          Nueva Charla
        </Heading>
        <Text color="dark-5">{os.name}</Text>
      </Box>
      <MyForm onSecondary={history.goBack} onSubmit={onSubmit}>
        <MyForm.Name label="Título" />
        <MyForm.Description />
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
