import { useEffect, useState } from 'react';

//실시간 검색방식을 채택했지만 불필요하게 너무 많은 요청 안하기 위해
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
