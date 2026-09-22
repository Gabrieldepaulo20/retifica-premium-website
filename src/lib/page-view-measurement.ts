/** Cada destino tem seu próprio cursor: o aceite tardio não repete o evento
 * próprio nem perde a primeira página no Analytics. Estado só em memória. */
export function createPageViewMeasurement() {
  let ownPath: string | null = null;
  let analyticsPath: string | null = null;
  return {
    reset() {
      ownPath = null;
      analyticsPath = null;
    },
    measure(
      pathname: string,
      analyticsAllowed: boolean,
      send: {
        own: (label: "page_view" | "spa_navigation") => void;
        analytics: () => boolean;
      }
    ) {
      if (ownPath !== pathname) {
        send.own(ownPath === null ? "page_view" : "spa_navigation");
        ownPath = pathname;
      }
      if (!analyticsAllowed) {
        analyticsPath = null;
        return;
      }
      if (analyticsPath !== pathname && send.analytics()) {
        analyticsPath = pathname;
      }
    },
  };
}
