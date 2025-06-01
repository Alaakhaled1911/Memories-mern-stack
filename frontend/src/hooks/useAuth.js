"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated]);

  return {
    user,
    isAuthenticated,
    loading,
  };
};
