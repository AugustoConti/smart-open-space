import React from 'react';

import { Box, Text } from 'grommet';

const Header = () => {
  return (
    <Box
      align="center"
      background={{ color: 'brand', dark: false }}
      direction="row"
      flex={false}
      justify="between"
      pad={{ vertical: 'xsmall', left: 'medium' }}
      responsive={false}
      tag="header"
    >
      <Text color="light-1">Smart Open Space</Text>
    </Box>
  );
};

export default Header;
