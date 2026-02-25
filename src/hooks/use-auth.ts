"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("velora_user");
      const isLoggedIn = !!raw;

      if (!isLoggedIn && pathname !== "/auth/login") {
        router.replace("/auth/login");
      } else {
        setIsReady(true);
      }
    } catch {
      setIsReady(true);
    }
  }, [router, pathname]);

  return { isReady };
}

