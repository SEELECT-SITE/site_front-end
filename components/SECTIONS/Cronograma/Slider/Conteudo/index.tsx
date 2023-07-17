import React from 'react'
import mesa from "@/public/Vector.png"
import Image from 'next/image'
import { bebasFont } from "@/app/fonts";

function index() {
  return (
    <div className='bg-blue-700 w-full rounded-3xl flex flex-col items-center justify-center gap-2'>
      <div className='w-5 justify-center pt-4'>
      <Image
            src={mesa}
            alt="Mesa"
            height={10}
            width={10}
      />
      </div>
      <h2 className={`${bebasFont.className} text-white pb-3`}>MESA REDONDA</h2>
    </div>
  )
}

export default index