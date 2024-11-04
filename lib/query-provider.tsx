"use client";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient, _] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
