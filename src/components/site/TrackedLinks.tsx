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

function internalDestination(href: string) {
  const path = href.startsWith("#")
    ? typeof window !== "undefined"
      ? window.location.pathname || "/"
      : "/"
    : href.split(/[?#]/, 1)[0] || "/";
  const type = path.startsWith("/quanto-custa")
    ? "estimate"
    : path.startsWith("/contato")
      ? "contact"
      : path.startsWith("/servicos") || path.startsWith("/problemas")
        ? "service"
        : "other";

  return { destination_type: type, destination_path: path };
}

function serviceIdFromHref(href: string) {
  if (href.startsWith("/servicos/retifica-de-sedes-e-valvulas#esmerilhamento")) {
    return "esmerilhamento-de-valvulas";
  }

  const serviceIdsByPath: Record<string, string> = {
    "/servicos/retifica-de-cabecote": "retifica-de-cabecote",
    "/servicos/retifica-de-sedes-e-valvulas": "retifica-de-sedes-e-valvulas",
    "/servicos/plaina-de-cabecote": "plaina-de-cabecote",
    "/servicos/banho-quimico": "limpeza-quimica",
    "/servicos/troca-e-adaptacao-de-guias": "troca-e-adaptacao-de-guias",
    "/servicos/usinagem-de-roscas": "usinagem-de-roscas",
    "/servicos/teste-de-trinca": "solda-de-trincas",
    "/servicos/montagem-de-cabecote": "montagem-e-regulagem-final",
    "/quanto-custa": "diagnostico-tecnico-de-motor",
  };
  const path = internalDestination(href).destination_path;

  return (
    serviceIdsByPath[path] ?? path.match(/^\/servicos\/([^/]+)/)?.[1]
  );
}

export function TrackedWhatsAppLink({
  children,
  clarityEventName = "whatsapp_home_cta_click",
  eventLabel,
  message = whatsappBudgetText,
  serviceId,
  trackingPosition = "content",
  ...props
}: TrackedAnchorProps & {
  clarityEventName?: ClarityEventName;
  eventLabel: string;
  message?: string;
  serviceId?: string;
  trackingPosition?: string;
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
            component_id: eventLabel,
            position: trackingPosition,
            service_id: serviceId,
            destination_type: "whatsapp",
            destination_path: "/whatsapp",
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
  serviceId,
  trackingPosition = "content",
  ...props
}: TrackedAnchorProps & {
  eventLabel: string;
  serviceId?: string;
  trackingPosition?: string;
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
          component_id: eventLabel,
          position: trackingPosition,
          service_id: serviceId,
          destination_type: "phone",
          destination_path: "/phone",
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
  trackingPosition = "content",
  ...props
}: TrackedAnchorProps & {
  eventLabel: string;
  trackingPosition?: string;
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
            component_id: eventLabel,
            position: trackingPosition,
            destination_type: "directions",
            destination_path: "/directions",
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
  serviceId,
  serviceName,
  trackingPosition = "service_catalog",
  ...props
}: TrackedInternalLinkProps & {
  serviceId?: string;
  serviceName: string;
  trackingPosition?: string;
}) {
  const resolvedServiceId = serviceId ?? serviceIdFromHref(href);

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
          service_id: resolvedServiceId,
          component_id: resolvedServiceId
            ? `service_${resolvedServiceId.replace(/-/g, "_")}`
            : `service_${serviceName
                .toLocaleLowerCase("pt-BR")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "_")
                .replace(/^_|_$/g, "")}`,
          position: trackingPosition,
          ...internalDestination(href),
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
  serviceId,
  trackingPosition = "content",
  ...props
}: TrackedInternalLinkProps & {
  eventLabel: string;
  serviceId?: string;
  trackingPosition?: string;
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
          component_id: eventLabel,
          position: trackingPosition,
          service_id: serviceId,
          ...internalDestination(href),
        });
      }}
    >
      {children}
    </Link>
  );
}
