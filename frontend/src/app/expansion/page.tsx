import React from 'react';

export default function ExpansionHub() {
    const features = [
        { name: "Neural Voice Cloning", desc: "Allows Swarms to synthesize voice notes and join external meetings as proxies.", status: "LIVE", icon: "🎙️" },
        { name: "Blockchain Audit Trails", desc: "Hashes all autonomous agent actions securely onto a private corporate ledger.", status: "SYNCED", icon: "⛓️" },
        { name: "Local On-Device Models", desc: "Forces Llama-3 8B to run completely local for zero-trust environments.", status: "OFFLINE", icon: "📱" },
        { name: "Predictive Vexel UI", desc: "Generates custom dashboards from pure natural language via code injection.", status: "LIVE", icon: "🎨" },
        { name: "B2B AI Negotiation", desc: "Allows your agent swarms to negotiate deals and map logistics with external vendors.", status: "WAITING", icon: "🤝" },
        { name: "Morale & Sentiment Map", desc: "Visualizes burnout risks across structural departments via internal chat logs.", status: "LIVE", icon: "🚦" },
        { name: "Zero-Click Onboarding", desc: "Dynamically maps out 24/7 personalized tutors and provisions credentials for new hires.", status: "LIVE", icon: "🚀" },
        { name: "Code Self-Optimization", desc: "Continuously refactors Git repos, applying memory patches while engineers sleep.", status: "LIVE", icon: "💻" },
        { name: "Robotics Command", desc: "Integrates ROS. Routes physical drones or warehouse arms natively via high-level objective prompts.", status: "OFFLINE", icon: "🤖" },
        { name: "Spatial AR Overlays", desc: "Creates Apple Vision Pro spatial telemetry overlays tracking physical machinery.", status: "SYNCED", icon: "👓" },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0b] text-white font-sans selection:bg-purple-500/30">

            {/* Sidebar */}
            <aside className="w-72 bg-[#121214] border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5 bg-gradient-to-br from-purple-500/10 to-transparent">
                    <div className="flex items-center gap-3">
                        <img src="/vexel.svg" alt="Vexel One Logo" className="w-8 h-8 filter grayscale opacity-80" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Vexel Lab</h1>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-purple-400 mt-1 font-semibold">Next-Gen Expansions</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <div className="px-3 py-2 text-[11px] uppercase tracking-widest text-white/30 font-bold">10-Point Roadmap</div>
                    <NavItem active label="Capabilities Matrix" icon="🌌" />
                    <NavItem label="Cloud Deployments" icon="☁️" />
                    <NavItem label="Cross-Platform Builds" icon="📱" />
                </nav>
            </aside>

            {/* Main Hub */}
            <main className="flex-1 flex flex-col bg-[#050505]">
                <header className="h-16 px-8 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-10">
                    <div className="text-sm font-medium flex items-center gap-3">
                        <span className="text-white/60">Module /</span>
                        <span className="text-white">Capabilities Matrix</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                            VERSION: EXP-10.0
                        </div>
                    </div>
                </header>

                <section className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-10 text-center space-y-4">
                            <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">Vexel One Expansion Matrix</h2>
                            <p className="text-lg text-white/50 max-w-2xl mx-auto">Toggle the active state of advanced future-state architectures mapped to this organization's master tenant instance.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map(f => <FeatureNode key={f.name} {...f} />)}
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}

function FeatureNode({ name, desc, status, icon }: { name: string, desc: string, status: string, icon: string }) {
    const getStatusColor = () => {
        switch (status) {
            case 'LIVE': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'SYNCED': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
            case 'WAITING': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            default: return 'text-white/40 bg-white/5 border-white/10';
        }
    }

    return (
        <div className="p-6 rounded-2xl bg-[#121214] border border-white/5 hover:bg-white/[0.02] hover:border-purple-500/30 transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <span className="text-3xl opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all">{icon}</span>
                <div className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider border ${getStatusColor()}`}>
                    {status}
                </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
            <p className="text-sm text-white/50 leading-relaxed flex-1">{desc}</p>

            <button className="mt-6 py-2.5 w-full rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium transition-colors">
                Configure Node
            </button>
        </div>
    )
}

function NavItem({ label, icon, active = false }: { label: string, icon: string, active?: boolean }) {
    return (
        <div className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group
      ${active ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400' : 'hover:bg-white/5 text-white/60 hover:text-white'}
    `}>
            <span className="text-lg group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>}
        </div>
    );
}
