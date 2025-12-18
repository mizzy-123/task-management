"use client";

import { ToasterProvider } from "@/context/ToasterContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React, { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DialogProvider } from "@/context/DialogContext";
import { useSessionSync } from "@/hooks/use-session-sync";

function SessionSyncWrapper({ children }: { children: React.ReactNode }) {
  // Hook untuk sync session saat refresh token
  useSessionSync();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <SessionSyncWrapper>
        <QueryClientProvider client={queryClient}>
          <ToasterProvider>
            <DialogProvider>{children}</DialogProvider>
          </ToasterProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionSyncWrapper>
    </SessionProvider>
  );
}
