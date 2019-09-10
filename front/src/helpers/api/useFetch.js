import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const server = process.env.API_URI;

const useFetch = (fetch, path, setData = () => {}, body = {}) => {
  const logError = err => {
    console.error(err.response);
    const errorMsg = err.response ? err.response.data.message : 'Oops, ocurrió un error!';
    toast.error(errorMsg, { position: toast.POSITION.TOP_CENTER });
    throw err;
  };

  const URL = id => `${server}${path}`.replace('{id}', id);
  return ({ body: newBody, id } = {}) =>
    fetch(URL(id), newBody || body)
      .then(r => r.data)
      .then(setData)
      .catch(logError);
};

const useGet = (path, initial = {}, onError = () => {}) => {
  const [data, setData] = useState(initial);
  const fetch = useFetch(axios.get, path, setData);

  useEffect(() => {
    fetch().catch(onError);
  }, []);

  return [data, setData];
};

const usePut = (...args) => useFetch(axios.put, ...args);
const usePost = (...args) => useFetch(axios.post, ...args);

export { useGet, usePut, usePost };
