import React from "react";
import logoImg from "../logo2.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  // Height classes depending on size
  let heightClass = "h-10 md:h-11";
  if (size === "sm") {
    heightClass = "h-7 md:h-8";
  } else if (size === "lg") {
    heightClass = "h-14 md:h-16";
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="РефЭкспресс"
        referrerPolicy="no-referrer"
        className={`${heightClass} w-auto object-contain`}
      />
    </div>
  );
}
