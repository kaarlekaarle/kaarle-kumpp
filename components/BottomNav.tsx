import Link from "next/link";

export default function BottomNav({ right }: { right: { href: string; label: string } }) {
  return (
    <Link 
      href={right.href} 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#1F37FF',
        color: 'white',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.025em',
        fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif",
        textDecoration: 'none',
        borderRadius: '0.25rem',
        transition: 'background-color 0.2s ease'
      }}
    >
      {right.label}
    </Link>
  );
}
