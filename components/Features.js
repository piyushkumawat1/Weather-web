'use client';
import { motion } from 'framer-motion';
import { CloudRain, Wind, Sun, ShieldAlert, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
    {
        icon: CloudRain,
        title: "Hyper-Local Forecasts",
        desc: "Access street-level weather changes with our proprietary micro-radar technology.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        icon: ShieldAlert,
        title: "Severe Warning System",
        desc: "Get notified seconds before impact with our government-integrated alert network.",
        color: "from-red-500 to-orange-400"
    },
    {
        icon: Sun,
        title: "Health & Air Quality",
        desc: "Track UV index, pollen counts, and air pollution levels in real-time.",
        color: "from-yellow-400 to-orange-300"
    },
    {
        icon: Wind,
        title: "Advanced Data Models",
        desc: "Powered by AI that aggregates data from 4 global meteorological models.",
        color: "from-purple-500 to-pink-400"
    }
];

export default function Features() {
    return (
        <section className="relative z-10 w-full py-32 px-4 md:px-8 bg-black/20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Precision weather <br />
                            <span className="text-white/40">reinvented for you.</span>
                        </h2>
                        <p className="text-lg text-white/50 font-light">
                            We don't just show the weather; we help you understand it with intuitive visualizations and smart insights.
                        </p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden md:flex items-center gap-2 text-white border border-white/10 px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 group hover:scale-105 hover:border-white/30 hover:shadow-lg hover:shadow-white/5"
                    >
                        View all features <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                        >
                            <div className="h-full bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 relative overflow-hidden group-hover:border-white/20 hover:shadow-[0_0_30px_-5px_var(--color-primary)] hover:-translate-y-2">
                                {/* Gradient Blob */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.color} blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                                    <f.icon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">
                                    {f.desc}
                                </p>

                                <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-wider group-hover:text-white/100 transition-colors">
                                    Learn more <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
