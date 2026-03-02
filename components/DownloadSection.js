'use client';
import { Apple, Play, Smartphone } from 'lucide-react';

export default function DownloadSection() {
    return (
        <section className="relative z-10 w-full py-24 px-4 overflow-hidden">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-blue-600/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative">
                <div className="glass rounded-[3rem] p-12 md:p-24 border border-white/10 text-center relative overflow-hidden group">

                    {/* Hover Glow Effect */}
                    {/* Hover Glow Effect */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white mb-8">
                            <Smartphone className="w-4 h-4 text-blue-400" />
                            Available on iOS & Android
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                            Your forecast,<br />
                            <span className="text-white/30">everywhere you go.</span>
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="h-14 bg-white text-black px-8 rounded-full font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-white/10 group/btn hover:ring-4 hover:ring-white/30">
                                <Apple className="w-6 h-6 group-hover/btn:-mt-1 transition-transform" />
                                <span className="text-lg">App Store</span>
                            </button>
                            <button className="h-14 bg-black/50 backdrop-blur-md border border-white/20 text-white px-8 rounded-full font-bold flex items-center gap-3 hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-lg hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-black/20">
                                <Play className="w-5 h-5 fill-current" />
                                <span>Google Play</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
