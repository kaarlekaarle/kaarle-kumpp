import React from "react";

type Props = {
  className?: string;
  title?: string;
};
export default function LogoMark({ className = "", title = "Apple logo" }: Props) {
  // U+F8FF is the Apple logo in Apple platforms. Fallback will show a blank on non-Apple OS;
  // we keep the semantic "&" in the DOM for a11y in the Appleify component.
  return (
    <span
      aria-hidden="true"
      title={title}
      className={`apple-mark ${className}`}
    >
      {"\uF8FF"}
    </span>
  );
}