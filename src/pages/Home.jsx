import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Trophy, BookOpen, Code2, Layers, Cpu, ChevronRight, Star } from 'lucide-react';
import { topics, roadmap } from '../data/topics';

const stats = [
  { label: 'Topics', value: '10+', icon: BookOpen, color: 'text-brand-500' },
  { label: 'Visualizers', value: '8', icon: Zap, color: 'text-purple-500' },
  { label: 'Quiz Questions', value: '40+', icon: Trophy, color: 'text-amber-500' },
  { label: 'Code Examples', value: '50+', icon: Code2, color: 'text-green-500' },
];

const features = [
  { icon: '🎯', title: 'Visual Learning', desc: 'Watch data structures animate in real-time' },
  { icon: '⚡', title: 'Instant Practice', desc: 'Interactive Try-It sections for every topic' },
  { icon: '🏆', title: '3-Level System', desc: 'Learn → Try → Practice progression' },
  { icon: '💡', title: 'Real-World Context', desc: 'See where each container is used in industry' },
];

export default function Home() {
  const navigate = useNavigate();
  const beginnerTopics = topics.filter(t => t.difficulty === 'Beginner');
  const intermediateTopics = topics.filter(t => t.difficulty === 'Intermediate');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 text-white px-6 py-20 md:py-28">
        {/* BG effects */}
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/30 rounded-full px-4 py-1.5 text-sm text-brand-300 mb-6 font-medium">
            <Star size={14} fill="currentColor" />
            Beginner to Advanced · Interactive Learning
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            Master C++ STL
            <span className="block mt-1 bg-gradient-to-r from-brand-400 to-cyan-300 bg-clip-text text-transparent">
              Standard Template Library
            </span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            The most visual and interactive way to learn C++ STL for 1st and 2nd year students.
            Visualize data structures, practice with code, and master every container.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => navigate('/topic/vector')}
              className="btn-primary flex items-center gap-2 text-base px-6 py-3">
              Start Learning <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('/visualizers')}
              className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-xl transition-all hover:bg-white/10 text-base font-medium">
              <Zap size={18} /> View Visualizers
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="flex items-center gap-3 p-3">
              <s.icon size={22} className={s.color} />
              <div>
                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

        {/* Features */}
        <section>
          <div className="text-center mb-8">
            <h2 className="section-title mb-2">Why This Platform?</h2>
            <p className="text-slate-500 dark:text-slate-400">Built specifically for CS students who want to truly understand STL</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(f => (
              <div key={f.title} className="card card-hover text-center p-6">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Roadmap */}
        <section>
          <div className="mb-8">
            <h2 className="section-title mb-2">Learning Roadmap</h2>
            <p className="text-slate-500 dark:text-slate-400">Follow this path to go from beginner to STL expert</p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-brand-500/50 via-purple-500/50 to-brand-500/50 z-0" />

            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
              {roadmap.map((step) => (
                <div key={step.step} className="card card-hover cursor-pointer group"
                  onClick={() => navigate(`/topic/${step.topics[0]}`)}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-display font-bold mb-3 shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-slate-900 dark:text-white text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{step.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {step.topics.map(tid => {
                      const t = topics.find(x => x.id === tid);
                      return t ? <span key={tid} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">{t.icon} {t.title}</span> : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beginner Topics */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title mb-1">Start Here 🟢</h2>
              <p className="text-slate-500 dark:text-slate-400">Beginner-friendly topics with zero prior knowledge required</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beginnerTopics.map(topic => (
              <TopicCard key={topic.id} topic={topic} onClick={() => navigate(`/topic/${topic.id}`)} />
            ))}
          </div>
        </section>

        {/* Intermediate Topics */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title mb-1">Level Up 🟡</h2>
              <p className="text-slate-500 dark:text-slate-400">Intermediate topics with more power and flexibility</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {intermediateTopics.map(topic => (
              <TopicCard key={topic.id} topic={topic} onClick={() => navigate(`/topic/${topic.id}`)} />
            ))}
          </div>
        </section>

        {/* CTA Cards */}
        <section className="grid md:grid-cols-2 gap-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white cursor-pointer group"
            onClick={() => navigate('/visualizers')}>
            <div className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-30 transition-opacity">⚡</div>
            <Zap size={28} className="mb-3" />
            <h3 className="font-display text-2xl font-bold mb-2">Interactive Visualizers</h3>
            <p className="text-brand-200 text-sm mb-4">Watch Stack, Queue, Vector, Sort and more come to life with step-by-step animations.</p>
            <div className="flex items-center gap-2 text-sm font-semibold">
              Explore Visualizers <ArrowRight size={16} />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-violet-800 p-8 text-white cursor-pointer group"
            onClick={() => navigate('/practice')}>
            <div className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-30 transition-opacity">🏆</div>
            <Trophy size={28} className="mb-3" />
            <h3 className="font-display text-2xl font-bold mb-2">Practice & Quiz</h3>
            <p className="text-purple-200 text-sm mb-4">Test your knowledge with MCQs, output predictions, and fill-in-the-blank challenges across all topics.</p>
            <div className="flex items-center gap-2 text-sm font-semibold">
              Start Practice <ArrowRight size={16} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function TopicCard({ topic, onClick }) {
  return (
    <div onClick={onClick}
      className="card card-hover cursor-pointer group overflow-hidden relative">
      {/* Gradient accent top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${topic.color}`} />

      <div className="flex items-start justify-between mb-3 pt-1">
        <span className="text-3xl">{topic.icon}</span>
        <div className="flex items-center gap-2">
          <span className={`tag ${topic.tagColor}`}>{topic.category}</span>
        </div>
      </div>

      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {topic.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{topic.description}</p>

      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          topic.difficulty === 'Beginner' ? 'bg-green-500/15 text-green-600 dark:text-green-400' :
          topic.difficulty === 'Intermediate' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
          'bg-red-500/15 text-red-600 dark:text-red-400'
        }`}>{topic.difficulty}</span>
        <div className="flex items-center gap-1 text-brand-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
}
