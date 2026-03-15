'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const MODULES = [
  { id: 'assistant', label: 'AI Assistant', icon: '✦', color: '#6366f1', glow: 'rgba(99,102,241,0.3)' },
  { id: 'swarm', label: 'Swarm Intelligence', icon: '◈', color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)' },
  { id: 'agents', label: 'Autonomous Agents', icon: '⬡', color: '#0ea5e9', glow: 'rgba(14,165,233,0.3)' },
  { id: 'workflows', label: 'Workflows', icon: '⌬', color: '#10b981', glow: 'rgba(16,185,129,0.3)' },
  { id: 'security', label: 'Security & CCTV', icon: '◉', color: '#ef4444', glow: 'rgba(239,68,68,0.3)' },
  { id: 'twin', label: 'Digital Twin', icon: '⬢', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  { id: 'marketplace', label: 'Marketplace', icon: '⊞', color: '#ec4899', glow: 'rgba(236,72,153,0.3)' },
  { id: 'expansion', label: 'Lab Expansions', icon: '✶', color: '#a78bfa', glow: 'rgba(167,139,250,0.3)' },
  { id: 'vexelgroup', label: 'Vexel Group', icon: '🛡️', color: '#fcd34d', glow: 'rgba(252,211,77,0.3)' },
];

const METRICS = [
  { label: 'Active Agents', value: '12', change: '+3', up: true },
  { label: 'Workflows Today', value: '284', change: '+12%', up: true },
  { label: 'Instinct Alerts', value: '5', change: '-2', up: false },
  { label: 'API Calls (1h)', value: '18.4K', change: '+8%', up: true },
];

const INSTINCT_ALERTS = [
  { text: 'Logistics email delays after 4 PM correlate with Monday supply chain bottlenecks.', confidence: 88, tag: 'Supply Chain' },
  { text: 'Excavator EX-04 hydraulic pressure dropping. Probable failure within 48h.', confidence: 94, tag: 'Maintenance' },
  { text: 'Engineering team shows 18% higher burnout risk this sprint cycle.', confidence: 76, tag: 'Morale' },
];

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: "Welcome back. I'm Vexel — your enterprise AI operating system, developed by **Usama Ado Shehu** and the **Vexel Innovations** team. I have **5 active Instinct alerts**, **12 swarm agents** running, and **3 workflows** awaiting your approval.\n\nHow can I accelerate your work today?",
    time: 'Just now'
  }
];

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState('assistant');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(p => [...p, { role: 'user', text: userMsg, time: 'Just now' }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(p => [...p, {
        role: 'assistant',
        text: 'I\'m processing your request across the Vexel intelligence grid. Cross-referencing your organization data, running Instinct pattern analysis, and preparing a contextual response...',
        time: 'Just now'
      }]);
    }, 2000);
  };

  const activeModuleData = MODULES.find(m => m.id === activeModule) || MODULES[0];

  return (
    <div className="relative flex h-screen overflow-hidden" style={{ background: 'var(--vx-bg)' }}>
      {/* Background Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ─── SIDEBAR ─── */}
      <aside
        className="relative z-10 flex flex-col shrink-0 transition-all duration-300"
        style={{
          width: sidebarCollapsed ? 72 : 260,
          background: 'rgba(13,13,18,0.8)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="relative shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            <img src="/vexel-one-logo.svg" alt="Vexel One" className="w-6 h-6 object-contain" />
          </div>
          {!sidebarCollapsed && (
            <div className="animate-fade-in">
              <p className="text-white font-bold text-base leading-none">Vexel One</p>
              <p className="text-[10px] font-semibold tracking-widest mt-0.5" style={{ color: '#6366f1' }}>AI OPERATING SYSTEM</p>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(p => !p)}
            className="ml-auto p-1.5 rounded-lg transition-colors hover:bg-white/5 text-white/30 hover:text-white/70"
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Org selector */}
        {!sidebarCollapsed && (
          <div className="mx-3 mt-3 p-2.5 rounded-xl glass flex items-center gap-2.5 cursor-pointer hover:border-white/10 transition-all">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>R</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Rio T. Mining Corp</p>
              <p className="text-[10px] text-white/40">Enterprise Plan</p>
            </div>
            <span className="text-white/30 text-xs">⌄</span>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5">
          {!sidebarCollapsed && (
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Core Modules</p>
          )}
          {MODULES.map(m => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${activeModule === m.id ? 'active' : ''}`}
              style={{
                background: activeModule === m.id ? `${m.color}15` : 'transparent',
                color: activeModule === m.id ? m.color : 'rgba(255,255,255,0.5)',
              }}
              title={sidebarCollapsed ? m.label : undefined}
            >
              <span className="text-lg shrink-0" style={{ filter: activeModule === m.id ? `drop-shadow(0 0 6px ${m.color})` : 'none' }}>
                {m.icon}
              </span>
              {!sidebarCollapsed && <span className="text-sm font-medium">{m.label}</span>}
              {!sidebarCollapsed && activeModule === m.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>U</div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">User Account</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="status-dot live" />
                  <p className="text-[10px] text-white/40">Pro Plan · Active</p>
                </div>
              </div>
            )}
          </div>

          {/* Vexel Innovations branding */}
          {!sidebarCollapsed && (
            <div className="mt-3 pt-3 flex flex-col gap-1 px-1" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-center gap-2">
                <img src="/vexel-inno.svg" alt="Vexel Innovations" className="w-4 h-4 opacity-40 shrink-0" />
                <p className="text-[9px] text-white/30 font-bold tracking-widest uppercase">Vexel Innovations</p>
              </div>
              <p className="text-[8px] text-white/20 font-medium">Lead Developer: Usama Ado Shehu</p>
            </div>
          )}
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header
          className="shrink-0 flex items-center gap-4 px-6 h-16"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(13,13,18,0.6)', backdropFilter: 'blur(24px)' }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/30">Workspace</span>
            <span className="text-white/20">/</span>
            <span className="font-semibold" style={{ color: activeModuleData.color }}>{activeModuleData.icon} {activeModuleData.label}</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Status chips */}
          <div className="flex items-center gap-2">
            <div className="badge active"><div className="status-dot live" />12 Agents Active</div>
            <div className="badge processing">⚡ 3 Workflows</div>
            <div className="badge warning">⚡ 5 Alerts</div>
          </div>

          {/* AI Engine badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="status-dot live" />
            <span className="text-xs font-semibold" style={{ color: '#818cf8' }}>Gemini 1.5 Pro</span>
          </div>

          {/* Settings */}
          <button className="w-8 h-8 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white transition-colors">
            ⚙
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">

          {/* ─── CHAT AREA ─── */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Vexel Instinct Bar */}
            <div className="shrink-0 px-6 py-3 flex items-center gap-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(239,68,68,0.04)' }}>
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" style={{ boxShadow: '0 0 8px #ef4444' }} />
                <span className="text-[11px] font-bold tracking-widest text-red-400 uppercase">Vexel Instinct</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm text-white/70 truncate">
                  <span className="font-semibold text-red-300">{INSTINCT_ALERTS[0].confidence}% confidence: </span>
                  {INSTINCT_ALERTS[0].text}
                </p>
              </div>
              <button className="shrink-0 text-xs text-white/40 hover:text-white transition-colors mono">Run simulation →</button>
            </div>

            {/* Messages or Brand Bio */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeModule === 'vexelgroup' ? (
                <div className="animate-fade-up max-w-3xl mx-auto py-8">
                  <div className="text-center mb-12">
                    <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center p-1"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.3)' }}>
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                        <span className="text-4xl font-black text-white">UA</span>
                      </div>
                    </div>
                    <h2 className="text-4xl font-black gradient-text mb-2">Usama Ado Shehu</h2>
                    <p className="text-indigo-400 font-bold tracking-widest text-xs uppercase">Founder & Visionary Architect</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="glass p-6 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="text-6xl font-black">V</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-indigo-400 text-xl">🛡️</span> About Vexel Group
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Vexel Group is a multi-domain innovation ecosystem dedicated to creating impactful solutions across technology, creative design, and sustainable agriculture.
                      </p>
                    </div>

                    <div className="glass p-6 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="text-6xl font-black">V</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-indigo-400 text-xl">🦅</span> Visionary Leadership
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Usama combines technical expertise in Physics and Networking with a certificate in Positive Peace to build ventures that empower communities.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-indigo-500 pl-4 uppercase tracking-widest text-xs">Our Ventures</h3>
                      <div className="space-y-4">
                        {[
                          { title: 'Vexel Innovations', desc: 'AI, ML, Cybersecurity, and Software solutions powering the modern enterprise.', icon: '⚡' },
                          { title: 'Vexel Visions', desc: 'High-impact creative design and branding experiences for the future.', icon: '🎨' },
                          { title: 'Kido Farms', desc: 'Sustainable agriculture integrating modern farming with advanced tech.', icon: '🥬' },
                          { title: 'Vexel One', desc: 'Flagship multi-domain AI platform for offices, farms, and industrial sites.', icon: '🌌' },
                        ].map(v => (
                          <div key={v.title} className="glass p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-all cursor-default">
                            <div className="text-2xl">{v.icon}</div>
                            <div>
                              <p className="text-sm font-bold text-white">{v.title}</p>
                              <p className="text-xs text-white/40 mt-1">{v.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass p-8 rounded-2xl border-indigo-500/20 bg-indigo-500/5">
                      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest text-xs">Core Mission</h3>
                      <p className="text-base text-white/80 leading-relaxed font-medium italic">
                        "To empower individuals, businesses, and communities through an integrated ecosystem of technology, creativity, and sustainable practices, driving innovation and social impact."
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-4 animate-fade-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      style={{ animationDelay: `${i * 0.05}s` }}>
                      {msg.role === 'assistant' && (
                        <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 16px rgba(99,102,241,0.35)' }}>
                          <span className="text-sm">✦</span>
                        </div>
                      )}
                      <div className={`chat-bubble ${msg.role}`}>
                        <p className="text-sm leading-relaxed text-white/85" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                        <p className="text-[10px] text-white/25 mt-2 mono">{msg.time}</p>
                      </div>
                      {msg.role === 'user' && (
                        <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>U</div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {isTyping && (
                <div className="flex gap-4 animate-fade-in">
                  <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 16px rgba(99,102,241,0.35)' }}>
                    <span className="text-sm">✦</span>
                  </div>
                  <div className="chat-bubble assistant flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                        style={{ animation: `typing 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick suggestions */}
            <div className="shrink-0 px-6 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['Deploy Swarm AI on this task', 'Run Digital Twin simulation', 'Check Morale Heatmap', 'View Security Events'].map(s => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:text-indigo-300 text-white/50"
                    style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="shrink-0 p-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex gap-3 p-2 rounded-2xl transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                onFocus={() => { }} >
                <button className="self-end p-2.5 rounded-xl text-white/30 hover:text-white transition-colors hover:bg-white/5">
                  📎
                </button>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Message Vexel One..."
                  rows={1}
                  className="flex-1 bg-transparent text-white text-sm resize-none outline-none py-2.5 placeholder-white/20"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="self-end btn-primary disabled:opacity-30 disabled:transform-none"
                  style={{ padding: '10px 16px' }}>
                  ↑
                </button>
              </div>
              <p className="text-center text-[10px] text-white/20 mt-2 mono">
                Powered by Gemini 1.5 Pro · GPT-4o · Vexel Quantum-1 Engine
              </p>
            </div>
          </div>

          {/* ─── RIGHT PANEL ─── */}
          <div
            className="shrink-0 flex flex-col overflow-y-auto"
            style={{ width: 300, borderLeft: '1px solid rgba(255,255,255,0.05)', background: 'rgba(13,13,18,0.5)' }}>

            {/* Metrics */}
            <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">Live Metrics</p>
              <div className="grid grid-cols-2 gap-2">
                {METRICS.map(m => (
                  <div key={m.label} className="metric-card glass rounded-xl p-3 cursor-default">
                    <p className="text-[10px] text-white/40 font-medium">{m.label}</p>
                    <p className="text-xl font-bold text-white mt-1">{m.value}</p>
                    <p className={`text-[10px] font-semibold mt-0.5 ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>{m.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instinct Alerts */}
            <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Instinct Alerts</p>
                <span className="badge warning">{INSTINCT_ALERTS.length} new</span>
              </div>
              <div className="space-y-2">
                {INSTINCT_ALERTS.map((a, i) => (
                  <div key={i} className="glass glass-hover rounded-xl p-3 cursor-pointer">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">{a.tag}</span>
                      <span className="mono text-[10px] text-white/30">{a.confidence}%</span>
                    </div>
                    <p className="text-xs text-white/65 leading-relaxed">{a.text}</p>
                    <div className="progress-bar mt-2">
                      <div className="progress-fill" style={{ width: `${a.confidence}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Agents */}
            <div className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">Active Swarm Agents</p>
              <div className="space-y-2">
                {[
                  { name: 'Researcher Alpha', task: 'Analyzing Q3 market data...', color: '#6366f1' },
                  { name: 'Writer Beta', task: 'Drafting supply report...', color: '#8b5cf6' },
                  { name: 'CV Observer', task: 'Monitoring Cam 4 Zone C...', color: '#ef4444' },
                ].map((agent, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl glass">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: `${agent.color}25`, color: agent.color }}>
                      {agent.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{agent.name}</p>
                      <p className="text-[10px] text-white/40 truncate">{agent.task}</p>
                    </div>
                    <div className="status-dot live shrink-0" style={{ background: agent.color, boxShadow: `0 0 6px ${agent.color}` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
