import { useEffect, useState } from 'react';

export function useTimedMessage(duration = 3200) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(''), duration);
    return () => window.clearTimeout(timeout);
  }, [duration, message]);

  return { message, showMessage: setMessage, clearMessage: () => setMessage('') };
}
