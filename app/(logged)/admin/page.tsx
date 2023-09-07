"use client";
import Title from "@/components/Title";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div>
      <Title>pagina do admin</Title>
      <button
        onClick={() => {
          signOut({ redirect: false });
          router.replace("/");
        }}
      >
        sair
      </button>
    </div>
  );
}
