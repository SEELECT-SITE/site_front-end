"use client";
import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { User } from "next-auth";
import axios from "axios";
import { axiosClient } from "@/lib/utils";

interface EventsAdminProps {
  className?: string;
  children?: ReactNode;
  user: User;
}

export default function EventsAdmin({
  className,
  children,
  user,
}: EventsAdminProps) {
  const [isEventsOpen, setIsEventsOpen] = useState<boolean>(false);

  const {
    data: events,
    isLoading,
    refetch,
  } = useQuery<any | undefined>(
    "userEvents",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "true",
        Token: user?.token,
      };
      try {
        const { data } = await axiosClient.get(`api/users/`, {
          headers,
        });
        return data.results;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnWindowFocus: false }
  );

  return <></>;
}
