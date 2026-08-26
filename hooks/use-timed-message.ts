import { useCallback, useEffect, useState } from 'react';

export function useTimedMessage(duration = 3200) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) return;

    const timeout = window.setTimeout(() => setMessage(''), duration);
    return () => window.clearTimeout(timeout);
  }, [duration, message]);

  const showMessage = useCallback((nextMessage: string) => {
    setMessage(nextMessage);
  }, []);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  return {
    message,
    showMessage,
    clearMessage,
  };
}
