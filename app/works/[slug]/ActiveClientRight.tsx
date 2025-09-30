"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ActiveClientRight({ children }:{children: React.ReactNode}) {
  const slug = usePathname().split("/").pop();
  
  useEffect(() => {
    // Apply active class to matching elements
    const elements = document.querySelectorAll('a[data-slug]');
    elements.forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-slug') === slug);
    });
  }, [slug]);

  return (
    <div className="[&_a[data-slug]]:opacity-40 [&_a[data-slug].active]:opacity-100">
      {children}
    </div>
  );
}
