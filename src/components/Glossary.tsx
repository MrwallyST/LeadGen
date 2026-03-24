import React from 'react';
import { BookOpen, Terminal, Database, Zap, BrainCircuit, MessageSquare, Code, Network } from 'lucide-react';

export function Glossary() {
  const terms = [
    {
      term: "LLM (Large Language Model)",
      icon: BrainCircuit,
      definition: "The 'brain' of the AI. Examples include GPT-4, Gemini 1.5, and Claude 3. They read text and predict the next word to generate responses.",
      analogy: "Think of it as a super-smart college graduate who has read the entire internet but doesn't know anything about your specific client's business yet."
    },
    {
      term: "Prompt Engineering",
      icon: Terminal,
      definition: "The skill of writing instructions for an LLM to get the exact output you want. It involves setting constraints, giving examples, and defining a persona.",
      analogy: "Like giving instructions to a new employee. If you say 'write an email', it will be generic. If you say 'write a 3-sentence email to a plumber offering a free trial, use a casual tone', it will be perfect."
    },
    {
      term: "RAG (Retrieval-Augmented Generation)",
      icon: Database,
      definition: "A technique where you give the AI access to a specific database of documents (like a company's PDFs). The AI 'retrieves' the right info before 'generating' an answer.",
      analogy: "It's like giving the AI an open-book test. Instead of guessing, it looks up the exact answer in the client's manual."
    },
    {
      term: "Vector Database",
      icon: Network,
      definition: "A special type of database (like Pinecone) that stores text as numbers (vectors). It allows the AI to quickly find documents that are 'semantically similar' to a user's question.",
      analogy: "A regular database searches for exact keyword matches. A vector database searches for the *meaning* behind the words."
    },
    {
      term: "API (Application Programming Interface)",
      icon: Code,
      definition: "A way for two different software programs to talk to each other. You use APIs to connect an AI model to a website, a CRM, or a phone number.",
      analogy: "The waiter at a restaurant. You (the app) give the waiter your order (the prompt), the waiter takes it to the kitchen (OpenAI/Google), and brings back the food (the response)."
    },
    {
      term: "Webhook",
      icon: Zap,
      definition: "A way for an app to provide other applications with real-time information. It delivers data immediately as it happens.",
      analogy: "An API is you asking 'Is the mail here yet?'. A webhook is the mailman ringing your doorbell the exact second the mail arrives."
    },
    {
      term: "Make.com / Zapier",
      icon: Zap,
      definition: "No-code automation platforms. They let you connect different apps together using visual drag-and-drop builders instead of writing code.",
      analogy: "Digital plumbing. You connect the 'pipe' from a Facebook Lead Form directly into a Google Sheet, and then into an AI."
    },
    {
      term: "System Prompt",
      icon: MessageSquare,
      definition: "The hidden, foundational instructions given to an AI chatbot that the user never sees. It dictates the AI's personality, rules, and boundaries.",
      analogy: "The 'character sheet' for an actor. It tells the AI: 'You are a helpful assistant for a dental clinic. Never give medical advice. Always try to book an appointment.'"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="border-b border-zinc-200 pb-8">
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Jargon Buster</span>
        </div>
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight">AI Agency Glossary</h2>
        <p className="text-zinc-500 mt-3 text-lg max-w-3xl">
          Confused by the tech jargon? Here is a plain-English translation of every technical term you need to know to run an AI agency.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {terms.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">{item.term}</h3>
            </div>
            <p className="text-zinc-600 mb-4 text-sm leading-relaxed">
              <strong>Definition:</strong> {item.definition}
            </p>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Analogy:</strong> {item.analogy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
