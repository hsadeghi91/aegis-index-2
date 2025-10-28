export default function PainPoints() {
  const painPoints = [
    {
      title: "You don't know what Google sees",
      description: "Your site might be invisible to search engines, but you have no way to know. Manual SEO audits are expensive and outdated by the time you get results.",
      icon: "🔍"
    },
    {
      title: "You're guessing meta tags",
      description: "Writing meta descriptions and titles is guesswork. You don't know if they're helping or hurting your search rankings.",
      icon: "❓"
    },
    {
      title: "You waste hours every week",
      description: "SEO maintenance is endless. Checking rankings, updating content, fixing technical issues - it never stops consuming your time.",
      icon: "⏰"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Manual SEO is Broken
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These hidden costs are killing your website's visibility. Every week you wait is another week your competitors get ahead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {point.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              The Real Cost of Manual SEO
            </h3>
            <p className="text-red-700">
              Most businesses spend $2,000-5,000/month on SEO agencies that deliver inconsistent results. 
              <span className="font-semibold"> AegisIndex costs $10/month and works 24/7.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

