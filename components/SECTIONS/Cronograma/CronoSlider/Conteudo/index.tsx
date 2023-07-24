import React from "react";
import { MdTableRestaurant } from "react-icons/md";
import Title from "@/components/Title";
import Text from "@/components/Text";

function index() {
  return (
    <div className="bg-dark w-full max-w-sm rounded-full flex flex-col items-center justify-center gap-2">
      <div className="w-5 justify-center pt-4">
        <MdTableRestaurant size={32} />
      </div>
      <Text className={` text-white pb-3 font-bold`}>MESA REDONDA</Text>
    </div>
  );
}

export default index;
