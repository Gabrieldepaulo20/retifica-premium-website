export type LocationPrecision = "approximate" | "precise";
type Point = [number, number];
export type Municipality = {
  name: string;
  bounds: [number, number, number, number];
  polygons: Point[][][];
};

export function locationOptions(mode: LocationPrecision): PositionOptions {
  return { enableHighAccuracy: mode === "precise", timeout: 10_000, maximumAge: 0 };
}

function insideRing(x: number, y: number, ring: Point[]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// Coordinates stay in memory on this device. Only a confirmed city leaves it.
export function suggestCity(
  coords: Pick<GeolocationCoordinates, "latitude" | "longitude" | "accuracy">,
  mode: LocationPrecision,
  municipalities: Municipality[],
): string | null {
  if (!Number.isFinite(coords.latitude) || !Number.isFinite(coords.longitude)
    || !Number.isFinite(coords.accuracy) || coords.accuracy < 0 || coords.accuracy > 25_000
    || Math.abs(coords.latitude) > 90 || Math.abs(coords.longitude) > 180) return null;
  // Low accuracy is only a browser hint. Coarsen the approximate choice ourselves.
  const y = mode === "approximate" ? Math.round(coords.latitude * 100) / 100 : coords.latitude;
  const x = mode === "approximate" ? Math.round(coords.longitude * 100) / 100 : coords.longitude;
  return municipalities.find(({ bounds: [minX, minY, maxX, maxY], polygons }) =>
    x >= minX && x <= maxX && y >= minY && y <= maxY
    && polygons.some(([outer, ...holes]) => insideRing(x, y, outer)
      && !holes.some((hole) => insideRing(x, y, hole))),
  )?.name ?? null;
}

export function requestCity(
  mode: LocationPrecision,
  signal: AbortSignal,
  geolocation: Pick<Geolocation, "getCurrentPosition">,
  loadCities: () => Promise<Municipality[]>,
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    let finished = false;
    const finish = (city: string | null, error?: Error) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      signal.removeEventListener("abort", abort);
      if (error) reject(error); else resolve(city);
    };
    const abort = () => finish(null, new Error("cancelled"));
    const timer = setTimeout(() => finish(null, new Error("timeout")), 15_000);
    if (signal.aborted) { abort(); return; }
    signal.addEventListener("abort", abort, { once: true });
    try {
      geolocation.getCurrentPosition(async ({ coords }) => {
        if (finished) return;
        try {
          const cities = await loadCities();
          if (!finished) finish(suggestCity(coords, mode, cities));
        } catch { finish(null, new Error("unavailable")); }
      }, (error) => finish(null, new Error(error.code === 1 ? "denied" : "unavailable")), locationOptions(mode));
    } catch { finish(null, new Error("unavailable")); }
  });
}
