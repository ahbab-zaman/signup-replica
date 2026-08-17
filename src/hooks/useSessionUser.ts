import { useEffect, useState } from "react";
import {
  getSessionUser,
  subscribeToSession,
  type SessionUser,
} from "@/lib/session";

export function useSessionUser(): SessionUser | null {
  const [user, setUser] = useState<SessionUser | null>(() => getSessionUser());

  useEffect(() => {
    return subscribeToSession(() => setUser(getSessionUser()));
  }, []);

  return user;
}