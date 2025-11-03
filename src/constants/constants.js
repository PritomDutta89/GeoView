export const mockSpatialData = {
  points: [
    { id: 1, name: "Black Cat", type: "Music Venue", lat: 38.9169, lng: -77.0319, details: "Jazz-influenced hip hop artist Muhsinah plays tonight with Exit Clov and Gods'illa. 9:00 p.m. $12." },
    { id: 2, name: "National Mall", type: "Monument", lat: 38.8893, lng: -77.0502, details: "Historic national park in Washington DC" },
    { id: 3, name: "Georgetown", type: "Neighborhood", lat: 38.9076, lng: -77.0723, details: "Historic waterfront neighborhood" },
    { id: 4, name: "Capitol Hill", type: "Government", lat: 38.8899, lng: -76.9910, details: "Home to the US Capitol Building" },
    { id: 5, name: "Dupont Circle", type: "Neighborhood", lat: 38.9097, lng: -77.0431, details: "Vibrant urban district" },
    { id: 6, name: "Adams Morgan", type: "Entertainment", lat: 38.9207, lng: -77.0425, details: "Cultural diversity and nightlife" },
  ],
  polygons: [
    {
      id: 1,
      name: "Montana",
      type: "state",
      density: 6.858,
      coordinates: [
        [49.0, -116.0], [49.0, -104.0], [45.0, -104.0], [45.0, -111.0], [49.0, -116.0]
      ]
    },
    {
      id: 2,
      name: "California",
      type: "state",
      density: 253.6,
      coordinates: [
        [42.0, -124.4], [42.0, -120.0], [32.5, -120.0], [32.5, -117.1], [35.0, -114.1], [42.0, -124.4]
      ]
    },
    {
      id: 3,
      name: "Texas",
      type: "state",
      density: 105.2,
      coordinates: [
        [36.5, -103.0], [36.5, -94.0], [25.8, -97.0], [29.0, -106.6], [36.5, -103.0]
      ]
    },
    {
      id: 4,
      name: "New York",
      type: "state",
      density: 421.2,
      coordinates: [
        [45.0, -79.8], [45.0, -71.8], [40.5, -71.8], [40.5, -74.0], [42.0, -79.8], [45.0, -79.8]
      ]
    }
  ]
};

export const getDensityColor = (density) => {
  if (density < 50) return '#FEF3C7';
  if (density < 100) return '#FCD34D';
  if (density < 200) return '#FB923C';
  if (density < 300) return '#F87171';
  return '#DC2626';
};