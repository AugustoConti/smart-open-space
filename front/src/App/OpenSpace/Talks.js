import React from 'react';

import Slider from 'react-slick';

import MyProps from '#helpers/MyProps';

const sliderSettings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 960,
      settings: { slidesToShow: 2, slidesToScroll: 2 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const Talks = ({ children }) => <Slider {...sliderSettings}>{children}</Slider>;
Talks.propTypes = { children: MyProps.children.isRequired };

export default Talks;
