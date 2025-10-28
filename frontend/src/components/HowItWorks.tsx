export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Connect your domain",
      description: "Add your website URL and choose your connection method. We support WordPress, GitHub, and manual verification.",
      icon: "🔗"
    },
    {
      step: "02", 
      title: "We analyze & fix technical SEO",
      description: "Our AI crawls your site, identifies issues, and automatically applies fixes for meta tags, sitemaps, and more.",
      icon: "🤖"
    },
    {
      step: "03",
      title: "We generate a weekly report you can actually read",
      description: "Get plain-English updates on your site's health, not technical jargon. See exactly what we fixed and why.",
      icon: "📊"
    },
    {
      step: "04",
      title: "Your site becomes indexable for search and AI",
      description: "Google and ChatGPT can now understand your content. Watch your organic traffic grow week after week.",
      icon: "🚀"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How AegisIndex Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our program runs automatically. Set it up once, and we'll keep your site optimized forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-blue-200 transform translate-x-4"></div>
              )}
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow relative z-10">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-sm font-bold text-blue-900 mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              No Technical Knowledge Required
            </h3>
            <p className="text-blue-800 text-lg">
              Our AI handles all the complex SEO work. You just connect your site and watch your visibility improve. 
              <span className="font-semibold">It's that simple.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

