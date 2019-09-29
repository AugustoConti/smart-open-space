import React from 'react';

import { Button } from 'grommet';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';

const ButtonNew = ({ label, onClick }) => (
  <Button icon={<Add />} label={label} onClick={onClick} primary />
);
ButtonNew.defaultProps = { label: 'Nuevo' };
ButtonNew.propTypes = { label: PropTypes.string, onClick: PropTypes.func.isRequired };

export default ButtonNew;
