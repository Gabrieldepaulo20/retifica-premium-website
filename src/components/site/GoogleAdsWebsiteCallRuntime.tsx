"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAdvertisingConsent,
} from "@/lib/consent";
import { siteConfig } from "@/lib/site";

const WEBSITE_CALL_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_SEND_TO ||
  "AW-18268630627/CwNLCK_qqdwcEOPclIdE";

type GoogleWebsiteCallConfig = {
  phone_conversion_number: string;
  phone_conversion_callback: (
    formattedNumber: string,
    mobileNumber: string
  ) => void;
};

type WebsiteCallWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (
    command: "config",
    destination: string,
    config?: GoogleWebsiteCallConfig
  ) => void;
};

type DisplayedPhone = {
  display: string;
  href: string;
};

let displayedPhone: DisplayedPhone = {
  display: siteConfig.phone.display,
  href: siteConfig.phone.href,
};
let configurationRevision = 0;

function phoneHref(mobileNumber: string) {
  const normalized = mobileNumber.trim().replace(/^tel:/i, "");
  return normalized ? `tel:${normalized}` : siteConfig.phone.href;
}

function replacePhoneText(from: readonly string[], to: string) {
  const values = [...new Set(from.filter((value) => value && value !== to))];
  if (!values.length || !document.body) return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  let node = walker.nextNode();
  while (node) {
    const parentName = node.parentElement?.tagName;
    if (
      node.nodeValue &&
      parentName !== "SCRIPT" &&
      parentName !== "STYLE" &&
      parentName !== "NOSCRIPT"
    ) {
      let nextValue = node.nodeValue;
      for (const value of values) {
        nextValue = nextValue.replaceAll(value, to);
      }
      if (nextValue !== node.nodeValue) {
        node.nodeValue = nextValue;
      }
    }
    node = walker.nextNode();
  }
}

function replacePhoneLinks(from: readonly string[], to: string) {
  const hrefs = new Set(from);
  document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (href && hrefs.has(href)) {
      link.setAttribute("href", to);
    }
  });
}

function applyDisplayedPhone(next: DisplayedPhone) {
  replacePhoneText(
    [siteConfig.phone.display, displayedPhone.display],
    next.display
  );
  replacePhoneLinks(
    [siteConfig.phone.href, displayedPhone.href],
    next.href
  );
  displayedPhone = next;
}

function restoreBusinessPhone() {
  applyDisplayedPhone({
    display: siteConfig.phone.display,
    href: siteConfig.phone.href,
  });
}

function configureWebsiteCallTracking() {
  const revision = ++configurationRevision;

  if (!WEBSITE_CALL_SEND_TO || !hasAdvertisingConsent()) {
    restoreBusinessPhone();
    return;
  }

  const runtimeWindow = window as WebsiteCallWindow;
  runtimeWindow.dataLayer = runtimeWindow.dataLayer || [];
  runtimeWindow.gtag =
    runtimeWindow.gtag ||
    function gtag(...args: unknown[]) {
      runtimeWindow.dataLayer?.push(args);
    };

  runtimeWindow.gtag("config", WEBSITE_CALL_SEND_TO, {
    phone_conversion_number: siteConfig.phone.display,
    phone_conversion_callback: (formattedNumber, mobileNumber) => {
      if (
        revision !== configurationRevision ||
        !hasAdvertisingConsent() ||
        !formattedNumber?.trim() ||
        !mobileNumber?.trim()
      ) {
        return;
      }

      applyDisplayedPhone({
        display: formattedNumber.trim(),
        href: phoneHref(mobileNumber),
      });
    },
  });
}

export function GoogleAdsWebsiteCallRuntime() {
  const pathname = usePathname();
  const [consentRevision, setConsentRevision] = useState(0);

  useEffect(() => {
    const handleConsentChanged = () => {
      setConsentRevision((current) => current + 1);
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged);
    return () =>
      window.removeEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged);
  }, []);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      configureWebsiteCallTracking();
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      configurationRevision += 1;
    };
  }, [consentRevision, pathname]);

  return null;
}
