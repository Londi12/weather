'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setIsLoading(true);
      try {
        // Call our search API endpoint
        await fetch(`/api/search?city=${encodeURIComponent(city.trim())}`);
        onSearch(city.trim());
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md shadow-lg rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm border border-white/20 focus-within:shadow-primary-400/30 transition-all duration-300">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        className="search-input flex-grow border-none rounded-none bg-transparent"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="btn-primary rounded-l-none rounded-r-xl px-6 py-3 flex items-center justify-center transition-all duration-300 hover:bg-primary-600"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </form>
  );
} 