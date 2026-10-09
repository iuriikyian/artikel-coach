import { useEffect, useState } from 'react';

// useState that is persisted to localStorage under `key`.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch {
      // fall through to the initial value
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable (e.g. private mode) — keep in-memory state
    }
  }, [key, value]);

  return [value, setValue];
}
