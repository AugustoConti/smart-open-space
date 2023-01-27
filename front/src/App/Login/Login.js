import React, { useState } from 'react';
import { Heading } from 'grommet';

import useAuth, { useUser } from '#helpers/useAuth';
import MyForm from '#shared/MyForm';
import {
  RedirectToRoot,
  usePushToRoot,
  usePushToRegister,
  useInRegister,
  usePushToOpenSpace,
  usePushToRegisterFromOpenSpace,
} from '#helpers/routes';

const Login = ({ location: { state } }) => {
  const returnToOpenSpace = hasOpenSpaceId(state);
  const openSpaceId = state?.openSpaceId;
  const pushToRoot = usePushToRoot();
  const pushToOpenSpace = usePushToOpenSpace(openSpaceId);
  const pushToRegisterAndThenGoToRoot = usePushToRegister();
  const pushToRegisterAndThenGoToOpenSpace = usePushToRegisterFromOpenSpace(openSpaceId);

  const pushToRoute = returnToOpenSpace ? pushToOpenSpace : pushToRoot;
  const pushToRegister = returnToOpenSpace
    ? pushToRegisterAndThenGoToOpenSpace
    : pushToRegisterAndThenGoToRoot;

  const { login, register } = useAuth();
  const isRegister = useInRegister();
  const data = {
    title: isRegister ? 'Registrarse' : 'Iniciar sesión',
    secondaryLabel: isRegister ? undefined : 'Registrarse',
    onSecondary: isRegister ? undefined : pushToRegister,
    primaryLabel: isRegister ? 'Registrarme' : 'Ingresar',
    action: isRegister ? register : login,
  };
  let passwordValidation = '';

  const onSubmit = ({ value: userData }) => {
    return data.action(userData).then(pushToRoute);
  };

  if (useUser()) return <RedirectToRoot />;

  const validateConfirm = (value) => {
    return value != passwordValidation && 'Las contraseñas deben coincidir';
  };

  const updatePasswordConfirm = (event) => {
    passwordValidation = event.target.value;
  };

  return (
    <MyForm
      onSecondary={data.onSecondary}
      primaryLabel={data.primaryLabel}
      secondaryLabel={data.secondaryLabel}
      onSubmit={onSubmit}
      value={{ name: '', email: '', password: '', confirmPassword: '' }}
    >
      <Heading>{data.title}</Heading>
      {isRegister && <MyForm.Text />}
      <MyForm.Email />
      <MyForm.Password onChange={updatePasswordConfirm} />
      {isRegister && <MyForm.ConfirmPassword validate={validateConfirm} />}
    </MyForm>
  );
};

function hasOpenSpaceId(state) {
  return state && state.openSpaceId;
}

export default Login;
