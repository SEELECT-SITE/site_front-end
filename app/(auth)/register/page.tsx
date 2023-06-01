"use client";
import GithubButton from "@/components/GithubButton";
import GoogleButton from "@/components/GoogleButton";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    redirect("/userboard");
  }

  return (
    <main className="w-full py-12">
      <div className="m-auto w-full max-w-sm bg-teal-100 rounded-md overflow-hidden px-4 py-8">
       
        <div className="flex flex-col items-center p-4 gap-8">
          <GoogleButton />
          <GithubButton />
        </div>
      </div>
    </main>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log("teste");
  return { props: {} };
};
