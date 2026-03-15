'use client';
import React, { useState } from 'react';

const CAMERAS = [
    { id: 1, name: 'Main Entrance - HD', status: 'Active', detections: 2, feed: 'https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Warehouse B - West', status: 'Active', detections: 0, feed: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Server Room', status: 'Active', detections: 0, feed: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Loading Dock 4', status: 'Warning', detections: 1, feed: 'https://images.unsplash.com/photo-1590674888133-316886e88981?auto=format&fit=crop&w=800&q=80' },
];

const INCIDENTS = [
    { time: '22:45', type: 'Intrusion', level: 'High', location: 'Gate 2', desc: 'Unidentified vehicle detected after hours.' },
    { time: '21:12', type: 'Motion', level: 'Low', location: 'Server Room', desc: 'Routine maintenance personnel detected.' },
    { time: '19:05', type: 'Object', level: 'Medium', location: 'Warehouse B', desc: 'Sustained thermal rise in Zone 4.' },
];

export default function SecurityModule({ lang }: { lang: 'en' | 'ha' }) {
    const [selectedCam, setSelectedCam] = useState(CAMERAS[0]);

    return (
        <div className="flex h-full gap-4 p-6 overflow-hidden animate-fade-in">
            {/* ─── LIVE FEEDS GRID ─── */}
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                <div className="grid grid-cols-2 gap-4 flex-1">
                    {CAMERAS.map(cam => (
                        <div
                            key={cam.id}
                            onClick={() => setSelectedCam(cam)}
                            className={`relative rounded-2xl overflow-hidden glass cursor-pointer border-2 transition-all ${selectedCam.id === cam.id ? 'border-red-500/50 scale-[1.01]' : 'border-white/5 hover:border-white/10'}`}
                        >
                            <img src={cam.feed} alt={cam.name} className="w-full h-full object-cover opacity-60" />

                            {/* Scanline Effect */}
                            <div className="absolute inset-0 pointer-events-none"
                                style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />

                            {/* Overlays */}
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <div className={`status-dot ${cam.status === 'Active' ? 'live' : 'warning'}`} />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                                    {cam.name}
                                </span>
                            </div>

                            {cam.detections > 0 && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">
                                    {cam.detections} {lang === 'en' ? 'ALERTS' : 'SANARWA'}
                                </div>
                            )}

                            {/* Mock Bounding Box for Camera 1 */}
                            {cam.id === 1 && (
                                <div className="absolute top-1/2 left-1/3 w-24 h-40 border-2 border-red-500/80 rounded-lg">
                                    <div className="absolute -top-6 left-0 bg-red-500 text-[8px] font-bold px-1.5 py-0.5">PERSON 88%</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3">
                    <button className="flex-1 py-3 glass rounded-xl text-xs font-bold text-white hover:bg-white/5 transition-all uppercase tracking-widest border-emerald-500/20">
                        {lang === 'en' ? 'Activate Alarm' : 'Kunnar Qararrawa'}
                    </button>
                    <button className="flex-1 py-3 glass rounded-xl text-xs font-bold text-white hover:bg-white/5 transition-all uppercase tracking-widest border-blue-500/20">
                        {lang === 'en' ? 'Lock Perimeter' : 'Rufe Kewaye'}
                    </button>
                    <button className="flex-1 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold hover:bg-red-500/30 transition-all uppercase tracking-widest">
                        {lang === 'en' ? 'Request Backup' : 'Nemi Tallafi'}
                    </button>
                </div>
            </div>

            {/* ─── INCIDENT LOG ─── */}
            <div className="w-80 flex flex-col gap-4 overflow-hidden">
                <div className="glass p-5 rounded-2xl flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">
                            {lang === 'en' ? 'Incident Logs' : 'Rikodin Afaruwa'}
                        </h3>
                        <span className="text-[10px] mono text-white/30 tracking-tighter">LIVE FEED</span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {INCIDENTS.map((inc, i) => (
                            <div key={i} className="p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer group">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${inc.level === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                        {inc.type}
                                    </span>
                                    <span className="text-[10px] mono text-white/20">{inc.time}</span>
                                </div>
                                <p className="text-xs font-semibold text-white/80 mb-1">{inc.location}</p>
                                <p className="text-[10px] text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                                    {inc.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Health */}
                <div className="glass p-5 rounded-2xl">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                        {lang === 'en' ? 'Vision Engine Load' : 'Aikin Injin Vision'}
                    </p>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[10px] mb-1.5">
                                <span className="text-white/40">GPU Cluster 4</span>
                                <span className="text-emerald-400 italic">84% Optimal</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[84%] shadow-[0_0_8px_#10b981]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] mb-1.5">
                                <span className="text-white/40">Model Accuracy</span>
                                <span className="text-indigo-400">99.2%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[99.2%] shadow-[0_0_8px_#6366f1]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
