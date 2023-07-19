import React from 'react'
import Slider from "@/components/SECTIONS/Cronograma/Slider"

function Cronograma() {
  return (
    <section className="w-full pt-6 bg-white">
        <h2 className={`text-3xl text-center text-dark mb-10`}>Cronograma GERAL</h2>
        <Slider/>
    </section>
  )
}

export default Cronograma