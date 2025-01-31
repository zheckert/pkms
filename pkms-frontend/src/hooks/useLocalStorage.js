import { useEffect } from "react";

export const useLocalStorage = (key, callback) => {
  useEffect(() => {
    const checkStorage = () => {
      const value = localStorage.getItem(key);
      if (!value) {
        callback();
      }
    };

    window.addEventListener("storage", checkStorage);
    return () => window.removeEventListener("storage", checkStorage);
  }, [key, callback]);
};
