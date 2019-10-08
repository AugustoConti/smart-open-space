import React from 'react';

import { Grid } from 'grommet';
import PropTypes from 'prop-types';

const MyGrid = ({ children }) => (
  <Grid columns="small" gap="medium" margin={{ bottom: 'medium' }}>
    {children}
  </Grid>
);
MyGrid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MyGrid;
