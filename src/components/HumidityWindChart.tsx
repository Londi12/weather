'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ForecastData } from '@/lib/types';
import { groupForecastByDay } from '@/lib/weatherApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HumidityWindChartProps {
  forecastData: ForecastData;
}

export default function HumidityWindChart({ forecastData }: HumidityWindChartProps) {
  if (!forecastData) return null;

  const dailyData = groupForecastByDay(forecastData);
  
  const labels = dailyData.map((day) => day.day);
  const humidityValues = dailyData.map((day) => day.hourly[0].main.humidity);
  const windValues = dailyData.map((day) => day.hourly[0].wind.speed);

  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidityValues,
        backgroundColor: 'rgba(56, 189, 248, 0.8)', // sky-400
        borderColor: 'rgb(14, 165, 233)', // sky-500
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(56, 189, 248, 0.9)',
      },
      {
        label: 'Wind (m/s)',
        data: windValues,
        backgroundColor: 'rgba(52, 211, 153, 0.8)', // emerald-400
        borderColor: 'rgb(16, 185, 129)', // emerald-500
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(52, 211, 153, 0.9)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
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
        text: 'Humidity & Wind Speed',
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
          weight: 'bold' as const,
        },
        padding: 12,
        borderColor: 'rgba(226, 232, 240, 1)',
        borderWidth: 1,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            const unit = context.dataset.label.includes('Humidity') ? '%' : 'm/s';
            return `${context.dataset.label}: ${context.raw.toFixed(1)}${unit}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
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
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          padding: 8,
        },
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
    }
  };

  return (
    <div className="card">
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
} 