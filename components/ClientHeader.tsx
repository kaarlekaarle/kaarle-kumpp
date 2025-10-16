"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ClientHeader({
  logoSrc,
  logoAlt,
  closeLink,
  allClients,
  currentClientSlug,
  slides,
}: {
  logoSrc?: string;
  logoAlt?: string;
  closeLink?: string;
  allClients?: { slug: string; name: string }[];
  currentClientSlug?: string;
  slides: { src: string; alt?: string; blurDataURL?: string }[];
}) {
  const N = slides.length;
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const qp = params.get("slide");
  const qpIndex = qp ? Math.max(0, Math.min(N-1, Number(qp))) : 0;
  const [i, setI] = useState(qpIndex);

  useEffect(()=>{ // sync ?slide=n shallow
    const sp = new URLSearchParams(params.toString());
    sp.set("slide", String(i));
    router.replace(`${pathname}?${sp.toString()}`, { scroll:false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  useEffect(()=>{ // keys
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { router.push("/works"); return; }
      if (e.key === "ArrowLeft")  setI(p => (p - 1 + N) % N);
      if (e.key === "ArrowRight") setI(p => (p + 1) % N);
      
      // Handle up/down for client navigation
      if (allClients && currentClientSlug && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
        e.preventDefault();
        const currentIndex = allClients.findIndex(client => client.slug === currentClientSlug);
        if (currentIndex !== -1) {
          let newIndex;
          if (e.key === "ArrowUp") {
            newIndex = currentIndex <= 0 ? allClients.length - 1 : currentIndex - 1;
          } else {
            newIndex = currentIndex >= allClients.length - 1 ? 0 : currentIndex + 1;
          }
          const nextClient = allClients[newIndex];
          if (nextClient) {
            router.push(`/works/${nextClient.slug}`);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey, { passive:true });
    return () => window.removeEventListener("keydown", onKey);
  }, [router, N, allClients, currentClientSlug]);

  const many = N > 1;

  return (
    <div className="w-[720px] mx-auto h-full flex items-center">
      {/* Logo and X button row - aligned with right column top */}
      <div className="flex items-center justify-between w-full">
        <div>
          {logoSrc && (
            <img src={logoSrc} alt={logoAlt || ""} className="h-12 w-auto object-contain" />
          )}
        </div>
        <div>
      {closeLink && (
        <a href={closeLink} aria-label="Close" className="nav-right leading-none">×</a>
      )}
        </div>
      </div>
    </div>
  );
}
