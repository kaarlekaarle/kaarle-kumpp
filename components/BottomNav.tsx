import Link from "next/link";
export default function BottomNav({ right }: { right: { href: string; label: string } }) {
  return (
    <footer className="flex justify-end p-8">
      <Link href={right.href} className="uppercase font-semibold" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>{right.label}</Link>
    </footer>
  );
}
