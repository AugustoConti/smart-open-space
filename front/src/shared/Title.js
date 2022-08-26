import React from 'react';

import { Heading } from 'grommet';
import PropTypes from 'prop-types';
import MyProps from '#helpers/MyProps';

const Title = ({ children, label, ...props }) => (
  <Heading level="4" textAlign="center" truncate {...props}>
    {label}
    {children}
  </Heading>
);
Title.propTypes = { children: MyProps.children, label: PropTypes.string };

export default Title;
