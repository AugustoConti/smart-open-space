import PropTypes from 'prop-types';

const MyProps = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MyProps;
