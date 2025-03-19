'use client';

import { ForecastData } from '@/lib/types';
import { groupForecastByDay } from '@/lib/weatherApi';
import { getWeatherIcon } from '@/lib/weatherIcons';

interface ForecastCardsProps {
  forecastData: ForecastData;
}

export default function ForecastCards({ forecastData }: ForecastCardsProps) {
  if (!forecastData) return null;

  const dailyData = groupForecastByDay(forecastData);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {dailyData.map((day, index) => (
        <div key={index} className="forecast-card flex flex-col items-center relative">
          <div className="absolute top-2 right-2 text-xs font-medium bg-primary-500 text-white px-2 py-1 rounded-full">
            {index === 0 ? 'Today' : day.day}
          </div>
          
          <h3 className="font-bold text-lg text-secondary-800 mt-4">{day.date}</h3>
          
          <div className="my-3 w-20 h-20">
            <img 
              src={getWeatherIcon(day.icon)} 
              alt={day.description}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
          
          <p className="text-sm capitalize text-secondary-600 mb-3">{day.description}</p>
          
          <div className="flex justify-between items-center w-full mt-2 bg-secondary-50 rounded-lg p-2">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
              </svg>
              <p className="text-blue-600 font-bold">{Math.round(day.minTemp)}°</p>
            </div>
            <div className="mx-2 text-secondary-300">|</div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.7 1.046A1 1 0 018 2v5H4a1 1 0 01-.82-1.573l7-10A1 1 0 0110.82 5l-.82 7H14a1 1 0 01.82 1.573l-7 10A1 1 0 016 18v-5H2a1 1 0 01-.82-1.573l7-10z" />
              </svg>
              <p className="text-red-600 font-bold">{Math.round(day.maxTemp)}°</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 