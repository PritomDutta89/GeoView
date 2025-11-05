# 🗺️ Spatial Data Map Viewer

A modern, interactive web application for visualizing spatial data with point markers and polygon layers. Built with React, Tailwind CSS, and Leaflet.js.

## ✨ Features

- **Point Data Layer** - Interactive markers with location details (Washington DC dataset)
- **Polygon Layer** - Color-coded US states by population density
- **Dual Display** - On-map popups + detailed sidebar cards
- **Smooth Animations** - Fly-to transitions between layers
- **Responsive Design** - Works on all screen sizes
- **Interactive Legend** - Dynamic density color scale

## 🚀 Quick Start
```bash
# Clone repository
git clone https://github.com/yourusername/spatial-map-viewer.git
cd spatial-map-viewer

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Installation
```bash
# Core dependencies
npm install react react-dom leaflet lucide-react

# Dev dependencies
npm install -D tailwindcss postcss autoprefixer @types/leaflet

# Initialize Tailwind
npx tailwindcss init -p
```

## 🎯 Usage

1. **Points Layer** - Click blue markers to view location details
2. **Polygon Layer** - Click states to see population density
3. **Navigation** - Pan, zoom, and explore the map freely

## 🔌 API Data Format

**Point Data:**
```javascript
{ id, name, type, lat, lng, details }
```

**Polygon Data:**
```javascript
{ id, name, type, density, coordinates: [[lat, lng], ...] }
```

## 🏗️ Build
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

⭐ Star this repo if you find it helpful!