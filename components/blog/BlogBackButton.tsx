"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function BlogBackButtonContent() {
  const searchParams = useSearchParams();
  const [backLink, setBackLink] = useState("/blog");
  const [label, setLabel] = useState("Back to Blog");

  useEffect(() => {
    const from = searchParams.get("from");
    if (from === "home") {
      setBackLink("/");
      setLabel("Back to Home");
    }
  }, [searchParams]);

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

export default function BlogBackButton() {
  return (
    <Suspense fallback={null}>
      <BlogBackButtonContent />
    </Suspense>
  );
}

