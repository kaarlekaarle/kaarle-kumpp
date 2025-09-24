import Link from "next/link";
export default function Header() {
  return (
    <header className="flex justify-end p-6">
      <Link href="/" className="font-semibold" style={{fontFamily: "'Kaarle & Kumppanit', Arial, sans-serif"}}>KAARLE ✳ KUMPP.</Link>
    </header>
  );
}
