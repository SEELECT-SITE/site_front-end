"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Userboard() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }

  function LogOff() {
    signOut();
    redirect("/login");
  }

  return (
    <main className="p-12">
      {session?.user && (
        <>
          <Image
            width={100}
            height={100}
            alt="picture"
            src={session.user.image as string}
          />
          <div className="text-white">{session?.user.name}</div>
          <button onClick={() => LogOff()}>Sair</button>
        </>
      )}
    </main>
  );
}
