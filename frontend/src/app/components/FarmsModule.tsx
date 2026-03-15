'use client';
import React from 'react';

const SENSOR_DATA = [
    { id: 'S1', type: 'Moisture', value: '42%', status: 'Low', zone: 'North Sector' },
    { id: 'S2', type: 'Moisture', value: '68%', status: 'Optimum', zone: 'Greenhouse A' },
    { id: 'S3', type: 'Moisture', value: '12%', status: 'Critical', zone: 'South Arid' },
    { id: 'S4', type: 'Moisture', value: '55%', status: 'Optimum', zone: 'West Slope' },
];

const CROPS = [
    { name: 'Maize', health: 92, status: 'Growth', harvest: 'Nov 12' },
    { name: 'Tomatoes', health: 76, status: 'Blossom', harvest: 'Oct 04' },
    { name: 'Rice', health: 98, status: 'Seeding', harvest: 'Dec 22' },
];

export default function FarmsModule({ lang }: { lang: 'en' | 'ha' }) {
    return (
        <div className="flex h-full gap-6 p-6 overflow-hidden animate-fade-in">
            {/* ─── FARM MAP & OVERVIEW ─── */}
            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                <div className="flex-1 relative glass rounded-3xl overflow-hidden border border-emerald-500/10">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center brightness-[0.4] grayscale-[0.5]" />

                    {/* Topographic Lines Effect */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                    {/* Interactive Node Markers */}
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-emerald-500 animate-ping" />
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />

                    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-red-500 animate-ping" />
                    <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_15px_#ef4444]" />

                    {/* Header Info */}
                    <div className="absolute top-6 left-6 flex items-center gap-4">
                        <div className="p-3 glass rounded-2xl border-emerald-500/20">
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{lang === 'en' ? 'SATELLITE VIEW' : 'HOTO TA SAMA'}</p>
                            <p className="text-sm font-bold text-white mt-1">Kido Farms Central - Zaria</p>
                        </div>
                        <div className="p-3 glass rounded-2xl border-indigo-500/20">
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{lang === 'en' ? 'WEATHER' : 'YANAYI'}</p>
                            <p className="text-sm font-bold text-white mt-1">32°C · {lang === 'en' ? 'Sunny' : 'Rana'}</p>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-6 left-6 p-4 glass rounded-2xl border-white/5 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[10px] text-white/60 font-medium">Optimal Hydration</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-[10px] text-white/60 font-medium">Critical Dry Zone</span>
                        </div>
                    </div>
                </div>

                {/* Action Controls */}
                <div className="flex gap-4">
                    <div className="flex-1 glass p-4 rounded-2xl flex items-center justify-between border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-emerald-500/10 text-emerald-400">💧</div>
                            <div>
                                <p className="text-xs font-bold text-white">{lang === 'en' ? 'Auto Irrigation' : 'Banruwan Kai-tsaye'}</p>
                                <p className="text-[10px] text-white/40">{lang === 'en' ? 'Active in North Sector' : 'Yana aiki a Sashin Arewa'}</p>
                            </div>
                        </div>
                        <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-emerald-500" />
                        </div>
                    </div>

                    <div className="flex-1 glass p-4 rounded-2xl flex items-center justify-between border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-orange-500/10 text-orange-400">🚁</div>
                            <div>
                                <p className="text-xs font-bold text-white">{lang === 'en' ? 'Drone Coverage' : 'Sanya Ido ta Drone'}</p>
                                <p className="text-[10px] text-white/40">{lang === 'en' ? 'Patrol scheduled at 06:00' : 'Zai fara zagaye da karfe 06:00'}</p>
                            </div>
                        </div>
                        <div className="w-10 h-5 bg-white/10 rounded-full relative">
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── SENSOR & CROP LOGS ─── */}
            <div className="w-80 flex flex-col gap-6 overflow-hidden">
                {/* Sensor Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {SENSOR_DATA.map(s => (
                        <div key={s.id} className="p-4 glass rounded-2xl border-white/5 hover:border-emerald-500/20 transition-all cursor-default">
                            <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-3">NODE {s.id}</p>
                            <p className="text-xs font-medium text-white/60 mb-1">{s.type}</p>
                            <div className="flex items-end justify-between">
                                <p className="text-2xl font-black text-white">{s.value}</p>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${s.status === 'Optimum' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {s.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Crop Outlook */}
                <div className="flex-1 glass p-5 rounded-3xl border-white/5 flex flex-col overflow-hidden">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                        {lang === 'en' ? 'Crop Health Audit' : 'Binciken Lafiyar Shuka'}
                    </p>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {CROPS.map((c, i) => (
                            <div key={i} className="space-y-2 p-3 rounded-2xl hover:bg-white/[0.03] transition-all group">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-bold text-white">{c.name}</p>
                                    <span className="text-[10px] text-white/20 italic">{c.harvest}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981]" style={{ width: `${c.health}%` }} />
                                    </div>
                                    <span className="text-[11px] font-black text-white/80 w-8">{c.health}%</span>
                                </div>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/60 transition-opacity opacity-0 group-hover:opacity-100 italic">
                                    READY FOR {c.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Prediction */}
                <div className="p-5 rounded-3xl bg-indigo-500/5 border border-indigo-500/20">
                    <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Vexel Insight</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-medium">
                        {lang === 'en'
                            ? 'Forecast indicates 12% moisture drop in South Arid by Thursday. Suggest initiating pulsed irrigation.'
                            : 'Hasashen yanayi ya nuna raguwar laima da kashi 12% a Sashin Kudu kafin Alhamis. Ana ba da shawarar fara banruwa.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
