import React from 'react';
import { Swords, XCircle, CheckCircle, Target, TrendingDown, Clock, Wrench } from 'lucide-react';

export function Competitors() {
  const battlecards = [
    {
      name: "Shared Lead Platforms",
      examples: "Angi, HomeAdvisor, Thumbtack, Yelp",
      icon: Target,
      theirWeakness: [
        "They sell the exact same lead to 3-5 different contractors.",
        "Creates a 'race to the bottom' on pricing.",
        "Contractors pay for the lead even if they don't win the job.",
        "Low intent—homeowners are just price shopping."
      ],
      ourAdvantage: [
        "We build systems that help them CLOSE the Angi leads they already buy (Speed to Lead).",
        "We generate EXCLUSIVE leads through their own website/Google Business Profile.",
        "We reactivate their past customers for free (no cost-per-lead)."
      ],
      pitch: '"You\'re paying Angi $75 for a lead, but they are selling that same lead to 4 other plumbers. The first one to call wins. My AI system ensures you reply in 5 seconds, every single time, so you actually get an ROI on the leads you\'re already buying."'
    },
    {
      name: "Traditional Marketing Agencies",
      examples: "Local SEO agencies, Facebook Ad agencies",
      icon: TrendingDown,
      theirWeakness: [
        "High monthly retainers ($2,000 - $5,000/mo).",
        "Takes 3-6 months to see any ROI (especially SEO).",
        "They pour water into a leaky bucket (generate traffic, but the contractor still misses the calls).",
        "They report on 'clicks' and 'impressions', not closed revenue."
      ],
      ourAdvantage: [
        "Instant ROI. Our Database Reactivation campaign gets them jobs in the first 48 hours.",
        "We fix the 'leaky bucket' first by automating follow-ups and missed calls.",
        "Much lower risk/cost to get started.",
        "We track actual booked appointments, not vanity metrics."
      ],
      pitch: '"Most agencies want $3,000 a month to run ads, but what happens when those ads generate a call while you\'re under a sink? You miss it, and the ad money is wasted. I don\'t want to run ads yet. I want to plug the holes in your bucket first with Missed Call Text Back so you stop losing the customers you already have."'
    },
    {
      name: "Big DIY SaaS Companies",
      examples: "Podium, Jobber, ServiceTitan, GoHighLevel (Direct)",
      icon: Wrench,
      theirWeakness: [
        "It's Do-It-Yourself (DIY). The contractor has to learn the software.",
        "Plumbers and roofers hate sitting at a computer configuring workflows.",
        "They pay a monthly subscription but only use 10% of the features.",
        "Customer support is just a generic help desk."
      ],
      ourAdvantage: [
        "We are Done-For-You (DFY). We build it, test it, and manage it.",
        "We act as their fractional Chief Technology Officer (CTO).",
        "We customize the AI specifically for their business and FAQs.",
        "They just get a simple app on their phone that pings them when a job is booked."
      ],
      pitch: '"Podium is great software, but it\'s just a tool. It\'s like buying a hammer and expecting a house to be built. You still have to do the work. I don\'t sell software; I sell the outcome. I will build, customize, and manage the entire AI system for you so you never have to log into a dashboard."'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Swords className="w-4 h-4" />
          <span>Sales Battlecards</span>
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Competitor Comparison</h2>
        <p className="text-zinc-500 mt-2">
          How to position your AI Agency against the established players in the local business space.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {battlecards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
              <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">{card.name}</h3>
                  <p className="text-sm text-zinc-500 font-medium">Examples: {card.examples}</p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Their Weaknesses */}
                <div className="space-y-4">
                  <h4 className="font-bold text-zinc-900 flex items-center space-x-2">
                    <XCircle className="w-5 h-5 text-rose-500" />
                    <span>Their Weaknesses</span>
                  </h4>
                  <ul className="space-y-3">
                    {card.theirWeakness.map((weakness, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm text-zinc-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Our Advantage */}
                <div className="space-y-4">
                  <h4 className="font-bold text-zinc-900 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Our Advantage</span>
                  </h4>
                  <ul className="space-y-3">
                    {card.ourAdvantage.map((advantage, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm text-zinc-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* The Killshot Pitch */}
              <div className="px-6 pb-6">
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">The "Killshot" Pitch</h4>
                  <p className="text-indigo-900 font-medium italic">
                    {card.pitch}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
