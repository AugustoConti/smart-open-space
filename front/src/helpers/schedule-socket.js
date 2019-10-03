import { useState, useEffect } from 'react';

const getSocket = (path, id, onUpdate) => {
  // eslint-disable-next-line no-undef
  const webSocket = new SockJS(`${process.env.API_URL}${path}`);
  webSocket.onmessage = msg => onUpdate(JSON.parse(msg.data));
  webSocket.onopen = () => webSocket.send(id);
  return () => webSocket.close();
};

const useSlots = id => {
  const [slots, setSlots] = useState([]);
  useEffect(() => getSocket('/scheduleSocket', id, setSlots), [id]);
  return slots;
};

export default useSlots;
