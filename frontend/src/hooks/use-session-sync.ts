"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * Hook untuk sync session token saat refresh token terjadi
 * Dengarkan event dari axios interceptor dan update session
 */
export function useSessionSync() {
  const { data: session, update } = useSession();

  useEffect(() => {
    const handleTokenUpdate = async (event: Event) => {
      // Type guard untuk CustomEvent
      if (!(event instanceof CustomEvent)) return;

      const { accessToken } = event.detail;

      if (accessToken && session) {
        console.log("Syncing session with new token...");
        // Update session dengan token baru
        await update({
          ...session,
          accessToken,
        });
        console.log("Session synced successfully");
      }
    };

    // Listen untuk token update dari axios interceptor
    window.addEventListener("session-token-updated", handleTokenUpdate);

    return () => {
      window.removeEventListener("session-token-updated", handleTokenUpdate);
    };
  }, [session, update]);
}
