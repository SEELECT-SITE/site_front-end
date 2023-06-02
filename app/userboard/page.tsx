"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Userboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  function LogOff() {
    signOut();
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
