export default function CallToAction() {
    return (
        <section className="py-32 relative z-10 text-center px-6">
            <div className="max-w-4xl mx-auto glass rounded-3xl p-12 md:p-20 relative overflow-hidden group">

                {/* Background Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">
                    Ready to see the weather <br />
                    <span className="text-blue-300">differently?</span>
                </h2>

                <p className="text-xl text-blue-100/70 mb-10 max-w-2xl mx-auto relative z-10">
                    Join thousands of users who start their day with Weather.AI. Accurate, beautiful, and free.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <button className="bg-white text-blue-950 px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-1">
                        Get Started for Free
                    </button>
                    <button className="glass px-8 py-4 rounded-full font-bold text-white hover:bg-white/10 transition-all border border-white/20">
                        View Web Map
                    </button>
                </div>
            </div>
        </section>
    );
}
