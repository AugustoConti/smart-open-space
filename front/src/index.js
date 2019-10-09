import React from 'react';
import { render } from 'react-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';

import App from './App';
import { AuthProvider } from '#helpers/useAuth';

toast.configure();

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
