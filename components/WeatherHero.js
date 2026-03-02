'use client';
import { motion } from 'framer-motion';
import { MapPin, Wind, Droplets, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchForecast } from '@/utils/fetchWeather';
import LocationSearch from './LocationSearch';
import { useWeatherStore } from '@/utils/weatherStore';
import { getWeatherEmoji } from '@/utils/weatherIcons';
import WeatherScene from './WeatherScene';

export default function WeatherHero({ weather, onSearch, loading, error }) {
    const [forecast, setForecast] = useState(null);
    const { addFavorite, removeFavorite, isFavorite } = useWeatherStore();

    // Load saved location on mount
    useEffect(() => {
        const saved = localStorage.getItem('weatherLocation');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (!weather || parsed.city !== weather.city) onSearch(parsed);
            } catch (e) { console.error(e); }
        } else {
            if (navigator.geolocation && !weather) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => onSearch({ lat: pos.coords.latitude, lng: pos.coords.longitude, city: 'Current Location' }),
                    (err) => console.log('Geolocation error', err)
                );
            }
        }
    }, []);

    // Fetch forecast
    useEffect(() => {
        if (weather?.city) {
            const query = weather.coords || weather.city;
            fetchForecast(query).then(res => { if (res.success) setForecast(res.data); });
            if (weather.coords) {
                localStorage.setItem('weatherLocation', JSON.stringify({
                    city: weather.city, coords: weather.coords,
                    lat: weather.coords.lat, lng: weather.coords.lng,
                }));
            }
        }
    }, [weather]);

    const handleLocationSelect = (location) => {
        if (typeof location === 'string') onSearch(location);
        else if (location?.lat && location?.lng) onSearch(location);
        else if (location?.city) onSearch(location.city);
    };

    if (!weather && !loading && !error) return null;

    return (
        <section className="relative z-10 w-full min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
            {/* ── THE WEATHER CARD ──────────────────────────────────────── */}
            <div className="relative w-full max-w-7xl md:h-[85vh] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10">

                {/* ══ LIVE WEATHER SCENE (fills the whole card) ══════════ */}
                <WeatherScene
                    key={`${weather?.condition}-${weather?.isDay}`}
                    condition={weather?.condition || ''}
                    isDay={weather?.isDay ?? 1}
                />

                {/* ── LEFT PANEL ──────────────────────────────────────── */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-between relative z-10 text-white min-h-[50vh] md:min-h-0">
                    <div className="md:hidden mb-4 font-bold tracking-widest text-sm opacity-70">WEATHER.AI</div>

                    {weather ? (
                        <div className="mt-4 md:mt-10">
                            <motion.h1
                                key={`cond-${weather.condition}`}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none drop-shadow-lg"
                            >
                                {weather.condition}
                            </motion.h1>
                            <motion.p
                                key={`desc-${weather.description}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg md:text-2xl mt-4 font-light text-white/80 capitalize drop-shadow"
                            >
                                With {weather.description}
                            </motion.p>
                        </div>
                    ) : (
                        <div className="mt-10 flex flex-col gap-4">
                            {error ? (
                                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
                                    <h3 className="font-bold text-lg mb-1">Error</h3>
                                    <p>{error}</p>
                                </div>
                            ) : (
                                <div className="text-white/50 text-2xl animate-pulse">Loading…</div>
                            )}
                        </div>
                    )}

                    {/* Hourly strip */}
                    {weather && (
                        <div className="mt-auto pt-10 w-full overflow-x-auto pb-4 hide-scrollbar">
                            <div className="flex gap-3">
                                {forecast?.hourly?.map((hour, i) => (
                                    <div key={i} className="bg-black/30 backdrop-blur-md border border-white/10 p-3 rounded-xl min-w-[76px] flex flex-col items-center text-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default">
                                        <span className="opacity-60 text-xs mb-2">{hour.time}</span>
                                        <span className="text-xl block pb-1">{getWeatherEmoji(hour.condition)}</span>
                                        <span className="font-bold mt-1 text-white">{hour.temp}°</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── RIGHT PANEL ──────────────────────────────────────── */}
                <div className="w-full md:w-[390px] bg-black/30 backdrop-blur-2xl border-l border-white/10 p-6 md:p-8 flex flex-col gap-5 relative z-10">

                    <LocationSearch onLocationSelect={handleLocationSelect} />
                    <div className="w-full h-px bg-white/10" />

                    {/* Location + temp */}
                    {weather && (
                        <div className="text-center shrink-0">
                            <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm font-medium tracking-wide uppercase">
                                    {weather.city}, {weather.country}
                                </span>
                                <button
                                    onClick={() => isFavorite(weather.city) ? removeFavorite(weather.city) : addFavorite(weather)}
                                    className="ml-2 hover:scale-110 transition-transform"
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite(weather.city) ? 'fill-red-500 text-red-500' : 'text-white/40 hover:text-red-400'}`} />
                                </button>
                            </div>
                            <div className="text-8xl font-thin tracking-tighter text-white drop-shadow-lg">
                                {weather.temperature}°
                            </div>
                            <div className="flex justify-center gap-6 mt-3 text-xs font-medium text-white/60">
                                <div className="flex items-center gap-1"><Wind className="w-3 h-3" />{weather.windSpeed} km/h</div>
                                <div className="flex items-center gap-1"><Droplets className="w-3 h-3" />{weather.humidity}%</div>
                            </div>
                        </div>
                    )}

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent shrink-0" />

                    {/* 7-day forecast */}
                    {weather && (
                        <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                            <h3 className="text-sm font-semibold text-white/70 mb-3 sticky top-0 z-10 pb-1">
                                Next Days Forecast
                            </h3>
                            <div className="flex flex-col gap-2">
                                {forecast?.daily?.map((day, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group border border-transparent hover:border-white/5">
                                        <div className="flex items-center gap-3 w-1/3">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg group-hover:bg-white/20 transition-colors">
                                                {getWeatherEmoji(day.condition)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-white">{day.date.split(',')[0]}</span>
                                                <span className="text-[10px] text-white/40">{day.condition}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 px-4 flex items-center gap-2">
                                            <span className="text-xs text-white/40">{day.temp - 3}°</span>
                                            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 w-[60%]" />
                                            </div>
                                            <span className="text-xs text-white/90">{day.temp}°</span>
                                        </div>
                                    </div>
                                ))}
                                {!forecast && <div className="text-white/30 text-center text-sm py-4">Loading Forecast…</div>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
