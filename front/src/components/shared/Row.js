import React from 'react';

import { Box } from 'grommet';
import PropTypes from 'prop-types';

const Row = ({ children, ...props }) => (
  <Box align="center" direction="row" gap="small" {...props}>
    {children}
  </Box>
);
Row.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Row;
