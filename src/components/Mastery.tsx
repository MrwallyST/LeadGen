import React from 'react';
import { Trophy, Zap, Target, ShieldCheck, Brain, Rocket, MessageSquare, DollarSign } from 'lucide-react';

export function Mastery() {
  const masteryTips = [
    {
      title: "The 'Inbound' Glitch",
      description: "Stop chasing. Start attracting. Create a 'Free AI Audit' tool on your site. When people use it, they give you their email and website. The tool (powered by Gemini) sends them a PDF audit automatically. You just follow up with a Loom.",
      icon: MagnetIcon,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "The 'Multi-Channel' Blitz",
      description: "Don't just email. If a lead is high-value, send an email, then a LinkedIn request 2 hours later, then a DM 24 hours later. Use automation to sync these so you don't look like a stalker.",
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "The 'Price Anchoring' Secret",
      description: "Always pitch a $5,000 'Enterprise' package first. When they flinch, offer the $1,500 'Starter' package. It feels like a steal. 80% of your sales will come from the 'Starter' package.",
      icon: DollarSign,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      title: "The 'Niche Down' Paradox",
      description: "The more specific you are, the more you can charge. 'AI for Business' is worth $500. 'AI for High-End Dental Implant Clinics' is worth $5,000. Become the only person in the world who does your specific thing.",
      icon: Target,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-zinc-900 text-white px-4 py-1.5 rounded-full text-sm font-black tracking-widest uppercase">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Mastery Mode Activated</span>
        </div>
        <h2 className="text-5xl font-black text-zinc-900 tracking-tight">Mastering the Game</h2>
        <p className="text-zinc-500 text-xl max-w-2xl mx-auto">
          You have the tools. Now you need the strategy. Here is how the top 1% of agency owners actually operate.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {masteryTips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div key={i} className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-all group">
              <div className={`w-14 h-14 rounded-2xl ${tip.bgColor} ${tip.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">{tip.title}</h3>
              <p className="text-zinc-600 leading-relaxed">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>

      <section className="bg-zinc-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent)] pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="text-4xl font-black leading-tight">The "Demon Mode" Mindset</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-xl">Speed is Everything</h4>
                  <p className="text-zinc-400 mt-1">A lead that is contacted in 5 minutes is 10x more likely to close than one contacted in 1 hour. Automate your first touch.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-xl">Volume Negates Luck</h4>
                  <p className="text-zinc-400 mt-1">If you send 10 emails, you're relying on luck. If you send 1,000, you're relying on math. The math always wins.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-xl">The "No" is the Start</h4>
                  <p className="text-zinc-400 mt-1">Most sales happen on the 5th to 7th follow-up. Most agency owners quit after the 1st. Be the one who stays.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-3xl p-8 border border-zinc-700 backdrop-blur-sm">
            <h4 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-indigo-400" />
              <span>Advanced Sales Psychology</span>
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-700">
                <p className="text-indigo-400 font-bold text-sm mb-1 uppercase tracking-widest">The Takeaway</p>
                <p className="text-sm text-zinc-300 italic">"I'm not sure if we're a fit yet, I only take on 2 clients a month and I need to make sure you're ready for this growth."</p>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-700">
                <p className="text-emerald-400 font-bold text-sm mb-1 uppercase tracking-widest">The ROI Frame</p>
                <p className="text-sm text-zinc-300 italic">"This isn't a $2,000 expense. It's a system that generates $10,000. If I gave you $10k for $2k, how many times would you do that deal?"</p>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-700">
                <p className="text-rose-400 font-bold text-sm mb-1 uppercase tracking-widest">The Risk Reversal</p>
                <p className="text-sm text-zinc-300 italic">"If I don't book you at least 5 appointments in the first 30 days, you don't pay a cent. I'll even pay you $500 for wasting your time."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
          <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span>The Mastery Checklist</span>
          </h3>
          <div className="space-y-4">
            {[
              "Niche selected and validated (at least 3 competitors exist)",
              "Free 'Lead Magnet' created (Audit, PDF, or Demo)",
              "Make.com automation connected to lead generator",
              "100+ leads scraped and ready for outreach",
              "Smartlead/Instantly account warmed up (14 days)",
              "First 10 Looms sent to high-value prospects",
              "Sales script practiced and recorded (listen to yourself)",
              "First 'No' received and followed up on 3 times"
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-zinc-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-rose-600 rounded-3xl p-8 text-white shadow-xl shadow-rose-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Flame className="w-6 h-6" />
            <span>Daily Demon Mode</span>
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-rose-200 uppercase tracking-widest mb-2">Morning (8 AM - 10 AM)</p>
              <p className="text-sm">Deep work. No social media. Send 20 personalized Looms. No exceptions.</p>
            </div>
            <div className="w-full h-px bg-rose-500/50" />
            <div>
              <p className="text-xs font-bold text-rose-200 uppercase tracking-widest mb-2">Midday (12 PM - 2 PM)</p>
              <p className="text-sm">Follow-ups. Check every 'Interested' reply. Book the Zoom calls. Use the 'Takeaway' close.</p>
            </div>
            <div className="w-full h-px bg-rose-500/50" />
            <div>
              <p className="text-xs font-bold text-rose-200 uppercase tracking-widest mb-2">Evening (6 PM - 8 PM)</p>
              <p className="text-sm">System optimization. Tweak your Make.com flows. Scrape 100 more leads for tomorrow.</p>
            </div>
          </div>
          <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/20">
            <p className="text-xs italic text-rose-100">"The difference between $1k and $10k is just the volume of your output."</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function Flame(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.203 1.15-3.003L8.5 14.5z" />
    </svg>
  );
}

function MagnetIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 15-4-4 6.75-6.77a5.48 5.48 0 0 1 7.75 0L22 10.5l-4 4" />
      <path d="m5 8 4 4" />
      <path d="m12 5 4 4" />
      <path d="M11 13l4 4" />
      <path d="m18 10 4 4" />
    </svg>
  );
}
