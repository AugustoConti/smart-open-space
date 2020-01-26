import React from 'react';
import { render } from 'react-dom';
import HttpsRedirect from 'react-https-redirect';

import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';
import LogRocket from 'logrocket';

import App from './App';

process.env.LOGROCKET_KEY && LogRocket.init(process.env.LOGROCKET_KEY);
toast.configure();

render(
  <HttpsRedirect>
    <App />
  </HttpsRedirect>,
  document.getElementById('root')
);
