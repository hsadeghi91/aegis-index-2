'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              AegisIndex
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/#pricing" className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-900 px-3 py-2 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
                Sign In
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-900 focus:outline-none focus:text-blue-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="text-gray-700 hover:text-blue-900 block px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link href="/#pricing" className="text-gray-700 hover:text-blue-900 block px-3 py-2 text-base font-medium">
                Pricing
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-900 block px-3 py-2 text-base font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard" className="bg-blue-900 text-white block px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-800">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

