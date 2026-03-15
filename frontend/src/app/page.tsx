'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import SecurityModule from './components/SecurityModule';
import FarmsModule from './components/FarmsModule';

const FormattedText = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span style={{ whiteSpace: 'pre-wrap' }}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-indigo-400 font-bold drop-shadow-[0_0_8px_rgba(129,140,248,0.2)]">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </span>
  );
};

const TRANSLATIONS = {
  en: {
    welcome: "Welcome back. I'm Vexel — your enterprise AI operating system, developed by **Usama Ado Shehu** and the **Vexel Innovations** team. I have **5 active Instinct alerts**, **12 swarm agents** running, and **3 workflows** awaiting your approval.\n\nHow can I accelerate your work today?",
    ai_operating_system: "AI OPERATING SYSTEM",
    core_modules: "Core Modules",
    live_metrics: "Live Metrics",
    instinct_alerts: "Instinct Alerts",
    active_swarm: "Active Swarm Agents",
    powered_by: "Powered by Gemini 1.5 Pro · GPT-4o · Vexel Quantum-1 Engine",
    message_placeholder: "Message Vexel One...",
    run_simulation: "Run simulation",
    about_founder: "Founder & Visionary Architect",
    our_ventures: "Our Ventures",
    core_mission: "Core Mission",
    mission_statement: "\"To empower individuals, businesses, and communities through an integrated ecosystem of technology, creativity, and sustainable practices, driving innovation and social impact.\"",
    lead_dev: "Lead Developer",
    modules: {
      assistant: "AI Assistant",
      swarm: "Swarm Intelligence",
      agents: "Autonomous Agents",
      workflows: "Workflows",
      security: "Security & CCTV",
      twin: "Digital Twin",
      marketplace: "Marketplace",
      expansion: "Lab Expansions",
      farms: "Kido Farms",
      vexelgroup: "Vexel Group"
    },
    metrics: {
      agents: "Active Agents",
      workflows: "Workflows Today",
      alerts: "Instinct Alerts",
      api: "API Calls (1h)"
    }
  },
  ha: {
    welcome: "Barka da dawowa. Ni ne Vexel — tsarin ayyukan AI na masana'antu, wanda **Usama Ado Shehu** da ƙungiyar **Vexel Innovations** suka ƙera. Ina da **sanarwar Instinct guda 5**, **wakilan swarm guda 12** suna aiki, da **hanyoyin aiki guda 3** suna jiran amincewarka.\n\nYaya zan iya hanzarta aikinka a yau?",
    ai_operating_system: "TSARIN AI NA AIKI",
    core_modules: "Sassan Aiki",
    live_metrics: "Ma'aunin Aiki",
    instinct_alerts: "Sanarwar Gaggawa",
    active_swarm: "Wakilan Swarm Masu Aiki",
    powered_by: "An samar da shi ta Gemini 1.5 Pro · GPT-4o · Vexel Quantum-1 Engine",
    message_placeholder: "Aika sako zuwa Vexel One...",
    run_simulation: "Gudanar da gwaji",
    about_founder: "Wanda Ya Kafa & Visionary Architect",
    our_ventures: "Sassanmu",
    core_mission: "Babban Burinmu",
    mission_statement: "\"Domin ƙarfafa daidaikun mutane, kasuwanci, da al'ummomi ta hanyar haɗe-haɗen tsarin fasaha, ƙirƙira, da ayyuka masu dorewa, tare da haifar da sabbin abubuwa da tasirin zamantakewa.\"",
    lead_dev: "Jagoran Masu Haɓakawa",
    modules: {
      assistant: "Mataimakin AI",
      swarm: "Basirar Jama'a",
      agents: "Wakilai Masu Zaman Kansu",
      workflows: "Hanyoyin Aiki",
      security: "Tsaro da Kamara",
      twin: "Tagwayen Na'ura",
      marketplace: "Kasuwa",
      expansion: "Fadada Lab",
      farms: "Kido Farms",
      vexelgroup: "Vexel Group"
    },
    metrics: {
      agents: "Wakilai Masu Aiki",
      workflows: "Ayyukan Yau",
      alerts: "Sanarwar Gaggawa",
      api: "API Calls (1h)"
    }
  }
};

const MODULES = [
  { id: 'assistant', label: 'assistant', icon: '✦', color: '#818cf8', glow: 'rgba(129,140,248,0.3)' },
  { id: 'swarm', label: 'swarm', icon: '◈', color: '#a78bfa', glow: 'rgba(167,139,250,0.3)' },
  { id: 'agents', label: 'agents', icon: '⬡', color: '#38bdf8', glow: 'rgba(56,189,248,0.3)' },
  { id: 'workflows', label: 'workflows', icon: '⌬', color: '#34d399', glow: 'rgba(52,211,153,0.3)' },
  { id: 'security', label: 'security', icon: '⊙', color: '#fb7185', glow: 'rgba(251,113,133,0.3)' },
  { id: 'twin', label: 'twin', icon: '⬢', color: '#fbbf24', glow: 'rgba(251,191,36,0.3)' },
  { id: 'marketplace', label: 'marketplace', icon: '⊞', color: '#f472b6', glow: 'rgba(244,114,182,0.3)' },
  { id: 'expansion', label: 'expansion', icon: '✧', color: '#c084fc', glow: 'rgba(192,132,252,0.3)' },
  { id: 'farms', label: 'farms', icon: '🥬', color: '#10b981', glow: 'rgba(16,185,129,0.3)' },
  { id: 'vexelgroup', label: 'vexelgroup', icon: '🛡️', color: '#fbbf24', glow: 'rgba(251,191,36,0.3)' },
];

const METRICS = [
  { id: 'agents', value: '12', change: '+3', up: true },
  { id: 'workflows', value: '284', change: '+12%', up: true },
  { id: 'alerts', value: '5', change: '-2', up: false },
  { id: 'api', value: '18.4K', change: '+8%', up: true },
];

const INSTINCT_ALERTS = [
  { text: 'Logistics email delays after 4 PM correlate with Monday supply chain bottlenecks.', confidence: 88, tag: 'Supply Chain' },
  { text: 'Excavator EX-04 hydraulic pressure dropping. Probable failure within 48h.', confidence: 94, tag: 'Maintenance' },
  { text: 'Engineering team shows 18% higher burnout risk this sprint cycle.', confidence: 76, tag: 'Morale' },
];

export default function Dashboard() {
  const [lang, setLang] = useState<'en' | 'ha'>('en');
  const t = TRANSLATIONS[lang];
  const [activeModule, setActiveModule] = useState('assistant');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: t.welcome,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh welcome message if language changes and it's the first message
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{
        role: 'assistant',
        text: t.welcome,
        time: 'Just now'
      }]);
    }
  }, [lang]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(p => [...p, { role: 'user', text: userMsg, time: 'Just now' }]);
    setIsTyping(true);

    try {
      // In production we would use process.env.NEXT_PUBLIC_API_URL
      const response = await fetch('https://vexel-one-api.vercel.app/api/v1/ai/chat' || 'http://localhost:5000/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, lang })
      });
      const data = await response.json();
      setMessages(p => [...p, data]);
    } catch (error) {
      console.error("AI Grid Error:", error);
      setMessages(p => [...p, {
        role: 'assistant',
        text: lang === 'en'
          ? "I'm having trouble connecting to the Vexel Quantum Engine. Please check your connectivity."
          : "Ina samun matsala wajen haɗawa da Injin Vexel Quantum. Da fatan za a duba haɗin yanar gizo na ku.",
        time: 'System Error'
      }]);
    } finally {
      setIsTyping(false);
    }
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
              <p className="text-[10px] font-semibold tracking-widest mt-0.5" style={{ color: '#6366f1' }}>{t.ai_operating_system}</p>
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
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">{t.core_modules}</p>
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
              {!sidebarCollapsed && <span className="text-sm font-medium">{t.modules[m.id as keyof typeof t.modules]}</span>}
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
            <div className="mt-4 pt-4 px-1" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-center gap-2 mb-1">
                <img src="/vexel-inno.svg" alt="Vexel Innovations" className="w-3.5 h-3.5 opacity-50 shrink-0" />
                <p className="text-[9px] text-white/40 font-bold tracking-[0.2em] uppercase">Vexel Innovations</p>
              </div>
              <p className="text-[8px] text-white/20 font-medium tracking-tight px-5">{t.lead_dev}: Usama Ado Shehu</p>
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
            <span className="font-semibold" style={{ color: activeModuleData.color }}>{activeModuleData.icon} {t.modules[activeModuleData.id as keyof typeof t.modules]}</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Status chips */}
          <div className="flex items-center gap-2">
            <div className="badge active"><div className="status-dot live" />{activeModule === 'vexelgroup' ? 'Established' : '12 Agents Active'}</div>
            <div className="badge processing">⚡ {activeModule === 'vexelgroup' ? '4 Ventures' : '3 Workflows'}</div>
            <div className="badge warning">⚡ 5 {t.instinct_alerts}</div>
          </div>

          {/* AI Engine badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl mr-2"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="status-dot live" />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#818cf8' }}>{lang}</span>
          </div>

          <button
            onClick={() => setLang(l => l === 'en' ? 'ha' : 'en')}
            className="px-3 py-1.5 rounded-xl glass text-xs font-bold hover:bg-white/10 transition-all border border-white/10"
          >
            {lang === 'en' ? 'HAUSA' : 'ENGLISH'}
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">

          {/* ─── CHAT AREA ─── */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Vexel Instinct Bar */}
            <div className="shrink-0 px-6 py-2.5 flex items-center gap-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', background: 'linear-gradient(90deg, rgba(239,68,68,0.07), transparent)' }}>
              <div className="flex items-center gap-2 shrink-0 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" style={{ boxShadow: '0 0 6px #ef4444' }} />
                <span className="text-[9px] font-black tracking-widest text-red-500 uppercase">Instinct</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm text-white/70 truncate">
                  <span className="font-semibold text-red-300">{INSTINCT_ALERTS[0].confidence}% confidence: </span>
                  {INSTINCT_ALERTS[0].text}
                </p>
              </div>
              <button className="shrink-0 text-xs text-white/40 hover:text-white transition-colors mono">{t.run_simulation} →</button>
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
                    <p className="text-indigo-400 font-bold tracking-widest text-xs uppercase">{t.about_founder}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="glass p-6 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="text-6xl font-black">V</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-indigo-400 text-xl">🛡️</span> {lang === 'en' ? 'About Vexel Group' : 'Game da Rukunin Vexel'}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {lang === 'en'
                          ? 'Vexel Group is a multi-domain innovation ecosystem dedicated to creating impactful solutions across technology, creative design, and sustainable agriculture.'
                          : 'Rukunin Vexel tsarin ƙirƙira ne na sassa daban-daban wanda aka sadaukar domin samar da tasiri a fannonin fasaha, zane, da noma mai dorewa.'}
                      </p>
                    </div>

                    <div className="glass p-6 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="text-6xl font-black">V</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-indigo-400 text-xl">🦅</span> {lang === 'en' ? 'Visionary Leadership' : 'Jagora mai Hange'}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {lang === 'en'
                          ? 'Usama combines technical expertise in Physics and Networking with a certificate in Positive Peace to build ventures that empower communities.'
                          : 'Usama ya haɗa gwanintar fasaha a fannin Physics da Networking tare da takardar shaidar Positive Peace don gina sassan da ke ƙarfafa al\'umma.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-indigo-500 pl-4 uppercase tracking-widest text-xs">{t.our_ventures}</h3>
                      <div className="space-y-4">
                        {[
                          { title: lang === 'en' ? 'Vexel Innovations' : 'Vexel Innovations', desc: lang === 'en' ? 'AI, ML, Cybersecurity, and Software solutions powering the modern enterprise.' : 'AI, ML, Cybersecurity, da hanyoyin software masu ƙarfafa kasuwancin zamani.', icon: '⚡' },
                          { title: lang === 'en' ? 'Vexel Visions' : 'Vexel Visions', desc: lang === 'en' ? 'High-impact creative design and branding experiences for the future.' : 'Zane-zane masu tasiri da gina alama domin nan gaba.', icon: '🎨' },
                          { title: lang === 'en' ? 'Kido Farms' : 'Kido Farms', desc: lang === 'en' ? 'Sustainable agriculture integrating modern farming with advanced tech.' : 'Noma mai dorewa da ya haɗa fasahar zamani da dabarun ci gaba.', icon: '🥬' },
                          { title: lang === 'en' ? 'Vexel One' : 'Vexel One', desc: lang === 'en' ? 'Flagship multi-domain AI platform for offices, farms, and industrial sites.' : 'Babban dandali na AI don ofisoshi, gonaki, da masana\'antu.', icon: '🌌' },
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
                      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest text-xs">{t.core_mission}</h3>
                      <p className="text-base text-white/80 leading-relaxed font-medium italic">
                        {t.mission_statement}
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeModule === 'security' ? (
                <SecurityModule lang={lang} />
              ) : activeModule === 'farms' ? (
                <FarmsModule lang={lang} />
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
                      <div className={`chat-bubble ${msg.role} p-4 rounded-2xl`}>
                        <p className="text-[13px] leading-relaxed text-white/90">
                          <FormattedText text={msg.text} />
                        </p>
                        <p className="text-[9px] text-white/20 mt-2.5 font-mono tracking-tighter uppercase">{msg.time}</p>
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
                {(lang === 'en'
                  ? ['Deploy Swarm AI', 'Run Digital Twin', 'Check Morale Heatmap', 'Security Events']
                  : ['Tura Swarm AI', 'Gudanar da Digital Twin', 'Duba Yanayin Ma\'aikata', 'Abubuwan Tsaro']
                ).map(s => (
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
                  placeholder={t.message_placeholder}
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
                {t.powered_by}
              </p>
            </div>
          </div>

          {/* ─── RIGHT PANEL ─── */}
          <div
            className="shrink-0 flex flex-col overflow-y-auto"
            style={{ width: 300, borderLeft: '1px solid rgba(255,255,255,0.05)', background: 'rgba(13,13,18,0.5)' }}>

            {/* Metrics */}
            <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">{t.live_metrics}</p>
              <div className="grid grid-cols-2 gap-2">
                {METRICS.map(m => (
                  <div key={m.id} className="metric-card glass rounded-xl p-3 cursor-default">
                    <p className="text-[10px] text-white/40 font-medium">{t.metrics[m.id as keyof typeof t.metrics]}</p>
                    <p className="text-xl font-bold text-white mt-1">{m.value}</p>
                    <p className={`text-[10px] font-semibold mt-0.5 ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>{m.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instinct Alerts */}
            <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{t.instinct_alerts}</p>
                <span className="badge warning">{INSTINCT_ALERTS.length} {lang === 'en' ? 'new' : 'sabo'}</span>
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
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">{t.active_swarm}</p>
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
