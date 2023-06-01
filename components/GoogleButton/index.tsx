import { Button } from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <span className="bg-black/80 rounded-lg">
      <Button
        color="white"
        className="flex gap-x-2 items-center shadow-none hover:shadow-none hover:-translate-x-1 hover:-translate-y-1 "
        onClick={() => signIn("google")}
      >
        Entrar com Google <FcGoogle size={20} />
      </Button>
    </span>
  );
}
