import { useEffect, useState } from 'react';

export const UseDebounce = <T>(value: T): T => {
  const [newValue, setNewValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setNewValue(value), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return newValue;
};
