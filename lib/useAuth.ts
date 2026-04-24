// lib/useAuth.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "./auth";

/**
 * Use this hook in protected client components.
 * Middleware handles server-side redirection, but this catches
 * cases where the cookie isn't set (token only in localStorage).
 */
export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
    }
  }, [router]);
}
