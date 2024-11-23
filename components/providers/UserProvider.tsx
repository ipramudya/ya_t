"use client";

import { UserData } from "@/types/user";
import { createContext, type PropsWithChildren } from "react";

interface UserContextType {
    user: UserData | null;
}

export const UserContext = createContext<UserContextType>({ user: null });

interface UserProviderProps extends PropsWithChildren {
    user: UserData | null;
}

export function UserProvider({ children, user }: UserProviderProps) {
    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}
