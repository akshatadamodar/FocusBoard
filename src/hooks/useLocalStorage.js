import { useEffect, useState } from 'react';
import { isValidTask } from '../utils/taskHelpers.js';

/**
 * Reads once on mount and writes on every value change.
 * Invalid JSON, unusable shapes and unavailable storage all fall back safely
 * to initialValue without destroying data that is already saved.
 */
export function useLocalStorage(key, initialValue, validate) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return initialValue;
      const parsed = JSON.parse(stored);
      if (typeof validate === 'function') {
        return validate(parsed) ? parsed : initialValue;
      }
      return parsed;
    } catch (error) {
      console.error(`Could not read ${key} from localStorage`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Could not save ${key} to localStorage`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export function isValidTaskArray(value) {
  return Array.isArray(value) && value.every(isValidTask);
}
