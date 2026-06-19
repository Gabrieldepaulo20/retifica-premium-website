import { ConditionalFooter } from "@/components/site/ConditionalFooter";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ConditionalFooter />
    </>
  );
}
