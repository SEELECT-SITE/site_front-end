import { Button } from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import { GoMarkGithub } from "react-icons/go";

export default function GithubButton() {
  return (
    <span className="bg-black/80 rounded-lg">
      <Button
        className="group relative flex items-center gap-3 overflow-hidden pr-[60px] bg-gray-800 shadow-none hover:shadow-none hover:-translate-x-1 hover:-translate-y-1 rounded-lg hover:bg-gray-900"
        onClick={() => signIn("github")}
      >
        Entrar com Github
        <span className="absolute right-0 grid h-full w-12 place-items-center bg-gray-600 transition-colors group-hover:bg-gray-700">
          <GoMarkGithub size={20} />
        </span>
      </Button>
    </span>
  );
}
