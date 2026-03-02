'use client';
import { useEffect, useState, useRef } from 'react';
import { getWeatherBackground } from '@/utils/weatherBackgrounds';

export default function BackgroundEffect({ weatherCondition = 'clear', isDay = 1 }) {
    const [raindrops, setRaindrops] = useState([]);
    const [lightning, setLightning] = useState(false);
    // Two-layer cross-fade: layer A & B swap on each change
    const [layerA, setLayerA] = useState('');
    const [layerB, setLayerB] = useState('');
    const [topLayer, setTopLayer] = useState('A'); // which layer is currently on top
    const [topVisible, setTopVisible] = useState(false); // opacity of top layer
    const topLayerRef = useRef('A'); // mirror topLayer for use inside effects without stale closure

    useEffect(() => {
        const next = getWeatherBackground(weatherCondition, isDay);

        if (!topLayerRef.current || (topLayerRef.current === 'A' && !layerA)) {
            // First load — no transition needed
            setLayerA(next);
            setTopLayer('A');
            topLayerRef.current = 'A';
            setTopVisible(true);
            return;
        }

        const current = topLayerRef.current;
        if (current === 'A') {
            setLayerB(next);
            setTopVisible(false);
            setTopLayer('B');
            topLayerRef.current = 'B';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setTopVisible(true));
            });
        } else {
            setLayerA(next);
            setTopVisible(false);
            setTopLayer('A');
            topLayerRef.current = 'A';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setTopVisible(true));
            });
        }
    }, [weatherCondition, isDay]);

    // ── Rain / thunder particles ───────────────────────────────────────────
    useEffect(() => {
        if (weatherCondition === 'rain' || weatherCondition === 'thunderstorm') {
            const drops = Array.from({ length: 160 }).map((_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.35 + Math.random() * 0.35}s`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.45 + 0.2,
            }));
            setRaindrops(drops);

            const interval = setInterval(() => {
                if (Math.random() > 0.88) {
                    setLightning(true);
                    setTimeout(() => setLightning(false), 120);
                    setTimeout(() => {
                        setLightning(true);
                        setTimeout(() => setLightning(false), 80);
                    }, 200);
                }
            }, 4000);
            return () => clearInterval(interval);
        } else {
            setRaindrops([]);
        }
    }, [weatherCondition]);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-black">

            {/* ── Layer A (bottom or top depending on topLayer) ─────────── */}
            {layerA && (
                <div
                    className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
                    style={{
                        backgroundImage: `url(${layerA})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        opacity: topLayer === 'A' ? (topVisible ? 1 : 0) : 1,
                        zIndex: topLayer === 'A' ? 2 : 1,
                    }}
                />
            )}

            {/* ── Layer B (bottom or top depending on topLayer) ─────────── */}
            {layerB && (
                <div
                    className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
                    style={{
                        backgroundImage: `url(${layerB})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        opacity: topLayer === 'B' ? (topVisible ? 1 : 0) : 1,
                        zIndex: topLayer === 'B' ? 2 : 1,
                    }}
                />
            )}

            {/* ── Cinematic vignette — matches reference image ──────────── */}
            {/* Very light centre, progressive darkness toward edges */}
            <div className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.55) 100%)',
                }} />

            {/* ── Bottom gradient so UI text is always readable ─────────── */}
            <div className="absolute inset-x-0 bottom-0 h-2/5"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.30) 50%, transparent 100%)',
                }} />

            {/* ── Top subtle scrim (very light) ────────────────────────── */}
            <div className="absolute inset-x-0 top-0 h-32"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)',
                }} />

            {/* ── Night extra darkening ─────────────────────────────────── */}
            {!isDay && (
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-1000" />
            )}

            {/* ── Lightning Flash ───────────────────────────────────────── */}
            <div
                className="absolute inset-0 bg-white transition-opacity duration-75 pointer-events-none"
                style={{ opacity: lightning ? 0.18 : 0 }}
            />

            {/* ── Rain Effect ───────────────────────────────────────────── */}
            {raindrops.length > 0 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {raindrops.map((drop) => (
                        <div
                            key={drop.id}
                            className="rain-drop"
                            style={{
                                left: drop.left,
                                animationDuration: drop.animationDuration,
                                animationDelay: drop.animationDelay,
                                opacity: drop.opacity,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* ── Film grain texture (subtle, boosts cinematic feel) ───── */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '180px 180px',
                }}
            />
        </div>
    );
}
