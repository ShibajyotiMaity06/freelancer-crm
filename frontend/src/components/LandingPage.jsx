import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Play, Check, ChevronRight, TrendingUp, 
  LayoutDashboard, Bell, CreditCard, Clock, Github, 
  Twitter, Linkedin, Star, Zap, Users, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

const FadeIn = ({ children, delay = 0, direction = 'up', scale = false, className = '' }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction], scale: scale ? 0.9 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Floating element animation for the mockup
const FloatingElement = ({ children, delay = 0, yOffset = 15 }) => (
  <motion.div
    animate={{ y: [0, -yOffset, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

const LandingPage = () => {
  const [auth, setAuth] = useState({ token: null, userf: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("userf");

    if (token && username) {
      setAuth({ token: token, userf: JSON.parse(username) });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userf");
    setAuth({ token: null, userf: null });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden relative">
      
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Breathing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen" 
        />
      </div>

      {/* Glassmorphism Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/60 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] transition-all duration-300">
              <TrendingUp size={18} className="text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">FlowCRM</span>
          </div>
          <div className="flex items-center gap-6">
            {auth.token ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-zinc-300">
                  Hi, <span className="text-white font-semibold">{auth.userf.username}</span> 👋
                </span>
                <button 
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer px-3 py-1 rounded-lg hover:bg-zinc-800/50"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Link to="/login">Login</Link>
              </button>
            )}
            
            <button 
              className="px-5 py-2 text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-all rounded-full cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              onClick={() => {
                if (auth.token) {
                  window.location.href = '/dashboard';
                } else {
                  window.location.href = '/login';
                }
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8 cursor-pointer hover:bg-indigo-500/20 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <Sparkles size={14} className="text-indigo-400" />
              FlowCRM 2.0 is now live
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.1] mb-6 text-white">
              Stop losing <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
                freelance deals.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl font-light text-zinc-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Track leads, automate follow-ups, and forecast your revenue in one remarkably simple dashboard designed for creatives.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-full font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              Start for free <ArrowRight size={18} />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900/50 hover:bg-zinc-800 border border-white/10 text-white rounded-full font-medium transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm group">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Play size={12} className="fill-current text-white ml-0.5" /> 
              </div>
              Watch demo
            </button>
          </FadeIn>

          {/* Social Proof */}
          <FadeIn delay={0.4} className="flex items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-3">
              {[33, 12, 44, 65].map((img, i) => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${img}`} alt="user" className="w-10 h-10 rounded-full border-2 border-[#050505] shadow-lg" />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
              </div>
              <span className="text-xs text-zinc-400 font-medium mt-0.5">Trusted by 2,000+ freelancers</span>
            </div>
          </FadeIn>
        </div>

        {/* Enhanced 3D Dashboard UI Mockup */}
        <FadeIn delay={0.5} direction="left" scale className="flex-1 w-full max-w-2xl relative perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-violet-500/10 to-transparent blur-[80px] rounded-full" />
          
          <div className="relative rounded-2xl border border-white/10 bg-[#09090b]/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-visible flex flex-col h-[450px] cursor-default transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
            
            {/* Window Header */}
            <div className="h-12 border-b border-white/[0.05] flex items-center px-4 justify-between bg-white/[0.02]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex space-x-2">
                <div className="h-4 w-32 bg-white/5 rounded-full"></div>
              </div>
            </div>
            
            {/* Dashboard Content - Simplified for visual impact */}
            <div className="flex-1 p-6 bg-gradient-to-b from-white/[0.02] to-transparent relative">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-white font-medium mb-1">Revenue Pipeline</h3>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">$18,500</div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-semibold flex items-center gap-1 border border-green-500/20">
                  <TrendingUp size={12} /> +24% this month
                </div>
              </div>

              {/* Fake UI Cards */}
              <div className="space-y-3">
                {[
                  { title: "Nike Redesign", val: "$4,500", tag: "Web", color: "blue" },
                  { title: "Acme Branding", val: "$2,000", tag: "Logo", color: "purple" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4 flex justify-between items-center hover:bg-white/[0.06] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-${item.color}-500/20 flex items-center justify-center border border-${item.color}-500/30`}>
                        <Zap size={18} className={`text-${item.color}-400`} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white mb-1">{item.title}</div>
                        <div className={`text-[10px] font-semibold text-${item.color}-400 uppercase tracking-wider`}>{item.tag}</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-zinc-300">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Notification */}
            <div className="absolute -right-12 top-24 z-20 hidden md:block">
              <FloatingElement delay={0}>
                <div className="bg-zinc-900 border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4 backdrop-blur-xl">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check size={20} className="text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Invoice Paid</div>
                    <div className="text-xs text-zinc-400">Stripe Integration • $8,000</div>
                  </div>
                </div>
              </FloatingElement>
            </div>

            {/* Floating Reminder */}
            <div className="absolute -left-8 bottom-12 z-20 hidden md:block">
              <FloatingElement delay={1} yOffset={10}>
                <div className="bg-indigo-600 border border-indigo-400 p-3 rounded-xl shadow-[0_10px_30px_rgba(79,70,229,0.3)] flex items-center gap-3">
                  <Bell size={16} className="text-white" />
                  <span className="text-xs font-semibold text-white">Follow up with Sarah</span>
                </div>
              </FloatingElement>
            </div>

          </div>
        </FadeIn>
      </section>

      {/* Features Bento Grid - Enhanced */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Everything you need.<br/>
              <span className="text-zinc-500">Nothing you don't.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              FlowCRM strips away enterprise bloat, giving you a beautiful interface focused purely on closing deals and getting paid.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-6 auto-rows-[280px]">
          {/* Bento 1 */}
          <FadeIn delay={0.1} className="md:col-span-2 group relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8 overflow-hidden hover:border-indigo-500/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <LayoutDashboard className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Visual Pipeline</h3>
                <p className="text-zinc-400 text-sm max-w-md leading-relaxed">Drag and drop leads effortlessly. Always know exactly where every potential project stands at a glance.</p>
              </div>
              <div className="flex items-center text-sm text-indigo-400 font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                Explore Pipeline <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </FadeIn>

          {/* Bento 2 */}
          <FadeIn delay={0.2} className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8 overflow-hidden hover:border-green-500/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Forecasting</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">See your expected income automatically calculated based on win probabilities.</p>
            </div>
          </FadeIn>

          {/* Bento 3 */}
          <FadeIn delay={0.3} className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8 overflow-hidden hover:border-amber-500/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                <Bell className="text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Alerts</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Gentle nudges to follow up at the perfect time so no deal goes cold.</p>
            </div>
          </FadeIn>

          {/* Bento 4 */}
          <FadeIn delay={0.4} className="md:col-span-2 group relative bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8 overflow-hidden hover:border-violet-500/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 w-2/3">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <CreditCard className="text-violet-400" size={24} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Payment Tracking</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Link milestones to invoices. Ensure you never deliver final files without getting paid first.</p>
            </div>
            {/* Decorative Element */}
            <div className="absolute right-[-5%] bottom-[-20%] w-64 h-64 border-[1px] border-white/5 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-violet-500/20 transition-all duration-700">
              <div className="w-48 h-48 border-[1px] border-white/5 rounded-full group-hover:border-violet-500/30 transition-colors duration-700 delay-100" />
              <div className="absolute w-32 h-32 bg-violet-500/10 blur-[40px] rounded-full group-hover:bg-violet-500/20 transition-colors duration-700" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing - Upgraded */}
      <section className="relative z-10 py-32 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Simple, fair pricing</h2>
            <p className="text-zinc-400 text-lg">Start free. Upgrade when your business demands it.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Free Tier */}
          <FadeIn direction="up" delay={0.1} className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors flex flex-col backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white mb-2">Starter</h3>
            <p className="text-zinc-500 text-sm mb-8">For new freelancers finding their footing.</p>
            <div className="mb-8 flex items-end gap-2">
              <span className="text-6xl font-bold text-white tracking-tighter">$0</span>
              <span className="text-zinc-500 text-base font-medium mb-2">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {['Up to 10 active leads', 'Basic Kanban board', 'Standard support'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                    <Check size={12} className="text-zinc-400" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all font-semibold cursor-pointer active:scale-95">
              Start for free
            </button>
          </FadeIn>

          {/* Pro Tier (Highlighted) */}
          <FadeIn direction="up" delay={0.2} className="relative group">
            {/* Animated Glow Behind */}
            <div className="absolute -inset-[2px] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 rounded-[2.5rem] opacity-50 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
            
            <div className="bg-[#0a0a0f] p-10 rounded-[2.5rem] relative flex flex-col shadow-2xl overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px]" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-semibold text-white">Pro</h3>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    POPULAR
                  </span>
                </div>
                <p className="text-zinc-400 text-sm mb-8">For established independent earners.</p>
                <div className="mb-8 flex items-end gap-2">
                  <span className="text-6xl font-bold text-white tracking-tighter">$12</span>
                  <span className="text-zinc-500 text-base font-medium mb-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {['Unlimited active leads', 'Revenue forecasting', 'Smart reminders', 'Priority 24/7 support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white font-medium">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                        <Check size={12} className="text-indigo-400" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-semibold shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer active:scale-95 hover:scale-[1.02]">
                  Get Pro
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* High-Impact CTA */}
      <section className="relative z-10 py-40 px-6 overflow-hidden">
        {/* Background explosion */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-zinc-900/40 border border-white/10 p-16 rounded-[3rem] backdrop-blur-xl shadow-2xl">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6">
              Ready to take control?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Join the top 1% of freelancers who stopped letting deals slip through the cracks. Set up your workspace in exactly 60 seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {auth.token ? (
                 <button className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Lets Earn Together <ChevronRight size={18} />
              </button>
              ) : (
                 <button className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Create your account <ChevronRight size={18} />
              </button>
              )}
             
            </div>
            <p className="text-zinc-500 text-sm mt-6">No credit card required. 14-day free trial on Pro.</p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 pt-16 pb-8 px-6 bg-[#030303]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer group">
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors duration-300">
              <TrendingUp size={18} className="text-zinc-400 group-hover:text-indigo-400" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">FlowCRM</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-zinc-500">
            {['About', 'Blog', 'Careers', 'Privacy', 'Terms'].map(link => (
              <a key={link} href="#" className="hover:text-white transition-colors cursor-pointer">{link}</a>
            ))}
          </div>

          <div className="flex items-center gap-5 text-zinc-500">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all cursor-pointer"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all cursor-pointer"><Github size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all cursor-pointer"><Linkedin size={18} /></a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-zinc-700 text-xs mt-12 font-medium">
          © {new Date().getFullYear()} FlowCRM Inc. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;