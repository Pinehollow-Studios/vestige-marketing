"use client";

import { useGlobalProgress } from "../marketing/hooks";
import { ScrollProgress } from "../marketing/ScrollProgress";

/**
 * The page-level motion chrome /progress shares with the homepage:
 * one client component that writes the global --gp variable (which the
 * fixed ambient glows and the top progress bar consume from CSS) so
 * the rest of the page can stay server-rendered.
 */
export function ProgressMotion() {
  useGlobalProgress();
  return <ScrollProgress />;
}
