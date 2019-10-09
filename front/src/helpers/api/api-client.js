import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const logError = err => {
  console.error(err.response);
  const errorMsg = err.response ? err.response.data.message : 'Oops, ocurrió un error!';
  toast.error(errorMsg, { position: toast.POSITION.TOP_CENTER });
  throw err;
};

const doFetch = (fetch, path, body = {}) =>
  fetch(`${process.env.API_URL}${path}`, body)
    .then(r => r.data)
    .catch(logError);

const useGet = (path, initial = {}, onError = () => {}) => {
  const [data, setData] = useState(initial);
  useEffect(() => {
    doFetch(axios.get, path)
      .then(setData)
      .catch(onError);
  }, [onError, path]);
  return [data, setData];
};

const put = (path, body) => doFetch(axios.put, path, body);
const post = (path, body) => doFetch(axios.post, path, body);

export { useGet, put, post };
