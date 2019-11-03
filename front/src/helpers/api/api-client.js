import { toast } from 'react-toastify';

const doFetch = method => async (endpoint, body) => {
  const config = {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  };
  try {
    const r = await window.fetch(`${process.env.API_URL}/${endpoint}`, config);
    const r1 = await r.json();
    if (r1.error) {
      throw new Error(r1.message);
    }
    return r1;
  } catch (e) {
    console.error(e);
    // const errorMsg = err.response ? err.response.data.message : 'Oops, ocurrió un error!';
    toast.error(e.message, { position: toast.POSITION.TOP_CENTER });
    throw new Error(e.message);
  }
};

const get = doFetch('GET');
const put = doFetch('PUT');
const post = doFetch('POST');

export { get, put, post };
