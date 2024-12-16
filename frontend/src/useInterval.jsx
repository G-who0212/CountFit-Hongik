import { useRef, useEffect } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef(null);
  
  // 콜백함수 저장
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
   
  // 인터벌 설정 및 정리
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}