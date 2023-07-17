import React from 'react'
import { bebasFont } from "@/app/fonts";
import Slider from "@/components/SECTIONS/Retrospectiva/Slider"
import Container from '@/components/Container';

function index() {
  return (
    <section className="w-full">

        <Container>
        <h2 className={`text-3xl text-[#44C1BA] ${bebasFont.className}`}>Retrospectiva SEELECT 2022</h2>
        </Container>
        
        <Slider/>

    </section>
    
  )
}

export default index