import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Check, 
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  Bell,
  CreditCard,
  Clock,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

// Refined FadeIn Animation
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-50 font-sans selection:bg-white/20 selection:text-white overflow-hidden relative">
      
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-start">
        <div className="w-[800px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full mt-[-200px]" />
      </div>

      {/* Seamless Sticky Navigation */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-[#030303]/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="text-lg font-medium tracking-tight text-zinc-100">FlowCRM</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden sm:block text-sm font-normal text-zinc-400 hover:text-white transition-colors cursor-pointer">
              Login
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-all rounded-full cursor-pointer hover:scale-105 active:scale-95">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 text-xs font-medium mb-8 cursor-pointer hover:bg-white/[0.06] transition-colors">
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              The CRM built for independent earners
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-medium tracking-tighter leading-[1.05] mb-6 text-zinc-100">
              Stop losing <br className="hidden lg:block" />
              <span className="text-zinc-500">freelance deals.</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-lg font-light text-zinc-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Track leads, automate follow-ups, and forecast your revenue in one remarkably simple dashboard designed for creatives.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-black rounded-full font-medium transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
              Start for free <ArrowRight size={16} />
            </button>
            <button className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-white/[0.03] border border-zinc-800 text-zinc-300 rounded-full font-medium transition-all flex items-center justify-center gap-2 cursor-pointer">
              <Play size={16} className="fill-current text-zinc-400" /> Watch demo
            </button>
          </FadeIn>
        </div>

        {/* Realistic Dashboard UI Mockup */}
        <FadeIn delay={0.4} direction="left" className="flex-1 w-full max-w-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent blur-[60px] rounded-full" />
          
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#09090b]/90 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col h-[420px] cursor-default">
            {/* Window Header */}
            <div className="h-12 border-b border-white/[0.05] flex items-center px-4 justify-between bg-white/[0.01]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </div>
              <div className="text-xs font-medium text-zinc-500 flex items-center gap-4">
                <span>Pipeline</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">Target: $10k</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=33" alt="user" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="flex-1 p-5 flex gap-4 overflow-hidden bg-[#09090b]">
              
              {/* Column 1 */}
              <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-zinc-400">Inbound (2)</span>
                  <span className="text-[10px] text-zinc-600">$6,500</span>
                </div>
                
                {/* Real Card 1 */}
                <div className="bg-[#121214] rounded-xl border border-white/[0.05] p-3 flex flex-col gap-3 hover:border-white/[0.1] transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-zinc-200">Nike Redesign</span>
                    <span className="text-xs font-medium text-zinc-400">$4,500</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] rounded font-medium">Web Design</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-zinc-500">
                    <Clock size={10} /> Follow up today
                  </div>
                </div>

                {/* Real Card 2 */}
                <div className="bg-[#121214] rounded-xl border border-white/[0.05] p-3 flex flex-col gap-3 hover:border-white/[0.1] transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-zinc-200">Acme Branding</span>
                    <span className="text-xs font-medium text-zinc-400">$2,000</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 text-[9px] rounded font-medium">Logo</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-zinc-600">
                    Received 2d ago
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-zinc-400">Proposal Sent (1)</span>
                  <span className="text-[10px] text-zinc-600">$8,000</span>
                </div>
                
                {/* Real Card 3 */}
                <div className="bg-[#121214] rounded-xl border border-indigo-500/20 p-3 flex flex-col gap-3 relative overflow-hidden cursor-pointer hover:border-indigo-500/40 transition-colors">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-indigo-500" />
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-zinc-200">Stripe Integration</span>
                    <span className="text-xs font-medium text-zinc-400">$8,000</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 text-[9px] rounded font-medium">Development</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Awaiting signature
                  </div>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>
      </section>

      {/* Problem Section (Minimal Grid) */}
      <section className="relative z-10 py-24 border-y border-white/[0.04] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-16">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-100 mb-3">You're a creative, not an admin.</h2>
            <p className="text-zinc-500 font-light text-lg">Spreadsheets kill momentum. Stop dealing with:</p>
          </FadeIn>
          
          <div className="grid md:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.04] rounded-2xl overflow-hidden">
            {[
              { title: "Lost Follow-ups", desc: "Leads go cold because you missed an email." },
              { title: "Messy Spreadsheets", desc: "Scrolling rows trying to find project statuses." },
              { title: "Missing Payments", desc: "Delivering work but forgetting the invoice." },
              { title: "Zero Predictability", desc: "Never knowing your revenue next month." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-[#030303] p-8 hover:bg-white/[0.02] transition-colors cursor-default">
                <h3 className="text-base font-medium text-zinc-200 mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-100 mb-4">Everything you need. <br/>Nothing you don't.</h2>
            <p className="text-zinc-400 font-light text-lg leading-relaxed">FlowCRM strips away enterprise bloat, giving you an elegant interface focused purely on closing deals and getting paid.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-4 auto-rows-[250px]">
          {/* Bento Item 1 */}
          <FadeIn delay={0.1} className="md:col-span-2 bg-[#09090b] rounded-3xl border border-white/[0.06] p-8 flex flex-col justify-between hover:border-white/[0.12] transition-colors cursor-pointer group">
            <div>
              <LayoutDashboard className="text-zinc-400 mb-4 group-hover:text-indigo-400 transition-colors" size={24} />
              <h3 className="text-xl font-medium text-zinc-100 mb-2">Visual Kanban Pipeline</h3>
              <p className="text-zinc-500 text-sm font-light max-w-md">Drag and drop leads effortlessly. Always know exactly where every potential project stands at a glance.</p>
            </div>
            <div className="mt-6 h-12 w-full border-t border-white/[0.05] flex items-center text-xs text-zinc-600 font-medium">
              Explore Pipeline <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </FadeIn>

          {/* Bento Item 2 */}
          <FadeIn delay={0.2} className="bg-[#09090b] rounded-3xl border border-white/[0.06] p-8 flex flex-col justify-between hover:border-white/[0.12] transition-colors cursor-pointer group">
            <div>
              <TrendingUp className="text-zinc-400 mb-4 group-hover:text-green-400 transition-colors" size={24} />
              <h3 className="text-xl font-medium text-zinc-100 mb-2">Revenue Forecasting</h3>
              <p className="text-zinc-500 text-sm font-light">See your expected income automatically calculated.</p>
            </div>
          </FadeIn>

          {/* Bento Item 3 */}
          <FadeIn delay={0.3} className="bg-[#09090b] rounded-3xl border border-white/[0.06] p-8 flex flex-col justify-between hover:border-white/[0.12] transition-colors cursor-pointer group">
            <div>
              <Bell className="text-zinc-400 mb-4 group-hover:text-blue-400 transition-colors" size={24} />
              <h3 className="text-xl font-medium text-zinc-100 mb-2">Smart Reminders</h3>
              <p className="text-zinc-500 text-sm font-light">Gentle nudges to follow up at the perfect time.</p>
            </div>
          </FadeIn>

          {/* Bento Item 4 */}
          <FadeIn delay={0.4} className="md:col-span-2 bg-[#09090b] rounded-3xl border border-white/[0.06] p-8 flex flex-col justify-between hover:border-white/[0.12] transition-colors cursor-pointer group overflow-hidden relative">
            <div className="relative z-10">
              <CreditCard className="text-zinc-400 mb-4 group-hover:text-indigo-400 transition-colors" size={24} />
              <h3 className="text-xl font-medium text-zinc-100 mb-2">Payment Tracking</h3>
              <p className="text-zinc-500 text-sm font-light max-w-md">Link milestones to invoices. Ensure you never deliver final files without getting paid first.</p>
            </div>
            {/* Abstract visual */}
            <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 border border-white/[0.04] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
              <div className="w-48 h-48 border border-white/[0.04] rounded-full" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How it works (Minimal Process) */}
      <section className="relative z-10 py-32 bg-[#050505] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight text-zinc-100">Fix your process in minutes.</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Dump the spreadsheet", desc: "Import your current leads and assign them a project value." },
              { num: "02", title: "Move the cards", desc: "Simply drag deals across stages as you negotiate and close." },
              { num: "03", title: "Watch revenue grow", desc: "Flow calculates your projected income automatically." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15} className="group cursor-default">
                <div className="text-4xl font-light text-zinc-800 mb-6 group-hover:text-indigo-500 transition-colors duration-500">{item.num}</div>
                <h3 className="text-lg font-medium text-zinc-200 mb-3">{item.title}</h3>
                <p className="text-zinc-500 font-light text-sm leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing (Elegant Cards) */}
      <section className="relative z-10 py-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-100 mb-4">Transparent pricing</h2>
            <p className="text-zinc-500 font-light">Start free. Upgrade when your business demands it.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Free Tier */}
          <FadeIn direction="up" delay={0.1} className="bg-[#09090b] p-10 rounded-[2rem] border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col">
            <h3 className="text-xl font-medium text-zinc-100 mb-2">Starter</h3>
            <p className="text-zinc-500 text-sm font-light mb-8">For new freelancers finding their footing.</p>
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-4xl font-medium text-white">$0</span>
              <span className="text-zinc-600 text-sm">/mo</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {['Up to 10 active leads', 'Basic Kanban board', 'Standard support'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-400 font-light">
                  <Check size={16} className="text-zinc-600" /> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-full border border-white/[0.1] hover:bg-white/[0.04] text-zinc-300 transition-all font-medium text-sm cursor-pointer active:scale-95">
              Start for free
            </button>
          </FadeIn>

          {/* Pro Tier */}
          <FadeIn direction="up" delay={0.2} className="bg-zinc-900 p-10 rounded-[2rem] border border-zinc-700 relative flex flex-col shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-10 w-32 h-32 bg-indigo-500/20 blur-[50px]" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium text-white">Pro</h3>
                <span className="px-2.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] font-medium tracking-wide uppercase">
                  Popular
                </span>
              </div>
              <p className="text-zinc-400 text-sm font-light mb-8">For established independent earners.</p>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-medium text-white">$12</span>
                <span className="text-zinc-500 text-sm">/mo</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Unlimited active leads', 'Revenue forecasting', 'Smart reminders', 'Priority support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-light">
                    <Check size={16} className="text-indigo-400" /> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-medium text-sm shadow-lg cursor-pointer active:scale-95">
                Get Pro
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final Minimal CTA */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Ready to take control?
            </h2>
            <p className="text-lg text-zinc-500 font-light mb-10 max-w-xl mx-auto">
              Join the freelancers who stopped letting deals slip through the cracks. Set up your workspace in 60 seconds.
            </p>
            <button className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-medium transition-all text-sm flex items-center gap-2 mx-auto cursor-pointer active:scale-95">
              Create your account <ChevronRight size={16} />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] pt-12 pb-8 px-6 bg-[#030303]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <TrendingUp size={16} className="text-zinc-400" />
            <span className="text-sm font-medium tracking-tight text-zinc-300">FlowCRM</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-light text-zinc-500">
            <a href="#" className="hover:text-zinc-200 transition-colors cursor-pointer">About</a>
            <a href="#" className="hover:text-zinc-200 transition-colors cursor-pointer">Privacy</a>
            <a href="#" className="hover:text-zinc-200 transition-colors cursor-pointer">Terms</a>
          </div>

          <div className="flex items-center gap-5 text-zinc-600">
            <a href="#" className="hover:text-zinc-300 transition-colors cursor-pointer"><Twitter size={18} /></a>
            <a href="#" className="hover:text-zinc-300 transition-colors cursor-pointer"><Github size={18} /></a>
            <a href="#" className="hover:text-zinc-300 transition-colors cursor-pointer"><Linkedin size={18} /></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;