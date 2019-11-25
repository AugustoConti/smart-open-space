import React from 'react';
import { Box, Grid } from 'grommet';

import MyProps from '#helpers/MyProps';
import useSize from '#helpers/useSize';

const areasThree = [
  ['headerL', 'header', 'headerR'],
  ['l', 'main', 'r'],
];

const layouts = {
  small: {
    areas: [['header'], ['main']],
    columns: ['flex'],
    pad: { horizontal: 'medium' },
  },
  medium: { areas: areasThree, columns: ['flex', 'large', 'flex'] },
  large: { areas: areasThree, columns: ['flex', 'xlarge', 'flex'] },
};

const useMainLayout = () => layouts[useSize()];

const BoxBrand = ({ children, ...props }) => (
  <Box background="brand" {...props}>
    {children}
  </Box>
);
BoxBrand.propTypes = { children: MyProps.children };

const MainLayout = ({ children, header }) => {
  const { areas, columns, pad } = useMainLayout();
  return (
    <Box fill background="light-3" overflow="auto">
      <Grid areas={areas} columns={columns} fill rows={['xxsmall', 'flex']}>
        <BoxBrand gridArea="headerL" />
        <BoxBrand gridArea="headerR" />
        <BoxBrand gridArea="header" pad={pad}>
          {header}
        </BoxBrand>
        <Box as="main" gridArea="main" pad={pad}>
          <div>{children}</div>
        </Box>
      </Grid>
    </Box>
  );
};
MainLayout.propTypes = {
  children: MyProps.children.isRequired,
  header: MyProps.children.isRequired,
};

export default MainLayout;
