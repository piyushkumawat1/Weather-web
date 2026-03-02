'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Clock, Heart, X, MapPin, Loader2 } from 'lucide-react';
import { useWeatherStore } from '@/utils/weatherStore';

const PHOTON_API = 'https://photon.komoot.io/api/';

/**
 * LocationSearch – Photon-powered Google Maps–style autocomplete.
 *
 * Props:
 *   onLocationSelect(location) – called with { lat, lng, city, country }
 *   placeholder – optional input placeholder string
 *   variant – 'sidebar' (default, compact) | 'hero' (large, centred)
 */
export default function LocationSearch({
    onLocationSelect,
    placeholder = 'Search city or place…',
    variant = 'sidebar',
}) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const { history, favorites, addToHistory, removeFromHistory } = useWeatherStore();
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const debounceRef = useRef(null);

    // ── Close on outside click ───────────────────────────────────────────────
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

    // ── Fetch from Photon ────────────────────────────────────────────────────
    const fetchSuggestions = useCallback(async (text) => {
        if (!text.trim()) {
            setSuggestions([]);
            setShowDropdown(true); // show history/favourites
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const url = `${PHOTON_API}?q=${encodeURIComponent(text)}&limit=7&lang=en`;
            const res = await fetch(url);
            const data = await res.json();

            const features = (data.features || []).map((f) => {
                const p = f.properties;
                const parts = [
                    p.name,
                    p.city || p.town || p.village,
                    p.state,
                    p.country,
                ].filter(Boolean);
                // deduplicate consecutive identical parts
                const label = [...new Set(parts)].join(', ');
                const city = p.city || p.town || p.village || p.name;
                return {
                    // Use osm_id + osm_type + index so two results at the same
                    // coords (e.g. city vs. admin boundary) never share a key.
                    id: `${p.osm_type || 'x'}-${p.osm_id || i}-${f.geometry.coordinates[0]}-${f.geometry.coordinates[1]}`,
                    label,
                    city,
                    country: p.country || '',
                    lat: f.geometry.coordinates[1],
                    lng: f.geometry.coordinates[0],
                    type: p.type || p.osm_value || 'place',
                };
            });

            setSuggestions(features);
            setShowDropdown(true);
            setActiveIndex(-1);
        } catch (err) {
            console.error('Photon API error:', err);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // ── Debounced input handler ──────────────────────────────────────────────
    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        setActiveIndex(-1);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
    };

    // ── Select a suggestion or history/favourite item ─────────────────────
    const handleSelect = (item) => {
        addToHistory({ city: item.city, country: item.country, lat: item.lat, lng: item.lng, date: new Date().toISOString() });
        onLocationSelect({ lat: item.lat, lng: item.lng, city: item.city, country: item.country });
        setQuery('');
        setSuggestions([]);
        setShowDropdown(false);
        setActiveIndex(-1);
    };

    // ── Form submit (pick first suggestion or history match) ─────────────
    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeIndex >= 0) {
            const allItems = [...suggestions];
            if (allItems[activeIndex]) { handleSelect(allItems[activeIndex]); return; }
        }
        if (suggestions.length > 0) { handleSelect(suggestions[0]); return; }
        if (query.trim()) {
            // Fallback: pass city name string
            addToHistory({ city: query.trim(), date: new Date().toISOString() });
            onLocationSelect(query.trim());
            setQuery('');
            setShowDropdown(false);
        }
    };

    // ── Keyboard navigation ──────────────────────────────────────────────────
    const handleKeyDown = (e) => {
        if (!showDropdown) return;
        const total = query ? suggestions.length : (history.length + favorites.length);
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, total - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, -1));
        } else if (e.key === 'Escape') {
            setShowDropdown(false);
            setActiveIndex(-1);
        }
    };

    // ── Shared suggestion row ────────────────────────────────────────────────
    const SuggestionRow = ({ item, index, icon }) => (
        <button
            type="button"
            onMouseDown={() => handleSelect(item)}
            className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors group
                ${activeIndex === index ? 'bg-white/15' : 'hover:bg-white/10'}`}
        >
            <span className="mt-0.5 flex-shrink-0 text-blue-400">{icon}</span>
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate transition-colors
                    ${activeIndex === index ? 'text-blue-300' : 'text-white group-hover:text-blue-300'}`}>
                    {item.city || item.label}
                </p>
                {item.label && item.label !== item.city && (
                    <p className="text-xs text-white/40 truncate mt-0.5">{item.label}</p>
                )}
            </div>
        </button>
    );

    // ── Style variants ───────────────────────────────────────────────────────
    const isHero = variant === 'hero';

    return (
        <form
            onSubmit={handleSubmit}
            className={`relative group ${isHero ? 'w-full max-w-xl' : 'w-full'} z-50`}
            ref={dropdownRef}
        >
            {/* ─── Input ─────────────────────────────────────────────────── */}
            <div className={`relative flex items-center transition-all
                ${isHero
                    ? 'bg-white/10 border border-white/30 rounded-full px-5 py-4 shadow-2xl backdrop-blur-xl focus-within:border-white/60 focus-within:bg-white/15'
                    : 'bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 backdrop-blur-md focus-within:bg-white/10 focus-within:border-white/25'
                }`}
            >
                {/* Search icon / loading spinner */}
                <span className={`flex-shrink-0 transition-colors ${isHero ? 'mr-3' : 'mr-2'}`}>
                    {loading
                        ? <Loader2 className={`animate-spin text-blue-300 ${isHero ? 'w-5 h-5' : 'w-4 h-4'}`} />
                        : <Search className={`text-white/50 group-focus-within:text-white/80 transition-colors ${isHero ? 'w-5 h-5' : 'w-4 h-4'}`} />
                    }
                </span>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    autoComplete="off"
                    className={`flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none
                        ${isHero ? 'text-base' : 'text-sm'}`}
                />

                {/* Clear button */}
                {query && (
                    <button
                        type="button"
                        onClick={() => { setQuery(''); setSuggestions([]); setShowDropdown(false); inputRef.current?.focus(); }}
                        className="ml-2 flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Clear"
                    >
                        <X className="w-3.5 h-3.5 text-white/40 hover:text-white" />
                    </button>
                )}

                {/* Hero search button */}
                {isHero && (
                    <button
                        type="submit"
                        className="ml-3 flex-shrink-0 bg-blue-500 hover:bg-blue-400 transition-colors rounded-full p-2 shadow-md"
                        aria-label="Search"
                    >
                        <Search className="w-4 h-4 text-white" />
                    </button>
                )}
            </div>

            {/* ─── Dropdown ──────────────────────────────────────────────── */}
            {showDropdown && (
                <div className={`absolute left-0 right-0 top-full mt-1.5 shadow-2xl overflow-hidden z-50
                    bg-black/80 backdrop-blur-2xl border border-white/10
                    ${isHero ? 'rounded-2xl' : 'rounded-xl'}`}
                >
                    {/* ── Photon suggestions ── */}
                    {suggestions.length > 0 && (
                        <div className="py-1.5">
                            <p className="px-4 py-1 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                                Suggestions
                            </p>
                            {suggestions.map((item, i) => (
                                <SuggestionRow
                                    key={item.id}
                                    item={item}
                                    index={i}
                                    icon={<MapPin className="w-3.5 h-3.5" />}
                                />
                            ))}
                        </div>
                    )}

                    {/* ── No results (when query has been typed) ── */}
                    {!loading && query.trim() && suggestions.length === 0 && (
                        <div className="px-4 py-5 text-center text-white/40 text-sm">
                            No places found for "<span className="text-white/60">{query}</span>"
                        </div>
                    )}

                    {/* ── Recents + Favourites (when input is empty) ── */}
                    {!query.trim() && (
                        <>
                            {/* Recent */}
                            {history.length > 0 && (
                                <div className={`py-1.5 ${favorites.length > 0 ? 'border-b border-white/10' : ''}`}>
                                    <p className="px-4 py-1 text-[10px] font-semibold text-white/30 uppercase tracking-widest flex items-center gap-1.5">
                                        <Clock className="w-3 h-3" /> Recent
                                    </p>
                                    {history.slice(0, 5).map((item, i) => (
                                        <div key={i} className="flex items-center group/item hover:bg-white/10 transition-colors">
                                            <button
                                                type="button"
                                                onMouseDown={() => handleSelect(item)}
                                                className="flex-1 text-left px-4 py-2.5 flex items-center gap-3"
                                            >
                                                <Clock className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                                                <span className="text-sm text-white/80">{item.city}</span>
                                                {item.country && <span className="text-xs text-white/30">{item.country}</span>}
                                            </button>
                                            <button
                                                type="button"
                                                onMouseDown={(e) => { e.stopPropagation(); removeFromHistory(item.city); }}
                                                className="mr-3 p-1 rounded-full opacity-0 group-hover/item:opacity-100 hover:bg-white/20 transition-all"
                                                aria-label="Remove"
                                            >
                                                <X className="w-3 h-3 text-white/40 hover:text-white" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Favourites */}
                            {favorites.length > 0 && (
                                <div className="py-1.5">
                                    <p className="px-4 py-1 text-[10px] font-semibold text-white/30 uppercase tracking-widest flex items-center gap-1.5">
                                        <Heart className="w-3 h-3 text-red-400" /> Favourites
                                    </p>
                                    {favorites.map((fav, i) => (
                                        <SuggestionRow
                                            key={i}
                                            item={fav}
                                            index={history.length + i}
                                            icon={<Heart className="w-3.5 h-3.5 text-red-400" />}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Empty state */}
                            {history.length === 0 && favorites.length === 0 && (
                                <div className="px-4 py-5 text-center text-white/30 text-sm">
                                    Start typing to search for a location
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </form>
    );
}
