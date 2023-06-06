"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Kit() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>carregando...</div>;
  }
  return (
    <>
      {session?.user?.image && (
        <Image
          width={100}
          height={100}
          alt="picture"
          src={session.user.image}
        />
      )}
      <div className="text-white">{session?.user?.name}</div>
      <button onClick={() => signOut()}>Sair</button>
      <div>seu kit é demais</div>
    </>
  );
}
