'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppPreview() {
    // Using placeholders for now, in a real app these would be actual screenshots
    // If I had the 'generate_image' tool enabled for assets, I could generate them, but I'll use CSS mocks.

    return (
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">

                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Pocket-Sized <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Storm Chaser.</span>
                    </h2>
                    <p className="text-lg text-blue-100/70 mb-8 max-w-lg">
                        Download the mobile app for exclusive features like widget support, lock screen live activities, and minute-by-minute rain alerts.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="glass px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <div className="w-6 h-6 bg-white rounded-full" /> {/* Apple Logo Placeholder */}
                            <div className="text-left">
                                <div className="text-[10px] uppercase tracking-wider opacity-70">Download on the</div>
                                <div className="font-bold leading-none">App Store</div>
                            </div>
                        </button>
                        <button className="glass px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <div className="w-6 h-6 bg-white rounded-full" /> /* Play Store Logo Placeholder */
                            <div className="text-left">
                                <div className="text-[10px] uppercase tracking-wider opacity-70">Get it on</div>
                                <div className="font-bold leading-none">Google 2Play</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mock Phone Visual */}
                <div className="flex-1 relative flex justify-center">
                    <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden z-10">
                        {/* Screen Content */}
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-black p-4 flex flex-col text-white">
                            {/* Mock UI */}
                            <div className="mt-8 flex justify-between items-center opacity-80">
                                <div className="text-xs">9:41</div>
                                <div className="flex gap-1">
                                    <div className="w-4 h-4 rounded-full border border-white" />
                                </div>
                            </div>

                            <div className="mt-10 text-center">
                                <div className="text-6xl font-thin">23°</div>
                                <div className="text-sm opacity-70 mt-2">New York</div>
                            </div>

                            <div className="mt-auto h-[40%] bg-white/10 backdrop-blur-md rounded-t-3xl p-4">
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-16 h-20 bg-white/5 rounded-xl flex-shrink-0" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements behind phone */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full -z-10" />
                </div>

            </div>
        </section>
    );
}
