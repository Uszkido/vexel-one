import React from 'react';

export default function SecurityDashboard() {
    return (
        <div className="flex h-screen bg-[#0a0a0b] text-white font-sans selection:bg-rose-500/30">
            {/* Sidebar - Same as Main Dashboard but configured for Security context */}
            <aside className="w-72 bg-[#121214] border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5 bg-gradient-to-br from-rose-500/10 to-transparent">
                    <div className="flex items-center gap-3">
                        <img src="/vexel.svg" alt="Vexel One Logo" className="w-8 h-8" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Vexel One</h1>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-rose-400 mt-1 font-semibold">Security Operations</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <div className="px-3 py-2 text-[11px] uppercase tracking-widest text-white/30 font-bold">Monitoring</div>
                    <NavItem active label="Live Feeds" icon="📹" />
                    <NavItem label="Event Logs" icon="🚨" />
                    <NavItem label="Camera Hub" icon="🎥" />

                    <div className="pt-6 px-3 py-2 text-[11px] uppercase tracking-widest text-white/30 font-bold">Configuration</div>
                    <NavItem label="AI Rules" icon="⚙️" />
                    <NavItem label="Automations" icon="⚡" />
                    <NavItem label="Access Control" icon="🔑" />
                </nav>
            </aside>

            {/* Main Security Hub */}
            <main className="flex-1 flex flex-col bg-[#050505]">
                {/* Header */}
                <header className="h-16 px-8 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-10">
                    <div className="text-sm font-medium flex items-center gap-3">
                        <span className="text-white/60">Module /</span>
                        <span className="text-white">Live Monitoring</span>
                        <div className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] uppercase font-bold tracking-wider border border-rose-500/30">
                            Active
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/10">
                            Add Camera +
                        </button>
                        <div className="h-8 px-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                            Gemini Vision OS
                        </div>
                    </div>
                </header>

                {/* Video Grid Area */}
                <section className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        <CameraFeed name="Main Entrance" status="Online" aiStatus="Scanning..." />
                        <CameraFeed name="Warehouse Bay 4" status="Online" aiStatus="Motion Detected (Person)" alert />
                        <CameraFeed name="Server Room" status="Online" aiStatus="Clear" />
                        <CameraFeed name="Perimeter North" status="Offline" aiStatus="Connection Lost" offline />
                        <CameraFeed name="Lobby Area" status="Online" aiStatus="Scanning..." />
                        <div className="rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center min-h-[250px] cursor-pointer hover:bg-white/10 transition-colors group">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <span className="text-white/40 group-hover:text-white transition-colors">➕</span>
                                </div>
                                <p className="text-sm text-white/50 font-medium">Connect New Stream</p>
                            </div>
                        </div>
                    </div>

                    {/* Event Logs */}
                    <div className="mt-8">
                        <h2 className="text-lg font-bold mb-4">Recent Security Events</h2>
                        <div className="bg-[#121214] rounded-2xl border border-white/5 overflow-hidden">
                            <div className="divide-y divide-white/5">
                                <EventRow time="10:42 AM" camera="Warehouse Bay 4" type="Intrusion" desc="Unrecognized person detected in restricted zone." level="High" />
                                <EventRow time="09:15 AM" camera="Perimeter North" type="Signal Loss" desc="Camera went offline." level="Medium" />
                                <EventRow time="08:00 AM" camera="Main Entrance" type="Motion" desc="Delivery vehicle verified." level="Low" />
                            </div>
                        </div>
                    </div>

                </section>
            </main>
        </div>
    );
}

function CameraFeed({ name, status, aiStatus, alert = false, offline = false }: { name: string, status: string, aiStatus: string, alert?: boolean, offline?: boolean }) {
    return (
        <div className={`relative rounded-xl overflow-hidden min-h-[250px] border ${alert ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : offline ? 'border-white/10 opacity-60' : 'border-white/5 bg-[#121214]'}`}>
            <div className="absolute top-3 left-3 flex gap-2 z-10">
                <div className={`px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider
          ${offline ? 'text-white/40' : 'text-emerald-400'}
        `}>
                    {status}
                </div>
                <div className={`px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider
          ${alert ? 'text-rose-400' : 'text-indigo-400'}
        `}>
                    AI: {aiStatus}
                </div>
            </div>

            {/* Mock Video Feed */}
            <div className="w-full h-full bg-[#1a1a1c] relative">
                {!offline && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>}
                {alert && <div className="absolute inset-0 border-4 border-rose-500/50 rounded-xl pointer-events-none animate-pulse"></div>}

                <div className="absolute bottom-3 left-3 text-sm font-medium text-white shadow-black drop-shadow-md">
                    {name}
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] text-white/60 font-mono">
                    {new Date().toISOString().split('T')[1].slice(0, 8)}
                </div>
            </div>
        </div>
    );
}

function EventRow({ time, camera, type, desc, level }: { time: string, camera: string, type: string, desc: string, level: string }) {
    const getColors = () => {
        switch (level) {
            case 'High': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            case 'Medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            default: return 'text-white/60 bg-white/5 border-white/10';
        }
    }

    return (
        <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
            <div className="flex items-center gap-6">
                <div className="text-xs text-white/40 font-mono">{time}</div>
                <div>
                    <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{type}</p>
                    <p className="text-xs text-white/50">{camera}</p>
                </div>
                <p className="text-sm text-white/70">{desc}</p>
            </div>
            <div className={`px-3 py-1 text-xs rounded-full border font-medium ${getColors()}`}>
                {level}
            </div>
        </div>
    );
}

function NavItem({ label, icon, active = false }: { label: string, icon: string, active?: boolean }) {
    return (
        <div className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group
      ${active ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' : 'hover:bg-white/5 text-white/60 hover:text-white'}
    `}>
            <span className="text-lg group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div>}
        </div>
    );
}
