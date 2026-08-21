import Link from 'next/link'
import React from 'react'

function ReferFooter() {
    return (
        <section className="pt-0 relative overflow-hidden bg-white left-1/2 -translate-x-1/2">
            <div className="w-full relative z-10">
                <div className="relative bg-white border-y border-slate-100 overflow-hidden shadow-sm min-h-[250px] flex items-center">
                    {/* Full Card Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
                            className="w-full h-full object-cover opacity-80"
                            alt="Referral Rewards"
                        />
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
                    </div>

                    {/* Full Width Content Flow */}
                    <div className="relative z-10 px-6 md:px-14 py-8 w-full flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-10">
                        {/* Left: Branding & Info */}
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="text-center md:text-left border-l-0 md:border-l-4 border-primary pl-0 md:pl-8">
                                <h2 className="title-reveal-large py-1 leading-[0.9] mb-2 overflow-hidden agent-h2" style={{ fontFamily: "WastedVindey, serif" }}>
                                    <span className="text-slate-950 inline-block">Refer & Earn</span> <span className="gradent_text_color pr-2 inline-block">Rewards</span>
                                </h2>
                                <p className="text-slate-950 agent-small font-black uppercase tracking-[0.2em] opacity-60">
                                    Join the Elite Circle
                                </p>
                            </div>

                            <div className="hidden md:flex items-center gap-8">
                                <div className="flex flex-col">
                                    <span className="agent-h1 font-black text-slate-950">₹50K+</span>
                                    <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">Earning</span>
                                </div>
                                <div className="w-[1px] h-10 bg-slate-200"></div>
                                <div className="flex flex-col">
                                    <span className="agent-h1 font-black text-slate-950">1000+</span>
                                    <span className="agent-tiny font-bold text-slate-400 uppercase tracking-widest">Partners</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-8">
                            <div className="hidden xl:block text-right">
                                <p className="text-slate-900 agent-small font-bold leading-tight mb-1">Refer a colleague today</p>
                                <p className="text-slate-500 agent-tiny font-bold uppercase tracking-widest italic">Terms & Conditions Apply</p>
                            </div>
                            <Link href="/agent/refer" className='cursor-pointer'>
                                <button className="cursor-pointer px-14 py-5 bg-slate-900 text-white rounded-xl font-black agent-small uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl group flex items-center gap-3">
                                    Refer Now
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReferFooter