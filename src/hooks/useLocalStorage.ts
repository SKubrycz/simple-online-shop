import { useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    const storageItem = window.localStorage.getItem(key);
    if (storageItem) return JSON.parse(storageItem);
    else return [];
  });

  useEffect(() => {
    if (value === undefined) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);

  return [value, setValue];
}
