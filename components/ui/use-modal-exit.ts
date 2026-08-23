'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const EXIT_DURATION = 180;

export function useModalExit(onExited: () => void) {
  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);
  const onExitedRef = useRef(onExited);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => { onExitedRef.current = onExited; }, [onExited]);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    timeoutRef.current = window.setTimeout(() => onExitedRef.current(), EXIT_DURATION);
  }, []);

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  return { isClosing, requestClose };
}
