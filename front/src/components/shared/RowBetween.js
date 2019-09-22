import React from 'react';

import { Box } from 'grommet';
import PropTypes from 'prop-types';

const RowBetween = ({ children, ...props }) => (
  <Box align="center" direction="row" justify="between" {...props}>
    {children}
  </Box>
);

RowBetween.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

export default RowBetween;
