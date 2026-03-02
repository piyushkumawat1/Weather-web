'use client';
import { useState, useEffect } from 'react';
import { fetchCurrentWeather } from '@/utils/fetchWeather';
import Navbar from '@/components/Navbar';
import WeatherHero from '@/components/WeatherHero';
import Features from '@/components/Features';
import AppShowcase from '@/components/AppShowcase';
import Testimonials from '@/components/Testimonials';
import DownloadSection from '@/components/DownloadSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial load
  useEffect(() => {
    handleSearch('London');
  }, []);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    if (!city) {
      setLoading(false);
      return;
    }

    // If city object (from map click), use coords, else string
    const query = (typeof city === 'object' && city.lat) ? city : city;

    const result = await fetchCurrentWeather(query);
    if (result.success) {
      setWeather(result.data);
    } else {
      setError(result.error);
      console.error(result.error);
    }
    setLoading(false);
  };


  return (
    <main className="min-h-screen relative overflow-x-hidden bg-black selection:bg-blue-500/30">

      <div className="relative z-10 flex flex-col">
        <Navbar />

        <div className="pt-20">
          <WeatherHero
            weather={weather}
            onSearch={handleSearch}
            loading={loading}
            error={error}
          />
        </div>

        <div id="features">
          <Features />
        </div>

        <div id="showcase">
          <AppShowcase />
        </div>

        <div id="reviews">
          <Testimonials />
        </div>

        <div id="download">
          <DownloadSection />
        </div>

        <Footer />
      </div>
    </main>
  );
}
