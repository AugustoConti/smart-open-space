import React from 'react';
import { render } from 'react-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';

import App from './App';

toast.configure();

render(<App />, document.getElementById('root'));
