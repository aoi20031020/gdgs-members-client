import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("session");
    if (storedToken) {
      setSessionToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async () => {
    console.log("Login function called"); // デバッグログ
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem("code_verifier", codeVerifier);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const url = new URL(`${API_BASE_URL}/login`);
    url.searchParams.set("code_challenge", codeChallenge);
    console.log("Redirecting to:", url.toString()); // デバッグログ

    window.location.href = url.toString();
  }, []);

  const handleCallback = useCallback(
    async (loginId: string) => {
      const codeVerifier = localStorage.getItem("code_verifier");
      if (!codeVerifier) {
        console.error("Code verifier not found");
        return;
      }
      console.log("handleCallback");
      try {
        const response = await fetch(`${API_BASE_URL}/session`, {
          method: "POST",
          body: JSON.stringify({
            login_id: loginId,
            code_verifier: codeVerifier,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "Failed to exchange authorization code for session token:",
            errorText
          );
          return;
        }

        const result = await response.json();
        const newSessionToken = result.session;
        localStorage.setItem("session", newSessionToken);
        setSessionToken(newSessionToken);
        setIsAuthenticated(true);
        console.log("ok!!");
        navigate("/members");
      } catch (error) {
        console.error("Login failed:", error);
        throw error; // エラーを再スローして、呼び出し元で処理できるようにする
        // navigate("/");
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    if (sessionToken) {
      try {
        await fetch(`${API_BASE_URL}/session`, {
          method: "DELETE",
          headers: {
            Authorization: `Session ${sessionToken}`,
          },
        });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    localStorage.removeItem("session");
    localStorage.removeItem("code_verifier");
    setSessionToken(null);
    setIsAuthenticated(false);
    navigate("/");
  }, [sessionToken, navigate]);

  return {
    isAuthenticated,
    sessionToken,
    login,
    handleCallback,
    logout,
  };
}

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(hash));
}

function base64UrlEncode(array: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, Array.from(array)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
