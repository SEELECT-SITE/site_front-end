"use client";
import GithubButton from "@/components/GithubButton";
import GoogleButton from "@/components/GoogleButton";
import { AiOutlineMail } from "react-icons/ai";

export default function LoginPage() {
  return (
    <main className="w-full py-12 px-4">
      <div className="w-full m-auto max-w-sm border-2 border-m-dark/30 rounded-md overflow-hidden px-4">
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <GoogleButton className="border-2" />
            <GithubButton />
          </div>

          <div className="relative">
            <label htmlFor="UserEmail" className="sr-only">
              {" "}
              Email{" "}
            </label>

            <input
              type="email"
              id="UserEmail"
              placeholder="flea@rhcp.com"
              className="w-full rounded-md border-gray-200 p-2 shadow-sm sm:text-sm"
            />

            <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
              <AiOutlineMail />
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
