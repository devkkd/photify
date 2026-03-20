"use client";

import React, { useState } from 'react';

// Exact data from your screenshot
const faqData = [
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

export default function FAQPage() {
  // We'll track which FAQ is open. Setting it to 0 opens the first one by default.
  // Set to `null` if you want them all closed initially.
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="w-full min-h-screen bg-white pb-32 pt-32">
      <div className="max-w-6xl mx-auto px-6">
        
        <h1 className="text-3xl md:text-5xl font-bold text-black text-center mb-16">
          Frequently asked questions
        </h1>

        <div className="flex flex-col">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div key={index} className="border-b border-[#E5E7EB]">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                >
                  <span className="text-[16px] md:text-[18px] font-medium text-black pr-8">
                    {faq.question}
                  </span>
                  
                  {/* Arrow Icon - Rotates down when open */}
                  <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                
                {/* Expandable Answer Section */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[200px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[13px] md:text-[14px] font-medium text-black opacity-80 leading-relaxed pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}