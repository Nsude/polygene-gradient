import { useEffect, useRef } from 'react'

const useCustomEffect = (callback: () => void, dependecies?: any[]) => {
  const runRef = useRef(false);
  useEffect(() => {
    if (runRef.current) {
      callback();
    }

    return () => { runRef.current = true };
  }, dependecies || []);
}

export default useCustomEffect;