"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAudio } from "@/context/AudioContext";

export function AudioRouteListener() {
  const pathname = usePathname();
  const { stop } = useAudio();

  useEffect(() => {
    // whenever route changes → stop audio
    stop();
  }, [pathname]);

  return null;
}
