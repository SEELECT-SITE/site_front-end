import React from 'react'
import { MdTableRestaurant } from "react-icons/md"
import Title from '@/components/Title'

function index() {
  return (
    <div className='bg-dark w-full rounded-full flex flex-col items-center justify-center gap-2'>
      <div className='w-5 justify-center pt-4'>
      <MdTableRestaurant size={32}/>
      </div>
      <Title className={` text-white pb-3 text-lg`}>MESA REDONDA</Title>
    </div>
  )
}

export default index