import { jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";
const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
const FORGE_BASE_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL || "https://forge.butterfly-effect.dev";
const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;
function loadMapScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      resolve(null);
      script.remove();
    };
    script.onerror = () => {
      console.error("Failed to load Google Maps script");
    };
    document.head.appendChild(script);
  });
}
function MapView({
  className,
  initialCenter = { lat: 37.7749, lng: -122.4194 },
  initialZoom = 12,
  onMapReady
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const init = usePersistFn(async () => {
    await loadMapScript();
    if (!mapContainer.current) {
      console.error("Map container not found");
      return;
    }
    map.current = new window.google.maps.Map(mapContainer.current, {
      zoom: initialZoom,
      center: initialCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
      streetViewControl: true,
      mapId: "DEMO_MAP_ID"
    });
    if (onMapReady) {
      onMapReady(map.current);
    }
  });
  useEffect(() => {
    init();
  }, [init]);
  return /* @__PURE__ */ jsx("div", { ref: mapContainer, className: cn("w-full h-[500px]", className) });
}
export {
  MapView
};
