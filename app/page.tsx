import BottomNav from "@/components/BottomNav";
import { landing } from "@/data/site-copy";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div style={{minHeight: '100vh', backgroundColor: 'white'}}>
      {/* Top Navigation */}
      <nav style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e5e7eb'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Link href="/" style={{fontSize: '1.125rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif", textDecoration: 'none', color: '#111'}}>
              KAARLE ✳ KUMPP.
            </Link>
            <Link href="/works" style={{fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.025em', fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif", textDecoration: 'none', color: '#111'}}>
              WORKS
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{paddingTop: '5rem', paddingBottom: '3rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center'}}>
            {/* Left Column - Visual Impact */}
            <div>
              <div style={{position: 'relative'}}>
                {/* Large Typography Statement */}
                <h1 style={{fontSize: '3rem', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: '1.1', marginBottom: '2rem', color: '#111', fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                  PROBLEM SOLVING AND STORYTELLING.
                </h1>
                
                {/* Decorative Element */}
                <div style={{width: '4rem', height: '4px', backgroundColor: '#1F37FF', marginBottom: '2rem'}}></div>
                
                {/* Key Question */}
                <div style={{fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#1F37FF', marginBottom: '2rem', fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
                  WHAT IS YOUR PROBLEM?
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div>
              <div style={{fontFamily: "'Garamond Premier', 'Times New Roman', serif"}}>
                <div style={{marginBottom: '1.5rem'}}>
                  {landing.intro.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                    <p key={index} style={{fontSize: '1.125rem', lineHeight: '1.6', color: '#374151', marginBottom: '1.5rem'}}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Portrait Image */}
                <div style={{marginTop: '3rem', position: 'relative'}}>
                  <div style={{position: 'relative', width: '16rem', height: '20rem', margin: '0 auto'}}>
                    <Image
                      src="/images/portrait.jpg"
                      alt="Kaarle Hurtig"
                      fill
                      style={{objectFit: 'cover', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                      priority
                    />
                  </div>
                  {/* Decorative frame */}
                  <div style={{position: 'absolute', top: '-1rem', left: '-1rem', right: '-1rem', bottom: '-1rem', border: '2px solid rgba(31, 55, 255, 0.2)', borderRadius: '0.75rem'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer style={{borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start'}}>
            {/* Contact Info */}
            <div style={{fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.025em', color: '#6b7280', fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>
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
