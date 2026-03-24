import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function Roadmap() {
  const roadmap = [
    {
      title: 'Week 1: Build Your System',
      goal: 'Demo live + first Loom sent',
      items: [
        'Day 1: Create Make.com account and watch Module 2',
        'Day 2-3: Build and test demo automation',
        'Day 4: Write automated reply email template',
        'Day 5-6: Find 10 prospects and fill out contact forms',
        'Day 7: Check response times and send first 2 Looms'
      ]
    },
    {
      title: 'Week 2: Land Your First Client',
      goal: 'First $1,000 collected',
      items: [
        'Send 3 Looms per day + follow up on Week 1',
        'Book a Zoom the moment anyone replies',
        'Review closing steps before every Zoom',
        'Show them the math before pitching price',
        'Build, deliver, and lock in the retainer'
      ]
    },
    {
      title: 'Weeks 3-4: Stack to 3 Clients',
      goal: '3 paying clients by Day 30',
      items: [
        'Keep sending 3 Looms per day',
        'Ask first client for a referral',
        'Try a new niche (roofers, HVAC, dentists)',
        'Check in with active clients once a week',
        'Day 30: Count clients and calculate MRR'
      ]
    },
    {
      title: 'Month 2: Scale to $5k-$7k',
      goal: '5-7 clients by Day 60',
      items: [
        'Maintain 3 Looms/day and expand to new cities',
        'Add Facebook groups and Nextdoor to outreach',
        'Try Angi and HomeAdvisor for warm leads',
        'Do a quick Monday review every week'
      ]
    },
    {
      title: 'Month 3: The Exit Push',
      goal: '10 clients — $10k/month by Day 100',
      items: [
        'Bump to 4-5 Looms per day for final 30 days',
        'Full referral sweep — message every current client',
        'Target higher-value niches (lawyers, dentists)',
        'Same-day builds for every new client',
        'Day 100: Count clients and calculate MRR'
      ]
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">100-Day Roadmap</h2>
        <p className="text-zinc-500 mt-2">Your week-by-week plan from zero to $10k/month.</p>
      </header>

      <div className="space-y-6">
        {roadmap.map((phase, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-2xl" />
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">{phase.title}</h3>
                <div className="flex items-center space-x-2 mt-1 text-indigo-600 font-medium text-sm">
                  <Target className="w-4 h-4" />
                  <span>Goal: {phase.goal}</span>
                </div>
              </div>
            </div>
            <ul className="space-y-3 mt-6">
              {phase.items.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-zinc-600">
                  <ArrowRight className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Add Target icon since it wasn't imported
import { Target } from 'lucide-react';
