import React from 'react';
import { Redirect } from 'react-router-dom';

import { Heading } from 'grommet';
import PropTypes from 'prop-types';

import useAuth, { useUser } from '../helpers/useAuth';
import MyForm from './shared/MyForm';

const Login = ({ history, location: { pathname } }) => {
  const { login, register } = useAuth();
  const user = useUser();
  const isRegister = pathname === '/register';
  const data = {
    title: isRegister ? 'Registrarse' : 'Iniciar sesión',
    toTitle: isRegister ? 'Iniciar sesión' : 'Registrarse',
    toPath: isRegister ? '/login' : '/register',
    actionTitle: isRegister ? 'Registrarme' : 'Ingresar',
    action: isRegister ? register : login,
  };

  const onSubmit = ({ value: userData }) =>
    data.action(userData).then(() => history.push('/'));

  const initialValues = { name: '', email: '', password: '' };

  return user ? (
    <Redirect to="/" />
  ) : (
    <>
      <Heading>{data.title}</Heading>
      <MyForm
        onSecondary={() => history.push(data.toPath)}
        primaryLabel={data.actionTitle}
        secondaryLabel={data.toTitle}
        onSubmit={onSubmit}
        value={initialValues}
      >
        {isRegister && <MyForm.Text />}
        <MyForm.Email />
        <MyForm.Password />
      </MyForm>
    </>
  );
};

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default Login;
