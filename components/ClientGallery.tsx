"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ClientGallery({
  slides, summary, links, logoSrc, logoAlt, closeLink, allClients, currentClientSlug,
}:{
  slides: {src:string; alt?:string; blurDataURL?:string}[];
  summary: string;
  links?: {icon?:string; url:string}[];
  logoSrc?: string;
  logoAlt?: string;
  closeLink?: string;
  allClients?: {slug: string; name: string}[];
  currentClientSlug?: string;
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

  const many = N>1;
  const preload = useMemo(()=>{
    const s = new Set([i]);
    if (i+1<N) s.add(i+1);
    if (i-1>=0) s.add(i-1);
    return s;
  }, [i,N]);

  const advance = () => setI(p => (p + 1) % N);
  const prev    = () => setI(p => (p - 1 + N) % N);

  return (
    <div className="kk-left-w mx-auto flex flex-col items-center h-full">
      {/* Logo and X button row - keep at top */}
      <div className="w-full flex items-center justify-between mb-0.5">
        {logoSrc && (
          <img src={logoSrc} alt={logoAlt || ""} className="h-12 w-auto" />
        )}
        {closeLink && (
          <a href={closeLink} aria-label="Close" className="text-2xl leading-none">×</a>
        )}
      </div>

      {/* Spacer to center content with client list */}
      <div className="flex-1 flex items-center">
        <div className="w-full">

      {/* Dots row - with more margin to image */}
      {many && (
        <div className="w-full flex justify-center mb-6">
          <div role="tablist" aria-label="Slides" className="flex justify-center gap-2">
            {slides.map((_, idx)=>(
              <button key={idx} role="tab"
                aria-selected={i===idx}
                aria-label={`Slide ${idx+1} of ${N}`}
                onClick={()=>setI(idx)}
                className={`h-2 w-2 rounded-full ${
                  i===idx 
                    ? "bg-current" 
                    : "bg-gray-400"
                }`} />
            ))}
          </div>
        </div>
      )}

      {/* Media region with fixed size based on ED 6.png baseline (1600x1200) */}
      <div className="relative w-full mb-6">
        {/* Fixed position arrows - positioned relative to the outer container */}
        {many && (
          <>
            <button
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-[calc(50%-360px-48px)] top-[225px] -translate-y-1/2 text-2xl z-10"
            >←</button>
            <button
              aria-label="Next slide"
              onClick={advance}
              className="absolute right-[calc(50%-360px-48px)] top-[225px] -translate-y-1/2 text-2xl z-10"
            >→</button>
          </>
        )}
        {/* Fixed size image container based on ED 6.png (1600x1200 = 4:3 aspect ratio) - widened by 20% */}
        <figure className="mx-auto w-[720px] h-[450px] flex items-center justify-center relative">
          {slides.map((s, idx)=>{
            const show = idx===i || preload.has(idx);
            if (!show) return null;
            return (
              <Image key={idx}
                src={s.src}
                alt={s.alt ?? ""}
                priority={idx===i}
                placeholder={s.blurDataURL ? "blur" : "empty"}
                blurDataURL={s.blurDataURL}
                width={1600} height={1200}
                style={{ 
                  display: idx===i ? "block" : "none", 
                  objectFit:"contain", 
                  width: "100%", 
                  height: "100%"
                }}
                onClick={advance}
              />
            );
          })}
        </figure>
      </div>

      {/* Caption - with more margin from image */}
      <figcaption className="w-full mt-6">
        <div className="kk-center-copy mx-auto max-w-[73ch] font-serif text-sm font-medium leading-none space-y-1">
          {Array.isArray(summary)
            ? summary.map((t, i) => <p key={i}>{t}</p>)
            : <p>{summary}</p>}
        </div>
      </figcaption>

        </div>
      </div>

      {/* Links row - aligned with right column bottom */}
      {links?.length ? (
        <div className="w-full flex justify-center gap-4 mt-auto">
          {links.map((l, idx)=>(
            <a key={idx} href={l.url} target="_blank" rel="noreferrer" aria-label={l.icon ?? "link"} className="opacity-80 hover:opacity-100">
              {l.icon ? (
                <img 
                  src={`/icons/${l.icon}.svg`} 
                  alt={l.icon}
                  className="w-5 h-5"
                />
              ) : (
                <span>{l.icon ?? "link"}</span>
              )}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}