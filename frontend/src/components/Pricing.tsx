import Link from 'next/link'

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One plan. No hidden fees. No contracts. Pay with crypto and get started in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Main Plan */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-900 p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AegisIndex Basic</h3>
              <div className="text-5xl font-bold text-blue-900 mb-2">$10</div>
              <div className="text-gray-600">per month</div>
              <div className="text-sm text-gray-500 mt-2">Pay with USDT (crypto)</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Connect 1 domain</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Weekly AI audit</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Automatic meta / robots / sitemap suggestions</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Dashboard & history</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Email support</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">ChatGPT optimization</span>
              </div>
            </div>

            <Link 
              href="/billing"
              className="w-full bg-blue-900 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition-colors text-center block"
            >
              Activate Subscription
            </Link>
          </div>

          {/* Coming Soon Plan */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 opacity-75">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AegisIndex Pro</h3>
              <div className="text-5xl font-bold text-gray-400 mb-2">$29</div>
              <div className="text-gray-600">per month</div>
              <div className="text-sm text-gray-500 mt-2">Coming Soon</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">✓</span>
                <span className="text-gray-500">Connect up to 5 domains</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">✓</span>
                <span className="text-gray-500">Daily AI audit</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">✓</span>
                <span className="text-gray-500">Automatic fixes (WordPress/GitHub)</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">✓</span>
                <span className="text-gray-500">Advanced analytics</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">✓</span>
                <span className="text-gray-500">Priority support</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">✓</span>
                <span className="text-gray-500">Competitor analysis</span>
              </div>
            </div>

            <button 
              disabled
              className="w-full bg-gray-300 text-gray-500 py-4 rounded-xl text-lg font-semibold cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Why Crypto Payments?
            </h3>
            <p className="text-green-700">
              Crypto payments are faster, cheaper, and more secure than traditional payment processors. 
              <span className="font-semibold"> No chargebacks, no monthly fees, no delays.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

