import { signIn } from "next-auth/react";
import { FunctionComponent } from "react";
import { FcGoogle } from "react-icons/fc";
import { baseComponent } from "../GithubButton";

const GoogleButton:FunctionComponent<baseComponent> = ({className}) => {
  return (
    <span className={`bg-gray-950 rounded-lg group ${className}`}>
      <button
        className="flex items-center duration-150 gap-2 rounded border-0 border-
        [#171515] bg-gray-100 px-5 py-3 text-sm text-gray-950 
        group-hover:-translate-x-1 group-hover:-translate-y-1 focus:outline-none 
        focus:ring active:opacity-75 font-cafe-txt"
        onClick={() => signIn("google")}
      >
        Entrar com Google <FcGoogle size={20} />
      </button>
    </span>
  );
};

export default GoogleButton;
