'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, CreditCard, Shield } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'

export default function Billing() {
  const [isActivating, setIsActivating] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'inactive' | 'active'>('inactive')

  const handleActivateSubscription = async () => {
    setIsActivating(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubscriptionStatus('active')
      alert('Subscription activated successfully!')
    } catch (error) {
      console.error('Failed to activate subscription:', error)
    } finally {
      setIsActivating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              AegisIndex
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Billing & Subscription
          </h1>
          <p className="text-xl text-gray-600">
            Manage your AegisIndex subscription and payment method
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Plan</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-900">AegisIndex Basic</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    subscriptionStatus === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-blue-900 mb-2">$10</div>
                <div className="text-gray-600 mb-4">per month</div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Connect 1 domain
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Weekly AI audit
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Automatic SEO suggestions
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Dashboard & history
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Email support
                  </div>
                </div>
              </div>

              {subscriptionStatus === 'inactive' && (
                <button
                  onClick={handleActivateSubscription}
                  disabled={isActivating}
                  className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 font-semibold"
                >
                  {isActivating ? 'Activating...' : 'I Paid with Crypto, Activate My Plan'}
                </button>
              )}

              {subscriptionStatus === 'active' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">Subscription Active</span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    Your next billing date is {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CreditCard className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Crypto Payments</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Payment Method</span>
                    <span className="font-medium text-gray-900">USDT (Tether)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Network</span>
                    <span className="font-medium text-gray-900">Ethereum</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Status</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Why Crypto Payments?</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Crypto payments are faster, more secure, and have lower fees than traditional payment processors. 
                      No chargebacks, no monthly fees, no delays.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Payment Instructions</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Send $10 USDT to the wallet address provided in your dashboard. 
                      Payments are processed automatically once confirmed on the blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Payment Methods */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Credit Card Payments</h3>
              <p className="text-gray-600 text-sm mb-4">
                We're working on adding traditional payment methods for users who prefer credit cards.
              </p>
              <div className="text-sm text-gray-500">Expected: Q2 2025</div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Annual Billing</h3>
              <p className="text-gray-600 text-sm mb-4">
                Save 20% with annual billing. Pay once per year and get 2 months free.
              </p>
              <div className="text-sm text-gray-500">Expected: Q2 2025</div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help with Billing?</h3>
          <p className="text-blue-800 mb-4">
            If you have questions about payments, subscriptions, or need help with crypto transactions, 
            our support team is here to help.
          </p>
          <div className="flex space-x-4">
            <a 
              href="mailto:support@aegisindex.com" 
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 font-medium"
            >
              Contact Support
            </a>
            <a 
              href="/dashboard" 
              className="bg-white text-blue-900 px-4 py-2 rounded-lg border border-blue-900 hover:bg-blue-50 font-medium"
            >
              View Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

