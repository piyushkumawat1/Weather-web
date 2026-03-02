/**
 * Returns a high-quality, cinematic Unsplash photo URL that matches the
 * exact style in the reference: dramatic wide-angle photorealistic skies.
 *
 * @param {string} conditionText - weather condition string from API
 * @param {number|boolean} isDay  - 1/true = day, 0/false = night
 */
export function getWeatherBackground(conditionText, isDay = 1) {
    if (!conditionText) {
        // Default: dramatic storm just like the reference image
        return 'https://images.unsplash.com/photo-1504608524841-42584120d26a?q=90&w=3024&auto=format&fit=crop';
    }

    const c = conditionText.toLowerCase();

    // ─── DAY ────────────────────────────────────────────────────────────────
    if (isDay) {

        // Thunder / Storm  →  exact reference style: dark cumulonimbus + lightning + green fields
        if (c.includes('thunder') || c.includes('storm') || c.includes('lightning')) {
            return 'https://images.unsplash.com/photo-1504608524841-42584120d26a?q=90&w=3024&auto=format&fit=crop';
        }

        // Heavy Rain / Downpour
        if (c.includes('heavy rain') || c.includes('torrential') || c.includes('downpour')) {
            return 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=90&w=3024&auto=format&fit=crop';
        }

        // Rain / Drizzle / Shower
        if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) {
            return 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=90&w=3024&auto=format&fit=crop';
        }

        // Snow / Blizzard / Ice
        if (c.includes('snow') || c.includes('blizzard') || c.includes('ice') || c.includes('sleet') || c.includes('freezing')) {
            return 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=90&w=3072&auto=format&fit=crop';
        }

        // Overcast / Very cloudy
        if (c.includes('overcast')) {
            return 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=90&w=3024&auto=format&fit=crop';
        }

        // Partly Cloudy
        if (c.includes('partly cloudy') || c.includes('broken cloud')) {
            return 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=90&w=3024&auto=format&fit=crop';
        }

        // Cloudy
        if (c.includes('cloud') || c.includes('grey') || c.includes('gray')) {
            return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=90&w=3024&auto=format&fit=crop';
        }

        // Sunny / Clear  →  brilliant blue wide sky
        if (c.includes('sunny') || c.includes('clear')) {
            return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=90&w=3024&auto=format&fit=crop';
        }

        // Fog / Mist / Haze
        if (c.includes('fog') || c.includes('mist') || c.includes('haze') || c.includes('smoke')) {
            return 'https://images.unsplash.com/photo-1487621167305-5d248087c724?q=90&w=3024&auto=format&fit=crop';
        }

        // Sand / Dust storm
        if (c.includes('sand') || c.includes('dust')) {
            return 'https://images.unsplash.com/photo-1594085210480-cfc63e4fcb4d?q=90&w=3024&auto=format&fit=crop';
        }

        // Windy
        if (c.includes('wind') || c.includes('gale') || c.includes('breezy')) {
            return 'https://images.unsplash.com/photo-1527482937786-6608f6e14c15?q=90&w=3024&auto=format&fit=crop';
        }

        // Hot / Heatwave
        if (c.includes('hot') || c.includes('heat') || c.includes('scorching')) {
            return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=90&w=3024&auto=format&fit=crop';
        }
    }

    // ─── NIGHT ──────────────────────────────────────────────────────────────
    else {

        // Thunder / Storm night  →  lightning bolts at night
        if (c.includes('thunder') || c.includes('storm') || c.includes('lightning')) {
            return 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?q=90&w=3024&auto=format&fit=crop';
        }

        // Rain night  →  city lights in the rain
        if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) {
            return 'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?q=90&w=3024&auto=format&fit=crop';
        }

        // Snow night
        if (c.includes('snow') || c.includes('blizzard') || c.includes('ice') || c.includes('sleet')) {
            return 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=90&w=3024&auto=format&fit=crop';
        }

        // Clear / Starry night  →  Milky Way
        if (c.includes('clear') || c.includes('sunny')) {
            return 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=90&w=3024&auto=format&fit=crop';
        }

        // Cloudy night  →  moon behind clouds
        if (c.includes('cloud') || c.includes('overcast') || c.includes('partly')) {
            return 'https://images.unsplash.com/photo-1536746803623-cef8708094ce?q=90&w=3024&auto=format&fit=crop';
        }

        // Fog / Mist night
        if (c.includes('fog') || c.includes('mist') || c.includes('haze')) {
            return 'https://images.unsplash.com/photo-1517480447814-27aa311a3070?q=90&w=3024&auto=format&fit=crop';
        }
    }

    // ─── Fallback: same dramatic storm as reference ─────────────────────────
    return 'https://images.unsplash.com/photo-1504608524841-42584120d26a?q=90&w=3024&auto=format&fit=crop';
}
