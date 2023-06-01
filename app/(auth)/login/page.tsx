"use client";
import GithubButton from "@/components/GithubButton";
import GoogleButton from "@/components/GoogleButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/userboard");
    }
  }, [session]);

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
