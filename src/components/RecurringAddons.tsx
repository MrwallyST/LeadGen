import React, { useState } from 'react';
import { PhoneMissed, MessageSquare, Star, Bot, Zap } from 'lucide-react';

export function RecurringAddons() {
  const [activeTab, setActiveTab] = useState('mctb');

  const addons = [
    {
      id: 'mctb',
      title: 'Missed Call Text Back',
      icon: PhoneMissed,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Instantly text back any caller the business misses. The easiest foot-in-the-door offer.',
      pitch: '"Did you know 62% of calls to small businesses go unanswered? If you miss a call from a new customer, they just call the next plumber on Google. We set up a system that instantly texts them: \'Hey, sorry we missed your call! How can we help you today?\' This saves 3-5 lost jobs a month."',
      pricing: '$197 - $297 / month',
      techStack: 'GoHighLevel (GHL) or Twilio + Make.com',
      steps: [
        'Buy a Twilio phone number for the client.',
        'Forward the Twilio number to their actual cell/office phone.',
        'Set up an automation: IF call status = "no-answer" OR "busy", THEN send SMS.',
        'SMS Body: "Hey this is [Business Name], sorry we missed you! Are you looking for a quote?"'
      ]
    },
    {
      id: 'reactivation',
      title: 'Database Reactivation',
      icon: Star,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      description: 'Text their old customers to generate immediate cash flow and 5-star Google reviews.',
      pitch: '"You probably have hundreds of old customers sitting in a spreadsheet or your phone. We can run an AI SMS campaign offering them a \'Spring Tune-Up Special\' or simply asking for a Google Review if they were happy with your past work. It costs you nothing in ad spend and generates jobs this week."',
      pricing: '$500 one-time setup + $197 / month',
      techStack: 'GoHighLevel or Make.com + Twilio + ChatGPT API',
      steps: [
        'Export their past customer list (Name, Phone).',
        'Clean the list and upload to your CRM/Automation tool.',
        'Draft a 2-way SMS campaign: "Hey [Name], it\'s John from XYZ Plumbing. We\'re doing a $50 off spring special this week. Need anything checked out?"',
        'Use AI to categorize replies (Positive/Negative/Question) and notify the owner.'
      ]
    },
    {
      id: 'webchat',
      title: 'AI Web Chatbot',
      icon: Bot,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      description: 'A website widget that answers FAQs and captures leads 24/7.',
      pitch: '"When people visit your website at 9 PM, they usually leave if they can\'t get an instant answer. We install an AI widget trained on your exact business. It answers their questions instantly and asks for their phone number to book an appointment. It works the night shift for free."',
      pricing: '$297 - $497 / month',
      techStack: 'Voiceflow, Chatbase, or GoHighLevel Webchat',
      steps: [
        'Scrape the client\'s website to build a knowledge base.',
        'Create an AI agent in Voiceflow or Chatbase.',
        'Set the primary goal: Answer question -> Ask for Phone Number -> Send to Owner.',
        'Paste the 1-line Javascript snippet into the header of their website.'
      ]
    }
  ];

  const activeAddon = addons.find(a => a.id === activeTab) || addons[0];
  const Icon = activeAddon.icon;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          <span>The "Sticky" Retainer Strategy</span>
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Recurring Income AI Add-ons</h2>
        <p className="text-zinc-500 mt-2">
          The core course teaches a $1k setup. These are the "Add-ons" that keep clients paying you $300-$500/mo forever.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-3">
          {addons.map((addon) => {
            const AddonIcon = addon.icon;
            const isActive = activeTab === addon.id;
            return (
              <button
                key={addon.id}
                onClick={() => setActiveTab(addon.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center space-x-4 ${
                  isActive 
                    ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500' 
                    : 'bg-zinc-50 border-zinc-200 hover:bg-white hover:border-zinc-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${addon.bgColor} ${addon.color}`}>
                  <AddonIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold ${isActive ? 'text-zinc-900' : 'text-zinc-700'}`}>
                    {addon.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{addon.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="p-8 border-b border-zinc-100 bg-zinc-50/50">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeAddon.bgColor} ${activeAddon.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">{activeAddon.title}</h2>
                <p className="text-zinc-500 font-medium">{activeAddon.pricing}</p>
              </div>
            </div>
            <p className="text-zinc-700 text-lg">{activeAddon.description}</p>
          </div>

          <div className="p-8 space-y-8">
            {/* The Pitch */}
            <div>
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">How to Pitch It</h3>
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 relative">
                <MessageSquare className="absolute top-5 right-5 w-6 h-6 text-indigo-200" />
                <p className="text-indigo-900 font-medium leading-relaxed italic">
                  {activeAddon.pitch}
                </p>
              </div>
            </div>

            {/* The Tech Stack */}
            <div>
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Tech Stack Needed</h3>
              <div className="bg-zinc-100 rounded-xl px-4 py-3 font-mono text-sm text-zinc-800 inline-block">
                {activeAddon.techStack}
              </div>
            </div>

            {/* Implementation Steps */}
            <div>
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Implementation Steps</h3>
              <ul className="space-y-4">
                {activeAddon.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-zinc-700">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
