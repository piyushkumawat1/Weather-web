import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function WeatherCard({ weather }) {
    return (
        <div className="glass-card w-full max-w-sm mx-auto text-white transform transition-all hover:scale-105">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight">
                    {weather.city}, {weather.country}
                </h2>
                <p className="text-blue-100 text-lg capitalize mt-1 font-medium">
                    {weather.description}
                </p>
            </div>

            <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                        alt={weather.condition}
                        className="w-32 h-32 drop-shadow-2xl animate-float"
                    />
                </div>
                <div className="text-7xl font-bold text-glow tracking-tighter">
                    {Math.round(weather.temperature)}°
                </div>
                <p className="text-blue-100 mt-2">
                    Feels like {Math.round(weather.feelsLike)}°
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                <div className="text-center">
                    <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">Humidity</p>
                    <p className="text-xl font-bold mt-1">{weather.humidity}%</p>
                </div>
                <div className="text-center border-l border-white/20">
                    <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">Wind</p>
                    <p className="text-xl font-bold mt-1">{weather.windSpeed} m/s</p>
                </div>
            </div>
        </div>
    );
}

