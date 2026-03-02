'use client';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative z-10 w-full py-10 px-4 md:px-8 border-t border-white/5 bg-black/40">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex flex-col items-center md:items-start">
                    <div className="font-bold tracking-widest text-lg text-white mb-2">WEATHER.AI</div>
                    <p className="text-xs text-white/40">© 2026 Weather.AI Inc. All rights reserved.</p>
                </div>

                <div className="flex items-center gap-6 text-xs text-white/60">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                </div>

                <div className="flex items-center gap-4">
                    {[
                        { name: 'Twitter', icon: Twitter, url: 'https://www.linkedin.com/in/piyush-kumawat1111' },
                        { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/piyushgamer1111' },
                        { name: 'LinkedIn', icon: Linkedin, url: '#' }
                    ].map(social => {
                        const Icon = social.icon;
                        return (
                            <a key={social.name} href={social.url} target={social.url !== '#' ? '_blank' : undefined} rel={social.url !== '#' ? 'noopener noreferrer' : undefined} className="text-white/40 hover:text-white transition-colors p-1" aria-label={social.name}>
                                <Icon className="w-5 h-5" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}
