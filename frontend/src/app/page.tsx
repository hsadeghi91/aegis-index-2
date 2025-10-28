import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PainPoints from '@/components/PainPoints'
import HowItWorks from '@/components/HowItWorks'
import ValueProposition from '@/components/ValueProposition'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <ValueProposition />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}