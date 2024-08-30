"use client";

import { useRouter } from "next/navigation";

export default function Page404() {
  const router = useRouter();
  return (
    <body>
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  Parece que você encontrou a porta de entrada para o grande
                  nada!
                </h1>
                <p className="my-2 text-gray-800">
                  Peço desculpa por isso! Por favor, visite a nossa página
                  inicial para chegar onde precisa de ir.
                </p>
                <button
                  className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-cian-700 text-white hover:bg-cian-700 focus:outline-none focus:ring-2 focus:ring-cian-bg-cian-700 focus:ring-opacity-50"
                  onClick={(e) => router.push("/")}
                >
                  Me tira daqui!
                </button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>
    </body>
  );
}
