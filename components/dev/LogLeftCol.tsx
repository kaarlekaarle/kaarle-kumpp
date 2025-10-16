"use client";
import { useEffect } from "react";

export default function LogLeftCol(){
  useEffect(()=>{
    if (process.env.NODE_ENV !== "development") return;
    
    const q = (s: string)=> document.querySelector<HTMLElement>(s);
    const em = q(".em");
    const mid = q('.em [data-id="left-middle"]');
    const bot = q('.em [data-id="left-bottom"]');
    
    if (!em || !mid) return;
    
    const rEm = em.getBoundingClientRect();
    const rMid = mid.getBoundingClientRect();
    const rBot = bot?.getBoundingClientRect();
    
    // rows: 1fr / max-content / 1fr
    console.table({
      "em.h": rEm.height.toFixed(2),
      "mid.h": rMid.height.toFixed(2),
      "mid.top": (rMid.top - rEm.top).toFixed(2),
      "mid.bottom": (rEm.bottom - rMid.bottom).toFixed(2),
      "bot.top?": rBot ? (rBot.top - rEm.top).toFixed(2) : "n/a",
      "bot.bottom?": rBot ? (rEm.bottom - rBot.bottom).toFixed(2) : "n/a",
      "row1≈": ((rMid.top - rEm.top)).toFixed(2),
      "row2≈": (rMid.height).toFixed(2),
      "row3≈": ((rEm.bottom - rMid.bottom)).toFixed(2),
      "equal(row1,row3)?": Math.abs((rMid.top - rEm.top) - (rEm.bottom - rMid.bottom)) < 1 ? "yes":"no",
    });
  },[]);
  
  return null;
}
