"use client";

import { useEffect } from "react";

export function ProviderPageNoScroll() {
  useEffect(() => {
    document.body.classList.add("provider-page-no-scroll");
    return () => document.body.classList.remove("provider-page-no-scroll");
  }, []);

  return null;
}
