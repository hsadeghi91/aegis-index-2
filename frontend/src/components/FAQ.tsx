'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Do I need to know SEO?",
      answer: "Not at all! AegisIndex is designed for non-technical users. Our AI handles all the complex SEO work automatically. You just connect your site and we do the rest."
    },
    {
      question: "Will you break my website?",
      answer: "No, we never modify your website directly. We only suggest changes and provide you with the exact code to implement. You have full control over what gets applied to your site."
    },
    {
      question: "How do I pay?",
      answer: "We accept USDT (Tether) cryptocurrency payments. It's fast, secure, and has lower fees than traditional payment processors. We'll provide you with a wallet address to send payment to."
    },
    {
      question: "What happens after I pay?",
      answer: "Once payment is confirmed, your subscription is activated immediately. You can then connect your domain and start receiving weekly AI audits and recommendations."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, there are no contracts or cancellation fees. You can cancel your subscription at any time from your dashboard. Your site will stop receiving new audits, but you'll keep access to your historical data."
    },
    {
      question: "What if I have multiple websites?",
      answer: "The Basic plan covers one domain. If you have multiple sites, you'll need to upgrade to the Pro plan (coming soon) which will support up to 5 domains."
    },
    {
      question: "How accurate are the AI audits?",
      answer: "Our AI is trained on millions of websites and follows Google's latest guidelines. While no tool is 100% accurate, our recommendations are based on proven SEO best practices and real-world data."
    },
    {
      question: "Do you support all website platforms?",
      answer: "Yes! We work with any website - WordPress, Shopify, custom HTML, static sites, or any other platform. Our AI analyzes your site from the outside, so the platform doesn't matter."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about AegisIndex
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-xl border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <span className={`text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-blue-800">
              Contact us at <span className="font-semibold">support@aegisindex.com</span> and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

