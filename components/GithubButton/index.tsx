import { signIn } from "next-auth/react";
import { GoMarkGithub } from "react-icons/go";

export default function GithubButton() {
  return (
    <span className="bg-gray-950 rounded group">
      <button
        className="flex items-center duration-150 gap-2 rounded border-2 border-[#171515] bg-[#171515] px-5 py-3 text-sm font-medium text-white group-hover:-translate-x-1 group-hover:-translate-y-1 focus:outline-none focus:ring active:opacity-75"
        onClick={() => signIn("github")}
      >
        Entrar com GitHub
        <GoMarkGithub size={20} />
      </button>
      
    </span>
  );
}
