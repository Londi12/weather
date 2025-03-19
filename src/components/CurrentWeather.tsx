'use client';

import Image from 'next/image';
import { WeatherData } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/weatherApi';
import { getWeatherIcon, getWeatherBackground } from '@/lib/weatherIcons';

interface CurrentWeatherProps {
  weatherData: WeatherData;
}

export default function CurrentWeather({ weatherData }: CurrentWeatherProps) {
  if (!weatherData) return null;

  const { 
    name, 
    main, 
    weather, 
    wind, 
    sys,
    dt
  } = weatherData;

  const iconCode = weather[0].icon;
  const weatherBg = getWeatherBackground(iconCode);

  return (
    <div className={`weather-card overflow-hidden ${weatherBg} text-black`}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-2">
            <h2 className="text-3xl font-bold">{name}</h2>
            <span className="ml-2 text-lg font-medium bg-black/20 py-1 px-2 rounded-lg">{sys.country}</span>
          </div>
          
          <p className="text-sm text-black/80 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {formatDate(dt)} | {formatTime(dt)}
          </p>
          
          <div className="flex items-center">
            <Image 
              src={getWeatherIcon(iconCode)} 
              alt={weather[0].description}
              width={100}
              height={100}
              className="w-24 h-24 object-contain"
              unoptimized // Need this for external SVG icons
            />
            <div className="ml-4">
              <div className="flex items-start">
                <p className="text-6xl font-bold">{Math.round(main.temp)}</p>
                <span className="text-2xl font-bold mt-1">°C</span>
              </div>
              <p className="text-lg font-medium text-black/90 capitalize">{weather[0].description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6 md:mt-0 bg-black/10 p-4 rounded-xl backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-black/70">Feels Like</p>
              <p className="text-xl font-semibold">{Math.round(main.feels_like)}°C</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <div>
              <p className="text-sm text-black/70">Humidity</p>
              <p className="text-xl font-semibold">{main.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-sm text-black/70">Wind</p>
              <p className="text-xl font-semibold">{Math.round(wind.speed)} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div>
              <p className="text-sm text-black/70">Pressure</p>
              <p className="text-xl font-semibold">{main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 