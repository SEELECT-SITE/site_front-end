import React from 'react'
import Slider from "@/components/SECTIONS/Cronograma/Slider"
import Title from '@/components/Title'

function Cronograma() {
  return (
    <section className="w-full pt-12 bg-white">
        <Title className={`text-xl font-bold text-center text-dark mb-10`}>CRONOGRAMA GERAL</Title>
        <Slider/>
    </section>
  )
}

export default Cronograma