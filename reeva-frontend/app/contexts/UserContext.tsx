"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "@clerk/nextjs";

type UserContextType = {
  clerkUserId: string | undefined;
};

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [clerkUserId, setClerkUserId] = useState<string | undefined>(undefined);

  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      document.cookie = `clerk_id=${userId}; path=/; max-age=86400; secure; samesite=strict`;
      setClerkUserId(userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ clerkUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
