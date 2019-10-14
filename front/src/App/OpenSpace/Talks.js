import React from 'react';

import Slider from 'react-slick';

import MyProps from '#helpers/MyProps';

const sliderSettings = {
  centerMode: true,
  arrows: false,
  dots: false,
  infinite: true,
  speed: 50,
  slidesToShow: 3,
  slidesToScroll: 1,
  focusOnSelect: true,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 960,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
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
