import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Right - WORKS Button - Aligned with main text */}
      <div className="absolute top-6" style={{left: 'calc(50% + 3rem)'}}>
        <Link href="/works" className="text-sm font-bold uppercase tracking-wide text-gray-900 hover:text-accent transition-colors" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
          WORKS
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Left Side - Branding */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold uppercase text-gray-900 mb-4" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              KAARLE
            </div>
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-gray-900 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-900 rounded-full"></div>
              </div>
            </div>
            <div className="text-4xl font-bold uppercase text-gray-900" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              KUMPP.
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <div className="max-w-lg">
            {/* Main Heading */}
            <h1 className="text-3xl font-bold uppercase leading-tight text-accent mb-8" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              PROBLEM SOLVING AND STORYTELLING.
            </h1>
            
            {/* Content Text - All in Blue, Garamond font */}
            <div className="space-y-6 text-accent leading-relaxed" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
              <p className="text-lg">
                Everything starts with a question: <em>What are we doing here?</em> Once we agree on the task, I lay out a plan. You need clarity, the right perspective, and the right people. When we&apos;ve got those, we&apos;re halfway there.
              </p>
              <p className="text-lg">
                Too often, projects get tangled in too many hands, wasted time, and money spent. Budgets grow, meetings multiply, and the focus shifts from solving the problem to justifying the invoices.
              </p>
              <p className="text-lg">
                I do the work like it&apos;s mine. If I&apos;m not the man for the job, I&apos;ll say so. I don&apos;t drag things out to look busy. I don&apos;t bill by the hour. I charge by the solution.
              </p>
            </div>
            
            {/* Key Question */}
            <div className="text-2xl font-bold uppercase text-accent mt-8" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
              WHAT IS YOUR PROBLEM?
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
        {/* Contact Info - Centered with logo */}
        <div className="w-1/2 flex justify-center">
          <div className="text-sm font-medium text-gray-900">
            <span style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>KAARLE HURTIG</span> | <span style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>+358 440 522 753</span> | <em style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>kaarle.hurtig@gmail.com</em>
          </div>
        </div>

        {/* ABOUT Button - Aligned with main text */}
        <div className="w-1/2 flex justify-end">
          <Link href="/about" className="text-sm font-bold uppercase tracking-wide text-gray-900 hover:text-accent transition-colors" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
            ABOUT
          </Link>
        </div>
      </div>
    </div>
  );
}
