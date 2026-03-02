'use client';
import { Star } from 'lucide-react';

export default function Testimonials() {
    return (
        <section className="relative z-10 w-full py-32 px-4 md:px-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Left: Heading & Stats */}
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-6 group cursor-default">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />)}
                        <span className="text-white font-bold ml-2">4.9/5 Rating</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Trusted by over <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">10,000+ Locals</span>
                    </h2>
                    <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-md">
                        Join a community that values accuracy. Our users rely on Weather.AI for daily commutes, travel plans, and safety.
                    </p>

                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">2M+</div>
                            <div className="text-sm text-white/40">Daily API Calls</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">98%</div>
                            <div className="text-sm text-white/40">Forecast Accuracy</div>
                        </div>
                    </div>
                </div>

                {/* Right: Review Cards Carousel Idea (Static Grid for now) */}
                <div className="grid gap-6">
                    <div className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-white/20 group">
                        <p className="text-xl text-white/80 italic mb-6 leading-relaxed">
                            "The localized rain alerts are creepy accurate. It told me rain would start in 4 minutes, and it literally did. Best weather app I've used in India."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 group-hover:scale-110 transition-transform duration-300" />
                            <div>
                                <div className="text-white font-bold">Arjun Mehta</div>
                                <div className="text-white/40 text-sm">Jaipur, Rajasthan</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 translate-x-4 md:translate-x-8 opacity-80 hover:opacity-100 hover:translate-x-0 hover:-translate-y-2 hover:shadow-xl hover:border-white/20 group">
                        <p className="text-white/70 italic mb-6">
                            "Finally a UI that doesn't look like it's from 2010. Simple, dark mode is perfect, and the map integration is super smooth."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-300" />
                            <div>
                                <div className="text-white font-bold">Zara Khan</div>
                                <div className="text-white/40 text-sm">Mumbai, MH</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
