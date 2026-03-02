import LocationSearch from './LocationSearch';
import WeatherCard from './WeatherCard';

const HeroSection = ({ onSearch, loading, weather, error }) => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center z-10">

            {/* Main Headline */}
            <div className="mb-10 max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-700">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
                    Know Rain <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                        Before It Starts
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                    Experience weather beautifully. Hyper-local forecasts, immersive animations, and real-time alerts for your exact location.
                </p>

                {/* Search Input */}
                <div className="flex justify-center w-full mb-8">
                    <LocationSearch
                        onLocationSelect={onSearch}
                        placeholder="Search a city or place…"
                        variant="hero"
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="glass bg-red-500/20 border-red-400/30 text-red-100 p-4 rounded-xl mb-6 mx-auto max-w-md animate-in fade-in zoom-in duration-300">
                        ⚠️ {error}
                    </div>
                )}
            </div>

            {/* Live Weather Preview (Only shows if weather data exists) */}
            {weather && (
                <div className="animate-in fade-in zoom-in duration-500 delay-100">
                    <WeatherCard weather={weather} />
                </div>
            )}

            {/* Placeholder / Demo Visual if no search yet */}
            {!weather && !loading && !error && (
                <div className="glass-card p-8 max-w-sm w-full opacity-80 scale-90 blur-[1px] select-none pointer-events-none">
                    <div className="h-6 w-32 bg-white/20 rounded mx-auto mb-4" />
                    <div className="h-20 w-20 bg-white/20 rounded-full mx-auto mb-4" />
                    <div className="h-10 w-16 bg-white/20 rounded mx-auto" />
                    <p className="text-blue-200 mt-4 text-sm">Enter a city to see the magic</p>
                </div>
            )}

        </section>
    );
};

export default HeroSection;
