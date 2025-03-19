'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastChart from '@/components/ForecastChart';
import ForecastCards from '@/components/ForecastCards';
import HumidityWindChart from '@/components/HumidityWindChart';
import { getWeatherByCity, getForecastByCity, getWeatherByCoords, getForecastByCoords } from '@/lib/weatherApi';
import { WeatherData, ForecastData } from '@/lib/types';

// Default location set to Cape Town
const DEFAULT_LOCATION = 'Cape Town';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [country, setCountry] = useState<string | null>(null);

  const fetchWeatherData = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setLocation(city);
    setCountry(null);
    
    try {
      const weather = await getWeatherByCity(city);
      const forecast = await getForecastByCity(city);
      
      setWeatherData(weather);
      setForecastData(forecast);
      setLocation(weather.name);
      setCountry(weather.sys.country);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Could not fetch weather data. Please check the city name and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    // Only attempt to use geolocation if we're in the browser
    if (typeof window === 'undefined' || !window.navigator?.geolocation) {
      setError('Geolocation is not available. Please search for a city instead.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const weather = await getWeatherByCoords(latitude, longitude);
          const forecast = await getForecastByCoords(latitude, longitude);
          
          setWeatherData(weather);
          setForecastData(forecast);
          setLocation(weather.name);
          setCountry(weather.sys.country);
        } catch (err) {
          console.error('Error fetching weather data by coordinates:', err);
          setError('Could not fetch weather data. Please try searching for a city instead.');
        } finally {
          setIsLoading(false);
        }
      }, (err) => {
        console.error('Geolocation error:', err);
        setError('Could not get current location. Please allow location access or search for a city.');
        setIsLoading(false);
      });
    } catch (err) {
      console.error('Error accessing geolocation:', err);
      setError('Could not access location services. Please try searching for a city instead.');
      setIsLoading(false);
    }
  };

  // Use useEffect to fetch weather for default location instead of using geolocation
  useEffect(() => {
    fetchWeatherData(DEFAULT_LOCATION);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Glass header with search bar */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm">
        <div className="container py-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Weather Dashboard</h1>
          </div>
          <SearchBar onSearch={fetchWeatherData} />
        </div>
      </header>
      
      <main className="container py-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="loading-spinner"></div>
            <p className="mt-4 text-secondary-600">Fetching weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm my-6 flex items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {weatherData && !isLoading && (
          <div className="space-y-8">
            {location && (
              <div className="flex items-center text-secondary-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Weather in <span className="font-medium">{location}{country ? `, ${country}` : ''}</span></span>
              </div>
            )}
            
            <CurrentWeather weatherData={weatherData} />
            
            {forecastData && (
              <>
                <div className="flex items-center mt-12 mb-6">
                  <h2 className="text-2xl font-bold text-secondary-800">5-Day Forecast</h2>
                  <div className="ml-4 h-px flex-grow bg-gradient-to-r from-secondary-200 to-transparent"></div>
                </div>
                
                <ForecastCards forecastData={forecastData} />
                
                <div className="flex items-center mt-12 mb-6">
                  <h2 className="text-2xl font-bold text-secondary-800">Weather Details</h2>
                  <div className="ml-4 h-px flex-grow bg-gradient-to-r from-secondary-200 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ForecastChart forecastData={forecastData} />
                  <HumidityWindChart forecastData={forecastData} />
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <footer className="py-6 border-t border-secondary-200 mt-12 bg-white/50 backdrop-blur-sm">
        <div className="container text-center">
          <p className="text-secondary-500 text-sm flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Data provided by OpenWeatherMap
          </p>
        </div>
      </footer>
    </div>
  );
} 