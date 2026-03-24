import React from 'react';
import { Zap, Link, Database, Send, ArrowRight, Settings, Globe, Code } from 'lucide-react';

export function AutomationBlueprint() {
  const steps = [
    {
      title: "Step 1: The Webhook (The 'In' Door)",
      description: "This is how your lead generator talks to Make.com. You need a way to send the data out.",
      icon: Link,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      details: [
        "Create a new Scenario in <a href=\"https://www.make.com\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-indigo-600 hover:underline font-bold\">Make.com</a>.",
        "Add the 'Webhooks' module and select 'Custom Webhook'.",
        "Copy the unique URL Make gives you.",
        "In your lead generator, find the 'Webhook' or 'API' settings and paste that URL."
      ]
    },
    {
      title: "Step 2: The AI Brain (The Audit)",
      description: "Now that Make has the lead data, use AI to find the 'leaks' in their business.",
      icon: Code,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      details: [
        "Add an <a href=\"https://openai.com\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-indigo-600 hover:underline font-bold\">OpenAI</a> module after the Webhook.",
        "Select 'Create a Chat Completion'.",
        "Prompt: 'Audit this business: {{business_name}} at {{website_url}}. Find 3 conversion leaks.'",
        "Map the data from Step 1 into the prompt."
      ]
    },
    {
      title: "Step 3: The Outreach (The 'Out' Door)",
      description: "Automatically send the audit to the prospect via email or CRM.",
      icon: Send,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      details: [
        "Add an <a href=\"https://instantly.ai\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-indigo-600 hover:underline font-bold\">Instantly.ai</a> or 'Gmail' module.",
        "Map the AI-generated audit into the email body.",
        "Set the recipient email to the lead's email from Step 1.",
        "Hit 'Run Once' to test, then 'On' to automate forever."
      ]
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header>
        <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          <span>Automation Masterclass</span>
        </div>
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight">The Make.com Blueprint</h2>
        <p className="text-zinc-500 mt-2 text-lg max-w-3xl">
          You have your own lead generator? Perfect. Here is exactly how to plug it into Make.com to build a self-automated money printer.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 flex flex-col relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 ${step.bgColor} rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${step.bgColor} ${step.color} border border-zinc-100`}>
                <Icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-zinc-900 mb-4">{step.title}</h3>
              <p className="text-zinc-600 text-sm mb-8 leading-relaxed">
                {step.description}
              </p>
              
              <div className="space-y-4 flex-1">
                {step.details.map((detail, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-500 shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <section className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold">"But my lead generator doesn't have Webhooks!"</h3>
            <p className="text-zinc-400 leading-relaxed">
              No problem. If your lead generator only lets you export a CSV, you can still automate it:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-zinc-300">Upload CSV to <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold underline-offset-2">Google Sheets</a>.</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-zinc-300">In <a href="https://www.make.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold underline-offset-2">Make.com</a>, use the <strong>Google Sheets: Watch Rows</strong> module.</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-zinc-300">Every time you add a row, the automation triggers instantly.</span>
              </li>
            </ul>
          </div>
          
      <div className="md:w-1/2 bg-zinc-950 rounded-2xl p-8 border border-zinc-800 shadow-2xl">
            <div className="flex items-center space-x-2 mb-6 text-indigo-400">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-widest">The "API vs Webhook" Truth</span>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-white mb-1">Webhook URL (Most Common)</h4>
                <p className="text-xs text-zinc-500">Most lead generators (like Apollo or custom forms) ask for a <strong>Webhook URL</strong>. You copy this from Make.com and paste it into your generator. It's like a "drop box" for your data.</p>
              </div>
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-white mb-1">API Key (The Key)</h4>
                <p className="text-xs text-zinc-500">If your generator asks for an <strong>API Key</strong>, it's usually to <em>pull</em> data from Make.com or vice-versa. You'll find your Make.com API key in your Profile Settings under 'API'.</p>
              </div>
              <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <p className="text-xs text-indigo-400 font-bold mb-1 uppercase tracking-widest">Pro Tip</p>
                <p className="text-xs text-zinc-400">Always try the <strong>Webhook</strong> first. It's faster, more reliable, and easier to troubleshoot.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
