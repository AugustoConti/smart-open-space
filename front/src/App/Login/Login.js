import React from 'react';
import { Heading } from 'grommet';

import useAuth, { useUser } from '#helpers/useAuth';
import MyForm from '#shared/MyForm';
import {
  RedirectToRoot,
  usePushToRoot,
  usePushToRegister,
  useInLogin,
} from '#helpers/routes';

const Login = () => {
  const pushToRoot = usePushToRoot();
  const pushToRegister = usePushToRegister();
  const { login, register } = useAuth();
  const isRegister = !useInLogin();
  const data = {
    title: isRegister ? 'Registrarse' : 'Iniciar sesión',
    secondaryLabel: isRegister ? undefined : 'Registrarse',
    onSecondary: isRegister ? undefined : pushToRegister,
    primaryLabel: isRegister ? 'Registrarme' : 'Ingresar',
    action: isRegister ? register : login,
  };
  const onSubmit = ({ value: userData }) => data.action(userData).then(pushToRoot);

  if (useUser()) return <RedirectToRoot />;

  return (
    <MyForm
      onSecondary={data.onSecondary}
      primaryLabel={data.primaryLabel}
      secondaryLabel={data.secondaryLabel}
      onSubmit={onSubmit}
      value={{ name: '', email: '', password: '' }}
    >
      <Heading>{data.title}</Heading>
      {isRegister && <MyForm.Text />}
      <MyForm.Email />
      <MyForm.Password />
    </MyForm>
  );
};

export default Login;
