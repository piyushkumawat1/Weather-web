'use client';

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
                    {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                        <a key={social} href="#" className="text-white/40 hover:text-white transition-colors text-xs">{social}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
