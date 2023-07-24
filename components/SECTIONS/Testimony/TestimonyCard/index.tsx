import Image from "next/image";
import avatar from "@/public/avatar/avatar1.jpg";
import Text from "@/components/Text";
import SmallText from "@/components/SmallText";

export default function TestimonyCard() {
  return (
    <div className="bg-dark-cian w-full max-w-4xl p-4 xs:p-6 lg:p-8 flex flex-col items-center gap-4 rounded-2xl group lg:flex-row hover:-translate-x-3 hover:-translate-y-3 duration-300 hover:drop-shadow-icon-xl">
      <div className="flex flex-col items-center gap-1 min-w-[250px]">
        <div className="w-1/3 aspect-square overflow-hidden rounded-full min-w-[200px] duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:drop-shadow-icon ease-in delay-100">
          <Image src={avatar} alt={"avatar"} />
        </div>
        <Text className="text-xl font-bold lg:text-2xl text-cian-700 ">
          Amanda Testimony
        </Text>
        <SmallText className="-mt-1">Engenheira de Computação</SmallText>
      </div>

      <div className="text-justify">
        <Text>
          "Participar do SEELECT foi uma oportunidade única de mergulhar no
          mundo da tecnologia. As palestras, ministradas por especialistas
          renomados, trouxeram insights valiosos e me inspiraram a pensar fora
          da caixa. Além disso, a exposição de projetos inovadores foi
          fascinante. Agradeço à organização do SEELECT por criar um ambiente
          propício para o aprendizado e a troca de ideias. Estou ansioso pela
          próxima edição!"
        </Text>
      </div>
    </div>
  );
}
