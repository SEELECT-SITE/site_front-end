import React from 'react'
import Slider from "@/components/SECTIONS/Cronograma/Slider"
import Title from '@/components/Title'
import Container from '@/components/Container'
import FloatButton from '@/components/FloatButton'

function Cronograma() {
  return (
    <section className="w-full pt-12 bg-white">
        <Title className={`text-xl font-bold text-center text-dark mb-10`}>CRONOGRAMA GERAL</Title>
        <Slider/>

        <Container>
          <FloatButton className='bg-cian-700 text-dark' shadowClassname='bg-black'>INSCREVA-SE</FloatButton>
        </Container>
    </section>
  )
}

export default Cronograma