import React from 'react';
import { render } from 'react-dom';
import HttpsRedirect from 'react-https-redirect';

import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';

import App from './App';

toast.configure();

render(
  <HttpsRedirect>
    <App />
  </HttpsRedirect>,
  document.getElementById('root')
);
