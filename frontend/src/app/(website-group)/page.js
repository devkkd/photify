import BrandsBanner from '@/components/BrandsBanner'
import ClientExperience from '@/components/ClientExperience'
import Creative from '@/components/Creative'
import CycMall from '@/components/CycMall'
import DesignedToFlow from '@/components/DesignedToFlow'
import Equipment from '@/components/Equipment'
import FAQ from '@/components/FAQ'
import HeroTransition from '@/components/HeroTransition'
import HomeHeader from '@/components/HomeHeader'
import Magic from '@/components/Magic'
import Packages from '@/components/Packages'
import Portfolio from '@/components/Portfolio'
import ScrollingText from '@/components/ScrollingText'
import Welcome from '@/components/Welcome'
import WhatWeDo from '@/components/WhatWeDo'
import WhyChoose from '@/components/WhyChoose'
import React from 'react'

export default function page() {
  return (
    <>
      <HeroTransition />
      <ScrollingText />
      <Magic />
      <BrandsBanner />
      <DesignedToFlow />
      <div className='scroll-section bg-white'>
        <HomeHeader />
        {/* other components for the scroll section can be added here */}
        <CycMall />
        <Creative />
        <Portfolio />
        <Equipment />
        <Packages />
        <WhyChoose />
      </div>
      <Welcome />
      <WhatWeDo />
      {/* <ClientExperience />
      <FAQ /> */}
    </>
  )
}
