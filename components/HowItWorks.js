import { MapPin, CloudLightning, CalendarDays } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: <MapPin className="w-8 h-8 text-blue-400" />,
            title: "Enter Location",
            desc: "Search for any city worldwide or let us detect your current spot."
        },
        {
            icon: <CloudLightning className="w-8 h-8 text-purple-400" />,
            title: "Get Live Insights",
            desc: "Instant access to temperature, humidity, and severe weather alerts."
        },
        {
            icon: <CalendarDays className="w-8 h-8 text-emerald-400" />,
            title: "Plan Ahead",
            desc: "7-day forecasts and hourly trends help you plan your week perfectly."
        }
    ];

    return (
        <section className="py-24 relative z-10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
                    <p className="text-blue-100/60 max-w-2xl mx-auto text-lg">
                        Simple, fast, and accurate. Get the weather you need in seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent border-t border-dashed border-white/20" />

                    {steps.map((step, i) => (
                        <div key={i} className="relative flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/10">
                                {step.icon}
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-lg">
                                    {i + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-white/50 leading-relaxed font-light px-4">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
