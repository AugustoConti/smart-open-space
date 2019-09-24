import React from 'react';

import { Button } from 'grommet';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';

const ButtonNew = ({ onClick }) => (
  <Button icon={<Add />} label="Nuevo" onClick={onClick} primary />
);
ButtonNew.propTypes = { onClick: PropTypes.func.isRequired };

export default ButtonNew;
