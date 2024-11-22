import { AuthContext } from "@/components";
import { useContext } from "react";

export function useAuth() {
    return useContext(AuthContext);
}
