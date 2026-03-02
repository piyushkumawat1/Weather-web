'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Search, MapPin, X, Loader2 } from 'lucide-react';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
const PHOTON_API = 'https://photon.komoot.io/api/';

export default function MapboxWeather({ latitude, longitude, city, onLocationSelect }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [currentLabel, setCurrentLabel] = useState(city || '');

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const debounceRef = useRef(null);

    // ── Initialize map ────────────────────────────────────────────────────────
    useEffect(() => {
        if (!MAPBOX_TOKEN || map.current) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [longitude, latitude],
            zoom: 10,
            attributionControl: false,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-left');

        marker.current = new mapboxgl.Marker({ color: '#60a5fa' })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
    }, []);

    // ── Fly to new coords when props change ───────────────────────────────────
    useEffect(() => {
        if (!map.current) return;
        map.current.flyTo({ center: [longitude, latitude], zoom: 10, speed: 1.4 });
        marker.current?.setLngLat([longitude, latitude]);
        setCurrentLabel(city || '');
    }, [latitude, longitude, city]);

    // ── Close dropdown on outside click ───────────────────────────────────────
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
                setActiveIndex(-1);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // ── Fetch Photon suggestions ──────────────────────────────────────────────
    const fetchSuggestions = useCallback(async (text) => {
        if (!text.trim()) { setSuggestions([]); setSearchLoading(false); return; }
        setSearchLoading(true);
        try {
            const url = `${PHOTON_API}?q=${encodeURIComponent(text)}&limit=6&lang=en`;
            const res = await fetch(url);
            const data = await res.json();

            const features = (data.features || []).map((f) => {
                const p = f.properties;
                const parts = [p.name, p.city || p.town || p.village, p.state, p.country].filter(Boolean);
                const label = [...new Set(parts)].join(', ');
                return {
                    id: `${f.geometry.coordinates[0]}_${f.geometry.coordinates[1]}`,
                    label,
                    city: p.city || p.town || p.village || p.name,
                    country: p.country || '',
                    lat: f.geometry.coordinates[1],
                    lng: f.geometry.coordinates[0],
                };
            });

            setSuggestions(features);
            setShowDropdown(true);
            setActiveIndex(-1);
        } catch (err) {
            console.error('Photon error:', err);
            setSuggestions([]);
        } finally {
            setSearchLoading(false);
        }
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        setActiveIndex(-1);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
    };

    const handleSelect = (item) => {
        // Fly map
        map.current?.flyTo({ center: [item.lng, item.lat], zoom: 10, speed: 1.4 });
        marker.current?.setLngLat([item.lng, item.lat]);

        setCurrentLabel(item.label);
        setQuery('');
        setSuggestions([]);
        setShowDropdown(false);
        setActiveIndex(-1);

        onLocationSelect?.({ lat: item.lat, lng: item.lng, city: item.city, country: item.country });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeIndex >= 0 && suggestions[activeIndex]) { handleSelect(suggestions[activeIndex]); return; }
        if (suggestions.length > 0) { handleSelect(suggestions[0]); return; }
    };

    const handleKeyDown = (e) => {
        if (!showDropdown || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, -1)); }
        else if (e.key === 'Escape') { setShowDropdown(false); setActiveIndex(-1); }
    };

    return (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ height: '420px' }}>

            {/* Map */}
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

            {/* Search overlay */}
            <div ref={dropdownRef} className="absolute top-3 left-3 right-14 z-10">
                <form onSubmit={handleSubmit} className="relative">

                    {/* Input bar */}
                    <div className="flex items-center gap-2 bg-black/65 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-2.5 shadow-2xl focus-within:border-white/40 transition-colors">
                        <span className="flex-shrink-0">
                            {searchLoading
                                ? <Loader2 className="w-4 h-4 text-blue-300 animate-spin" />
                                : <Search className="w-4 h-4 text-white/50" />
                            }
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            onFocus={() => { if (suggestions.length) setShowDropdown(true); }}
                            onKeyDown={handleKeyDown}
                            placeholder={currentLabel || 'Search city or place…'}
                            autoComplete="off"
                            className="flex-1 bg-transparent text-white text-sm placeholder-white/40 focus:outline-none"
                        />
                        {query && !searchLoading && (
                            <button type="button" onClick={() => { setQuery(''); setSuggestions([]); setShowDropdown(false); }}
                                className="flex-shrink-0 text-white/40 hover:text-white transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Suggestions dropdown */}
                    {showDropdown && suggestions.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-black/85 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                            {suggestions.map((item, i) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onMouseDown={() => handleSelect(item)}
                                    className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors group
                                        ${activeIndex === i ? 'bg-white/15' : 'hover:bg-white/10'}`}
                                >
                                    <MapPin className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${activeIndex === i ? 'text-blue-300' : 'text-blue-400'}`} />
                                    <div className="min-w-0">
                                        <p className={`text-sm font-medium truncate transition-colors ${activeIndex === i ? 'text-blue-300' : 'text-white group-hover:text-blue-300'}`}>
                                            {item.city || item.label}
                                        </p>
                                        {item.label !== item.city && (
                                            <p className="text-xs text-white/40 truncate mt-0.5">{item.label}</p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* No results */}
                    {showDropdown && !searchLoading && query.trim() && suggestions.length === 0 && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-black/85 backdrop-blur-2xl border border-white/10 rounded-xl px-4 py-4 text-center text-white/40 text-sm z-50">
                            No places found
                        </div>
                    )}
                </form>
            </div>

            {/* Current location badge */}
            {currentLabel && (
                <div className="absolute bottom-8 left-3 z-10 pointer-events-none flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-xs text-white/80 shadow-lg">
                    <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <span className="truncate max-w-[200px]">{currentLabel}</span>
                </div>
            )}

            {/* No token warning */}
            {!MAPBOX_TOKEN && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
                    <div className="text-center p-6">
                        <p className="text-white font-semibold">Mapbox token not set</p>
                        <p className="text-white/50 text-sm mt-1">
                            Add <code className="text-blue-400">NEXT_PUBLIC_MAPBOX_TOKEN</code> to <code>.env.local</code>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
