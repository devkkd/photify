import Link from 'next/link';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function FAQSection() {
  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 1-2 weeks ahead for standard sessions, 3-4 weeks for peak wedding season or large commercial projects."
    },
    {
      question: "Can I bring my own props/outfits?",
      answer: "Absolutely! We encourage it. Your personal items help create more authentic, meaningful images."
    },
    {
      question: "Do you travel for shoots?",
      answer: "Yes, we offer on-location photography throughout Jaipur and Rajasthan. Travel fees apply for locations outside the city."
    },
    {
      question: "What's your cancellation policy?",
      answer: "Cancellations made 48+ hours before your session receive a full refund. Within 48 hours, we offer rescheduling credit."
    },
    {
      question: "Can I purchase additional images after the shoot?",
      answer: "Yes, you can purchase any additional edited images."
    }
  ];

  return (
    <section className="w-full bg-[#FBFBFB] py-24 px-6 md:px-12 lg:px-20 text-black">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-16 lg:gap-32">
        
        {/* Left Column: Heading */}
        <div className="md:w-1/3 shrink-0">
          <h2 className="text-[40px] md:text-[48px] lg:text-[54px] font-bold leading-[1.1] tracking-tight sticky top-24">
            Frequently<br />asked questions
          </h2>
        </div>

        {/* Right Column: FAQ List & Button */}
        <div className="md:w-2/3 flex flex-col">
          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="group border-b border-[#A5CEC1] py-6 cursor-pointer"
              >
                {/* Question & Icon */}
                <div className="flex justify-between items-center bg-transparent">
                  <h3 className="text-[18px] md:text-[20px] font-medium pr-8">
                    {faq.question}
                  </h3>
                  {/* Arrow rotates 90 degrees downward on hover */}
                  <FiArrowRight className="text-2xl shrink-0 transition-transform duration-300 group-hover:rotate-90" />
                </div>

                {/* Answer (Expands on hover) */}
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-[200px] group-hover:opacity-100 group-hover:mt-4">
                  <p className="text-[14px] md:text-[15px] leading-[1.8] text-black/80 font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <Link href="/faq"  className="bg-[#1D4F41] text-white px-8 py-4 rounded-full font-medium text-[15px] transition-transform hover:scale-105 active:scale-95">
              See All FAQ's
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}