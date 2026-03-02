"use client";

import { useState } from "react";

export default function DebugWeather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        if (!city) return;

        // Use environment variable for API key
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

        try {
            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
            );

            const data = await res.json();
            setWeather(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ padding: "40px", color: "white" }}>
            <h2>Weather App Debug</h2>

            <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            getWeather();
                        }
                    }}
                    style={{ padding: "8px", borderRadius: "4px", color: "black" }}
                />
                <button
                    onClick={getWeather}
                    style={{ padding: "8px 16px", backgroundColor: "#3b82f6", borderRadius: "4px" }}
                >
                    Search
                </button>
            </div>

            {weather && (
                <div style={{ padding: "20px", border: "1px solid #333", borderRadius: "8px" }}>
                    {weather.location && <h3>{weather.location.name}, {weather.location.country}</h3>}
                    {weather.current && (
                        <>
                            <p style={{ fontSize: "2rem", margin: "10px 0" }}>{weather.current.temp_c} °C</p>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                                <p>{weather.current.condition.text}</p>
                            </div>
                        </>
                    )}
                    {weather.error && <p style={{ color: "red" }}>Error: {weather.error.message}</p>}
                </div>
            )}
        </div>
    );
}
