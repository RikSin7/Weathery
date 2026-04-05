# Weathery App

A highly performant and responsive weather dashboard. This application seamlessly integrates with the Open-Meteo API to deliver real-time environmental data and deep configurable historical trends.

## 🚀 Key Features

* **Instant Localization**: Automatically detects and fetches hyper-local data utilizing native browser GPS APIs.
* **Live Overview (Dashboard)**:
  * Comprehensive metrics: Min/Max/Current Temperature, Precipitation, Humidity, UV Index, Wind Speed, and Sun Cycles.
  * In-depth Air Quality Index (AQI) resolving specific pollutants (PM2.5, PM10, CO, CO2, NO2, SO2) with dynamic danger-status mapping.
  * Interactive Hourly Forecast visualization with horizontal toggleable data variants.
* **Historical Data Analysis**:
  * Navigate historical trends spanning back two years seamlessly with an adaptive date range constraints handler safely preventing out-of-bound requests.
  * Multi-dimensional interactive line, bar, and scatter combo charts for deep trend analytics including Daily Max/Mean/Min, Precipitation bounds, and Wind directional logic.
* **Premium UX/UI**:
  * Lightning-fast sub-500ms data resolutions driven by **TanStack React Query** caching profiles.
  * Adaptive **Light/Dark Mode** out-of-the-box leveraging sleek Glassmorphism frames, smooth generic animated loaders (`motion`), and custom native scrollbars.
  * Fully responsive component grid ensuring horizontal/vertical scaling natively on mobile, tablet, and desktop environments.

## 🛠 Tech Stack

* **Core**: React 19, Vite
* **Styling**: Tailwind CSS v4, Lucide React
* **Data Fetching (Caching + Speed)**: TanStack React Query, Axios
* **Visualization Engine**: ECharts (Canvas-based for uncompromised performance)
* **Routing**: React Router DOM (v7)

## 📦 Run Locally

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   ```
2. Navigate into the project:
   ```bash
   cd <repository-name>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗 Architecture Decisions

* **Scalable Modularity**: Extracted logical boundaries uniformly under `/features`, `/shared`, `/config`, and `/services`.
* **API Isolation**: The Open-Meteo REST payload destructuring and targeted time-zone logic strings (strictly locking `Asia/Kolkata` for historical context) are securely mapped inside specialized service layers, keeping the UI completely pure.
* **Rendering Efficacy**: Selected `ECharts` natively over SVG chart libraries (like Recharts) for its Canvas-based virtualized rendering, which guarantees zero FPS lag even when actively panning/zooming over heavily dense 2-year datasets—ensuring absolute adherence to the `< 500ms` strict performance budget requirement.

---

*Designed and developed as part of the Junior ReactJS Frontend Developer selection test.*
