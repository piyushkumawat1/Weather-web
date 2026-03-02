const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchCurrentWeather(location) {
    try {
        let query;
        if (!location) throw new Error('Invalid location');

        if (typeof location === 'string') {
            query = `q=${encodeURIComponent(location)}`;
        } else if (location.lat && location.lng) {
            query = `q=${location.lat},${location.lng}`;
        } else {
            throw new Error('Invalid location');
        }

        const response = await fetch(
            `${BASE_URL}/current.json?key=${API_KEY}&${query}&aqi=no`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        return {
            success: true,
            data: {
                city: data.location.name,
                country: data.location.country,
                temperature: Math.round(data.current.temp_c),
                feelsLike: Math.round(data.current.feelslike_c),
                condition: data.current.condition.text,
                description: data.current.condition.text,
                humidity: data.current.humidity,
                windSpeed: data.current.wind_kph,
                icon: data.current.condition.icon.replace('//', 'https://'), // WeatherAPI returns //cdn...
                isDay: data.current.is_day, // 1 = Day, 0 = Night
                coords: { lat: data.location.lat, lng: data.location.lon }
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

export async function fetchForecast(location) {
    try {
        let query;
        if (typeof location === 'string') {
            query = `q=${encodeURIComponent(location)}`;
        } else if (location.lat && location.lng) {
            query = `q=${location.lat},${location.lng}`;
        }

        const response = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&${query}&days=7&aqi=no&alerts=no`
        );

        if (!response.ok) {
            throw new Error('Forecast not available');
        }

        const data = await response.json();

        // Get hourly forecast (from the first forecast day)
        // WeatherAPI gives hourly data for each day. We'll take the remaining hours of today + tomorrow if needed.
        // For simplicity, just taking next few hours from today's forecast list.
        const currentHour = new Date().getHours();
        const hourlyData = data.forecast.forecastday[0].hour.filter(h => {
            const hTime = new Date(h.time).getHours();
            return hTime >= currentHour;
        }).slice(0, 8); // Next 8 available hours

        // If we run out of hours today, should ideally grab tomorrow, but keeping it simple for MVP or grab from next day
        let finalHourly = hourlyData;
        if (hourlyData.length < 8 && data.forecast.forecastday[1]) {
            const nextDayHours = data.forecast.forecastday[1].hour.slice(0, 8 - hourlyData.length);
            finalHourly = [...hourlyData, ...nextDayHours];
        }

        const hourlyForecasts = finalHourly.map(item => ({
            time: new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
            temp: Math.round(item.temp_c),
            condition: item.condition.text,
            icon: item.condition.icon.replace('//', 'https://')
        }));

        // Get daily forecast
        const dailyForecasts = data.forecast.forecastday.map(day => ({
            date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }),
            temp: Math.round(day.day.avgtemp_c), // Using average temp for daily view
            condition: day.day.condition.text,
            icon: day.day.condition.icon.replace('//', 'https://'),
            description: day.day.condition.text
        }));

        return {
            success: true,
            data: {
                hourly: hourlyForecasts,
                daily: dailyForecasts
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
