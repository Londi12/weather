'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ForecastData } from '@/lib/types';
import { groupForecastByDay } from '@/lib/weatherApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface ForecastChartProps {
  forecastData: ForecastData;
}

export default function ForecastChart({ forecastData }: ForecastChartProps) {
  if (!forecastData) return null;

  const dailyData = groupForecastByDay(forecastData);
  
  const labels = dailyData.map((day) => day.day);
  const maxTemps = dailyData.map((day) => day.maxTemp);
  const minTemps = dailyData.map((day) => day.minTemp);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Max Temperature',
        data: maxTemps,
        borderColor: 'rgb(239, 68, 68)', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,
      },
      {
        label: 'Min Temperature',
        data: minTemps,
        borderColor: 'rgb(59, 130, 246)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold' as const,
          }
        }
      },
      title: {
        display: true,
        text: 'Temperature Forecast (°C)',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          bottom: 20
        },
        color: '#1e293b', // secondary-800
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        padding: 12,
        borderColor: 'rgba(226, 232, 240, 1)',
        borderWidth: 1,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw.toFixed(1)}°C`;
          }
        }
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
          font: {
            size: 12,
            weight: 'bold' as const,
          }
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          borderDash: [5, 5],
        },
        ticks: {
          font: {
            size: 12,
          },
          padding: 8,
        },
      },
      x: {
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          borderDash: [5, 5],
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
          },
          padding: 8,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 10
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return (
    <div className="card">
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
} 