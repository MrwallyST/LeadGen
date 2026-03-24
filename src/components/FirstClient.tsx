import React from 'react';
import { Rocket, Target, DollarSign, Handshake, CheckCircle2, XCircle, Mail, Wrench, Award, TrendingUp } from 'lucide-react';
import { OutreachGenerator } from './OutreachGenerator';

export function FirstClient() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="border-b border-zinc-200 pb-8">
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
          <Rocket className="w-4 h-4" />
          <span>Zero to One</span>
        </div>
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight">First Client Playbook</h2>
        <p className="text-zinc-500 mt-3 text-lg max-w-3xl">
          Your first client isn't about revenue. It's about proof. This playbook walks you through a proven strategy to land your first client by leading with free value, building a real relationship, and growing it into recurring revenue.
        </p>
      </header>

      {/* Baby Freelancer Action Plan - Kept at the top for immediate action */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Rocket className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-emerald-900">The "Baby Freelancer" Action Plan (Start Here)</h3>
        </div>
        <p className="text-emerald-800 mb-4 font-medium">Overwhelmed by the full playbook below? Ignore everything else and just do these 3 things today:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <h4 className="font-bold text-zinc-900">Find 5 Local Businesses</h4>
            </div>
            <p className="text-sm text-zinc-600">Go to Google Maps. Search "Plumbers" or "Roofers". Find 5 that have a terrible website or no chat widget.</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <h4 className="font-bold text-zinc-900">Build 1 Free Deliverable</h4>
            </div>
            <p className="text-sm text-zinc-600">Build them a quick modern website using <a href="https://www.framer.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Framer AI</a> or <a href="https://carrd.co" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Carrd</a>, or a demo AI bot on <a href="https://www.voiceflow.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Voiceflow</a> trained on their data.</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <h4 className="font-bold text-zinc-900">Send 1 Loom Video</h4>
            </div>
            <p className="text-sm text-zinc-600">Record your screen showing what you built. Email it: "Hey, built this for you for free. Can I send it over?"</p>
          </div>
        </div>
      </div>

      {/* Outreach Generator Section */}
      <OutreachGenerator />

      <div className="space-y-8">
        <h3 className="text-2xl font-black text-zinc-900 border-b border-zinc-200 pb-4">The Complete 6-Phase Playbook</h3>

        {/* Phase 1 */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Phase 1: Pick Your Niche</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <h4 className="font-bold text-red-900 mb-3 flex items-center"><XCircle className="w-4 h-4 mr-2" /> Avoid "Sexy" Niches</h4>
              <p className="text-sm text-red-800 mb-3">Oversaturated with agencies fighting over the same clients.</p>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Dentists & Med Spas</li>
                <li>• Real estate agents</li>
                <li>• Gyms & personal trainers</li>
                <li>• Coaches & course creators</li>
              </ul>
            </div>
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-3 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Target "Boring" Niches</h4>
              <p className="text-sm text-emerald-800 mb-3">Busy owners, not tech-savvy, terrible digital infrastructure.</p>
              <ul className="space-y-2 text-sm text-emerald-700">
                <li>• HVAC, Plumbing, Landscaping</li>
                <li>• Commercial cleaning & Laundry</li>
                <li>• Auto detailing & Pest control</li>
                <li>• Fencing, Decking, Junk removal</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Phase 2: Build Your Free Deliverable</h3>
          </div>
          <p className="text-zinc-600 mb-4">You are not pitching. You are giving. Create something so good they feel compelled to keep talking to you.</p>
          <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200 mb-4">
            <h4 className="font-bold text-zinc-900 mb-2">🔥 Build Them a Website Using Framer AI or Carrd</h4>
            <p className="text-sm text-zinc-600 mb-4">A beautiful, functional website built specifically for their business is the single most impressive thing you can give away for free. Use real details from their existing online presence.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg border border-zinc-200">
                <strong className="text-sm text-zinc-900 block">1. Research</strong>
                <span className="text-xs text-zinc-500">Use Google, <a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Apify</a>, or <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Firecrawl</a> to scrape their current site, reviews, and pricing.</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-zinc-200">
                <strong className="text-sm text-zinc-900 block">2. Build</strong>
                <span className="text-xs text-zinc-500">Use <a href="https://www.framer.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Framer AI</a> or <a href="https://10web.io" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">10Web</a> to build a clean, modern site tailored to them in minutes.</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-zinc-200">
                <strong className="text-sm text-zinc-900 block">3. Quality Check</strong>
                <span className="text-xs text-zinc-500">Does it look like a real agency charged for it? Is it ready to use immediately?</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Phase 3: The Outreach</h3>
            </div>
            <p className="text-zinc-400 mb-6">Build the free piece FIRST. Do NOT reach out and ask if they want free work. Showing a finished product creates desire.</p>
            
            <div className="space-y-4">
              <div className="bg-zinc-950/50 rounded-xl p-5 border border-zinc-800">
                <h4 className="text-indigo-400 font-bold mb-2">Email Template 1: The Straight Shooter</h4>
                <p className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">
                  Subject: built you a new website (it's free){'\n\n'}
                  Hey [Name],{'\n\n'}
                  I'm [Your Name], based in [City]. I came across [Business Name] and thought your website could be doing more for you.{'\n\n'}
                  So I built you a new one. Here it is: [Link]{'\n\n'}
                  It's yours — completely free. I'm building my portfolio and your business stood out. If you want me to fine-tune anything, just ping back.
                </p>
              </div>
              <div className="bg-zinc-950/50 rounded-xl p-5 border border-zinc-800">
                <h4 className="text-indigo-400 font-bold mb-2">Email Template 2: The Local Play</h4>
                <p className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">
                  Subject: also in [City] — made you something{'\n\n'}
                  Hey [Name],{'\n\n'}
                  I'm [Your Name], also based here in [City]. I've been working with local businesses on their web presence. Checked out [Business Name] and your online presence doesn't match the quality of what you actually do. So I built you a new site — free. Take a look: [Link]{'\n\n'}
                  No catch. Just building experience with businesses I rate.
                </p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-4">💡 Automate follow-ups on Day 3, 7, 14, and 28 using tools like Instantly.co or Lemlist.</p>
          </div>
        </div>

        {/* New Section: The Automation Stack (Cheapest Way) */}
        <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 shadow-sm md:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">The Automation Stack (The Cheapest Way)</h3>
          </div>
          <p className="text-zinc-600 mb-6">Automation doesn't have to be expensive. Here is the "Zero-Dollar" stack to automate your outreach and lead gen while you sleep.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
              <div className="text-zinc-900 font-bold text-sm mb-1">1. Lead Gen (Free)</div>
              <div className="text-indigo-600 font-bold text-xs mb-2">Apollo.io (Free Tier)</div>
              <p className="text-xs text-zinc-500">Get 10,000+ business emails for free. Filter by "Industry" and "Location" to find your targets in seconds.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
              <div className="text-zinc-900 font-bold text-sm mb-1">2. Outreach (Free)</div>
              <div className="text-indigo-600 font-bold text-xs mb-2">Instantly.co (Trial)</div>
              <p className="text-xs text-zinc-500">Upload your Apollo list. Set up a 4-step email sequence. Hit "Go" and it sends emails automatically.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
              <div className="text-zinc-900 font-bold text-sm mb-1">3. Demo Build (Free)</div>
              <div className="text-indigo-600 font-bold text-xs mb-2">Voiceflow (Free)</div>
              <p className="text-xs text-zinc-500">Use the "Knowledge Base" to build a bot in 5 mins. No coding needed. Just paste their URL.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
              <div className="text-zinc-900 font-bold text-sm mb-1">4. Video (Free)</div>
              <div className="text-indigo-600 font-bold text-xs mb-2">Loom (Free)</div>
              <p className="text-xs text-zinc-500">Record a 2-min demo. Loom hosts the video for free. You just send the link in your email.</p>
            </div>
          </div>

          <div className="mt-6 bg-zinc-900 rounded-xl p-5 text-white">
            <h4 className="font-bold mb-3 flex items-center text-indigo-400"><Handshake className="w-4 h-4 mr-2" /> The "1-Hour Daily" Automation Workflow</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">15m</span>
                <p className="text-zinc-400">Export 50 leads from Apollo.io into a CSV file.</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">30m</span>
                <p className="text-zinc-400">Build 1 "Master Bot" for your niche. You only need to build it ONCE, then just change the name for each client.</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">15m</span>
                <p className="text-zinc-400">Upload leads to Instantly.co and start the sequence. Now the "bot" is doing the outreach for you.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 4 */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Phase 4: The Upsell Path</h3>
          </div>
          <p className="text-zinc-600 mb-4">Once they've accepted the free work and are happy, introduce small, affordable add-ons. Price for the relationship, not the profit (Keep it under $300/mo to start).</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 border border-zinc-200 rounded-lg flex justify-between items-center">
              <span className="font-medium text-sm text-zinc-800">Website Hosting & Maintenance</span>
              <span className="text-emerald-600 font-bold text-sm">$50–$300/mo</span>
            </div>
            <div className="p-3 border border-zinc-200 rounded-lg flex justify-between items-center">
              <span className="font-medium text-sm text-zinc-800">AI Chatbot for Website</span>
              <span className="text-emerald-600 font-bold text-sm">$50–$500/mo</span>
            </div>
            <div className="p-3 border border-zinc-200 rounded-lg flex justify-between items-center">
              <span className="font-medium text-sm text-zinc-800">Review Generation System</span>
              <span className="text-emerald-600 font-bold text-sm">$50–$300/mo</span>
            </div>
            <div className="p-3 border border-zinc-200 rounded-lg flex justify-between items-center">
              <span className="font-medium text-sm text-zinc-800">Missed Call Text-Back</span>
              <span className="text-emerald-600 font-bold text-sm">$50–$200/mo</span>
            </div>
          </div>
        </div>

        {/* Phase 5 & 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Phase 5: Collect Proof</h3>
            </div>
            <p className="text-sm text-zinc-600 mb-4">Your first client is a goldmine of social proof. Extract maximum value.</p>
            <ul className="space-y-2 text-sm text-zinc-700">
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" /> Ask for a 60-second video testimonial (Use Senja.io or VideoAsk to make it easy).</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" /> Document a Case Study (Before/After).</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" /> Add the project to your portfolio.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Phase 6: Scale</h3>
            </div>
            <p className="text-sm text-zinc-600 mb-4">Now you have proof, confidence, and a repeatable playbook.</p>
            <ul className="space-y-2 text-sm text-zinc-700">
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" /> Ask Client #1 for referrals.</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" /> Repeat the Free Value Play for 5 more businesses in the same niche.</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" /> Raise prices once you have 3+ paying clients and solid case studies.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
