'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming standard Shadcn button

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Showcase', href: '#showcase' },
        { name: 'Reviews', href: '#reviews' },
        { name: 'Download', href: '#download' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
                ? 'bg-black/80 backdrop-blur-md border-white/10 py-3 shadow-2xl'
                : 'bg-transparent border-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center gap-3 font-bold text-lg tracking-wider text-white select-none cursor-pointer hover:opacity-90 transition-opacity group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/10 group-hover:rotate-12 transition-transform duration-300">
                        <Cloud className="w-5 h-5 text-white fill-white/20" />
                    </div>
                    WEATHER.AI
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-sm">
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/60 hover:text-white px-5 py-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    {/* <span className="text-sm text-white/40 font-medium hover:text-white cursor-pointer transition-colors">Log in</span> */}
                    <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-white/5 flex items-center gap-2 hover:shadow-white/20">
                        Get App <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/5"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-2">
                            {navLinks.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-lg font-medium text-white/70 hover:text-white py-4 px-4 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 flex justify-between items-center group"
                                >
                                    {link.name}
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
