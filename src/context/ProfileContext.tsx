import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { API } from "../configs";
import { User } from "../types";
import { useAuth } from "./AuthContext";

interface ProfileContextType {
  userProfile: User | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, user: authUser, isAuthenticated, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<User | null>(authUser);
  const [isLoading, setIsLoading] = useState(false);

  const refreshProfile = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API.BE.AUTH.PROD}/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to verify token");
      }

      const data = await response.json();
      if (data.status === "OK" && data.user) {
        setUserProfile(data.user);
        // Also update the stored user in localStorage to keep it in sync for AuthContext
        localStorage.setItem("connectwm-user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.error("Error refreshing profile:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, logout]);

  // Sync with AuthContext user when login/logout happens
  useEffect(() => {
    setUserProfile(authUser);
  }, [authUser]);

  // Initial fetch on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [isAuthenticated, refreshProfile]);

  return (
    <ProfileContext.Provider value={{ userProfile, isLoading, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
