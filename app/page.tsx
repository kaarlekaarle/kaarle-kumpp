import BottomNav from "@/components/BottomNav";
import { landing } from "@/data/site-copy";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-lg sm:text-xl font-bold uppercase tracking-wider text-ink hover:text-accent transition-colors" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              KAARLE ✳ KUMPP.
            </Link>
            <Link href="/works" className="text-xs sm:text-sm font-medium uppercase tracking-wide text-ink hover:text-accent transition-colors" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              WORKS
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
            {/* Left Column - Visual Impact */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Large Typography Statement */}
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold uppercase leading-tight mb-8 text-ink" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                  PROBLEM SOLVING AND STORYTELLING.
                </h1>
                
                {/* Decorative Element */}
                <div className="w-16 h-1 bg-accent mb-8"></div>
                
                {/* Key Question */}
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase text-accent mb-8" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                  WHAT IS YOUR PROBLEM?
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="order-1 lg:order-2">
              <div className="prose prose-lg max-w-none" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  {landing.intro.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                    <p key={index} className="text-base sm:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Portrait Image */}
                <div className="mt-12 relative">
                  <div className="relative w-48 sm:w-64 h-60 sm:h-80 mx-auto lg:mx-0">
                    <Image
                      src="/images/portrait.jpg"
                      alt="Kaarle Hurtig"
                      fill
                      className="object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      priority
                    />
                  </div>
                  {/* Decorative frame */}
                  <div className="absolute -inset-4 border-2 border-accent/20 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
            {/* Contact Info */}
            <div className="text-xs sm:text-sm font-medium uppercase tracking-wide text-gray-600" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              KAARLE HURTIG | +358 440 522 753 | kaarle.hurtig@gmail.com
            </div>

            {/* Bottom Navigation */}
            <BottomNav right={{ href: "/about", label: "ABOUT" }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
