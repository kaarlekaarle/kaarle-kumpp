import Link from "next/link";

export default function BottomNav({ right }: { right: { href: string; label: string } }) {
  return (
    <Link 
      href={right.href} 
      className="inline-flex items-center px-6 py-3 bg-accent text-white font-medium uppercase tracking-wide hover:bg-accent/90 hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-lg group" 
      style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}
    >
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        {right.label}
      </span>
    </Link>
  );
}
