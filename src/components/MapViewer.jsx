import React, { useState, useEffect, useRef } from "react";
import { MapPin, Layers, Info, X } from "lucide-react";
import { getDensityColor, mockSpatialData } from "../constants/constants";

const MapViewer = () => {
  const [activeLayer, setActiveLayer] = useState("points");
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const polygonLayersRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const link = document.createElement("link");
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .leaflet-popup-content {
        margin: 12px;
        font-family: system-ui, -apple-system, sans-serif;
      }
      .leaflet-popup-tip {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .custom-marker {
        background: transparent;
        border: none;
      }
      .custom-marker:hover {
        transform: scale(1.1);
        transition: transform 0.2s;
      }
    `;
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
    script.async = true;

    script.onload = () => {
      delete window.L.Icon.Default.prototype._getIconUrl;
      window.L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = window.L.map(mapContainerRef.current).setView(
        activeLayer === "points" ? [38.9072, -77.0369] : [39.8283, -98.5795],
        activeLayer === "points" ? 12 : 4
      );

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      setMapLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Leaflet");
      setMapLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !window.L) return;

    const map = mapRef.current;

    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current = [];

    polygonLayersRef.current.forEach((layer) => map.removeLayer(layer));
    polygonLayersRef.current = [];

    if (activeLayer === "points") {
      mockSpatialData.points.forEach((point) => {
        const customIcon = window.L.divIcon({
          className: "custom-marker",
          html: `
            <div style="position: relative; width: 40px; height: 50px;">
              <svg width="40" height="50" viewBox="0 0 40 50" style="cursor: pointer; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                <path
                  d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35C35 6.716 28.284 0 20 0z"
                  fill="#3B82F6"
                  stroke="white"
                  stroke-width="2"
                />
                <circle cx="20" cy="15" r="6" fill="white" />
              </svg>
            </div>
          `,
          iconSize: [40, 50],
          iconAnchor: [20, 50],
          popupAnchor: [0, -50],
        });

        const marker = window.L.marker([point.lat, point.lng], {
          icon: customIcon,
        })
          .addTo(map)
          .bindPopup(
            `
            <div style="min-width: 200px;">
              <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #1F2937;">${
                point.name
              }</h3>
              <p style="font-size: 14px; color: #4B5563; margin-bottom: 4px;"><strong>Type:</strong> ${
                point.type
              }</p>
              <p style="font-size: 12px; color: #6B7280; margin-bottom: 4px;"><strong>Location:</strong> ${point.lat.toFixed(
                4
              )}, ${point.lng.toFixed(4)}</p>
              <p style="font-size: 13px; color: #374151; margin-top: 8px; line-height: 1.4;">${
                point.details
              }</p>
            </div>
          `,
            {
              maxWidth: 300,
              className: "custom-popup",
            }
          );

        markersRef.current.push(marker);
      });

      map.flyTo([38.9072, -77.0369], 12, { duration: 1.5 });
    } else {
      mockSpatialData.polygons.forEach((polygon) => {
        const polygonLayer = window.L.polygon(polygon.coordinates, {
          color: "#94A3B8",
          weight: 2,
          fillColor: getDensityColor(polygon.density),
          fillOpacity: 0.7,
        })
          .addTo(map)
          .bindPopup(
            `
            <div style="min-width: 180px;">
              <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #1F2937;">${
                polygon.name
              }</h3>
              <p style="font-size: 14px; color: #4B5563; margin-bottom: 4px;"><strong>Type:</strong> ${
                polygon.type
              }</p>
              <p style="font-size: 14px; color: #374151; margin-bottom: 4px;">
                <strong>Population Density:</strong><br/>
                <span style="font-weight: 600; color: #2563EB;">${
                  polygon.density
                } people/sq mi</span>
              </p>
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
                <div style="width: 24px; height: 24px; border-radius: 4px; border: 2px solid #D1D5DB; background-color: ${getDensityColor(
                  polygon.density
                )};"></div>
                <span style="font-size: 12px; color: #6B7280;">${
                  polygon.density < 50
                    ? "Very Low Density"
                    : polygon.density < 100
                    ? "Low Density"
                    : polygon.density < 200
                    ? "Moderate Density"
                    : polygon.density < 300
                    ? "High Density"
                    : "Very High Density"
                }</span>
              </div>
            </div>
          `,
            {
              maxWidth: 250,
              className: "custom-popup",
            }
          );

        polygonLayersRef.current.push(polygonLayer);
      });

      map.flyTo([39.8283, -98.5795], 4, { duration: 1.5 });
    }
  }, [activeLayer, mapLoaded]);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <div className="bg-white shadow-md z-10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="text-blue-600" />
            Map Viewer
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveLayer("points")}
              className={`px-4 py-2 rounded-lg flex items-center cursor-pointer gap-2 transition ${
                activeLayer === "points"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <MapPin size={18} />
              Points Layer
            </button>
            <button
              onClick={() => setActiveLayer("polygons")}
              className={`px-4 py-2 rounded-lg flex items-center cursor-pointer gap-2 transition ${
                activeLayer === "polygons"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Layers size={18} />
              Polygon Layer
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        <div className="flex-1 relative">
          <div
            ref={mapContainerRef}
            className="w-full h-full"
            style={{ background: "#E5E7EB" }}
          />

          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}

          {activeLayer === "polygons" && mapLoaded && (
            <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
              <h3 className="font-semibold text-gray-800 mb-2">
                US Population Density
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                people per square mile
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-4 rounded"
                    style={{ backgroundColor: "#FEF3C7" }}
                  ></div>
                  <span>&lt; 50</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-4 rounded"
                    style={{ backgroundColor: "#FCD34D" }}
                  ></div>
                  <span>50-100</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-4 rounded"
                    style={{ backgroundColor: "#FB923C" }}
                  ></div>
                  <span>100-200</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-4 rounded"
                    style={{ backgroundColor: "#F87171" }}
                  ></div>
                  <span>200-300</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-4 rounded"
                    style={{ backgroundColor: "#DC2626" }}
                  ></div>
                  <span>&gt; 300</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapViewer;
