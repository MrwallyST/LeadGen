import React from 'react';
import { GraduationCap, Wallet, Server, Code, ArrowRight, CheckCircle2, Database, Mic, ShieldAlert, Trophy, Brain, Globe, Sparkles, Handshake } from 'lucide-react';

export function Execution101() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="border-b border-zinc-200 pb-8">
        <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>Step-by-Step Tutorials</span>
        </div>
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Execution 101 & Budget</h2>
        <p className="text-zinc-500 mt-3 text-lg max-w-3xl">
          How to actually build the Demon Mode and Money Maker systems. Plus, a breakdown of exactly how far your $20 Gemini and $300 Vertex AI credits will take you.
        </p>
      </header>

      {/* Budget Section */}
      <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
            <Wallet className="w-6 h-6 text-emerald-400" />
            <span>The Budget Truth: Is $20 Gemini + $300 Vertex Enough?</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800">
              <h4 className="text-lg font-bold text-blue-400 mb-2">1. Gemini Advanced ($20/mo)</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                This is your <strong>Co-Founder and Lead Developer</strong>. You don't use this to run the actual agency automations. You use this to write the code, brainstorm strategies, write your cold email scripts, and troubleshoot errors when building your systems.
              </p>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> <span>Writing Python/Node.js scripts</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> <span>Generating sales copy</span></li>
              </ul>
            </div>

            <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800">
              <h4 className="text-lg font-bold text-emerald-400 mb-2">2. Vertex AI ($300 Credits)</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                This is your <strong>Engine</strong>. $300 in Google Cloud credits is MASSIVE. Gemini 1.5 Flash via the API costs fractions of a cent per 1,000 tokens. $300 will process <strong>hundreds of millions of words</strong>.
              </p>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> <span>Powers your Enterprise RAG databases</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> <span>Generates 10,000+ personalized cold emails</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> <span>Enough to run 3-5 paying clients for months</span></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-emerald-400 text-sm font-medium">
              <strong>Verdict: YES.</strong> You have more than enough firepower to build a $10k/mo agency before you ever have to pay out of pocket for API costs. Use free tiers for the rest (Make.com free tier, Pinecone free tier).
            </p>
          </div>
        </div>
      </div>

      {/* 101 Tutorials */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-zinc-900 mt-8 mb-4">Execution 101: How to actually build them</h3>

        {/* Tutorial 1 */}
        <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-zinc-900">101: Enterprise RAG ($15k Setup)</h4>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-600"><strong>The Goal:</strong> Build an internal AI that knows every PDF and SOP a company owns.</p>
            <div className="pl-4 border-l-2 border-purple-200 space-y-4">
              <div>
                <strong className="text-zinc-900 block">Step 1: The No-Code Builder (Flowise)</strong>
                <span className="text-zinc-600 text-sm">Don't code it from scratch. Download <a href="https://flowiseai.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">FlowiseAI</a> (it's free and open-source). It gives you a drag-and-drop canvas to build LangChain apps.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 2: The Brain (Vertex AI)</strong>
                <span className="text-zinc-600 text-sm">In Flowise, drag in the "ChatVertexAI" node. Plug in your Google Cloud credentials. This uses your $300 credits.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 3: The Memory (Pinecone)</strong>
                <span className="text-zinc-600 text-sm">Create a free account on <a href="https://www.pinecone.io" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Pinecone.io</a> (Vector Database). Drag the Pinecone node into Flowise.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 4: Upload & Embed</strong>
                <span className="text-zinc-600 text-sm">Drag a "PDF Document Loader" node into Flowise. Upload the client's 500-page manual. Flowise automatically chops it up, turns it into numbers (embeddings), and saves it to Pinecone.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 5: Deliver</strong>
                <span className="text-zinc-600 text-sm">Flowise gives you a simple snippet of HTML code. Paste that into the client's internal website. Done.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial 2 */}
        <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-zinc-900">101: The Infinite Lead Machine</h4>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-600"><strong>The Goal:</strong> Send 1,000 hyper-personalized cold emails a day automatically.</p>
            <div className="pl-4 border-l-2 border-rose-200 space-y-4">
              <div>
                <strong className="text-zinc-900 block">Step 1: The Data (Apollo.io)</strong>
                <span className="text-zinc-600 text-sm">Use <a href="https://www.apollo.io" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Apollo's</a> free tier to export a list of 1,000 local business owners (Name, Email, LinkedIn URL, Company Website). Save to Google Sheets.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 2: The Automation (Make.com)</strong>
                <span className="text-zinc-600 text-sm">Create a free <a href="https://www.make.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Make.com</a> account. Create a scenario: "Watch Google Sheets for new rows".</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 3: The AI Personalization (Vertex AI)</strong>
                <span className="text-zinc-600 text-sm">Add a "Google Vertex AI" module in Make.com. Pass the prospect's website/LinkedIn to it with this prompt: <em>"Write a casual, 1-sentence compliment about this company's recent work. Do not sound like a robot."</em></span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 4: The Sender (Smartlead.ai)</strong>
                <span className="text-zinc-600 text-sm">Make.com saves the AI-generated sentence back to the Google Sheet. Import that sheet into <a href="https://www.smartlead.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Smartlead.ai</a>. Your email template looks like: <em>"Hey {'{Name}'}, {'{AI_Compliment}'}. I noticed your site doesn't have a chatbot..."</em></span>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial 3 */}
        <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-zinc-900">101: Voice AI Receptionist</h4>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-600"><strong>The Goal:</strong> Build an AI that answers phone calls with a human voice.</p>
            <div className="pl-4 border-l-2 border-sky-200 space-y-4">
              <div>
                <strong className="text-zinc-900 block">Step 1: The Platform (Vapi.ai)</strong>
                <span className="text-zinc-600 text-sm">Go to <a href="https://vapi.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Vapi.ai</a> (or <a href="https://www.bland.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Bland.ai</a>). They give you $10 free credit. You don't need to code the audio streaming yourself; they handle the hard part (Speech-to-Text and Text-to-Speech).</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 2: The Prompt</strong>
                <span className="text-zinc-600 text-sm">In Vapi, you just type a system prompt: <em>"You are Sarah, the receptionist for Austin Plumbing. Your goal is to book an appointment. Be friendly and concise."</em></span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 3: The Brain (Vertex AI)</strong>
                <span className="text-zinc-600 text-sm">In Vapi's settings, you can select which LLM powers the brain. You can plug in your Google Cloud API key to use Gemini 1.5 Flash (super fast, great for voice).</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 4: The Phone Number</strong>
                <span className="text-zinc-600 text-sm">Buy a <a href="https://www.twilio.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Twilio</a> phone number ($1/mo). Connect it to Vapi. Call the number from your cell phone to test it. Sell it to a plumber for $1,500 setup + $500/mo.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial 4: The "No-Code" Website */}
        <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-zinc-900">101: The "No-Code" Landing Page</h4>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-600"><strong>The Goal:</strong> Build a professional website in 10 minutes without writing a single line of code.</p>
            <div className="pl-4 border-l-2 border-emerald-200 space-y-4">
              <div>
                <strong className="text-zinc-900 block">Step 1: The AI Builder (Framer or Carrd)</strong>
                <span className="text-zinc-600 text-sm">Use <a href="https://www.framer.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Framer AI</a>, <a href="https://carrd.co" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Carrd</a>, or <a href="https://10web.io" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">10Web</a>. You just type "I need a landing page for an AI automation agency for plumbers" and it generates the layout, images, and copy for you.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 2: Customize with Gemini</strong>
                <span className="text-zinc-600 text-sm">If the AI-generated copy is generic, ask Gemini: <em>"Write a high-converting headline for a plumber who is losing $10k/mo because they don't answer their phone."</em> Paste that into your builder.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 3: The "Magic" Link</strong>
                <span className="text-zinc-600 text-sm">Connect your <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Calendly</a> link to the main button. This is how you book meetings. No complex forms needed.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 4: Domain & Launch</strong>
                <span className="text-zinc-600 text-sm">Buy a domain on <a href="https://www.namecheap.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Namecheap</a> ($10/year). Connect it to Framer (or Carrd). You now have a professional presence that looks like a $5k agency.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial 5: The AI Audit Lead Magnet */}
        <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-zinc-900">101: The "AI Audit" Lead Magnet</h4>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-600"><strong>The Goal:</strong> Create a free tool that generates a custom AI report for any business.</p>
            <div className="pl-4 border-l-2 border-amber-200 space-y-4">
              <div>
                <strong className="text-zinc-900 block">Step 1: The Input (Typeform or Google Forms)</strong>
                <span className="text-zinc-600 text-sm">Create a simple form asking for their website URL and their biggest business problem using <a href="https://www.typeform.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Typeform</a> or Google Forms.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 2: The Brain (Make.com + Gemini)</strong>
                <span className="text-zinc-600 text-sm">In Make.com, watch for new form submissions. Send the website URL to Gemini with the prompt: <em>"Audit this website for AI automation opportunities. Find 3 specific areas where they are losing money."</em></span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 3: The PDF Generator (Google Docs or PDF.co)</strong>
                <span className="text-zinc-600 text-sm">Use the "Google Docs: Create a Document from Template" module in Make.com. Fill in the AI-generated audit into a professional-looking template using <a href="https://pdf.co" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">PDF.co</a>.</span>
              </div>
              <div>
                <strong className="text-zinc-900 block">Step 4: The Delivery</strong>
                <span className="text-zinc-600 text-sm">Automatically email the PDF to the prospect. This is your "Foot in the Door." They will be blown away by the value and book a call to hear more.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Common Pitfalls Section */}
      <section className="bg-amber-50 rounded-3xl p-8 border border-amber-200 mt-12">
        <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center space-x-3">
          <ShieldAlert className="w-6 h-6 text-amber-600" />
          <span>Common Pitfalls & Things to Know</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-1">!</div>
              <div>
                <h4 className="font-bold text-amber-900">The "Spam Folder" Trap</h4>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Never send cold emails from your main business domain (e.g., youragency.com). If you get marked as spam, your company's actual emails will stop delivering. Always buy secondary domains (e.g., getyouragency.com).
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-1">!</div>
              <div>
                <h4 className="font-bold text-amber-900">The "API Cost" Surprise</h4>
                <p className="text-sm text-amber-800 leading-relaxed">
                  While $300 credits are huge, some models (like GPT-4o) are 50x more expensive than Gemini 1.5 Flash. Always use <strong>Flash</strong> for high-volume tasks like email personalization.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-1">!</div>
              <div>
                <h4 className="font-bold text-amber-900">The "No-Code" Limit</h4>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Make.com and Zapier are great, but they can get expensive as you scale. Once you're sending 10,000+ leads, consider hiring a developer to write a custom Python script to save $500/mo in automation fees.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-1">!</div>
              <div>
                <h4 className="font-bold text-amber-900">The "Legal" Reality</h4>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Always include an "Unsubscribe" link in your cold emails. It's not just polite—it's the law (CAN-SPAM Act). Failing to do this can get your domains blacklisted permanently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Other Stuff Section */}
      <section className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm mt-12">
        <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center space-x-3">
          <Handshake className="w-6 h-6 text-indigo-500" />
          <span>The "Other Stuff" (Admin & Legal)</span>
        </h3>
        <p className="text-zinc-600 mb-8">Don't let the administrative side slow you down. Here is the "Minimum Viable Admin" stack.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h4 className="font-bold text-zinc-900 mb-2">1. Payments (Stripe)</h4>
            <p className="text-sm text-zinc-500 mb-4">Don't send invoices manually. Set up a <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Stripe</a> account and create "Payment Links". Send the link, they pay, you get the money. Simple.</p>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Tool: Stripe</div>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h4 className="font-bold text-zinc-900 mb-2">2. Contracts (PandaDoc)</h4>
            <p className="text-sm text-zinc-500 mb-4">Use a simple "Service Agreement" template. <a href="https://www.pandadoc.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">PandaDoc</a> or DocuSign free tiers are enough for your first 5 clients. Keep it to 2 pages max.</p>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Tool: PandaDoc</div>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h4 className="font-bold text-zinc-900 mb-2">3. Communication</h4>
            <p className="text-sm text-zinc-500 mb-4">Don't give out your personal phone number. Use <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Slack</a> for client communication or a dedicated WhatsApp Business account.</p>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Tool: Slack</div>
          </div>
        </div>
      </section>

      {/* Mastery Section */}
      <section className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold">The 1% Mastery Secrets</h3>
            <p className="text-zinc-400 leading-relaxed">
              Once you have the systems, you need the skills. Here is how to master the art of the deal.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-1">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">The "Takeaway" Close</h4>
                  <p className="text-sm text-zinc-400">Never look desperate. If a client is being difficult, tell them you're not sure if they're a fit. They will chase you.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-1">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">The "ROI" Reframe</h4>
                  <p className="text-sm text-zinc-400">Don't sell "AI". Sell "Time" and "Money". If your bot saves them 10 hours a week, that's $1,000+ in value.</p>
                </div>
              </li>
            </ul>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'mastery' }))}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Enter Mastery Mode
            </button>
          </div>
          
          <div className="md:w-1/2 bg-zinc-950 rounded-2xl p-8 border border-zinc-800 shadow-2xl">
            <div className="flex items-center space-x-2 mb-6 text-indigo-400">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-widest">Mindset Shift</span>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-white mb-1">Volume Negates Luck</h4>
                <p className="text-xs text-zinc-500">If you send 10 emails, you're relying on luck. If you send 1,000, you're relying on math. The math always wins.</p>
              </div>
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-white mb-1">Speed is Everything</h4>
                <p className="text-xs text-zinc-500">A lead that is contacted in 5 minutes is 10x more likely to close than one contacted in 1 hour. Automate your first touch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
