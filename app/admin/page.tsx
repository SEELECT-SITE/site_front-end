'use client'
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { CgLogOut } from "react-icons/cg";

export default function Admin() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>carregando...</div>;
  }

  return (
    <>
      {session?.user && (
        <>
          <Image
            width={100}
            height={100}
            alt="picture"
            src={session.user.image as string}
          />
          <div>{session?.user.name}</div>
          <div>{session?.user.role}</div>
          <button
            className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <span className="absolute -end-full transition-all group-hover:end-4">
              <CgLogOut size={20} />
            </span>

            <span className="text-sm font-medium transition-all group-hover:me-4">
              Sair
            </span>
          </button>
        </>
      )}
      <div>voce é admin</div>
      <div>uhuuul</div>
    </>
  );
}
