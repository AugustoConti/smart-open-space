import { findByText } from '@testing-library/react';
import ReactDOM from 'react-dom';

test('booting up the app from the index file does not break anything', async () => {
  const div = document.createElement('div');
  div.setAttribute('id', 'root');
  document.body.appendChild(div);
  require('..');
  await findByText(document.body, /email/i);

  // cleanup
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
});
