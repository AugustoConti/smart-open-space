import { within, waitForElement } from '@testing-library/react';
import ReactDOM from 'react-dom';

test('booting up the app from the index file does not break anything', async () => {
  const div = document.createElement('div');
  div.setAttribute('id', 'root');
  document.body.appendChild(div);
  // eslint-disable-next-line global-require
  require('..');
  const { getByLabelText } = within(document.body);
  await waitForElement(() => getByLabelText(/email/i));
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
});
