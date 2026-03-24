import React from 'react';
import { Flame, Mail, Database, Video, Skull } from 'lucide-react';

export function DemonMode() {
  const pillars = [
    {
      title: "The Infinite Lead Machine",
      icon: Mail,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
      description: "You can't print money sending 10 emails a day manually. You need to send 1,000+ a day on autopilot, but they must look 100% personalized.",
      stack: "Clay.com + Smartlead.ai + Apollo.io",
      steps: [
        "Buy 10 secondary domains (e.g., tryyouragency.com) and set up 30 Google Workspace inboxes.",
        "Use Apollo to scrape 5,000 leads (CEOs, Founders) in your niche.",
        "Import to Clay.com. Use AI to scrape their LinkedIn and recent company news.",
        "Have AI write a hyper-personalized first line for all 5,000 leads instantly (e.g., 'Saw your recent post about X...').",
        "Load into Smartlead and launch. Wake up to 5-10 booked meetings every day."
      ]
    },
    {
      title: "Enterprise RAG ($15k+ Deals)",
      icon: Database,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      description: "Stop selling $500 website chatbots to plumbers. Sell $15,000 internal knowledge bases to law firms, logistics companies, and medical clinics.",
      stack: "Flowise / LangChain + Pinecone + OpenAI API",
      steps: [
        "Target companies with massive amounts of internal documents, SOPs, or case files.",
        "Build a Retrieval-Augmented Generation (RAG) system.",
        "Upload all their PDFs, employee handbooks, and past data into a Vector Database (Pinecone).",
        "Create an internal AI employee that can instantly answer any complex question based ONLY on their company data.",
        "Charge a $10k-$20k setup fee + $2k/mo maintenance."
      ]
    },
    {
      title: "AI Video Cloning at Scale",
      icon: Video,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      description: "Personalized Loom videos convert at 20%, but take forever to record. Clone yourself and send 1,000 personalized videos a day without turning on a camera.",
      stack: "HeyGen + Make.com + CRM",
      steps: [
        "Record a 2-minute training video of yourself speaking to the camera.",
        "Upload to HeyGen to create your photorealistic AI Avatar and voice clone.",
        "Connect HeyGen to your CRM via Make.com.",
        "When a high-ticket lead enters your system, AI generates a video of YOU saying their specific name and company.",
        "Email the video automatically. The prospect thinks you recorded it just for them."
      ]
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center space-x-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-sm font-bold mb-4 border border-red-500/20">
          <Flame className="w-4 h-4" />
          <span>Level 99 Unlocked</span>
        </div>
        <h2 className="text-4xl font-black text-white tracking-tight flex items-center space-x-3">
          <span>Demon Mode</span>
          <Skull className="w-8 h-8 text-zinc-700" />
        </h2>
        <p className="text-zinc-400 mt-3 text-lg max-w-3xl">
          You want to be the ultimate AI demon and build a money printer? The basics will get you to $10k/mo. 
          This page is how you scale to $100k/mo. It requires advanced infrastructure, high-ticket enterprise offers, and ruthless automation.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {pillars.map((pillar, index) => {
          // ... existing pillar mapping ...
        })}
      </div>

      {/* New Glitches Section */}
      <section className="mt-12 bg-zinc-950 rounded-3xl p-10 border border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.1),transparent)] pointer-events-none" />
        
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-white mb-8 flex items-center space-x-3">
            <Skull className="w-6 h-6 text-red-500" />
            <span>Growth Hacks & "Glitches"</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-red-500/30 transition-colors">
                <h4 className="text-red-400 font-bold mb-2">The "Competitor Ad" Glitch</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Go to the <strong>Facebook Ad Library</strong>. Search for your competitors. Look for ads that have been running for 3+ months—those are the ones that are printing money. Copy their hook, their offer, and their landing page structure.
                </p>
              </div>
              <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-red-500/30 transition-colors">
                <h4 className="text-red-400 font-bold mb-2">The "Review Hijack"</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Find a competitor on Google Maps with 1-star reviews. Reach out to those specific customers on social media. Say: "I saw you had a bad experience with [Competitor]. I'm building a new AI-powered service for this and want to give you a free trial to prove we're better."
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-red-500/30 transition-colors">
                <h4 className="text-red-400 font-bold mb-2">The "Ghost Booking" Hack</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Before you even have a product, build a landing page with a "Book a Demo" button. Run $5/day in ads. If people click and try to book, you have a winner. If not, don't waste time building it. This is how you validate for $35.
                </p>
              </div>
              <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-red-500/30 transition-colors">
                <h4 className="text-red-400 font-bold mb-2">The "AI Authority" Glitch</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Use <strong>Perplexity AI</strong> to find the top 10 most complex problems in your niche. Write a 5-page "State of the Industry" report using AI. Send this report to CEOs as a "gift" before asking for a meeting. You instantly become the expert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
