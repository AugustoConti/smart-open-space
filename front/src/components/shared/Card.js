import React from 'react';

import { Box } from 'grommet';
import PropTypes from 'prop-types';

const Card = ({ borderColor, borderSide = 'top', children, ...props }) => (
  <Box
    background="light-1"
    border={{ color: borderColor, size: 'medium', side: borderSide, style: 'outset' }}
    elevation="small"
    justify="between"
    pad="medium"
    round
    {...props}
  >
    {children}
  </Box>
);
Card.propTypes = {
  borderColor: PropTypes.string,
  borderSide: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

export default Card;
