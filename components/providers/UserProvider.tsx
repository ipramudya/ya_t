"use client";

import { UserData } from "@/types/user";
import { createContext, useCallback, useState } from "react";

interface UserContextType {
    user: UserData | null;
    updateUser: (newData: Partial<UserData>) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {}
});

export function UserProvider({
    children,
    user: initialUser
}: {
    children: React.ReactNode;
    user: UserData | null;
}) {
    const [user, setUser] = useState<UserData | null>(initialUser);

    const updateUser = useCallback((newData: Partial<UserData>) => {
        setUser((prevUser) => {
            if (!prevUser) return null;
            return { ...prevUser, ...newData };
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
