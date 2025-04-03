import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // ログイン処理
  const login = useCallback(async (fullName: string, studentId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, studentId }),
      });
  
      if (!response.ok) {
        console.log("Login failed:", response.statusText);
        throw new Error("ログインに失敗しました");
      }
  
      const data = await response.json();
      sessionStorage.setItem("authToken", data.token);
      setIsAuthenticated(true);
      console.log("Login successful:", data);
  
      // 100ms 待ってから navigate を実行する
      setTimeout(() => navigate("/members"), 100);
    } catch (error) {
      console.error("Login error:", error);
      alert("ログインに失敗しました");
    }
  }, [navigate]);
  

  // ログアウト処理
  const logout = useCallback(() => {
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  }, [navigate]);

  // セッションチェック
  const checkSessionToken = useCallback(() => {
    const token = sessionStorage.getItem("authToken");
  
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  
  useEffect(() => {
    checkSessionToken();
  }, [checkSessionToken]);

  return { isAuthenticated, login, logout, checkSessionToken };
};
