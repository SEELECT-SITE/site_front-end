import React from "react";
import Text from "@/components/Text";
import LogoSeelect from "@/public/icone_seelect-light-cian.webp";
import Image from "next/image";
import { MdCalendarToday, MdLocationPin } from "react-icons/md";
import Link from "next/link";

interface eventProps {
  title: string;
  category: string;
  max_number_of_inscriptions: number;
  number_of_inscriptions: number;
  location: string;
  url_location: string;
}

function EventCards({
  url_location,
  location,
  max_number_of_inscriptions,
  number_of_inscriptions,
  title,
  category,
}: eventProps) {
  return (
    <div className="relative shrink grow bg-dark p-4 mt-16 lg:p-8 pt-16 lg:pt-24 rounded-2xl">
      <div className="w-28 lg:w-36 aspect-square absolute top-0 -translate-y-1/2 p-4 rounded-full bg-dark-cian overflow-hidden">
        <Image src={LogoSeelect} alt={"avatar"} />
      </div>

      <div className="mb-8 lg:mb-12">
        <Text className="font-bold lg:text-lg uppercase text-base mb-2 text-cian-700">
          {title}
        </Text>
        {/* <Text className="-mt-1 font-thin">Gestão de Produção Industrial</Text> */}
      </div>

      <div className="flex gap-4 items-start">
        <div className="flex items-start gap-1">
          <MdCalendarToday size={22} fill={"#84d1cf"} />
          <Text className="font-bold uppercase text-base mb-2">27/09</Text>
        </div>
        <Link
          href={url_location}
          className="flex items-start gap-1"
          target="_blank"
        >
          <MdLocationPin size={22} fill={"#84d1cf"} />
          <Text className="font-bold uppercase lg:text-base mb-2">
            {location}
          </Text>
        </Link>
      </div>
    </div>
  );
}

export default EventCards;
