import FAQSection from '@/components/FAQ'
import Welcome from '@/components/Welcome'
import WhyChoose from '@/components/WhyChoose'
import React from 'react'

export default function page() {
  return (
    <div>
        <Welcome/>
        <WhyChoose/>
        <FAQSection/>
    </div>
  )
}
