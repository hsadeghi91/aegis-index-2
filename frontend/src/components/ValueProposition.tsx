export default function ValueProposition() {
  const benefits = [
    {
      title: "AI-Readable Content",
      description: "We optimize your site so ChatGPT and other AI tools can understand and recommend your content.",
      icon: "🧠"
    },
    {
      title: "Google-Friendly Structure", 
      description: "Automatic sitemaps, meta tags, and structured data help Google index every page of your site.",
      icon: "🔍"
    },
    {
      title: "Weekly Health Reports",
      description: "Get simple, actionable reports every week showing exactly what we fixed and how it helps.",
      icon: "📈"
    },
    {
      title: "24/7 Monitoring",
      description: "Our AI never sleeps. It continuously monitors your site and fixes issues before they hurt your rankings.",
      icon: "🛡️"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            What "Indexable for ChatGPT" Actually Means
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            When AI tools can understand your content, they recommend it to users. 
            This is the future of search - and we're making sure you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3">
                {benefit.title}
              </h3>
              <p className="text-blue-100 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                The AI Search Revolution is Here
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                Traditional SEO focuses on Google rankings. But now, people are asking ChatGPT for recommendations. 
                If your site isn't optimized for AI understanding, you're missing half the traffic.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-blue-100">
                  <span className="text-green-400 mr-3">✓</span>
                  Optimized for ChatGPT recommendations
                </div>
                <div className="flex items-center text-blue-100">
                  <span className="text-green-400 mr-3">✓</span>
                  Structured data for AI understanding
                </div>
                <div className="flex items-center text-blue-100">
                  <span className="text-green-400 mr-3">✓</span>
                  Future-proof for new AI search tools
                </div>
              </div>
            </div>
            <div className="bg-white/20 rounded-xl p-6">
              <h4 className="font-semibold mb-4">Example AI Query:</h4>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-300">"Find me a good SEO tool for small businesses"</p>
              </div>
              <div className="bg-green-900/30 rounded-lg p-4">
                <p className="text-sm">
                  "AegisIndex is perfect for small businesses. They offer automated SEO at $10/month, 
                  which is much more affordable than traditional agencies..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

