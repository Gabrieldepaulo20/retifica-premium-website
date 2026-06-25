"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { siteConfig, whatsappBudgetText, whatsappBudgetUrl } from "@/lib/site";
import {
  type ClarityEventName,
  buildWhatsAppUrlWithAttribution,
  trackEngagementEvent,
  trackMarketingEvent,
} from "@/lib/trackingEvents";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

type TrackedInternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  children: ReactNode;
  href: string;
};

export function TrackedWhatsAppLink({
  children,
  clarityEventName = "whatsapp_home_cta_click",
  eventLabel,
  message = whatsappBudgetText,
  ...props
}: TrackedAnchorProps & {
  clarityEventName?: ClarityEventName;
  eventLabel: string;
  message?: string;
}) {
  return (
    <a
      {...props}
      href={props.href ?? whatsappBudgetUrl}
      target={props.target ?? "_blank"}
      rel={props.rel ?? "noopener noreferrer"}
      onClick={(event) => {
        props.onClick?.(event);
        event.currentTarget.href = buildWhatsAppUrlWithAttribution(
          siteConfig.whatsapp.number,
          message
        );
        trackEngagementEvent(
          clarityEventName,
          "whatsapp_click",
          eventLabel,
          {
            link_url: event.currentTarget.href,
            method: "whatsapp",
          }
        );
      }}
    >
      {children}
    </a>
  );
}

export function TrackedPhoneLink({
  children,
  eventLabel,
  ...props
}: TrackedAnchorProps & {
  eventLabel: string;
}) {
  return (
    <a
      {...props}
      href={props.href ?? siteConfig.phone.href}
      onClick={(event) => {
        props.onClick?.(event);
        trackEngagementEvent("phone_click", "phone_click", eventLabel, {
          link_url: event.currentTarget.href,
          method: "phone",
        });
      }}
    >
      {children}
    </a>
  );
}

export function TrackedDirectionsLink({
  children,
  eventLabel,
  ...props
}: TrackedAnchorProps & {
  eventLabel: string;
}) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    siteConfig.address.formatted
  )}`;

  return (
    <a
      {...props}
      href={props.href ?? mapsUrl}
      target={props.target ?? "_blank"}
      rel={props.rel ?? "noopener noreferrer"}
      onClick={(event) => {
        props.onClick?.(event);
        trackEngagementEvent(
          "directions_click",
          "directions_click",
          eventLabel,
          {
            link_url: event.currentTarget.href,
            method: "maps",
          }
        );
      }}
    >
      {children}
    </a>
  );
}

export function TrackedServiceLink({
  children,
  href,
  serviceName,
  ...props
}: TrackedInternalLinkProps & {
  serviceName: string;
}) {
  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        props.onClick?.(event);
        trackMarketingEvent("service_detail_click", {
          event_category: "navigation",
          event_label: serviceName,
          link_url: event.currentTarget.href,
          service_name: serviceName,
        });
      }}
    >
      {children}
    </Link>
  );
}

export function TrackedCtaLink({
  children,
  eventLabel,
  href,
  ...props
}: TrackedInternalLinkProps & {
  eventLabel: string;
}) {
  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        props.onClick?.(event);
        trackMarketingEvent("cta_click", {
          event_category: "engagement",
          event_label: eventLabel,
          link_url: event.currentTarget.href,
        });
      }}
    >
      {children}
    </Link>
  );
}
