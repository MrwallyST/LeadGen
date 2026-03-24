import React from 'react';
import { TrendingUp, Sun, Snowflake, Leaf, Flame, Users, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export function TrendingNiches() {
  const currentMonth = new Date().getMonth(); // 0-11
  
  // Determine current season (Northern Hemisphere approximation)
  let currentSeason = '';
  if (currentMonth >= 2 && currentMonth <= 4) currentSeason = 'Spring';
  else if (currentMonth >= 5 && currentMonth <= 7) currentSeason = 'Summer';
  else if (currentMonth >= 8 && currentMonth <= 10) currentSeason = 'Fall';
  else currentSeason = 'Winter';

  const seasonalNiches = [
    {
      season: 'Spring',
      months: 'March - May',
      icon: Leaf,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100',
      niches: [
        { name: 'Landscaping & Hardscaping', pitch: 'Missed call text-back for spring cleanup quotes.' },
        { name: 'Roofing', pitch: 'AI voice bot to handle post-storm inspection bookings.' },
        { name: 'HVAC (AC Prep)', pitch: 'Database reactivation SMS for summer AC tune-ups.' },
        { name: 'Pest Control', pitch: '24/7 web chat for urgent bug/termite inquiries.' }
      ]
    },
    {
      season: 'Summer',
      months: 'June - August',
      icon: Sun,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100',
      niches: [
        { name: 'Pool Builders & Maintenance', pitch: 'Lead qualification bot to filter out low-budget tire kickers.' },
        { name: 'Moving Companies', pitch: 'Automated quoting system based on square footage.' },
        { name: 'Wedding Planners/Venues', pitch: 'AI FAQ bot for venue details and availability.' },
        { name: 'Solar Installation', pitch: 'High-volume SMS outreach for summer energy savings.' }
      ]
    },
    {
      season: 'Fall',
      months: 'September - November',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      niches: [
        { name: 'HVAC (Heating Prep)', pitch: 'Voice AI to schedule furnace inspections before winter.' },
        { name: 'Tutoring & Education', pitch: 'Lead capture for back-to-school parent inquiries.' },
        { name: 'Gutter Cleaning', pitch: 'Automated seasonal reminder SMS to past clients.' },
        { name: 'Remodeling (Pre-Holidays)', pitch: 'Kitchen/bath remodel qualification bot.' }
      ]
    },
    {
      season: 'Winter',
      months: 'December - February',
      icon: Snowflake,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      niches: [
        { name: 'Tax Accountants (CPAs)', pitch: 'AI Receptionist to handle the massive influx of tax season calls.' },
        { name: 'Snow Removal', pitch: 'Emergency dispatch routing via SMS/Voice.' },
        { name: 'Plumbers (Frozen Pipes)', pitch: '24/7 emergency AI answering service.' },
        { name: 'Fitness & Gyms', pitch: 'New Year Resolution lead nurturing sequence.' }
      ]
    }
  ];

  const evergreenNiches = [
    {
      name: 'Med Spas & Aesthetics',
      reason: 'High lifetime value. Very visual, highly driven by word-of-mouth and local Instagram ads.',
      solution: 'AI Instagram DM automation to book consultations directly from stories/reels.'
    },
    {
      name: 'Dental Implants & Orthodontics',
      reason: 'Massive ticket size ($5k-$20k). Patients have high anxiety and lots of questions.',
      solution: 'Empathetic AI web chat trained on their specific procedures to build trust and book consults.'
    },
    {
      name: 'Personal Injury Law',
      reason: 'Hyper-competitive. If they don\'t answer the phone instantly, the client calls the next lawyer on Google.',
      solution: 'Instant AI Voice Receptionist that answers in 1 second and collects case details.'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="border-b border-zinc-200 pb-8">
        <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
          <TrendingUp className="w-4 h-4" />
          <span>Market Intelligence</span>
        </div>
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Hot Niches Radar</h2>
        <p className="text-zinc-500 mt-3 text-lg max-w-3xl">
          Don't pitch snow removal in July. Use this seasonal calendar and word-of-mouth tracker to know exactly who is desperate for leads right now.
        </p>
      </header>

      {/* Current Season Highlight */}
      <div className="bg-gradient-to-br from-indigo-900 to-zinc-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold text-indigo-100">Current Season: {currentSeason}</h3>
          </div>
          <h4 className="text-3xl font-black mb-6">Pitch these businesses right now:</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalNiches.find(s => s.season === currentSeason)?.niches.map((niche, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="font-bold text-lg mb-1">{niche.name}</div>
                <div className="text-indigo-200 text-sm flex items-start">
                  <ArrowRight className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                  <span>{niche.pitch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Evergreen Word of Mouth */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900">Evergreen Goldmines</h3>
          </div>
          <p className="text-zinc-500 text-sm">These niches rely heavily on word-of-mouth and have massive profit margins. They are hot year-round.</p>
          
          <div className="space-y-4">
            {evergreenNiches.map((niche, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm">
                <h4 className="font-bold text-zinc-900 mb-2">{niche.name}</h4>
                <p className="text-xs text-zinc-500 mb-3 pb-3 border-b border-zinc-100">{niche.reason}</p>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-700 font-medium">{niche.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Calendar */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-zinc-900 mb-6">The 12-Month Pitch Calendar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalNiches.map((season, idx) => {
              const Icon = season.icon;
              const isCurrent = season.season === currentSeason;
              
              return (
                <div key={idx} className={`rounded-2xl p-6 border ${isCurrent ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500' : 'border-zinc-200 bg-white shadow-sm'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl ${season.bgColor} ${season.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900">{season.season}</h4>
                        <p className="text-xs text-zinc-500">{season.months}</p>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">Active</span>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {season.niches.map((niche, nIdx) => (
                      <li key={nIdx} className="text-sm text-zinc-600 flex items-center before:content-['•'] before:mr-2 before:text-zinc-300">
                        {niche.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
