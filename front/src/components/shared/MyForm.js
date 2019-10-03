import React from 'react';

import { Form, Button, FormField, TextArea, Select } from 'grommet';
import PropTypes from 'prop-types';
import RowBetween from './RowBetween';

const MyFieldText = props => <FormField label="Nombre" name="name" required {...props} />;

const MyFieldTextArea = props => (
  <FormField label="Descripción" name="description" component={TextArea} {...props} />
);

const MyFieldEmail = props => (
  <FormField label="Email" name="email" type="email" required {...props} />
);

const MyFieldPassword = props => (
  <FormField label="Contraseña" name="password" type="password" required {...props} />
);

const MyFieldSelect = props => (
  <FormField label="Elegir" name="select" component={Select} required {...props} />
);

const MyForm = ({ children, onSecondary, primaryLabel, secondaryLabel, ...props }) => (
  <Form messages={{ invalid: 'Inválido', required: 'Obligatorio' }} {...props}>
    {children}
    <RowBetween margin={{ vertical: 'medium' }} justify="evenly">
      <Button label={secondaryLabel} onClick={onSecondary} />
      <Button label={primaryLabel} primary type="submit" />
    </RowBetween>
  </Form>
);

MyForm.defaultProps = {
  onSecondary: () => {},
  primaryLabel: 'Aceptar',
  secondaryLabel: 'Cancelar',
};

MyForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  onSecondary: PropTypes.func,
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
};

MyForm.Text = MyFieldText;
MyForm.TextArea = MyFieldTextArea;
MyForm.Email = MyFieldEmail;
MyForm.Password = MyFieldPassword;
MyForm.Select = MyFieldSelect;

export default MyForm;
