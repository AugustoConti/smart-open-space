import React from 'react';
import { Heading } from 'grommet';
import MyForm from '#shared/MyForm';
import PropTypes from 'prop-types';
import { RedirectToRoot, usePushToRoot, usePushToOpenSpace } from '#helpers/routes';
import { useUser } from '#helpers/useAuth';

const UserCredentialsForm = ({
  returnToOpenSpace,
  openSpaceId,
  data: { title, secondaryLabel, onSecondary, primaryLabel, action },
  hideFields: { hideEmail, hideName, hidePassword, hideConfirmPassword },
}) => {
  const pushToRoot = usePushToRoot();
  const pushToOpenSpace = usePushToOpenSpace(openSpaceId);
  const pushToRoute = returnToOpenSpace ? pushToOpenSpace : pushToRoot;
  let passwordValidation = '';

  const onSubmit = ({ value: userData }) => {
    return action(userData).then(pushToRoute);
  };

  const validateConfirm = (value) => {
    return value != passwordValidation && 'Las contraseñas deben coincidir';
  };

  const updatePasswordConfirm = (event) => {
    passwordValidation = event.target.value;
  };

  if (useUser()) return <RedirectToRoot />;

  return (
    <MyForm
      onSecondary={onSecondary}
      primaryLabel={primaryLabel}
      secondaryLabel={secondaryLabel}
      onSubmit={onSubmit}
      value={{ name: '', email: '', password: '', confirmPassword: '' }}
    >
      <Heading>{title}</Heading>
      {!hideName && <MyForm.Text />}
      {!hideEmail && <MyForm.Email />}
      {!hidePassword && <MyForm.Password onChange={updatePasswordConfirm} />}
      {!hideConfirmPassword && <MyForm.ConfirmPassword validate={validateConfirm} />}
    </MyForm>
  );
};
UserCredentialsForm.propTypes = {
  returnToOpenSpace: PropTypes.bool,
  openSpaceId: PropTypes.number.isRequired,
  data: {
    title: PropTypes.string.isRequired,
    secondaryLabel: PropTypes.string,
    onSecondaryLabel: PropTypes.func,
    primaryLabel: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  },
  hideFields: {
    hideName: PropTypes.bool,
    hideEmail: PropTypes.bool,
    hidePassword: PropTypes.bool,
  },
};

UserCredentialsForm.defaultProps = {
  data: {
    secondaryLabel: undefined,
    onSecondaryLabel: undefined,
  },
  hideFields: {
    hideName: false,
    hideEmail: false,
    hidePassword: false,
    hideConfirmPassword: false,
  },
};

export default UserCredentialsForm;
