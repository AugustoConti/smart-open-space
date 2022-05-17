import React from 'react';
import { Heading } from 'grommet';

import useAuth, { useUser } from '#helpers/useAuth';
import MyForm from '#shared/MyForm';
import {
  RedirectToRoot,
  usePushToRoot,
  usePushToRegister,
  useInRegister,
  usePushToOS,
} from '#helpers/routes';

const Login = ({ location }) => {
  const pushToRoot = usePushToRoot();
  const pushToRegister = usePushToRegister();
  const pushToOS = usePushToOS(location.state ? location.state.openSpaceId : 0);
  const afterSubmitting = location.state ? pushToOS : pushToRoot;
  const { login, register } = useAuth();
  const isRegister = useInRegister();
  const data = {
    title: isRegister ? 'Registrarse' : 'Iniciar sesión',
    secondaryLabel: isRegister ? undefined : 'Registrarse',
    onSecondary: isRegister ? undefined : pushToRegister,
    primaryLabel: isRegister ? 'Registrarme' : 'Ingresar',
    action: isRegister ? register : login,
  };
  const onSubmit = ({ value: userData }) => {
    return data.action(userData).then(afterSubmitting);
  };

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
