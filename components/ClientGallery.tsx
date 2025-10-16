"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ClientGallery({
  slides,
}:{
  slides: {src:string; alt?:string; blurDataURL?:string}[];
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
    };
    window.addEventListener("keydown", onKey, { passive:true });
    return () => window.removeEventListener("keydown", onKey);
  }, [router, N]);

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
    <div className="work-card mx-auto flex flex-col items-center h-full">
      {/* Dots row - positioned at top of image cell */}
      {many && (
        <div className="flex justify-center pb-4">
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

      {/* Spacer to center content with client list */}
      <div className="flex-1 flex items-center">
        <div className="max-w-full">

      {/* Media region with fixed size based on ED 6.png baseline (1600x1200) */}
      <div className="relative mb-6">
        {/* Fixed position arrows - positioned relative to the outer container */}
        {many && (
          <>
            <button
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-[calc(50%-360px-48px)] top-[225px] -translate-y-1/2 nav-right z-10"
            >←</button>
            <button
              aria-label="Next slide"
              onClick={advance}
              className="absolute right-[calc(50%-360px-48px)] top-[225px] -translate-y-1/2 nav-right z-10"
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

        </div>
      </div>
    </div>
  );
}