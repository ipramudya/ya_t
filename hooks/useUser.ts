import { UserContext } from "@/components";
import { useContext } from "react";

export function useUser() {
    return useContext(UserContext);
}
