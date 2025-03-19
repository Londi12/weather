// Map OpenWeatherMap icon codes to better, more modern weather icons

// Using animated icons from https://basmilius.github.io/weather-icons/
// These provide much better visuals than the default OpenWeatherMap icons

interface IconMap {
  [key: string]: {
    icon: string;
    label: string;
    bgClass: string;
  };
}

export const weatherIcons: IconMap = {
  '01d': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg',
    label: 'Clear Sky',
    bgClass: 'bg-gradient-to-br from-blue-400 to-blue-300',
  },
  '01n': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/clear-night.svg',
    label: 'Clear Sky',
    bgClass: 'bg-gradient-to-br from-secondary-700 to-secondary-900',
  },
  '02d': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day.svg',
    label: 'Few Clouds',
    bgClass: 'bg-gradient-to-br from-blue-400 to-blue-300',
  },
  '02n': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night.svg',
    label: 'Few Clouds',
    bgClass: 'bg-gradient-to-br from-secondary-700 to-secondary-800',
  },
  '03d': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/cloudy.svg',
    label: 'Scattered Clouds',
    bgClass: 'bg-gradient-to-br from-blue-300 to-blue-200',
  },
  '03n': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/cloudy.svg',
    label: 'Scattered Clouds',
    bgClass: 'bg-gradient-to-br from-secondary-600 to-secondary-700',
  },
  '04d': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/overcast-day.svg',
    label: 'Broken Clouds',
    bgClass: 'bg-gradient-to-br from-blue-300 to-secondary-300',
  },
  '04n': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/overcast-night.svg',
    label: 'Broken Clouds',
    bgClass: 'bg-gradient-to-br from-secondary-600 to-secondary-700',
  },
  '09d': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-drizzle.svg',
    label: 'Shower Rain',
    bgClass: 'bg-gradient-to-br from-blue-400 to-blue-500',
  },
  '09n': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-drizzle.svg',
    label: 'Shower Rain',
    bgClass: 'bg-gradient-to-br from-secondary-700 to-secondary-800',
  },
  '10d': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-rain.svg',
    label: 'Rain',
    bgClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
  },
  '10n': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-rain.svg',
    label: 'Rain',
    bgClass: 'bg-gradient-to-br from-secondary-700 to-secondary-800',
  },
  '11d': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-day-extreme.svg',
    label: 'Thunderstorm',
    bgClass: 'bg-gradient-to-br from-secondary-600 to-secondary-800',
  },
  '11n': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-night-extreme.svg',
    label: 'Thunderstorm',
    bgClass: 'bg-gradient-to-br from-secondary-700 to-secondary-900',
  },
  '13d': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-snow.svg',
    label: 'Snow',
    bgClass: 'bg-gradient-to-br from-blue-100 to-blue-200',
  },
  '13n': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-snow.svg',
    label: 'Snow',
    bgClass: 'bg-gradient-to-br from-secondary-300 to-secondary-400',
  },
  '50d': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/mist.svg',
    label: 'Mist',
    bgClass: 'bg-gradient-to-br from-secondary-200 to-secondary-300',
  },
  '50n': {
    icon: 'https://basmilius.github.io/weather-icons/production/fill/all/mist.svg',
    label: 'Mist',
    bgClass: 'bg-gradient-to-br from-secondary-400 to-secondary-500',
  }
};

export const getWeatherIcon = (iconCode: string): string => {
  return weatherIcons[iconCode]?.icon || 'https://basmilius.github.io/weather-icons/production/fill/all/not-available.svg';
};

export const getWeatherBackground = (iconCode: string): string => {
  return weatherIcons[iconCode]?.bgClass || 'bg-gradient-to-br from-secondary-200 to-secondary-300';
};

export const getTimeOfDay = (): 'day' | 'night' => {
  const hours = new Date().getHours();
  return hours >= 6 && hours < 18 ? 'day' : 'night';
};

export const getIconForWeatherCondition = (condition: string, isDay: boolean = true): string => {
  const timePrefix = isDay ? 'd' : 'n';
  
  switch (condition.toLowerCase()) {
    case 'clear':
      return `01${timePrefix}`;
    case 'few clouds':
      return `02${timePrefix}`;
    case 'scattered clouds':
      return `03${timePrefix}`;
    case 'broken clouds':
    case 'overcast clouds':
      return `04${timePrefix}`;
    case 'shower rain':
      return `09${timePrefix}`;
    case 'rain':
      return `10${timePrefix}`;
    case 'thunderstorm':
      return `11${timePrefix}`;
    case 'snow':
      return `13${timePrefix}`;
    case 'mist':
    case 'fog':
    case 'haze':
      return `50${timePrefix}`;
    default:
      return `01${timePrefix}`;
  }
}; 