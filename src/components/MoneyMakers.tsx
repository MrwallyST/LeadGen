import React from 'react';
import { Cloud, Search, DollarSign, Sparkles, PhoneCall, Globe, Zap, BarChart3, Layers, Clock, TrendingUp, Trophy } from 'lucide-react';

export function MoneyMakers() {
  const models = [
    {
      title: "Voice AI Receptionists",
      icon: PhoneCall,
      color: "text-violet-600",
      bgColor: "bg-violet-100",
      badge: "The New Meta",
      difficulty: "Hard",
      description: "Text-back and chatbots are great, but the industry is shifting to Voice AI. You can build AI agents that actually speak on the phone with a human voice, handle objections, and book appointments directly into a calendar.",
      revenue: "$1,500 - $3,000 Setup + $500/mo",
      tools: "Vapi.ai, Bland.ai, Synthflow",
      toolLinks: { "Vapi.ai": "https://vapi.ai", "Bland.ai": "https://www.bland.ai", "Synthflow": "https://synthflow.ai" },
      pitch: '"What if your phone was answered on the first ring, 24/7, by a receptionist who never sleeps, never takes a sick day, and knows your entire business inside and out? Let me show you a demo of my Voice AI."'
    },
    {
      title: "White-Label SaaS (Software as a Service)",
      icon: Cloud,
      color: "text-sky-600",
      bgColor: "bg-sky-100",
      badge: "Passive Income",
      difficulty: "Medium",
      description: "Instead of doing 'Done-For-You' services where you build everything, you white-label a platform like GoHighLevel. You put your own logo on it, connect their Twilio, and sell it as 'The Ultimate Plumber Operating System'.",
      revenue: "$297 - $497/mo (90% Profit Margin)",
      tools: "GoHighLevel (SaaS Pro Plan)",
      toolLinks: { "GoHighLevel": "https://www.gohighlevel.com" },
      pitch: '"You\'re currently paying $300 for Mailchimp, $200 for Calendly, and $400 for a CRM. I have an all-in-one software built specifically for plumbers that replaces all of them for $297 a month."'
    },
    {
      title: "AI Programmatic SEO (Rank & Rent)",
      icon: Globe,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      badge: "Asset Building",
      difficulty: "Hard",
      description: "Use AI to generate hundreds of hyper-local landing pages (e.g., 'Emergency Roof Repair in Austin', 'Emergency Roof Repair in Dallas'). Once the site ranks on Google and generates leads, you rent the entire site to a local contractor.",
      revenue: "$1,000 - $2,500/mo per site",
      tools: "WordPress, OpenAI API, programmatic SEO plugins",
      pitch: '"I own a website that is currently generating 15 exclusive roofing leads a month in your city. I am looking for one contractor to take all of them. Do you want them, or should I call your competitor?"'
    }
  ];

  const difficultySpectrum = [
    {
      level: "Easiest",
      title: "AI Content & Social Media",
      description: "Use <a href='https://chatgpt.com' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:underline font-bold'>ChatGPT</a> + <a href='https://www.canva.com' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:underline font-bold'>Canva</a> to manage social media for local businesses. Low technical barrier, high volume.",
      revenue: "$500 - $1,500/mo",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      level: "Medium",
      title: "AI Chatbots & SMS Automation",
      description: "Build lead capture bots on <a href='https://www.voiceflow.com' target='_blank' rel='noopener noreferrer' class='text-amber-600 hover:underline font-bold'>Voiceflow</a> or <a href='https://www.gohighlevel.com' target='_blank' rel='noopener noreferrer' class='text-amber-600 hover:underline font-bold'>GoHighLevel</a>. Requires logic setup but has high perceived value.",
      revenue: "$1,000 - $2,500 setup + $300/mo",
      icon: Layers,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      level: "Hardest",
      title: "Voice AI & Custom SaaS",
      description: "Technical phone agents using <a href='https://vapi.ai' target='_blank' rel='noopener noreferrer' class='text-rose-600 hover:underline font-bold'>Vapi.ai</a> and white-labeled software. High ticket, complex setup, but massive recurring revenue.",
      revenue: "$3,000+ setup + $500/mo",
      icon: Zap,
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header>
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>The AI Money Matrix</span>
        </div>
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Ways to Make Money with AI</h2>
        <p className="text-zinc-500 mt-2 text-lg max-w-3xl">
          From quick wins to long-term wealth. Here is the spectrum of AI business models ranked by difficulty and profit potential.
        </p>
      </header>

      {/* ROI Speedrun Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black text-zinc-900 flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-amber-500" />
              <span>The ROI Speedrun</span>
            </h3>
            <p className="text-zinc-500 mt-2">Ranked by speed to first dollar and total profit potential.</p>
          </div>
          <div className="flex items-center space-x-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
            <span className="flex items-center space-x-1"><Clock className="w-4 h-4" /> <span>Time</span></span>
            <span className="flex items-center space-x-1"><DollarSign className="w-4 h-4" /> <span>ROI</span></span>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              rank: 1,
              title: "The 'AI Audit' + No-Code Website",
              time: "10-30 Mins",
              roi: "100x+",
              difficulty: "Very Easy",
              description: "Build a free audit and a demo site in minutes using <a href='https://www.framer.com' target='_blank' rel='noopener noreferrer' class='text-emerald-600 hover:underline font-bold'>Framer AI</a> or <a href='https://carrd.co' target='_blank' rel='noopener noreferrer' class='text-emerald-600 hover:underline font-bold'>Carrd</a>. It's the ultimate 'Foot in the Door'.",
              color: "bg-emerald-500",
              textColor: "text-emerald-600",
              borderColor: "border-emerald-100"
            },
            {
              rank: 2,
              title: "The Infinite Lead Machine (Cold Email)",
              time: "1-2 Days",
              roi: "Infinite",
              difficulty: "Easy",
              description: "Automate your outreach with <a href='https://www.apollo.io' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:underline font-bold'>Apollo</a> and <a href='https://instantly.ai' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:underline font-bold'>Instantly</a>. Once setup, it generates meetings while you sleep.",
              color: "bg-blue-500",
              textColor: "text-blue-600",
              borderColor: "border-blue-100"
            },
            {
              rank: 3,
              title: "Voice AI Receptionist",
              time: "1-2 Weeks",
              roi: "High Ticket",
              difficulty: "Medium",
              description: "Highest setup fees ($1.5k+) using <a href='https://vapi.ai' target='_blank' rel='noopener noreferrer' class='text-violet-600 hover:underline font-bold'>Vapi.ai</a>. Requires more trust, but the monthly recurring revenue is massive.",
              color: "bg-violet-500",
              textColor: "text-violet-600",
              borderColor: "border-violet-100"
            },
            {
              rank: 4,
              title: "Enterprise RAG (Custom AI)",
              time: "2-4 Weeks",
              roi: "Massive",
              difficulty: "Hard",
              description: "The $15k+ whales using <a href='https://flowiseai.com' target='_blank' rel='noopener noreferrer' class='text-zinc-900 hover:underline font-bold underline-offset-2'>Flowise</a>. Longest sales cycle, but one deal can change your year.",
              color: "bg-zinc-900",
              textColor: "text-zinc-900",
              borderColor: "border-zinc-200"
            }
          ].map((item, i) => (
            <div key={i} className={`group bg-white rounded-[2rem] p-6 border ${item.borderColor} shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6 relative overflow-hidden`}>
              <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg`}>
                {item.rank}
              </div>
              
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h4 className="text-xl font-black text-zinc-900">{item.title}</h4>
                <div className="text-sm text-zinc-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-zinc-100 pt-6 md:pt-0 md:pl-8">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Time</p>
                  <p className={`text-sm font-black ${item.textColor}`}>{item.time}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">ROI</p>
                  <p className={`text-sm font-black ${item.textColor}`}>{item.roi}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Difficulty</p>
                  <p className="text-sm font-black text-zinc-900">{item.difficulty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Difficulty Spectrum */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-zinc-900 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-indigo-500" />
          <span>The Difficulty Spectrum</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficultySpectrum.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={`p-6 rounded-3xl border border-zinc-200 shadow-sm ${item.bgColor} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Icon className="w-24 h-24" />
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${item.color} bg-white border border-zinc-100`}>
                  {item.level}
                </div>
                <h4 className="text-xl font-bold text-zinc-900 mb-2">{item.title}</h4>
                <div className="text-zinc-600 text-sm mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                <div className="text-lg font-black text-zinc-900">{item.revenue}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Self-Automating Lead Gen Section */}
      <section className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Self-Automating Your Lead Gen</h3>
              <p className="text-zinc-400 text-sm">How to make your prospector work while you sleep.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800">
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-indigo-400">1</span>
                <h4 className="font-bold text-white">The Data Source</h4>
              </div>
              <p className="text-sm text-zinc-400 mb-4">Connect <a href="https://www.apollo.io" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-bold">Apollo.io</a> to your stack. Use their API to automatically pull 50 new leads every morning based on your niche filters.</p>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tool: Apollo.io</div>
            </div>
            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800">
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-indigo-400">2</span>
                <h4 className="font-bold text-white">The AI Brain</h4>
              </div>
              <p className="text-sm text-zinc-400 mb-4">Use <a href="https://www.make.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-bold">Make.com</a> or <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-bold">Zapier</a> to send those leads to ChatGPT. Ask it to "Audit this business website and find 3 weaknesses."</p>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tool: Make.com + GPT-4o</div>
            </div>
            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800">
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-indigo-400">3</span>
                <h4 className="font-bold text-white">The Outreach</h4>
              </div>
              <p className="text-sm text-zinc-400 mb-4">Push the personalized audit directly into <a href="https://instantly.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-bold">Instantly.ai</a>. It sends the email and handles all follow-ups automatically.</p>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tool: Instantly.co</div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-start space-x-3">
            <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-300">
              <strong>The Result:</strong> You wake up to a dashboard full of "Interested" replies from business owners who received a custom audit without you lifting a finger.
            </p>
          </div>
        </div>
      </section>

      {/* Existing Money Makers */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-zinc-900 flex items-center space-x-2">
          <Search className="w-6 h-6 text-indigo-500" />
          <span>Advanced Business Models</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model, index) => {
            const Icon = model.icon;
            return (
              <div key={index} className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-zinc-100 relative">
                  <span className="absolute top-6 right-6 px-2.5 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-md uppercase tracking-wider">
                    {model.badge}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${model.bgColor} ${model.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">{model.title}</h3>
                  <div className="mt-2 inline-flex items-center text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-md">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {model.revenue}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6 flex-1">
                    {model.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Difficulty</h4>
                        <p className="text-sm font-bold text-zinc-800">{model.difficulty}</p>
                      </div>
                      <div className="text-right">
                        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Tools</h4>
                        <div className="flex flex-wrap justify-end gap-1">
                          {model.tools.split(',').map((tool, tIdx) => {
                            const trimmedTool = tool.trim();
                            const link = model.toolLinks?.[trimmedTool];
                            return link ? (
                              <a key={tIdx} href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:underline">
                                {trimmedTool}{tIdx < model.tools.split(',').length - 1 ? ',' : ''}
                              </a>
                            ) : (
                              <span key={tIdx} className="text-sm font-medium text-zinc-800">
                                {trimmedTool}{tIdx < model.tools.split(',').length - 1 ? ',' : ''}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">The Pitch</h4>
                      <p className="text-sm text-zinc-700 italic font-medium">
                        {model.pitch}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Glitches & Hacks Section */}
      <section className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold">Growth Hacks & "Glitches"</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800 hover:border-emerald-500/50 transition-colors group">
              <h4 className="font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">The "Review Hijack"</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Find businesses with 1-star reviews. Use AI to write a script that specifically addresses those complaints. "I saw people say your response time is slow, I can fix that with an AI chatbot."</p>
            </div>
            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800 hover:border-emerald-500/50 transition-colors group">
              <h4 className="font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">The "Ghost Booking"</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Don't build the service first. Run a $5/day Facebook ad for the service. If people click "Book Now", you know the offer works. Then build it.</p>
            </div>
            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800 hover:border-emerald-500/50 transition-colors group">
              <h4 className="font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">The "Authority Glitch"</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Use Perplexity AI to generate a 10-page "State of AI in [Your Niche]" report. Send it to prospects for free. It instantly makes you the expert.</p>
            </div>
            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800 hover:border-emerald-500/50 transition-colors group">
              <h4 className="font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">The "Loom Glitch"</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Record 1 "Master Demo" and just change the browser tab to their website for the first 5 seconds. Use AI to swap the audio greeting for each lead.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
