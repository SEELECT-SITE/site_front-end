import React from 'react'
import { bebasFont } from "@/app/fonts";
import Slider from "@/components/SECTIONS/Cronograma/Slider"

function index() {
  return (
    <section className="w-full pt-6">
        <h2 className={`text-3xl text-center text-white ${bebasFont.className}`}>Cronograma GERAL</h2>
        <Slider/>
    </section>
  )
}

export default index