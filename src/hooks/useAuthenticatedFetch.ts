import { useCallback } from "react";
import { useAuth } from "./useAuth"; // パスは実際の場所に合わせて調整してください

export function useAuthenticatedFetch() {
  const { checkSessionToken } = useAuth();

  return useCallback(
    async (url: string, options: RequestInit = {}) => {
      const token = checkSessionToken();
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Session ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    [checkSessionToken]
  );
}
