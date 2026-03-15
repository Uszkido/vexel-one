import React from 'react';

export default function IndustrialDashboard() {
    return (
        <div className="flex h-screen bg-[#0a0a0b] text-white font-sans selection:bg-amber-500/30">
            {/* Sidebar - Configured for Industry/Mining Context */}
            <aside className="w-72 bg-[#121214] border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5 bg-gradient-to-br from-amber-500/10 to-transparent">
                    <div className="flex items-center gap-3">
                        <img src="/vexel.svg" alt="Vexel One Logo" className="w-8 h-8" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Vexel Site</h1>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-amber-400 mt-1 font-semibold">Industrial Operations</p>
                    <div className="mt-4 px-2 py-1 rounded border border-white/10 text-xs text-white/50 w-fit">
                        Tenant: Rio T. Mining Corp
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <div className="px-3 py-2 text-[11px] uppercase tracking-widest text-white/30 font-bold">IoT & Safety</div>
                    <NavItem active label="Site Overview" icon="🏭" />
                    <NavItem label="Worker Safety (CV)" icon="🦺" />
                    <NavItem label="Equipment Telemetry" icon="🚜" />

                    <div className="pt-6 px-3 py-2 text-[11px] uppercase tracking-widest text-white/30 font-bold">Logistics</div>
                    <NavItem label="Fleet Tracking" icon="🚚" />
                    <NavItem label="Supply Chain" icon="📦" />

                    <div className="pt-6 px-3 py-2 text-[11px] uppercase tracking-widest text-white/30 font-bold">Vexel AI</div>
                    <NavItem label="Predictive Maintenance" icon="⚙️" />
                    <NavItem label="Shift Reports Generator" icon="📋" />
                </nav>
            </aside>

            {/* Main Hub */}
            <main className="flex-1 flex flex-col bg-[#050505]">
                <header className="h-16 px-8 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-10">
                    <div className="text-sm font-medium flex items-center gap-3">
                        <span className="text-white/60">Site Alpha /</span>
                        <span className="text-white">Active Monitoring</span>
                        <div className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-[10px] uppercase font-bold tracking-wider border border-amber-500/30">
                            Live IoT Feed
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 font-medium tooltip" title="Air Quality Index">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            AQI: Safe (42)
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid Space */}
                <section className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-bold">Heavy Machinery Status</h2>
                        <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">Ask AI Analyst →</button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <MachineLog
                            name="Excavator EX-04"
                            metric="Hydraulic Pressure Drop"
                            aiAnalysis="Anomaly detected. High risk of failure in 48h. Recommend ordering Part #409X."
                            status="Warning"
                        />
                        <MachineLog
                            name="Conveyor System B"
                            metric="Motor Temp: 42°C"
                            aiAnalysis="Running within expected parameters. Next scheduled maintenance in 12 days."
                            status="Optimal"
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 space-y-4">
                            <h3 className="text-lg font-bold">Worker Safety (CV Analysis)</h3>
                            <div className="rounded-xl border border-white/5 bg-[#121214] p-6 h-64 flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                {/* Mock UI for bounding boxes - CV View */}
                                <div className="w-full h-full border border-dashed border-white/10 relative">
                                    <div className="absolute top-1/2 left-1/4 w-32 h-48 border-2 border-emerald-500 bg-emerald-500/10 -translate-y-1/2 rounded">
                                        <span className="absolute -top-6 left-0 text-xs font-mono text-emerald-400 bg-black/60 px-1">Helmet: Yes (0.98)</span>
                                    </div>
                                    <div className="absolute top-1/2 right-1/4 w-32 h-48 border-2 border-rose-500 bg-rose-500/10 -translate-y-1/2 rounded animate-pulse">
                                        <span className="absolute -top-6 left-0 text-xs font-mono text-rose-400 bg-black/60 px-1">Helmet: NO (0.92)</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between z-20">
                                    <span className="text-sm font-bold shadow-black drop-shadow-md">Cam 4 - Zone C</span>
                                    <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2 rounded border border-rose-500/30">Safety Violation Logged</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">Vexel Intelligence</h3>
                            <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 h-64">
                                <p className="text-xs text-indigo-400 uppercase tracking-widest font-bold mb-3">Daily Operations Report</p>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    Based on yesterday's throughput and current weather predictions, estimated extraction yield will decrease by 4% today due to rain.
                                </p>
                                <br />
                                <p className="text-sm text-white/80 leading-relaxed">
                                    Automated workflow triggered: Rerouting transport trucks to paved Zone B.
                                </p>
                                <button className="mt-4 w-full py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg text-sm font-bold transition-colors">
                                    View Full Report
                                </button>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
        </div>
    );
}

function MachineLog({ name, metric, aiAnalysis, status }: { name: string, metric: string, aiAnalysis: string, status: string }) {
    const isWarning = status === 'Warning';
    return (
        <div className={`p-5 rounded-xl border ${isWarning ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/5 border-white/5'}`}>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="font-bold text-base">{name}</h4>
                    <p className="text-xs text-white/50 font-mono mt-1">{metric}</p>
                </div>
                <div className={`px-2 py-1 text-[10px] font-bold uppercase rounded border ${isWarning ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'}`}>
                    {status}
                </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mt-2 p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="text-indigo-400 font-bold">AI Note: </span>{aiAnalysis}
            </p>
        </div>
    );
}

function NavItem({ label, icon, active = false }: { label: string, icon: string, active?: boolean }) {
    return (
        <div className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group
      ${active ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500' : 'hover:bg-white/5 text-white/60 hover:text-white'}
    `}>
            <span className="text-lg group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>}
        </div>
    );
}
