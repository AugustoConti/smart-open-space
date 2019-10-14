import React from 'react';

import { Grid } from 'grommet';
import MyProps from '#helpers/MyProps';

const MyGrid = ({ children }) => (
  <Grid columns="small" gap="medium" margin={{ bottom: 'medium' }}>
    {children}
  </Grid>
);
MyGrid.propTypes = { children: MyProps.children };

export default MyGrid;
