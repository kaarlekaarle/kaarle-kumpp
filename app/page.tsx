import BottomNav from "@/components/BottomNav";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-gray-900 hover:text-accent transition-colors" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              KAARLE ✳ KUMPP.
            </Link>
            <Link href="/works" className="text-sm sm:text-base font-semibold uppercase tracking-wide text-gray-900 hover:text-accent transition-colors" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              WORKS
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-tight text-accent" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                PROBLEM SOLVING AND STORYTELLING.
              </h1>
              
              {/* Subheading */}
              <div className="text-xl text-gray-800" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                PROBLEM SOLVING AND STORYTELLING.
              </div>
              
              {/* Content Text */}
              <div className="prose prose-lg max-w-none" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
                <div className="space-y-6 text-gray-800 leading-relaxed">
                  <p className="text-lg leading-7">
                    Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.
                  </p>
                  <p className="text-lg leading-7">
                    Too often, projects get tangled in too many hands, wasted time, and money spent. Budgets grow, meetings multiply, and the focus shifts from solving the problem to justifying the invoices.
                  </p>
                  <p className="text-lg leading-7">
                    I do the work like it&apos;s mine. If I&apos;m not the man for the job, I&apos;ll say so. I don&apos;t drag things out to look busy. I don&apos;t bill by the hour. I charge by the solution.
                  </p>
                </div>
              </div>
              
              {/* Key Question */}
              <div className="text-2xl sm:text-3xl font-bold uppercase text-accent" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                WHAT IS YOUR PROBLEM?
              </div>
            </div>

            {/* Right Column - Client List */}
            <div className="space-y-8">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-900" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
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
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Contact Info */}
            <div className="text-sm font-medium text-gray-600" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
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
