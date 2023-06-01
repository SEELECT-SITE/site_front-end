"use client";
import { Button } from "@material-tailwind/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Kit() {
  const { data: session } = useSession();

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
      <Button onClick={() => signOut()}>Sair</Button>
      <div>seu kit é demais</div>
    </>
  );
}
