import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Guaranteed AI SEO.
                <br />
                <span className="text-blue-900">Visible Website.</span>
                <br />
                Every Week.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                AegisIndex audits and improves your site automatically so Google and ChatGPT can understand it. 
                <span className="font-semibold"> No marketing team required.</span>
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Weekly AI audit
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                No technical skills needed
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                $10/mo – Crypto only
              </span>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Link 
                href="/connect-site"
                className="inline-block bg-blue-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <p className="text-sm text-gray-500">
                Connect your domain in 2 minutes • No credit card required
              </p>
            </div>
          </div>

          {/* Right side - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
              <div className="space-y-4">
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Site Health Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  </div>
                </div>

                {/* Mock Scores */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">87</div>
                    <div className="text-sm text-green-700">SEO Score</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">92</div>
                    <div className="text-sm text-blue-700">Indexability</div>
                  </div>
                </div>

                {/* Mock Chart */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-2">Weekly Progress</div>
                  <div className="flex items-end space-x-1 h-16">
                    {[60, 65, 70, 75, 80, 85, 87].map((height, i) => (
                      <div
                        key={i}
                        className="bg-blue-400 rounded-t"
                        style={{ height: `${height}%`, width: '12px' }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Mock Recommendations */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Recent Fixes Applied:</div>
                  <div className="space-y-1">
                    <div className="text-xs text-green-600">✓ Added meta description</div>
                    <div className="text-xs text-green-600">✓ Created sitemap.xml</div>
                    <div className="text-xs text-yellow-600">• Optimize images (pending)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              AI Active
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold">
              +12% Traffic
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

