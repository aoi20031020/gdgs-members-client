import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CallbackHandler() {
  console.log("CallbackHandler component rendered"); // デバッグログ

  const location = useLocation();
  const navigate = useNavigate();
  const { handleCallback } = useAuth();

  useEffect(() => {
    console.log("CallbackHandler useEffect triggered"); // デバッグログ
    const searchParams = new URLSearchParams(location.search);
    const loginId = searchParams.get("login_id");
    console.log("Login ID from URL:", loginId); // デバッグログ

    if (loginId) {
      console.log("Attempting to call handleCallback"); // デバッグログ
      handleCallback(loginId)
        .then(() => {
          console.log("handleCallback completed successfully");
          navigate("/members");
        })
        .catch((error) => {
          console.error("handleCallback failed:", error);
          navigate("/");
        });
    } else {
      console.error("No login_id found in URL");
      navigate("/");
    }
  }, [location, handleCallback, navigate]);

  return <div>Processing login... Please wait.</div>;
}
