import React from 'react'
import Slider from "@/components/SECTIONS/Retrospec/Slider"
import Title from '@/components/Title'
import Container from '@/components/Container'


function Retrospec() {
  return (
    <>
        <Container>
            <Title className='text-cian-700 text-2xl'>Retrospectiva SEELECT 2022</Title>
        </Container>

        <Slider/>
    </>
  )
}

export default Retrospec
