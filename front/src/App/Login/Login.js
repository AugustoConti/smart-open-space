import React from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';

import { Heading } from 'grommet';

import useAuth, { useUser } from '#helpers/useAuth';
import MyForm from '#shared/MyForm';

const Login = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { login, register } = useAuth();
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

  return useUser() ? (
    <Redirect to="/" />
  ) : (
    <>
      <Heading>{data.title}</Heading>
      <MyForm
        onSecondary={data.onSecondary}
        primaryLabel={data.primaryLabel}
        secondaryLabel={data.secondaryLabel}
        onSubmit={onSubmit}
        value={{ name: '', email: '', password: '' }}
      >
        {isRegister && <MyForm.Text />}
        <MyForm.Email />
        <MyForm.Password />
      </MyForm>
    </>
  );
};

export default Login;
