"use client";
import { EventEditForm } from "@/components/EventEditForm";
import useEventPageState from "@/components/EventEditForm/event.store";
import EventsTable from "@/components/EventsTable";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/query-provider";
import { useSession } from "next-auth/react";

export default function EventsPage() {
  const { toEditEvent } = useEventPageState();
  const { data: session } = useSession();
  if (!session?.user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-20 p-3 ">
      <QueryProvider>
        <EventsTable />
        {toEditEvent && (
          <EventEditForm Token={session.user.token} toEditEvent={toEditEvent} />
        )}
        <Toaster />
      </QueryProvider>
    </main>
  );
}
