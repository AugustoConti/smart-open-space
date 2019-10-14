import React from 'react';

import { Box, RangeSelector, Stack } from 'grommet';
import PropTypes from 'prop-types';

import RowBetween from '#shared/RowBetween';

const TimeSelector = ({ onChange, value, ...props }) => (
  <Stack>
    <RowBetween>
      {[...Array(16)].map((_, v) => (
        <Box
          align="center"
          border={false}
          height="xxsmall"
          // eslint-disable-next-line react/no-array-index-key
          key={v}
          pad="small"
          width="xxsmall"
        >
          {v + 8}
        </Box>
      ))}
    </RowBetween>
    <RangeSelector
      direction="horizontal"
      max={23}
      min={8}
      onChange={values => onChange({ value: values })}
      round="small"
      size="full"
      values={value}
      {...props}
    />
  </Stack>
);
TimeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TimeSelector;
