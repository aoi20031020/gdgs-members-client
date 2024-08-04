import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CallbackHandler() {
  const [searchParams] = useSearchParams();
  const { handleCallback } = useAuth();

  useEffect(() => {
    const loginId = searchParams.get("login_id");
    if (loginId) {
      handleCallback(loginId);
    }
  }, [searchParams, handleCallback]);

  return <div>Processing login...</div>;
}
