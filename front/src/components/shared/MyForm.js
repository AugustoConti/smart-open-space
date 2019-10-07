import React from 'react';

import { Form, Button, FormField, TextArea, Select, Box } from 'grommet';
import { Article, DocumentText, MailOption, Lock } from 'grommet-icons';
import PropTypes from 'prop-types';

import RowBetween from './RowBetween';

const MyField = ({ icon, label, ...props }) => (
  <FormField
    label={
      <Box direction="row" gap="small">
        {icon}
        {label}
      </Box>
    }
    required
    {...props}
  />
);
MyField.propTypes = { icon: PropTypes.node, label: PropTypes.string.isRequired };

const MyFieldText = props => (
  <MyField icon={<Article />} label="Nombre" name="name" {...props} />
);

const MyFieldTextArea = props => (
  <MyField
    icon={<DocumentText />}
    label="Descripción"
    name="description"
    component={TextArea}
    required={false}
    {...props}
  />
);

const MyFieldEmail = props => (
  <MyField icon={<MailOption />} label="Email" name="email" type="email" {...props} />
);

const MyFieldPassword = props => (
  <MyField
    icon={<Lock />}
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
Footer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
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
