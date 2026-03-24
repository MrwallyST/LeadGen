import React, { useState } from 'react';
import { ShieldAlert, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export function Objections() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const objections = [
    {
      title: "It's too expensive ($1,000/mo is a lot)",
      script: "I completely understand. But let's look at the math we just did. You're losing around 5 jobs a month because you can't reply to contact forms while on a roof/under a sink. At $2,000 a job, that's $10,000 a month walking out the door. I'm asking for 10% of what you're already losing to plug the hole permanently. If we just save ONE job a month, the system pays for itself twice over.",
      type: "ROI Focus"
    },
    {
      title: "We already have a receptionist / answering service",
      script: "That's great, and they should absolutely keep handling the phones. But what happens when someone fills out a form on your website at 8 PM on a Tuesday? Or on a Sunday afternoon? 40% of leads come in after hours. My system doesn't replace your receptionist; it works the night shift and weekends for free, ensuring those leads don't go to the competitor who happens to be awake.",
      type: "Complementary"
    },
    {
      title: "I don't trust AI to talk to my customers",
      script: "I wouldn't either if it was just guessing. We don't let it freestyle. We train it strictly on your FAQs, your pricing, and your tone. More importantly, we can set it up as a 'Draft Only' system first. It writes the perfect reply in 2 seconds, and you just click 'Approve' before it sends. Once you trust it, we flip the switch to fully automated.",
      type: "Risk Reversal"
    },
    {
      title: "I need to think about it",
      script: "Absolutely, you should. But while you're thinking, those leads are still going to the guy down the street who replies faster. How about this: let's do a 14-day trial. I'll set it up, we'll run it. If it doesn't book you at least one extra job that pays for the system, we turn it off and we part as friends. Fair enough?",
      type: "Trial Close"
    },
    {
      title: "We get our leads from Angi/HomeAdvisor anyway",
      script: "Exactly. And you're paying $50-$100 for those leads, right? But Angi sends that same lead to 4 other contractors. The first one to reply wins the job 80% of the time. If you're paying for leads but not replying in 5 seconds, you're just subsidizing your competitors' marketing. This system ensures you are ALWAYS the first to reply to the leads you're already paying for.",
      type: "Speed to Lead"
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Objection Handling Cheat Sheet</h2>
        <p className="text-zinc-500 mt-2">Keep this open during your Zoom calls to handle pushback smoothly.</p>
      </header>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start space-x-4 mb-8">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-amber-900">The Golden Rule of Objections</h3>
          <p className="text-amber-800 mt-1 text-sm">
            Never argue. Always agree, validate, and pivot back to the math. "I completely understand why you feel that way. In fact, my last client said the exact same thing before we looked at the numbers..."
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {objections.map((obj, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden transition-all">
            <button 
              className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-zinc-50 transition-colors text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center space-x-4">
                <span className="px-2.5 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-md uppercase tracking-wider">
                  {obj.type}
                </span>
                <span className="font-bold text-zinc-900 text-lg">{obj.title}</span>
              </div>
              {openIndex === i ? (
                <ChevronUp className="w-5 h-5 text-zinc-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-zinc-400" />
              )}
            </button>
            
            {openIndex === i && (
              <div className="px-6 pb-6 pt-2 bg-white">
                <div className="flex items-start space-x-3 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                  <MessageSquare className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-zinc-700 leading-relaxed font-medium">
                    "{obj.script}"
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
