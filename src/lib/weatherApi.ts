import axios from 'axios';
import { WeatherData, ForecastData } from './types';

const API_KEY = '79c6b7719c1f70570dc483e54a7a8609';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Use metric units (Celsius)
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecastByCity = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Use metric units (Celsius)
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', // Use metric units (Celsius)
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data by coordinates:', error);
    throw error;
  }
};

export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', // Use metric units (Celsius)
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data by coordinates:', error);
    throw error;
  }
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const groupForecastByDay = (forecastData: ForecastData) => {
  const grouped: { [key: string]: any[] } = {};
  
  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
    
    if (!grouped[date]) {
      grouped[date] = [];
    }
    
    grouped[date].push(item);
  });
  
  return Object.entries(grouped).map(([date, items]) => {
    const dayData = items[0];
    const temps = items.map(item => item.main.temp);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    
    return {
      date,
      day: new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      timestamp: dayData.dt,
      temp: dayData.main.temp,
      maxTemp,
      minTemp,
      description: dayData.weather[0].description,
      icon: dayData.weather[0].icon,
      hourly: items,
    };
  }).slice(0, 5); // Limit to 5 days
}; 