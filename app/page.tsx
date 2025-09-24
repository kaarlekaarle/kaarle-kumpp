import BottomNav from "@/components/BottomNav";
import { landing } from "@/data/site-copy";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation - WORKS */}
      <div className="flex justify-end p-6">
        <Link href="/works" className="text-lg font-semibold uppercase" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
          WORKS
        </Link>
      </div>

      {/* Main Content - Two Column Layout */}
      <main className="container flex-1 grid md:grid-cols-2 gap-10 md:gap-24 items-center py-20">
        {/* Left Column - Logo */}
        <div className="flex items-center justify-center">
          <div className="text-4xl md:text-5xl font-bold text-center uppercase" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
            KAARLE ✳ KUMPP.
          </div>
        </div>

        {/* Right Column - Content */}
        <section className="max-w-prose">
          <h1 className="text-2xl md:text-3xl font-bold uppercase mb-8 text-blue-600" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
            PROBLEM SOLVING AND STORYTELLING.
          </h1>
          <div className="text-base leading-relaxed space-y-4" style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
            {landing.intro.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-900">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Section */}
      <div className="flex justify-between items-center p-6">
        {/* Contact Info */}
        <div className="text-sm font-medium uppercase" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
          KAARLE HURTIG | +358 440 522 753 | kaarle.hurtig@gmail.com
        </div>

        {/* Bottom Navigation - ABOUT */}
        <BottomNav right={{ href: "/about", label: "ABOUT" }} />
      </div>
    </div>
  );
}
