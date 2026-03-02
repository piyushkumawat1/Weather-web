'use client';
import { motion } from 'framer-motion';

export default function AppShowcase() {
    return (
        <section className="relative z-10 w-full py-20 px-4 md:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Beautifully Designed</h2>
                    <p className="text-white/60">Experience weather data like never before.</p>
                </motion.div>

                {/* Perspective Phone/Card Mockups */}
                <div className="relative w-full max-w-4xl h-[500px] flex justify-center">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[100px] rounded-full" />

                    {/* Left Card - Radar */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotate: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                        viewport={{ once: true }}
                        className="absolute left-0 md:left-20 top-10 w-[280px] h-[400px] glass rounded-3xl border border-white/10 p-4 shadow-2xl z-10 hidden md:block" // Hidden on mobile for space
                    >
                        <div className="w-full h-full bg-black/40 rounded-2xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-60" />
                            {/* Fake Radar Rings */}
                            <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-green-500/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute top-1/2 left-1/2 w-20 h-20 border border-green-500/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute top-4 left-4 text-white font-bold">RADAR</div>
                        </div>
                    </motion.div>

                    {/* Center Card - Main App */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative w-[300px] md:w-[320px] h-[480px] glass rounded-[2.5rem] border-4 border-white/10 p-2 shadow-2xl z-20 bg-black/80"
                    >
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30" />

                        {/* Screen Content */}
                        <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center text-white relative">
                            {/* Weather Content Mock */}
                            <div className="text-6xl font-thin mb-2">24°</div>
                            <div className="text-xl font-medium tracking-widest mb-8">JAIPUR</div>
                            <div className="w-full px-6 flex justify-between text-xs opacity-60">
                                <span>Wind 12km/h</span>
                                <span>Hum 42%</span>
                            </div>
                            <div className="mt-8 w-full px-4">
                                <div className="h-20 glass rounded-xl flex items-center justify-around">
                                    <div className="w-8 h-8 rounded-full bg-yellow-400/20" />
                                    <div className="w-8 h-8 rounded-full bg-white/10" />
                                    <div className="w-8 h-8 rounded-full bg-white/10" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Card - Alerts */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                        viewport={{ once: true }}
                        className="absolute right-0 md:right-20 top-10 w-[280px] h-[400px] glass rounded-3xl border border-white/10 p-4 shadow-2xl z-10 hidden md:block"
                    >
                        <div className="w-full h-full bg-black/40 rounded-2xl overflow-hidden p-6 flex flex-col gap-4">
                            <div className="text-white font-bold mb-2">NOTIFICATIONS</div>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white/5 p-3 rounded-lg border-l-2 border-red-500">
                                    <div className="text-xs text-red-300 font-bold mb-1">STORM ALERT</div>
                                    <div className="text-[10px] text-white/60">Heavy rain expected in 15 mins.</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
