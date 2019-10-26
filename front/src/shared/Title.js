import React from 'react';

import { Heading } from 'grommet';
import PropTypes from 'prop-types';
import MyProps from '#helpers/MyProps';

const Title = ({ children, label, ...props }) => (
  <Heading alignSelf="center" level="4" margin="none" textAlign="center" {...props}>
    {label}
    {children}
  </Heading>
);
Title.propTypes = { children: MyProps.children, label: PropTypes.string };

export default Title;
