import React, { useState } from 'react';
import { Bot, Zap, MessageSquare, Code, Terminal, Sparkles, Copy, CheckCircle, BrainCircuit, ShieldAlert, Infinity, Activity, ArrowUpRight, Scale, FileSignature, Briefcase } from 'lucide-react';

export function AIAgentShortcut() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompts = [
    {
      id: 'niche-researcher',
      title: "The 'Niche Deep-Diver' Prompt",
      description: "Use this to have an AI find the 'hidden' pain points of a specific industry.",
      prompt: `Act as a specialized market researcher for the [INSERT NICHE, e.g., HVAC] industry. 

Your goal is to identify the top 5 "invisible" business problems that are costing owners at least $2,000/month in lost revenue or wasted time. 

For each problem:
1. Describe the problem in the owner's language.
2. Quantify the financial loss.
3. Propose an AI-driven solution (e.g., AI Voice Receptionist, Automated Review Management).
4. Write a "hook" sentence I can use in a cold call to grab their attention immediately.`
    },
    {
      id: 'audit-prompt',
      title: "The 'AI Auditor' Prompt",
      description: "Use this to have an AI agent audit a business website and find conversion leaks automatically.",
      prompt: `Act as a world-class conversion rate optimization (CRO) expert and AI automation consultant. 

I am going to provide you with a business name and their website URL. 

Your task is to:
1. Identify 3 specific "conversion leaks" (e.g., no missed call text back, no chatbot, slow load times, poor mobile experience).
2. For each leak, explain WHY it is costing them money (be specific about lost revenue).
3. Provide a 1-sentence "fix" using an AI tool (e.g., "Implement an AI Webchat widget using <a href="https://www.gohighlevel.com/" target="_blank" class="text-purple-300 underline">GoHighLevel</a> to capture leads 24/7").

Business: [INSERT BUSINESS NAME]
URL: [INSERT WEBSITE URL]

Output the result in a professional, punchy format suitable for a cold outreach email.`
    },
    {
      id: 'make-scenario',
      title: "The 'Make.com Architect' Prompt",
      description: "Use this to have an AI agent write the logic for your Make.com scenarios.",
      prompt: `I want to build an automation in <a href="https://www.make.com/" target="_blank" class="text-purple-300 underline">Make.com</a>. 

The workflow is:
1. Trigger: A Webhook receives lead data (Name, Email, Website) from <a href="https://www.apollo.io/" target="_blank" class="text-purple-300 underline">Apollo.io</a>.
2. Action: Send the Website URL to <a href="https://openai.com/" target="_blank" class="text-purple-300 underline">OpenAI</a> (GPT-4o).
3. AI Task: Analyze the website for conversion leaks and write a personalized outreach script.
4. Action: Send that script to <a href="https://instantly.ai/" target="_blank" class="text-purple-300 underline">Instantly.ai</a> to start a new lead campaign.

Can you explain exactly how to configure each module, what the JSON structure should look like for the OpenAI prompt, and how to map the variables between modules?`
    },
    {
      id: 'lead-scraper',
      title: "The 'Lead Intelligence' Prompt",
      description: "Use this to have an AI find high-intent leads based on specific triggers.",
      prompt: `Act as an OSINT (Open Source Intelligence) expert. 

I want to find businesses in [CITY] that meet these criteria:
1. They are [NICHE, e.g., Law Firms].
2. They have a 3.5-star rating or lower on <a href="https://www.google.com/maps" target="_blank" class="text-purple-300 underline">Google Maps</a>.
3. They haven't posted on their <a href="https://www.facebook.com/" target="_blank" class="text-purple-300 underline">Facebook</a> page in over 3 months.

Explain the step-by-step process to find these leads using free tools (Google Maps, Facebook) or paid tools (<a href="https://www.apollo.io/" target="_blank" class="text-purple-300 underline">Apollo</a>, <a href="https://phantombuster.com/" target="_blank" class="text-purple-300 underline">PhantomBuster</a>). Then, write a script I can use to offer them an "AI Reputation Management" system.`
    },
    {
      id: 'vapi-config',
      title: "The 'Voice AI Engineer' Prompt",
      description: "Use this to have an AI agent configure your Vapi.ai or Bland.ai phone agents.",
      prompt: `Act as an AI Voice Engineer. I am building a Voice AI Receptionist for a [INSERT NICHE, e.g., Plumbing] business using <a href="https://vapi.ai/" target="_blank" class="text-purple-300 underline">Vapi.ai</a> or <a href="https://www.bland.ai/" target="_blank" class="text-purple-300 underline">Bland.ai</a>.

The AI needs to:
1. Greet the caller professionally.
2. Ask for their name and the reason for their call.
3. Check a Google Calendar for availability (via a Function Call/Webhook).
4. Book the appointment if a slot is open.
5. Handle common objections like "How much do you charge?" by saying "Our technician needs to see the job first to give an accurate quote."

Write the System Instruction/Prompt for this AI agent and define the JSON schema for the 'book_appointment' function call.`
    },
    {
      id: 'self-healing',
      title: "The 'Self-Healing System' Prompt",
      description: "CRITICAL FOR LONG-TERM: Build error handling so your automations never silently fail.",
      prompt: `Act as a Senior DevOps Engineer. I am running critical client automations on <a href="https://www.make.com/" target="_blank" class="text-purple-300 underline">Make.com</a> and <a href="https://zapier.com/" target="_blank" class="text-purple-300 underline">Zapier</a>. If an API fails, I lose client trust and MRR.

Explain step-by-step how to build a "Self-Healing" architecture. Include:
1. How to set up Error Handlers (Break/Ignore/Resume directives).
2. How to build a fallback webhook if the primary AI model (e.g., OpenAI) goes down.
3. How to automatically send a Slack/Discord alert to my phone with the exact error payload so I can fix it before the client notices.`
    },
    {
      id: 'client-retention',
      title: "The 'Sticky Client' ROI Reporter",
      description: "LONG-TERM MRR: Automate weekly value proof so clients never cancel.",
      prompt: `Act as a Customer Success Expert for an AI Agency. I need to build an automated weekly ROI report for my clients using <a href="https://www.make.com/" target="_blank" class="text-purple-300 underline">Make.com</a>. 

The report needs to pull data from <a href="https://www.gohighlevel.com/" target="_blank" class="text-purple-300 underline">GoHighLevel</a> showing: 
1. AI Conversations handled.
2. Appointments booked by AI.
3. Estimated pipeline value generated.

Write the exact email template this automation should send every Friday at 4 PM. Explain how to format the data so the client feels immense value and never wants to cancel their $500/mo subscription.`
    },
    {
      id: 'agency-autopilot',
      title: "The 'Agency Autopilot' Onboarding",
      description: "SCALE: Automate your own agency's onboarding so you can handle 50+ clients.",
      prompt: `Act as an Agency Operations Director. I want to achieve "Zero-Touch Onboarding" for my AI Automation Agency.

When a client pays via <a href="https://stripe.com/" target="_blank" class="text-purple-300 underline">Stripe</a>, I want an automation to:
1. Create a dedicated Google Drive folder for them.
2. Send a personalized welcome email with a Typeform intake link.
3. Provision a sub-account in <a href="https://www.gohighlevel.com/" target="_blank" class="text-purple-300 underline">GoHighLevel</a>.
4. Alert my team in Slack.

Map out this exact Make.com scenario. What modules do I need, and what data needs to be mapped between them to make this work flawlessly without human intervention?`
    },
    {
      id: 'legal-contract',
      title: "The 'Ironclad AI' Contract",
      description: "PROTECTION: Generate a Master Services Agreement (MSA) with AI-specific liability clauses.",
      prompt: `Act as a SaaS and Technology Attorney. I am running an AI Automation Agency building chatbots and voice agents for local businesses.

Draft the critical clauses for a Master Services Agreement (MSA) that protects me from:
1. AI Hallucinations (e.g., the AI promises a customer a refund or discount I didn't authorize).
2. Third-Party API Downtime (e.g., <a href="https://openai.com/" target="_blank" class="text-purple-300 underline">OpenAI</a> or <a href="https://www.make.com/" target="_blank" class="text-purple-300 underline">Make.com</a> goes down, and the bot stops working).
3. Data Privacy & Compliance (e.g., HIPAA for doctors, or general GDPR/CCPA compliance for lead capture).

Write these clauses in plain English but ensure they are legally binding. Also, outline what a standard "Service Level Agreement" (SLA) should look like for a $500/mo AI retainer.`
    },
    {
      id: 'closing-proposal',
      title: "The 'No-Brainer' Proposal",
      description: "CLOSING: Structure a high-converting proposal that justifies your setup fee and MRR.",
      prompt: `Act as a B2B Enterprise Sales Director. I am pitching a [INSERT NICHE] business an AI Lead Generation system. 

I charge a $1,500 setup fee and $500/month for maintenance and optimization.

Write a 1-page proposal structure that:
1. Frames the setup fee as an "Infrastructure Investment" rather than a cost.
2. Justifies the $500/mo MRR by explaining the ongoing value (API costs, prompt optimization, A/B testing, server maintenance).
3. Includes a "Risk Reversal" guarantee (e.g., "If the AI doesn't book 5 meetings in the first 30 days...").
4. Outlines the exact next steps to close the deal and collect the signature via <a href="https://www.docusign.com/" target="_blank" class="text-purple-300 underline">DocuSign</a> or <a href="https://pandadoc.com/" target="_blank" class="text-purple-300 underline">PandaDoc</a>.`
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8 lg:space-y-12">
      <header>
        <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Bot className="w-4 h-4" />
          <span>The AI Co-Pilot</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight">The Agent Shortcut</h2>
        <p className="text-zinc-500 mt-2 text-base lg:text-lg max-w-3xl">
          You don't need to learn everything yourself. Use an AI Agent (like ChatGPT, Claude, or me) as your Co-Pilot to build these systems for you.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: The Strategy */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center">
              <BrainCircuit className="w-5 h-5 mr-2 text-purple-500" />
              How to use an Agent
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <div>
                  <p className="font-bold text-sm">Define the Role</p>
                  <p className="text-xs text-zinc-500 mt-1">Tell the AI it is an "AI Automation Expert" or "Voice Engineer".</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                <div>
                  <p className="font-bold text-sm">Give the Context</p>
                  <p className="text-xs text-zinc-500 mt-1">Explain the business model (e.g., "I am building a lead gen bot for plumbers").</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                <div>
                  <p className="font-bold text-sm">Ask for the "How"</p>
                  <p className="text-xs text-zinc-500 mt-1">Ask for step-by-step instructions, code snippets, or API configurations.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-amber-400" />
              The "Agent Loop"
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              If you get stuck, copy the error message from Make.com or Vapi and paste it back into the AI. 
              <br /><br />
              Ask: <span className="text-white font-mono italic">"I got this error: [ERROR]. How do I fix it?"</span>
              <br /><br />
              The AI will debug the system for you in seconds.
            </p>
          </div>

          <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-indigo-500" />
              AI "Employee" Roles
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-indigo-700">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                <span><strong>The Researcher:</strong> Finds niches & pain points.</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-indigo-700">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                <span><strong>The Architect:</strong> Builds Make.com logic.</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-indigo-700">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                <span><strong>The Copywriter:</strong> Writes outreach scripts.</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-indigo-700">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                <span><strong>The Debugger:</strong> Fixes API & code errors.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: The Prompts */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-bold text-zinc-900 flex items-center">
            <Terminal className="w-6 h-6 mr-2 text-indigo-500" />
            Copy-Paste Prompt Library
          </h3>
          
          <div className="space-y-6">
            {prompts.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden group hover:border-purple-300 transition-colors">
                <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                  <div>
                    <h4 className="font-bold text-zinc-900">{p.title}</h4>
                    <p className="text-xs text-zinc-500">{p.description}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(p.id, p.prompt)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      copiedId === p.id
                        ? 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                        : 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 shadow-sm'
                    }`}
                  >
                    {copiedId === p.id ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId === p.id ? 'Copied!' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <div className="p-6 bg-zinc-950">
                  <pre className="text-zinc-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                    {p.prompt}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2rem] p-10 border border-zinc-200 shadow-sm">
          <h3 className="text-2xl font-black text-zinc-900 mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-amber-500" />
            The "Autonomous" Workflow
          </h3>
          <p className="text-zinc-500 leading-relaxed mb-6">
            Instead of asking the AI for one thing at a time, you can give it a "Goal" and let it figure out the steps.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <p className="text-sm font-bold text-zinc-900">Example Goal:</p>
              <p className="text-sm text-zinc-600 italic mt-1">"Find 10 solar companies in Miami, check if they have a chatbot, and write a personalized email to each owner."</p>
            </div>
            <p className="text-xs text-zinc-400">
              To do this, you use <strong>Make.com</strong> as the "Body" and <strong>OpenAI</strong> as the "Brain". The Brain decides what to do, and the Body executes the API calls.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-[2rem] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <h3 className="text-2xl font-black mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-indigo-400" />
            Function Calling 101
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            This is how AI agents actually <strong>DO</strong> things. You give the AI a "tool" (like a Google Calendar link) and tell it: "If the user wants to book, use this tool."
          </p>
          <div className="bg-zinc-800 rounded-2xl p-4 font-mono text-[10px] text-indigo-300">
            {`{
  "name": "book_appointment",
  "description": "Books a slot in the CRM",
  "parameters": {
    "type": "object",
    "properties": {
      "date": { "type": "string" },
      "time": { "type": "string" }
    }
  }
}`}
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <h3 className="text-3xl font-black flex items-center">
            <ShieldAlert className="w-8 h-8 mr-3 text-amber-400" />
            Safety, Scaling & Costs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700">
              <h4 className="font-bold mb-2">Data Privacy</h4>
              <p className="text-xs text-zinc-400">NEVER paste real client data (names, emails, addresses) into public AI tools. Anonymize everything first.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700">
              <h4 className="font-bold mb-2">Cost Control</h4>
              <p className="text-xs text-zinc-400">Set usage limits on <a href="https://platform.openai.com/" target="_blank" className="text-indigo-400 underline">OpenAI</a> and <a href="https://www.make.com/" target="_blank" className="text-indigo-400 underline">Make.com</a>. Start small to avoid surprise bills.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700">
              <h4 className="font-bold mb-2">Test First</h4>
              <p className="text-xs text-zinc-400">Always run automations on a "test lead" (your own email) before sending to real prospects.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-800 px-4 py-1 rounded-full text-sm font-bold border border-emerald-700">
            <Infinity className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-100">The Flywheel Effect</span>
          </div>
          <h3 className="text-3xl font-black flex items-center">
            The Long Game: Building a Self-Sustaining Agency
          </h3>
          <p className="text-emerald-100/80 text-lg leading-relaxed max-w-3xl">
            Getting a client is a hustle. Keeping a client is a system. If you want to build a business that runs without you, you must automate your own operations and prove ROI automatically.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-emerald-950/50 p-6 rounded-2xl border border-emerald-800/50 hover:border-emerald-500/50 transition-colors">
              <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center mb-4">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="font-bold mb-2 text-emerald-50">1. Self-Healing Systems</h4>
              <p className="text-xs text-emerald-200/70">Automations break. If an API fails, your Make.com scenario should catch the error, retry, and Slack you instantly. Never let a client find the bug first.</p>
            </div>
            
            <div className="bg-emerald-950/50 p-6 rounded-2xl border border-emerald-800/50 hover:border-emerald-500/50 transition-colors">
              <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center mb-4">
                <ArrowUpRight className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="font-bold mb-2 text-emerald-50">2. Automated Value Proof</h4>
              <p className="text-xs text-emerald-200/70">Clients churn when they forget what you do. Automate a weekly email that pulls data from GoHighLevel showing exactly how many leads your AI caught.</p>
            </div>
            
            <div className="bg-emerald-950/50 p-6 rounded-2xl border border-emerald-800/50 hover:border-emerald-500/50 transition-colors">
              <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="font-bold mb-2 text-emerald-50">3. Zero-Touch Onboarding</h4>
              <p className="text-xs text-emerald-200/70">When a client pays, Stripe should trigger an automation that creates their Drive folder, sends intake forms, and provisions their software accounts automatically.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 bg-slate-800 px-4 py-1 rounded-full text-sm font-bold border border-slate-700">
            <Scale className="w-4 h-4 text-blue-400" />
            <span className="text-blue-100">Protecting The House</span>
          </div>
          <h3 className="text-3xl font-black flex items-center">
            Legal, Contracts & Closing
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
            AI is unpredictable. If your bot hallucinates and promises a customer a 90% discount, who pays for it? You need ironclad contracts, clear Service Level Agreements (SLAs), and professional closing documents.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mb-4 border border-slate-700">
                <FileSignature className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="font-bold mb-2 text-slate-50">Master Services Agreement (MSA)</h4>
              <p className="text-xs text-slate-400">Never start work without an MSA. You must include "Hallucination Clauses" stating you are not liable for generative AI outputs, and "Uptime Clauses" protecting you when OpenAI or Make.com goes down.</p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center mb-4 border border-slate-700">
                <Briefcase className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="font-bold mb-2 text-slate-50">The Closing Proposal</h4>
              <p className="text-xs text-slate-400">Use <a href="https://pandadoc.com/" target="_blank" className="text-blue-400 underline">PandaDoc</a> or <a href="https://www.docusign.com/" target="_blank" className="text-blue-400 underline">DocuSign</a> to send professional proposals. Frame your setup fee as "Infrastructure" and justify your MRR with ongoing prompt engineering, API costs, and server maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-purple-600 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-purple-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-1 rounded-full text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            <span>The Honest Truth</span>
          </div>
          <h3 className="text-4xl font-black">Can an AI Agent do this for you?</h3>
          <p className="text-purple-100 text-lg leading-relaxed">
            <strong className="text-white">Yes, but you are the Architect.</strong>
            <br /><br />
            The AI can write the code, configure the APIs, and debug the errors. But it doesn't know WHO to target or WHAT to sell unless you tell it. 
            <br /><br />
            Use this app to learn the <span className="text-white font-bold">Strategy</span>, and use the AI Agent to handle the <span className="text-white font-bold">Execution</span>. That is the ultimate unfair advantage.
          </p>
        </div>
      </section>
    </div>
  );
}
