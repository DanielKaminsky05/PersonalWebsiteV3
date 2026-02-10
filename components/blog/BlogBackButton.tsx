"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogBackButton() {
  const [backLink, setBackLink] = useState("/blog");
  const [label, setLabel] = useState("Back to Blog");

  useEffect(() => {
    // Check if the user came from the home page
    if (typeof window !== "undefined" && document.referrer) {
      const referrerUrl = new URL(document.referrer);
      
      // If referrer is the home page (root of the current origin)
      if (referrerUrl.origin === window.location.origin && referrerUrl.pathname === "/") {
        setBackLink("/");
        setLabel("Back to Home");
      }
    }
  }, []);

  return (
    <Link
      href={backLink}
      className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-8 group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      <span>{label}</span>
    </Link>
  );
}
