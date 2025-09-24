import BottomNav from "@/components/BottomNav";
import { landing } from "@/data/site-copy";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-ink hover:text-accent transition-all duration-300 hover:scale-105" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              KAARLE ✳ KUMPP.
            </Link>
            <Link href="/works" className="text-sm sm:text-base font-semibold uppercase tracking-wider text-ink hover:text-accent transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-accent/5" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              WORKS
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 sm:gap-20 lg:gap-32 items-start lg:items-center">
            {/* Left Column - Visual Impact */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Large Typography Statement */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase leading-[0.9] mb-12 text-ink" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                  PROBLEM SOLVING AND STORYTELLING.
                </h1>
                
                {/* Decorative Element */}
                <div className="w-20 h-1.5 bg-accent mb-12"></div>
                
                {/* Key Question */}
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-accent mb-12 leading-tight" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                  WHAT IS YOUR PROBLEM?
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="order-1 lg:order-2">
              <div className="prose prose-xl max-w-none" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
                <div className="space-y-8 text-gray-800 leading-relaxed">
                  {landing.intro.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                    <p key={index} className="text-lg sm:text-xl leading-8">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Portrait Image */}
                <div className="mt-16 relative">
                  <div className="relative w-56 sm:w-72 h-72 sm:h-96 mx-auto lg:mx-0">
                    <Image
                      src="/images/portrait.jpg"
                      alt="Kaarle Hurtig"
                      fill
                      className="object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                      priority
                    />
                  </div>
                  {/* Decorative frame */}
                  <div className="absolute -inset-6 border-2 border-accent/30 rounded-3xl"></div>
                  {/* Additional decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-800" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                KAARLE HURTIG
              </div>
              <div className="text-sm text-gray-600" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
                +358 440 522 753 | kaarle.hurtig@gmail.com
              </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav right={{ href: "/about", label: "ABOUT" }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
