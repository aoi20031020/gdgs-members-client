import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { Member } from "../tepe/members";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<Member | null>(null);
  const navigate = useNavigate();

  const login = useCallback(
    async (fullName: string, studentId: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, studentId }),
        });

        if (!response.ok) {
          throw new Error("コアメンバーのみログインできます");
        }

        const data = await response.json();
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user)); // ユーザー情報を保存

        setIsAuthenticated(true);
        setUser(data.user);

        setTimeout(() => navigate("/members"), 100);
      } catch (error) {
        console.error("Login error:", error);
        alert("コアメンバーのみログインできます");
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const checkSessionToken = useCallback(() => {
    const token = sessionStorage.getItem("authToken");
    const storedUser = sessionStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkSessionToken();
  }, [checkSessionToken]);

  return { isAuthenticated, user, login, logout, checkSessionToken };
};
