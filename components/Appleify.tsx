import React from "react";
import LogoMark from "./LogoMark";

/**
 * Appleify replaces literal ampersands '&' in its children (string/React nodes)
 * with: visually-hidden '&' for a11y + visible Apple glyph (LogoMark).
 * Opt-in use only: wrap the exact text where you want the transform.
 */
export default function Appleify({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  function renderFrag(node: React.ReactNode): React.ReactNode {
    if (typeof node === "string") {
      const parts = node.split("&");
      if (parts.length === 1) return node;
      const out: React.ReactNode[] = [];
      parts.forEach((part, i) => {
        if (i > 0) {
          out.push(
            <span key={`amp-${i}`} className="sr-only" aria-hidden={false}>
              &amp;
            </span>
          );
          out.push(<LogoMark key={`apple-${i}`} />);
        }
        if (part) out.push(part);
      });
      return <>{out}</>;
    }
    if (Array.isArray(node)) return node.map((n, i) => <React.Fragment key={i}>{renderFrag(n)}</React.Fragment>);
    if (React.isValidElement(node)) {
      return React.cloneElement(node as React.ReactElement<any>, { 
        ...(node.props as any), 
        children: renderFrag((node.props as any).children) 
      });
    }
    return node;
  }
  return <span className={`appleify ${className}`}>{renderFrag(children)}</span>;
}
