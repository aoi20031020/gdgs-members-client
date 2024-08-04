import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { API_BASE_URL } from "../config";

export function useAuthenticatedFetch() {
  const { sessionToken, logout } = useAuth();

  const authFetch = useCallback(
    async (path: string, options: RequestInit = {}) => {
      if (!sessionToken) {
        throw new Error("No session token available");
      }

      const headers = new Headers(options.headers);
      headers.set("Authorization", `Session ${sessionToken}`);

      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        // Session expired or invalid
        await logout();
        throw new Error("Session expired");
      }

      const expiresAt = response.headers.get("X-Session-Expires-At");
      if (expiresAt) {
        // You might want to handle session expiration here
        console.log(
          "Session expires at:",
          new Date(parseInt(expiresAt, 10) * 1000)
        );
      }

      return response;
    },
    [sessionToken, logout]
  );

  return authFetch;
}
