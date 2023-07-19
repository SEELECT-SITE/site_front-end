"use client";
import GithubButton from "@/components/GithubButton";
import GoogleButton from "@/components/GoogleButton";

export default function LoginPage() {
  return (
    <main className="w-full py-12 px-4">
      <div className="w-full m-auto max-w-sm border-2 border-m-dark/30 rounded-md overflow-hidden px-4">
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <GoogleButton className="border-2" />
            <GithubButton />
          </div>
        </div>
      </div>
    </main>
  );
}
