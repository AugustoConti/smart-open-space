import React from 'react';
import { Redirect } from 'react-router-dom';

import { Heading } from 'grommet';

import useAuth, { useUser } from '#helpers/useAuth';
import MyProps from '#helpers/MyProps';
import MyForm from '#shared/MyForm';

const Login = ({ history, location: { pathname } }) => {
  const { login, register } = useAuth();
  const user = useUser();
  const isRegister = pathname === '/register';
  const data = {
    title: isRegister ? 'Registrarse' : 'Iniciar sesión',
    secondaryLabel: isRegister ? undefined : 'Registrarse',
    onSecondary: isRegister ? undefined : () => history.push('/register'),
    primaryLabel: isRegister ? 'Registrarme' : 'Ingresar',
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
        onSecondary={data.onSecondary}
        primaryLabel={data.primaryLabel}
        secondaryLabel={data.secondaryLabel}
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
Login.propTypes = { history: MyProps.history, location: MyProps.location };

export default Login;
