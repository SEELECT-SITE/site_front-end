
import Title from "../../../../../components/Title";
import Text from "../../../../../components/Text";
import CoordImage1 from "@/public/Ellipse 42.png";
import Image from "next/image";

export default function Coordenadores() {
  return (
    <><div className={`w-full max-w-md py-8`}>
      <div className={`rounded-3xl border-2 border-black/10 p-10 shadow-lg shadow-cyan-500 sm:px-8 lg:p-12 bg-cyan-900`}>

        <div className="flex items-center justify-between">
          <Image
            src={CoordImage1}
            alt="coordenador1"
            width={120} />
          <div className="text-left flex justify-between"></div>
          <Title className="text-xl xs:text-2xl  tracking-wide font-bold text-cian-400">
            Wagner Glauber
          </Title>
          <Text className="text-xl text-sm tracking-wide font-bold">
            Coordenador de alguma coisa
          </Text>
        </div>
      </div>
    </div>
    
    <div className={`w-full max-w-md py-8`}>
        <div className={`rounded-3xl border-2 border-black/10 p-10 shadow-lg shadow-cyan-500 sm:px-8 lg:p-12 bg-cyan-900`}>

          <div className="flex items-center justify-between">
            <Image
              src={CoordImage1}
              alt="coordenador2"
              width={120} />
            <div className="text-left flex justify-between"></div>
            <Title className="text-xl xs:text-2xl  tracking-wide font-bold text-cian-400">
              Wagner Glauber
            </Title>
            <Text className="text-xl text-sm tracking-wide font-bold">
              Coordenador de alguma coisa
            </Text>
          </div>
        </div>
      </div>

<div className={`w-full max-w-md py-8`}>
<div className={`rounded-3xl border-2 border-black/10 p-10 shadow-lg shadow-cyan-500 sm:px-8 lg:p-12 bg-cyan-900`}>

  <div className="flex items-center justify-between">
    <Image
      src={CoordImage1}
      alt="coordenador3"
      width={120} />
    <div className="text-left flex justify-between"></div>
    <Title className="text-xl xs:text-2xl  tracking-wide font-bold text-cian-400">
      Wagner Glauber
    </Title>
    <Text className="text-xl text-sm tracking-wide font-bold">
      Coordenador de alguma coisa
    </Text>
  </div>
</div>
</div>

<div className={`w-full max-w-md py-8`}>
        <div className={`rounded-3xl border-2 border-black/10 p-10 shadow-lg shadow-cyan-500 sm:px-8 lg:p-12 bg-cyan-900`}>

          <div className="flex items-center justify-between">
            <Image
              src={CoordImage1}
              alt="coordenador4"
              width={120} />
            <div className="text-left flex justify-between"></div>
            <Title className="text-xl xs:text-2xl  tracking-wide font-bold text-cian-400">
              Wagner Glauber
            </Title>
            <Text className="text-xl text-sm tracking-wide font-bold">
              Coordenador de alguma coisa
            </Text>
          </div>
        </div>
      </div></>
  );
}