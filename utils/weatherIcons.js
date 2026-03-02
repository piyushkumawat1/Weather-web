export function getWeatherEmoji(conditionText) {
    if (!conditionText) return '🌡️';

    const condition = conditionText.toLowerCase();

    // Clear / Sunny
    if (condition.includes('sunny') || condition.includes('clear')) return '☀️';

    // Clouds
    if (condition.includes('partly cloudy')) return '⛅';
    if (condition.includes('cloud') || condition.includes('overcast')) return '☁️';

    // Rain / Drizzle
    if (condition.includes('thunder')) return '⛈️';
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower') || condition.includes('patchy')) return '🌧️';

    // Snow / Ice
    if (condition.includes('snow') || condition.includes('ice') || condition.includes('blizzard') || condition.includes('sleet')) return '❄️';

    // Atmosphere
    if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) return '🌫️';

    // Default
    return '🌡️';
}
