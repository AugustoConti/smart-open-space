import React from 'react';
import { Redirect } from 'react-router-dom';

import { Button, Form, FormField, Heading } from 'grommet';
import PropTypes from 'prop-types';

import RowBetween from './shared/RowBetween';
import { useAuth } from '../helpers/useAuth';

const Login = ({ history, location: { pathname } }) => {
  const { getUser, login, register } = useAuth();
  const user = getUser();
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
      <Form
        messages={{ invalid: 'Inválido', required: 'Obligatorio' }}
        onSubmit={onSubmit}
        value={initialValues}
      >
        {isRegister && <FormField label="Nombre" name="name" required />}
        <FormField label="Email" name="email" type="email" required />
        <FormField label="Contraseña" name="password" type="password" required />
        <RowBetween margin={{ vertical: 'large' }}>
          <Button label={data.toTitle} onClick={() => history.push(data.toPath)} />
          <Button label={data.actionTitle} primary type="submit" />
        </RowBetween>
      </Form>
    </>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Login;
