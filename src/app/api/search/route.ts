import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = '79c6b7719c1f70570dc483e54a7a8609';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    // Get current weather
    const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    // Get forecast
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return NextResponse.json({
      weather: weatherResponse.data,
      forecast: forecastResponse.data,
    });
  } catch (error: any) {
    console.error('Error in search API:', error);
    
    if (error.response?.status === 404) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 