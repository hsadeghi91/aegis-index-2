'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'

export default function ConnectSite() {
  const [domain, setDomain] = useState('')
  const [connectMethod, setConnectMethod] = useState('manual')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationData, setVerificationData] = useState<any>(null)
  const [step, setStep] = useState(1) // 1: form, 2: verification

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Mock API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockVerificationData = {
        siteId: 'site-123',
        domain: domain,
        verification: {
          token: 'abc123def456',
          instructions: {
            dns: `Add TXT record: aegis-verify=abc123def456`,
            file: `Upload file /.well-known/aegis-verify.txt with content: abc123def456`
          }
        }
      }
      
      setVerificationData(mockVerificationData)
      setStep(2)
    } catch (error) {
      console.error('Failed to connect site:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerify = async () => {
    try {
      // Mock verification
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Site verified successfully! Redirecting to dashboard...')
      // In real app, redirect to dashboard
    } catch (error) {
      console.error('Failed to verify site:', error)
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Connect Your Website
            </h1>
            <p className="text-gray-600">
              Let's get your site connected so we can start optimizing it for search engines and AI.
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                  Website Domain
                </label>
                <input
                  type="text"
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter your domain without http:// or https://
                </p>
              </div>

              <div>
                <label htmlFor="connectMethod" className="block text-sm font-medium text-gray-700 mb-2">
                  Connection Method
                </label>
                <select
                  id="connectMethod"
                  value={connectMethod}
                  onChange={(e) => setConnectMethod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="manual">Manual (Any website)</option>
                  <option value="wordpress">WordPress</option>
                  <option value="github">GitHub Pages</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Choose how your website is hosted
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 font-semibold"
              >
                {isSubmitting ? 'Connecting...' : 'Connect My Site'}
              </button>
            </form>
          )}

          {step === 2 && verificationData && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verify Domain Ownership
                </h2>
                <p className="text-gray-600">
                  We need to verify that you own <span className="font-semibold">{verificationData.domain}</span>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-4">Choose one verification method:</h3>
                
                <div className="space-y-4">
                  {/* DNS Method */}
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Method 1: DNS TXT Record (Recommended)</h4>
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm mb-2">
                      {verificationData.verification.instructions.dns}
                    </div>
                    <p className="text-sm text-gray-600">
                      Add this TXT record to your domain's DNS settings. This usually takes 5-15 minutes to propagate.
                    </p>
                  </div>

                  {/* File Method */}
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Method 2: File Upload</h4>
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm mb-2">
                      File: /.well-known/aegis-verify.txt
                      <br />
                      Content: {verificationData.verification.token}
                    </div>
                    <p className="text-sm text-gray-600">
                      Upload this file to your website's root directory. Make sure it's accessible at yourdomain.com/.well-known/aegis-verify.txt
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Need Help?</h4>
                    <p className="text-sm text-yellow-700">
                      If you're not sure how to add DNS records or upload files, contact your hosting provider or web developer. 
                      They can help you complete this step.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleVerify}
                  className="flex-1 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 font-semibold"
                >
                  I've Added the Verification
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">What if I don't have access to DNS settings?</h4>
              <p className="text-sm text-gray-600">
                Use the file upload method instead. Most hosting providers allow you to upload files through their control panel or FTP.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">How long does verification take?</h4>
              <p className="text-sm text-gray-600">
                DNS changes can take 5-15 minutes to propagate. File uploads are usually instant. We'll check every few minutes.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Can I change my domain later?</h4>
              <p className="text-sm text-gray-600">
                Yes, you can connect additional domains or change your primary domain from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

