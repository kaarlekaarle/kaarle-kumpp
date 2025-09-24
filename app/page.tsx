import BottomNav from "@/components/BottomNav";
import { landing } from "@/data/site-copy";
import Link from "next/link";

export default function Page() {
  return (
    <main className="container min-h-screen relative">
      {/* Top Navigation - WORKS */}
      <div className="absolute top-8 right-8">
        <Link href="/works" className="text-lg font-semibold uppercase" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
          WORKS
        </Link>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-24 min-h-screen items-center pt-20 pb-20">
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
      </div>

      {/* Bottom Contact Info */}
      <div className="absolute bottom-8 left-8">
        <div className="text-sm font-medium uppercase" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
          KAARLE HURTIG | +358 440 522 753 | kaarle.hurtig@gmail.com
        </div>
      </div>

      {/* Bottom Navigation - ABOUT */}
      <div className="absolute bottom-8 right-8">
        <BottomNav right={{ href: "/about", label: "ABOUT" }} />
      </div>
    </main>
  );
}
