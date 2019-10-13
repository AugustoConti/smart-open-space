import React from 'react';

import { Button, Form, FormField, Select, TextArea } from 'grommet';
import PropTypes from 'prop-types';

import MyProps from '#helpers/MyProps';
import { EmailIcon, PasswordIcon, TextIcon, TextAreaIcon } from '#shared/icons';
import Row from './Row';
import RowBetween from './RowBetween';

const MyField = ({ icon, label, ...props }) => (
  <FormField
    label={
      <Row>
        {icon}
        {label}
      </Row>
    }
    required
    {...props}
  />
);
MyField.propTypes = { icon: PropTypes.node, label: PropTypes.string.isRequired };

const MyFieldText = props => (
  <MyField icon={<TextIcon />} label="Nombre" name="name" {...props} />
);

const MyFieldTextArea = props => (
  <MyField
    icon={<TextAreaIcon />}
    label="Descripción"
    name="description"
    component={TextArea}
    required={false}
    {...props}
  />
);

const MyFieldEmail = props => (
  <MyField icon={<EmailIcon />} label="Email" name="email" type="email" {...props} />
);

const MyFieldPassword = props => (
  <MyField
    icon={<PasswordIcon />}
    label="Contraseña"
    name="password"
    type="password"
    {...props}
  />
);

const MyFieldSelect = props => (
  <MyField label="Elegir" name="select" component={Select} {...props} />
);

const Footer = ({ children }) => (
  <RowBetween margin={{ vertical: 'medium' }} justify="evenly">
    {children}
  </RowBetween>
);
Footer.propTypes = { children: MyProps.children.isRequired };

const MyForm = ({
  children,
  onSecondary,
  primaryLabel = 'Aceptar',
  secondaryLabel = 'Cancelar',
  ...props
}) => (
  <Form messages={{ invalid: 'Inválido', required: 'Obligatorio' }} {...props}>
    {children}
    <Footer>
      {onSecondary && <Button label={secondaryLabel} onClick={onSecondary} />}
      <Button label={primaryLabel} primary type="submit" />
    </Footer>
  </Form>
);
MyForm.propTypes = {
  children: MyProps.children.isRequired,
  onSecondary: PropTypes.func,
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
};

MyForm.Text = MyFieldText;
MyForm.TextArea = MyFieldTextArea;
MyForm.Email = MyFieldEmail;
MyForm.Field = MyField;
MyForm.Password = MyFieldPassword;
MyForm.Select = MyFieldSelect;

export default MyForm;
