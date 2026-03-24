import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, Circle, Play, Target, Wrench, Video, PhoneCall } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Phase {
  id: string;
  title: string;
  icon: React.ElementType;
  tasks: Task[];
}

const PHASES: Phase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: The Foundation (Day 1)',
    icon: Wrench,
    tasks: [
      { id: 't1', title: 'Pick ONE Beginner Niche', description: 'Choose a simple local niche like Plumbers, Roofers, or Med Spas. Do not overthink this.' },
      { id: 't2', title: 'Create a Free Voiceflow Account', description: 'Sign up for Voiceflow.com. This is where you will build your first AI chatbot.' },
    ]
  },
  {
    id: 'phase-2',
    title: 'Phase 2: The Hitlist (Day 2)',
    icon: Target,
    tasks: [
      { id: 't3', title: 'Find 10 Local Businesses', description: 'Use Google Maps to find 10 businesses in your niche that DO NOT have a chat widget on their site.' },
      { id: 't4', title: 'Find the Decision Maker', description: 'Find the owner\'s name and email address for each of the 10 businesses.' },
    ]
  },
  {
    id: 'phase-3',
    title: 'Phase 3: The Bait (Day 3)',
    icon: Play,
    tasks: [
      { id: 't5', title: 'Pick Your Top 3 Targets', description: 'Select the 3 businesses from your list that have the most website traffic or best reviews.' },
      { id: 't6', title: 'Build 3 Custom Demo Bots', description: 'Spend 30 minutes building a simple FAQ chatbot for each of the 3 businesses using their website data.' },
    ]
  },
  {
    id: 'phase-4',
    title: 'Phase 4: The Hook (Day 4)',
    icon: Video,
    tasks: [
      { id: 't7', title: 'Record 3 Loom Videos', description: 'Record a 2-minute screen recording showing their custom bot answering questions.' },
      { id: 't8', title: 'Send the "Puppy Dog" Pitch', description: 'Email them: "Hey [Name], I built an AI assistant for [Business]. Here is a demo. Can I give this to you for free for 14 days?"' },
    ]
  },
  {
    id: 'phase-5',
    title: 'Phase 5: The Close (Day 5-14)',
    icon: PhoneCall,
    tasks: [
      { id: 't9', title: 'The Onboarding Call', description: 'Get them on a 15-minute Zoom call to show them how to install the code snippet on their site.' },
      { id: 't10', title: 'The 14-Day Check-in', description: 'After 14 days, show them the leads the bot captured.' },
      { id: 't11', title: 'Collect Your First Payment!', description: 'Pitch the $197/mo retainer to keep the bot running. You got your first client!' },
    ]
  }
];

export function FirstSaleJourney() {
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    const saved = localStorage.getItem('firstSaleProgress');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('firstSaleProgress', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const totalTasks = PHASES.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const progressPercentage = Math.round((completedTasks.length / totalTasks) * 100);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="border-b border-zinc-200 pb-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
          <Trophy className="w-4 h-4" />
          <span>The Beginner's Path</span>
        </div>
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight">0 to 1st Sale Tracker</h2>
        <p className="text-zinc-500 mt-3 text-lg max-w-2xl mx-auto">
          Don't get overwhelmed. Follow this exact step-by-step checklist to land your very first paying client within the next 14 days.
        </p>
      </header>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm sticky top-4 z-10">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Your Progress</h3>
            <p className="text-xs text-zinc-500">{completedTasks.length} of {totalTasks} steps completed</p>
          </div>
          <span className="text-2xl font-black text-indigo-600">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-zinc-100 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {progressPercentage === 100 && (
          <div className="mt-4 bg-emerald-50 text-emerald-700 p-3 rounded-xl text-sm font-bold flex items-center justify-center">
            <Trophy className="w-5 h-5 mr-2" />
            Congratulations! You've completed the roadmap to your first sale!
          </div>
        )}
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {PHASES.map((phase, index) => {
          const Icon = phase.icon;
          const isPhaseComplete = phase.tasks.every(t => completedTasks.includes(t.id));
          
          return (
            <div key={phase.id} className={`bg-white rounded-2xl border transition-all duration-300 ${isPhaseComplete ? 'border-emerald-200 shadow-sm' : 'border-zinc-200 shadow-sm'}`}>
              <div className={`p-5 border-b flex items-center space-x-3 rounded-t-2xl ${isPhaseComplete ? 'bg-emerald-50/50 border-emerald-100' : 'bg-zinc-50/50 border-zinc-100'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPhaseComplete ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
                  {isPhaseComplete ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <h3 className={`text-xl font-bold ${isPhaseComplete ? 'text-emerald-900' : 'text-zinc-900'}`}>
                  {phase.title}
                </h3>
              </div>
              
              <div className="p-2">
                {phase.tasks.map(task => {
                  const isCompleted = completedTasks.includes(task.id);
                  return (
                    <div 
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-start p-4 rounded-xl cursor-pointer transition-colors hover:bg-zinc-50 ${isCompleted ? 'opacity-60' : ''}`}
                    >
                      <button className="mt-0.5 shrink-0 focus:outline-none">
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-zinc-300 hover:text-indigo-400 transition-colors" />
                        )}
                      </button>
                      <div className="ml-4">
                        <h4 className={`font-bold text-base ${isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-900'}`}>
                          {task.title}
                        </h4>
                        <p className={`text-sm mt-1 ${isCompleted ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          {task.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
