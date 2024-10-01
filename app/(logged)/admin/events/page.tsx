"use client";
import { useSession } from "next-auth/react";
import EventsAdmin from "../admin-components/EventsAdmin.tsx";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/utils/queryClient";

export default function EventsAdminPage() {
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  const { user } = session;
  if (!user) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <EventsAdmin user={user} />
    </QueryClientProvider>
  );
}
