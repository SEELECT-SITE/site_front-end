"use client";
import { Button } from "@material-tailwind/react";
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
      <Button onClick={() => LogOff()}>Sair</Button>
    </>
  );
}


