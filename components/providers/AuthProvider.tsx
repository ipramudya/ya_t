"use client";

import { createContext, PropsWithChildren } from "react";

interface AuthContextType {
    user: {
        userId: string;
        email: string;
    } | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

interface AuthProviderProps extends PropsWithChildren {
    user: {
        userId: string;
        email: string;
    } | null;
}

export function AuthProvider({ children, user }: AuthProviderProps) {
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}
