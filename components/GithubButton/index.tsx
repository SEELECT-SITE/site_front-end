import { signIn } from "next-auth/react";
import { FunctionComponent } from "react";
import { GoMarkGithub } from "react-icons/go";

export type baseComponent = {
  className?: string;
};

const GithubButton: FunctionComponent<baseComponent> = ({ className }) => {
  return (
    <span className={`bg-gray-950 rounded-lg group ${className}`}>
      <button
        className="flex items-center duration-150 gap-2 rounded-lg border-2 border-[#171515] bg-[#171515] px-5 py-3 text-sm font-medium text-white group-hover:-translate-x-1 group-hover:-translate-y-1 focus:outline-none focus:ring active:opacity-75"
        onClick={() => signIn("github", { callbackUrl: "/userboard" })}
      >
        Entrar com GitHub
        <GoMarkGithub size={20} />
      </button>
    </span>
  );
};
export default GithubButton;
