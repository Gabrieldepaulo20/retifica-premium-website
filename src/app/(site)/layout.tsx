import { ConditionalFooter } from "@/components/site/ConditionalFooter";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="pt-[225px]">{children}</main>
      <ConditionalFooter />
    </>
  );
}
