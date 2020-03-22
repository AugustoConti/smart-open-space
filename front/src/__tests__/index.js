import { within } from '@testing-library/react';
import ReactDOM from 'react-dom';

test('booting up the app from the index file does not break anything', async () => {
  // setup
  const div = document.createElement('div');
  div.setAttribute('id', 'root');
  document.body.appendChild(div);

  // run the file and wait for things to settle.
  require('..');
  const { getByText } = within(document.body);
  await getByText(/email/i);

  // cleanup
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
});
