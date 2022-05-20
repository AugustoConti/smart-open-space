import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

const useSocket = (endpoint, onUpdate, initialState) => {
  const [data, setData] = useState(initialState);
  const { id } = useParams();
  const socketRef = useRef();
  const onUpd = useCallback(
    (q) => {
      if (onUpdate) onUpdate();
      setData(q);
    },
    [onUpdate]
  );
  useEffect(() => {
    socketRef.current = new SockJS(`${process.env.API_URL}/${endpoint}`);
    socketRef.current.onmessage = (msg) => onUpd(JSON.parse(msg.data));
    socketRef.current.onopen = () => socketRef.current.send(id);
    return () => socketRef.current.close();
  }, [endpoint, id, onUpd]);
  return data;
};

const useQueue = (onUpdate) => useSocket('queueSocket', onUpdate);
const useSlots = (onUpdate) => useSocket('scheduleSocket', onUpdate, []);

export { useQueue, useSlots };
