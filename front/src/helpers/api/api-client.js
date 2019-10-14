import { toast } from 'react-toastify';

const doFetch = async (method, endpoint, body) => {
  const config = {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  };
  const r = await window.fetch(`${process.env.API_URL}/${endpoint}`, config);
  const r1 = await r.json();
  if (!r1.error) return r1;
  console.error(r1);
  // const errorMsg = err.response ? err.response.data.message : 'Oops, ocurrió un error!';
  toast.error(r1.message, { position: toast.POSITION.TOP_CENTER });
  throw new Error(r1.message);
};

const get = endpoint => doFetch('GET', endpoint);
const put = (endpoint, body) => doFetch('PUT', endpoint, body);
const post = (endpoint, body) => doFetch('POST', endpoint, body);

export { get, put, post };
