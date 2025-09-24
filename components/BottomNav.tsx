import Link from "next/link";

export default function BottomNav({ right }: { right: { href: string; label: string } }) {
  return (
    <Link 
      href={right.href} 
      className="inline-flex items-center px-6 py-3 bg-accent text-white font-medium uppercase tracking-wide hover:bg-accent/90 transition-colors" 
      style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}
    >
      {right.label}
    </Link>
  );
}
