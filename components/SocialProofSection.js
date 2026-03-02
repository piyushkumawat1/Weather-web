const SocialProofSection = () => {
    return (
        <section className="py-20 px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">

                {/* Rating Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8 animate-pulse">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-white text-sm font-medium">4.9/5 Average Rating</span>
                </div>

                <h2 className="text-3xl font-bold text-white mb-8">Trusted by 10,000+ Locals</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {[
                        { text: "This app literally tells me when to leave the house to avoid rain. Game changer.", author: "Sarah J." },
                        { text: "The most beautiful weather app I've ever used. The rain animations are so relaxing.", author: "Mike T." }
                    ].map((review, idx) => (
                        <div key={idx} className="glass p-6 rounded-2xl flex items-start gap-4 hover:-translate-y-2 hover:shadow-xl hover:border-white/20 transition-all duration-300 group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg" />
                            <div>
                                <p className="text-blue-50 italic mb-2">"{review.text}"</p>
                                <p className="text-white font-bold text-sm">{review.author}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating CTA */}
                <div className="mt-16">
                    <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.6)]">
                        Download for iOS & Android
                    </button>
                </div>

                <p className="text-blue-200/60 text-sm mt-6">
                    © 2026 Weather App Inc. All rights reserved.
                </p>
            </div>
        </section>
    );
};

export default SocialProofSection;
