import React from 'react';
import { CheckCircle2, Calendar, ArrowRight, Play } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Landing Page Preview</h2>
          <p className="text-zinc-500 mt-2">Use this template to book strategy calls with local businesses.</p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center space-x-2">
          <span>Copy HTML/React Code</span>
        </button>
      </header>

      {/* Preview Container */}
      <div className="bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden relative">
        {/* Browser Chrome */}
        <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="mx-auto bg-white px-3 py-1 rounded-md text-xs text-zinc-500 w-64 text-center border border-zinc-200 shadow-sm">
            youragency.com
          </div>
        </div>

        {/* Landing Page Content */}
        <div className="bg-zinc-50 min-h-[600px]">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>Accepting 2 new clients this month</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              Stop losing jobs to competitors who reply faster.
            </h1>
            
            <p className="text-xl text-zinc-600 mt-6 max-w-2xl mx-auto">
              We build automated systems for home service businesses that reply to leads in seconds, book appointments automatically, and add $10k+ to your bottom line.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Book a Strategy Call</span>
              </button>
              <button className="w-full sm:w-auto bg-white text-zinc-900 border border-zinc-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-50 transition-colors flex items-center justify-center space-x-2">
                <Play className="w-5 h-5 text-indigo-600" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Social Proof / Features */}
          <div className="bg-white py-20 border-t border-zinc-100">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">Instant Replies</h3>
                  <p className="text-zinc-600">When a lead fills out your form, our system texts them in under 5 seconds. You never miss a hot lead again.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">Automated Booking</h3>
                  <p className="text-zinc-600">Leads book themselves onto your calendar without you lifting a finger. Wake up to a full schedule.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">Guaranteed ROI</h3>
                  <p className="text-zinc-600">If we don't save you time and make you more money in the first 30 days, you don't pay. Simple as that.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fake Calendly Embed */}
          <div className="max-w-4xl mx-auto px-6 py-24">
            <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">Ready to scale?</h2>
              <p className="text-zinc-600 mb-8">Pick a time below for a quick 15-minute discovery call.</p>
              
              <div className="border-2 border-dashed border-zinc-200 rounded-2xl h-96 flex flex-col items-center justify-center bg-zinc-50">
                <Calendar className="w-12 h-12 text-zinc-300 mb-4" />
                <p className="text-zinc-500 font-medium">[ Calendly / Booking Widget Embed Here ]</p>
                <p className="text-sm text-zinc-400 mt-2">Paste your booking link iframe code in this section.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
