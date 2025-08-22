// src/hooks/useAuthRedirect.ts
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function useAuthRedirect(error: any) {
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  }, [error, navigate]);
}
