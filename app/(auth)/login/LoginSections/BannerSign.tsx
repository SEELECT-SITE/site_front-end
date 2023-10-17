import Image from "next/image";
import Link from "next/link";
import logoSeelect from "@/public/icone-seelect-white.webp";
import loginBg from "@/public/login_bg.webp";

export default function BannerLogin() {
  return (
    <aside className="relative w-full h-20 overflow-hidden flex justify-end lg:justify-center lg:items-center lg:h-full lg:px-0">
      <Link
        href="/"
        className="group rounded-full flex items-center aspect-square left-0 lg:left-auto h-full lg:h-auto lg:backdrop-blur-sm max-w-xs p-3 lg:p-8 absolute lg:z-10"
        title="home"
      >
        <Image
          src={logoSeelect}
          width={320}
          alt="logo"
          priority={true}
          className="duration-200 min-w-12 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:drop-shadow-icon-sm"
        />
      </Link>
      <div className="flex items-center h-full w-full">
        <Image
          width={1366}
          src={loginBg}
          alt="login background"
          className=" object-cover"
        />
      </div>
    </aside>
  );
}
