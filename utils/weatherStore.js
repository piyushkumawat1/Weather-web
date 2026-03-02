'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [history, setHistory] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('weather_favorites');
        const savedHistory = localStorage.getItem('weather_history');

        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    const addFavorite = (city) => {
        // Avoid duplicates
        if (favorites.some(f => f.city.toLowerCase() === city.city.toLowerCase())) return;

        const newFavorites = [...favorites, city];
        setFavorites(newFavorites);
        localStorage.setItem('weather_favorites', JSON.stringify(newFavorites));
    };

    const removeFavorite = (cityName) => {
        const newFavorites = favorites.filter(f => f.city.toLowerCase() !== cityName.toLowerCase());
        setFavorites(newFavorites);
        localStorage.setItem('weather_favorites', JSON.stringify(newFavorites));
    };

    const isFavorite = (cityName) => {
        if (!cityName) return false;
        return favorites.some(f => f.city.toLowerCase() === cityName.toLowerCase());
    };

    const addToHistory = (city) => {
        // Remove if exists to move to top
        const filtered = history.filter(h => h.city.toLowerCase() !== city.city.toLowerCase());
        // Add to front, limit to 5
        const newHistory = [city, ...filtered].slice(0, 5);

        setHistory(newHistory);
        localStorage.setItem('weather_history', JSON.stringify(newHistory));
    };

    const removeFromHistory = (cityName) => {
        const newHistory = history.filter(h => h.city.toLowerCase() !== cityName.toLowerCase());
        setHistory(newHistory);
        localStorage.setItem('weather_history', JSON.stringify(newHistory));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('weather_history');
    };

    return (
        <WeatherContext.Provider value={{ favorites, history, addFavorite, removeFavorite, isFavorite, addToHistory, removeFromHistory, clearHistory }}>
            {children}
        </WeatherContext.Provider>
    );
}

export const useWeatherStore = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeatherStore must be used within a WeatherProvider');
    }
    return context;
};
