import React, { useState } from 'react'
import downArrow from '../assets/faqArrow.svg'
import { motion, AnimatePresence } from 'framer-motion'

function Faq () {
  const [openIdx, setOpenIdx] = useState(null)

  const faqData = [
    {
      question: ' How can farmers use the website?',
      answer: 'The government will provide training to farmers.'
    },
    {
      question: 'How will money transfer happen?',
      answer:
        'No payment will be done on our site. Payments are made directly to farmers based on the trust level between them and the buyer.'
    },
    {
      question: 'How can you tell the quality of the crop?',
      answer:
        'Farmers must submit a Quality Grading Certificate given by AGMARK.'
    },
    {
      question: ' Do traders need any documents?',
      answer: 'Yes, traders will have a license.'
    },
    {
      question: 'Who manages the delivery of items from farmers to users?',
      answer: 'The delivery of items is managed by the government.'
    }
  ]

  const toggleFaq = idx => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <div className='league-spartan px-7 mb-3'>
      <h1 className='text-4xl'>FAQ</h1>
      {faqData.map((item, idx) => {
        const isOpen = openIdx === idx
        return (
          <div key={idx} className='p-6 py-3'>
            <div
              className='flex justify-between items-center cursor-pointer select-none'
              onClick={() => toggleFaq(idx)}
            >
              <h2 className='text-[25px] font-semibold'>{item.question}</h2>
              <motion.img
                src={downArrow}
                className='w-4'
                alt=''
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className='text-gray-700 py-2'>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default Faq