'use client';
import { useEffect, useRef, useMemo } from 'react';

/* ─────────────────────────────────────────────────────────────────────
   getScene(condition, isDay)
   Returns a scene descriptor: { type, bg, overlay }
────────────────────────────────────────────────────────────────────── */
export function getScene(condition = '', isDay = 1) {
    const c = condition.toLowerCase();

    if (c.includes('thunder') || c.includes('storm') || c.includes('lightning'))
        return { type: 'storm' };
    if (c.includes('heavy rain') || c.includes('torrential') || c.includes('downpour'))
        return { type: 'heavy-rain' };
    if (c.includes('rain') || c.includes('drizzle') || c.includes('shower') || c.includes('sleet'))
        return { type: 'rain' };
    if (c.includes('snow') || c.includes('blizzard') || c.includes('ice') || c.includes('freezing'))
        return { type: 'snow' };
    if (c.includes('fog') || c.includes('mist') || c.includes('haze') || c.includes('smoke') || c.includes('freezing fog'))
        return { type: 'fog' };
    if (c.includes('overcast'))
        return { type: 'overcast' };
    if (c.includes('partly cloudy') || c.includes('partly') || c.includes('broken'))
        return { type: isDay ? 'partly-cloudy' : 'night-cloudy' };
    if (c.includes('cloud') || c.includes('grey') || c.includes('gray'))
        return { type: isDay ? 'cloudy' : 'night-cloudy' };
    if (c.includes('sunny') || c.includes('clear'))
        return { type: isDay ? 'sunny' : 'night' };
    if (c.includes('sand') || c.includes('dust'))
        return { type: 'dust' };
    // Default
    return { type: isDay ? 'sunny' : 'night' };
}

/* ─────────────────────────────────────────────────────────────────────
   Sky gradients per scene type
────────────────────────────────────────────────────────────────────── */
const SKY = {
    'sunny': 'linear-gradient(180deg, #1a6bc4 0%, #4da6e8 40%, #7ec8f5 70%, #ffe89d 100%)',
    'partly-cloudy': 'linear-gradient(180deg, #2563a8 0%, #4f9fd8 55%, #a8d5ef 100%)',
    'cloudy': 'linear-gradient(180deg, #3d4f5e 0%, #5b6f80 50%, #899aab 100%)',
    'overcast': 'linear-gradient(180deg, #2a2e32 0%, #3c4348 50%, #5a6068 100%)',
    'rain': 'linear-gradient(180deg, #1d2a35 0%, #2c3e4d 50%, #3d5060 100%)',
    'heavy-rain': 'linear-gradient(180deg, #0e1a22 0%, #1b2c38 50%, #2a3d4b 100%)',
    'storm': 'linear-gradient(180deg, #080e12 0%, #0f1c24 40%, #1a2c38 100%)',
    'snow': 'linear-gradient(180deg, #62829d 0%, #8fa8be 50%, #c5d8e6 80%, #e6eff5 100%)',
    'fog': 'linear-gradient(180deg, #6b7a84 0%, #8d9da8 50%, #b5c4cc 100%)',
    'night': 'linear-gradient(180deg, #020408 0%, #050d1a 40%, #0a1628 70%, #0f1e35 100%)',
    'night-cloudy': 'linear-gradient(180deg, #050a0f 0%, #0d1a24 50%, #1a2838 100%)',
    'dust': 'linear-gradient(180deg, #6b4e1a 0%, #9e7430 50%, #c9a055 100%)',
};

/* ─────────────────────────────────────────────────────────────────────
   Inject scene CSS once
────────────────────────────────────────────────────────────────────── */
const CSS_INJECTED = { current: false };
function injectCSS() {
    if (CSS_INJECTED.current || typeof document === 'undefined') return;
    CSS_INJECTED.current = true;
    const style = document.createElement('style');
    style.textContent = `
/* Clouds */
@keyframes cloud-drift-slow { from{transform:translateX(-120%)} to{transform:translateX(110vw)} }
@keyframes cloud-drift-med  { from{transform:translateX(-100%)} to{transform:translateX(110vw)} }
.ws-cloud { position:absolute; border-radius:50%; filter:blur(4px); animation:cloud-drift-slow 28s linear infinite; }
/* Sun */
@keyframes sun-pulse { 0%,100%{box-shadow:0 0 60px 30px rgba(255,200,50,.35)} 50%{box-shadow:0 0 100px 60px rgba(255,220,80,.5)} }
@keyframes ray-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
.ws-sun { position:absolute; border-radius:50%; background:radial-gradient(circle,#ffe066 0%,#ffb900 60%,transparent 100%); animation:sun-pulse 3s ease-in-out infinite; }
.ws-rays { position:absolute; animation:ray-spin 20s linear infinite; }
.ws-ray  { position:absolute; top:50%; left:50%; transform-origin:0 50%; }
/* Snow ground */
@keyframes ground-sway { 0%,100%{transform:skewX(0deg)} 50%{transform:skewX(1deg)} }
.ws-snow-ground { animation:ground-sway 8s ease-in-out infinite; }
/* Stars */
@keyframes twinkle { 0%,100%{opacity:.2} 50%{opacity:1} }
.ws-star { position:absolute; border-radius:50%; animation:twinkle var(--d,3s) ease-in-out infinite; animation-delay:var(--dl,0s); }
/* Moon */
@keyframes moon-glow { 0%,100%{box-shadow:0 0 30px 10px rgba(200,220,255,.2)} 50%{box-shadow:0 0 60px 20px rgba(200,220,255,.35)} }
.ws-moon { position:absolute; border-radius:50%; animation:moon-glow 5s ease-in-out infinite; }
/* Lightning */
@keyframes lightning-flash { 0%{opacity:0} 10%{opacity:1} 20%{opacity:0} 30%{opacity:.7} 40%{opacity:0} 100%{opacity:0} }
.ws-lightning { position:absolute; animation:lightning-flash 4s step-end infinite; }
/* Fog wisps */
@keyframes fog-drift { from{transform:translateX(-80px)} to{transform:translateX(80px)} }
.ws-fog { position:absolute; border-radius:50%; filter:blur(30px); animation:fog-drift 12s ease-in-out infinite alternate; }
/* Dust */
@keyframes dust-swirl { from{transform:translateX(-60px) rotate(0deg)} to{transform:translateX(60px) rotate(360deg)} }
.ws-dust { position:absolute; border-radius:50%; filter:blur(20px); animation:dust-swirl 8s ease-in-out infinite alternate; }
`;
    document.head.appendChild(style);
}

/* ─────────────────────────────────────────────────────────────────────
   Canvas rain/snow renderer
────────────────────────────────────────────────────────────────────── */
function useWeatherCanvas(type, canvasRef) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let raf;

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        let particles = [];

        if (type === 'rain' || type === 'heavy-rain' || type === 'storm') {
            const count = type === 'rain' ? 130 : 260;
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * 2000,
                y: Math.random() * 2000,
                len: type === 'rain' ? 15 + Math.random() * 18 : 22 + Math.random() * 28,
                speed: type === 'rain' ? 9 + Math.random() * 5 : 16 + Math.random() * 8,
                op: 0.2 + Math.random() * 0.5,
                w: type === 'rain' ? 0.8 : 1.1,
            }));
            const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.lineCap = 'round';
                particles.forEach(p => {
                    ctx.globalAlpha = p.op;
                    ctx.strokeStyle = type === 'storm' ? 'rgba(140,190,255,1)' : 'rgba(160,210,255,1)';
                    ctx.lineWidth = p.w;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x + p.len * 0.22, p.y + p.len);
                    ctx.stroke();
                    p.y += p.speed;
                    p.x += p.speed * 0.22;
                    if (p.y > canvas.height) { p.y = -p.len * 2; p.x = Math.random() * canvas.width; }
                });
                raf = requestAnimationFrame(draw);
            };
            raf = requestAnimationFrame(draw);
        }

        else if (type === 'snow') {
            particles = Array.from({ length: 140 }, () => ({
                x: Math.random() * 2000, y: Math.random() * 2000,
                r: 1.5 + Math.random() * 3.5,
                speed: 0.4 + Math.random() * 1.2,
                wobble: Math.random() * Math.PI * 2,
                ws: 0.008 + Math.random() * 0.015,
                op: 0.5 + Math.random() * 0.5,
            }));
            const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.wobble += p.ws;
                    p.x += Math.sin(p.wobble) * 0.7;
                    p.y += p.speed;
                    if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
                    ctx.globalAlpha = p.op;
                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                    // glint
                    ctx.globalAlpha = p.op * 0.4;
                    ctx.strokeStyle = 'rgba(200,240,255,1)';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r * 1.6, 0, Math.PI * 2);
                    ctx.stroke();
                });
                raf = requestAnimationFrame(draw);
            };
            raf = requestAnimationFrame(draw);
        }

        else if (type === 'sunny') {
            // floating golden dust motes
            particles = Array.from({ length: 35 }, () => ({
                x: Math.random() * 2000, y: Math.random() * 2000,
                r: 1 + Math.random() * 2,
                sx: (Math.random() - 0.5) * 0.2,
                sy: -0.05 - Math.random() * 0.2,
                op: 0, maxOp: 0.2 + Math.random() * 0.3,
                fade: 0.003 + Math.random() * 0.005, growing: true,
            }));
            const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.x += p.sx; p.y += p.sy;
                    if (p.growing) { p.op += p.fade; if (p.op >= p.maxOp) p.growing = false; }
                    else { p.op -= p.fade * 0.5; if (p.op <= 0) { p.op = 0; p.growing = true; p.x = Math.random() * canvas.width; p.y = canvas.height + 10; } }
                    if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
                    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
                    g.addColorStop(0, 'rgba(255,230,80,1)');
                    g.addColorStop(1, 'rgba(255,200,50,0)');
                    ctx.globalAlpha = p.op;
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
                    ctx.fill();
                });
                raf = requestAnimationFrame(draw);
            };
            raf = requestAnimationFrame(draw);
        }

        else if (type === 'night') {
            // twinkling stars
            particles = Array.from({ length: 180 }, () => ({
                x: Math.random() * 2000, y: Math.random() * 2000,
                r: 0.4 + Math.random() * 1.4,
                op: 0.1 + Math.random() * 0.9,
                phase: Math.random() * Math.PI * 2,
                speed: 0.005 + Math.random() * 0.02,
            }));
            const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const time = Date.now() * 0.001;
                particles.forEach(p => {
                    const alpha = 0.15 + ((Math.sin(time * p.speed + p.phase) + 1) / 2) * p.op;
                    ctx.globalAlpha = alpha;
                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                    if (p.r > 0.9 && alpha > 0.6) {
                        ctx.globalAlpha = alpha * 0.3;
                        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
                        g.addColorStop(0, 'rgba(180,210,255,0.8)');
                        g.addColorStop(1, 'rgba(180,210,255,0)');
                        ctx.fillStyle = g;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
                raf = requestAnimationFrame(draw);
            };
            raf = requestAnimationFrame(draw);
        }

        return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    }, [type]);
}

/* ─────────────────────────────────────────────────────────────────────
   CSS Decorators (clouds, sun, moon, fog, etc.)
────────────────────────────────────────────────────────────────────── */
function Clouds({ dense = false, dark = false }) {
    const clouds = useMemo(() => Array.from({ length: dense ? 8 : 5 }, (_, i) => ({
        w: 160 + Math.random() * 220,
        h: 60 + Math.random() * 70,
        top: `${5 + Math.random() * 45}%`,
        duration: `${18 + Math.random() * 20}s`,
        delay: `${-Math.random() * 20}s`,
        opacity: dark ? 0.55 + Math.random() * 0.35 : 0.45 + Math.random() * 0.35,
        color: dark ? `rgba(${20 + Math.floor(Math.random() * 20)},${25 + Math.floor(Math.random() * 20)},${30 + Math.floor(Math.random() * 20)},1)`
            : `rgba(${215 + Math.floor(Math.random() * 40)},${220 + Math.floor(Math.random() * 35)},${230 + Math.floor(Math.random() * 25)},1)`,
    })), [dense, dark]);

    return (
        <>
            {clouds.map((c, i) => (
                <div key={i} className="ws-cloud" style={{
                    width: c.w, height: c.h, top: c.top, left: '-30%',
                    background: c.color, opacity: c.opacity,
                    animationDuration: c.duration, animationDelay: c.delay,
                    animationName: i % 2 === 0 ? 'cloud-drift-slow' : 'cloud-drift-med',
                }} />
            ))}
        </>
    );
}

function Sun() {
    const rays = Array.from({ length: 14 });
    return (
        <div className="ws-sun" style={{ width: 110, height: 110, top: '8%', left: '12%' }}>
            <div className="ws-rays" style={{ width: 300, height: 300, top: -95, left: -95 }}>
                {rays.map((_, i) => (
                    <div key={i} className="ws-ray" style={{
                        width: 130, height: 2,
                        background: 'linear-gradient(to right, rgba(255,225,80,0.55), transparent)',
                        transform: `rotate(${i * 25.7}deg)`,
                    }} />
                ))}
            </div>
        </div>
    );
}

function Moon() {
    return (
        <div className="ws-moon" style={{
            width: 75, height: 75, top: '10%', right: '12%',
            background: 'radial-gradient(circle at 35% 38%, #f0f4ff 0%, #c8d8f0 50%, #a0b8d8 100%)',
        }}>
            {/* craters */}
            {[{ t: '30%', l: '20%', s: 10 }, { t: '55%', l: '50%', s: 7 }, { t: '20%', l: '55%', s: 6 }].map((cr, i) => (
                <div key={i} style={{
                    position: 'absolute', top: cr.t, left: cr.l, width: cr.s, height: cr.s,
                    borderRadius: '50%', background: 'rgba(160,180,210,0.45)'
                }} />
            ))}
        </div>
    );
}

function Lightning() {
    return (
        <div className="ws-lightning" style={{
            top: '2%', left: `${20 + Math.random() * 40}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
        }}>
            <svg width="40" height="120" viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="22,0 8,55 20,55 6,120" stroke="rgba(200,230,255,0.9)" strokeWidth="2.5"
                    strokeLinejoin="round" filter="url(#glow)" />
                <defs>
                    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
            </svg>
        </div>
    );
}

function FogLayers() {
    return (
        <>
            {[
                { top: '20%', w: 600, h: 100, op: 0.18, dur: '14s', delay: '0s' },
                { top: '42%', w: 500, h: 80, op: 0.14, dur: '18s', delay: '-5s' },
                { top: '62%', w: 700, h: 120, op: 0.20, dur: '12s', delay: '-9s' },
            ].map((f, i) => (
                <div key={i} className="ws-fog" style={{
                    top: f.top, left: '10%', width: f.w, height: f.h,
                    background: 'rgba(210,220,230,1)', opacity: f.op,
                    animationDuration: f.dur, animationDelay: f.delay,
                }} />
            ))}
        </>
    );
}

function DustParticles() {
    return (
        <>
            {[0, 1, 2, 3].map(i => (
                <div key={i} className="ws-dust" style={{
                    top: `${20 + i * 18}%`, left: `${10 + i * 20}%`,
                    width: 180 + i * 60, height: 90 + i * 30,
                    background: `rgba(${180 + i * 10},${130 + i * 8},${60 + i * 5},1)`,
                    opacity: 0.25 + i * 0.05,
                    animationDelay: `${-i * 2}s`,
                }} />
            ))}
        </>
    );
}

/* Snowy ground shimmer */
function SnowGround() {
    return (
        <div className="ws-snow-ground absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '18%' }}>
            <svg viewBox="0 0 800 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <path d="M0,60 Q80,20 160,55 Q240,90 320,45 Q400,10 480,50 Q560,85 640,40 Q720,5 800,50 L800,100 L0,100 Z"
                    fill="rgba(230,242,252,0.7)" />
            </svg>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────
   Main export: WeatherScene
────────────────────────────────────────────────────────────────────── */
export default function WeatherScene({ condition, isDay }) {
    const { type } = getScene(condition, isDay);
    const canvasRef = useRef(null);
    useWeatherCanvas(type, canvasRef);

    useEffect(() => { injectCSS(); }, []);

    const sky = SKY[type] || SKY['sunny'];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>

            {/* Sky gradient */}
            <div className="absolute inset-0" style={{ background: sky, transition: 'background 1.5s ease' }} />

            {/* ── Sunny ── */}
            {type === 'sunny' && (
                <>
                    <Sun />
                    {/* Horizon haze */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3"
                        style={{ background: 'linear-gradient(to top, rgba(255,200,80,0.28), transparent)' }} />
                    <Clouds dense={false} dark={false} />
                </>
            )}

            {/* ── Partly cloudy ── */}
            {type === 'partly-cloudy' && (
                <>
                    <Sun />
                    <Clouds dense={false} dark={false} />
                    <div className="absolute bottom-0 left-0 right-0 h-1/4"
                        style={{ background: 'linear-gradient(to top, rgba(40,80,120,0.35), transparent)' }} />
                </>
            )}

            {/* ── Cloudy / Overcast ── */}
            {(type === 'cloudy' || type === 'overcast') && (
                <>
                    <Clouds dense={true} dark={type === 'overcast'} />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3"
                        style={{ background: 'linear-gradient(to top, rgba(20,30,40,0.5), transparent)' }} />
                </>
            )}

            {/* ── Rain ── */}
            {type === 'rain' && (
                <>
                    <Clouds dense={true} dark={true} />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3"
                        style={{ background: 'linear-gradient(to top, rgba(10,20,30,0.6), transparent)' }} />
                </>
            )}

            {/* ── Heavy Rain ── */}
            {type === 'heavy-rain' && (
                <>
                    <Clouds dense={true} dark={true} />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2"
                        style={{ background: 'linear-gradient(to top, rgba(5,12,20,0.75), transparent)' }} />
                </>
            )}

            {/* ── Storm ── */}
            {type === 'storm' && (
                <>
                    <Clouds dense={true} dark={true} />
                    <Lightning />
                    <Lightning />
                    <div className="absolute inset-0"
                        style={{ background: 'rgba(0,5,10,0.45)' }} />
                </>
            )}

            {/* ── Snow ── */}
            {type === 'snow' && (
                <>
                    <Clouds dense={false} dark={false} />
                    <SnowGround />
                    <div className="absolute bottom-0 left-0 right-0 h-1/4"
                        style={{ background: 'linear-gradient(to top, rgba(200,225,245,0.35), transparent)' }} />
                </>
            )}

            {/* ── Fog ── */}
            {type === 'fog' && (
                <>
                    <FogLayers />
                    <div className="absolute inset-0"
                        style={{ background: 'rgba(110,130,145,0.25)' }} />
                </>
            )}

            {/* ── Night ── */}
            {(type === 'night') && (
                <>
                    <Moon />
                    {/* Milky way smear */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse 60% 30% at 50% 30%, rgba(80,110,160,0.12), transparent)' }} />
                </>
            )}

            {/* ── Night cloudy ── */}
            {type === 'night-cloudy' && (
                <>
                    <Moon />
                    <Clouds dense={true} dark={true} />
                </>
            )}

            {/* ── Dust ── */}
            {type === 'dust' && (
                <>
                    <DustParticles />
                    <div className="absolute inset-0"
                        style={{ background: 'rgba(100,70,20,0.25)' }} />
                </>
            )}

            {/* Canvas layer: rain streaks / snow / stars / dust motes */}
            <canvas ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    mixBlendMode: type === 'sunny' || type === 'partly-cloudy' ? 'screen' : 'normal',
                }}
            />

            {/* Universal readability bottom scrim */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }} />
            {/* Top scrim */}
            <div className="absolute inset-x-0 top-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)' }} />
        </div>
    );
}
