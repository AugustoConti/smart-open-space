import { useState, useEffect } from 'react';

const getSocket = (endpoint, id, onUpdate) => {
  // eslint-disable-next-line no-undef
  const webSocket = new SockJS(`${process.env.API_URL}/${endpoint}`);
  webSocket.onmessage = msg => onUpdate(JSON.parse(msg.data));
  webSocket.onopen = () => webSocket.send(id);
  return () => webSocket.close();
};

const useQueue = (id, onUpdate = () => {}) => {
  const [queue, setQueue] = useState();
  const onUpd = q => {
    onUpdate();
    setQueue(q);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getSocket('queueSocket', id, onUpd), [id]);
  return queue;
};

const useSlots = id => {
  const [slots, setSlots] = useState([]);
  useEffect(() => getSocket('scheduleSocket', id, setSlots), [id]);
  return slots;
};

export { useQueue, useSlots };
