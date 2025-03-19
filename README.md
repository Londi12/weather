# Weather Dashboard

An interactive weather dashboard built with Next.js, TypeScript, and Tailwind CSS. The dashboard displays current weather information, 5-day forecasts, and visualizes weather data using Chart.js.

## Features

- Current weather information display
- 5-day weather forecast
- Temperature, humidity, and wind data visualization
- Responsive design for all device sizes
- Search for weather by city name
- Automatic geolocation detection

## Technologies Used

- Next.js - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Chart.js - Data visualization
- OpenWeatherMap API - Weather data

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=79c6b7719c1f70570dc483e54a7a8609
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- The dashboard will attempt to use your current location to display weather information.
- You can search for any city by name using the search bar at the top.
- The current weather information is displayed at the top of the page.
- Scroll down to see the 5-day forecast and data visualizations.

## API Key

The application uses the OpenWeatherMap API to fetch weather data. The free tier API key included in this project may have rate limitations. If you encounter issues, you can:

1. Sign up for your own free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Replace the API key in the `.env.local` file

## License

This project is licensed under the MIT License.

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
- [Chart.js](https://www.chartjs.org/) for the data visualization tools
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Next.js](https://nextjs.org/) for the React framework 