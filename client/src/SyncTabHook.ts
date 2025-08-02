import { useEffect } from "react";

export const useSyncTab = () => {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'persist:root') {
        window.location.reload();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
};
