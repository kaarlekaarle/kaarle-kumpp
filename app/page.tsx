import BottomNav from "@/components/BottomNav";
import { landing } from "@/data/site-copy";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Main Content Area (Peach/Salmon Background) */}
      <div className="flex-1 bg-gradient-to-br from-orange-100 to-orange-200 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-orange-400/30 rounded-full blur-lg"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 py-16">
          {/* Main Content - Hero Section */}
          <div className="text-center max-w-4xl">
            {/* Large Typography Statement */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold uppercase leading-[0.9] mb-12 text-gray-800 hover:text-accent transition-colors duration-500" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              PROBLEM SOLVING AND STORYTELLING.
            </h1>
            
            {/* Decorative Element */}
            <div className="w-24 h-2 bg-accent mb-12 mx-auto relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent/50 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent/30 rounded-full"></div>
            </div>
            
            {/* Key Question */}
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-accent mb-16 leading-tight hover:scale-105 transition-transform duration-300 cursor-default" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              WHAT IS YOUR PROBLEM?
            </div>
            
            {/* Content Text */}
            <div className="prose prose-2xl max-w-3xl mx-auto" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
              <div className="space-y-8 text-gray-700 leading-relaxed">
                {landing.intro.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                  <p key={index} className="text-xl sm:text-2xl leading-8 hover:text-gray-900 transition-colors duration-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Portrait Image */}
            <div className="mt-20 relative">
              <div className="relative w-64 sm:w-80 h-80 sm:h-96 mx-auto">
                <Image
                  src="/images/portrait.jpg"
                  alt="Kaarle Hurtig"
                  fill
                  className="object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                  priority
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -inset-8 border-2 border-accent/30 rounded-3xl"></div>
              {/* Additional decorative elements */}
              <div className="absolute -top-6 -right-6 w-10 h-10 bg-accent/20 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-accent/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Navigation and Client List */}
      <div className="w-1/3 flex flex-col">
        {/* Top Section - Logo/Brand (Light Purple) */}
        <div className="flex-1 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center p-8">
          <Link href="/" className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-gray-800 hover:text-accent transition-all duration-300 hover:scale-105" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
            KAARLE ✳ KUMPP.
          </Link>
        </div>

        {/* Middle Section - Client List (Light Green) */}
        <div className="flex-2 bg-gradient-to-br from-green-100 to-green-200 p-8 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-800 mb-6" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              CLIENTS
            </h3>
            <div className="space-y-3">
              {[
                "BASSO RADIO", "ED / HARTWALL", "EV. LUT. KIRKKO", "FLOW FESTIVAL", 
                "HOBO HOTEL", "HELSINKI UNI", "JCAD", "KESKO", "KESKUSTELUOHJELMA", 
                "KAARLEN MAAILMA", "LUBRICAN", "RADIO HELSINKI", "R-COLLECTION", 
                "SECTO LABS", "SECTO AUTOMOTIVE"
              ].map((client, index) => (
                <div 
                  key={index} 
                  className="text-sm font-medium text-gray-700 hover:text-accent hover:translate-x-2 transition-all duration-300 cursor-pointer" 
                  style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Navigation (Light Purple) */}
        <div className="flex-1 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center p-8">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/works" className="text-lg font-semibold uppercase tracking-wider text-gray-800 hover:text-accent transition-all duration-300 hover:scale-105" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              WORKS
            </Link>
            <BottomNav right={{ href: "/about", label: "ABOUT" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
