import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, AlertTriangle, Lightbulb, CheckCircle, XCircle, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { topics } from '../data/topics';
import CodeBlock from '../components/CodeBlock';
import TryItSection from '../components/TryItSection';
import { useToast } from '../App';

const levelInfo = [
  { num: 1, label: 'Learn', color: 'bg-green-500', desc: 'Understand the concept' },
  { num: 2, label: 'Try', color: 'bg-brand-500', desc: 'Interact and experiment' },
  { num: 3, label: 'Practice', color: 'bg-purple-500', desc: 'Quiz yourself' },
];

function LevelTabs({ active, onChange }) {
  return (
    <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
      {levelInfo.map(l => (
        <button key={l.num} onClick={() => onChange(l.num)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            active === l.num
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}>
          <span className={`w-5 h-5 rounded-full ${l.color} text-white flex items-center justify-center text-xs font-bold`}>{l.num}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}

function QuizSection({ topic }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const toast = useToast();

  const handleSelect = (qIdx, optIdx) => {
    if (submitted[qIdx] !== undefined) return;
    setAnswers(a => ({ ...a, [qIdx]: optIdx }));
  };

  const handleCheck = (qIdx) => {
    if (answers[qIdx] === undefined) { toast('Please select an answer first!'); return; }
    setSubmitted(s => ({ ...s, [qIdx]: true }));
    if (answers[qIdx] === topic.quiz[qIdx].ans) toast('🎉 Correct! Great job!');
    else toast('❌ Not quite. Try to review the concept.');
  };

  const score = Object.keys(submitted).filter(i => answers[i] === topic.quiz[i].ans).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Quiz: {topic.title}</h3>
        {Object.keys(submitted).length > 0 && (
          <span className="bg-brand-500/15 text-brand-600 dark:text-brand-400 px-3 py-1 rounded-full text-sm font-bold">
            Score: {score}/{Object.keys(submitted).length}
          </span>
        )}
      </div>

      {topic.quiz.map((q, i) => (
        <div key={i} className="card border-2 transition-all duration-300"
          style={{ borderColor: submitted[i] ? (answers[i] === q.ans ? '#22c55e' : '#ef4444') : undefined }}>
          <div className="flex items-start gap-3 mb-4">
            <span className="bg-brand-500/15 text-brand-600 dark:text-brand-400 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">Q{i+1}</span>
            <p className="font-semibold text-slate-900 dark:text-white">{q.q}</p>
          </div>

          <div className="grid gap-2.5 mb-4">
            {q.opts.map((opt, j) => {
              const isSelected = answers[i] === j;
              const isCorrect = submitted[i] && j === q.ans;
              const isWrong = submitted[i] && isSelected && j !== q.ans;

              return (
                <button key={j} onClick={() => handleSelect(i, j)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                    isCorrect ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-300' :
                    isWrong ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300' :
                    isSelected ? 'border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-300' :
                    'border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700 text-slate-700 dark:text-slate-300'
                  } ${submitted[i] ? 'cursor-default' : 'cursor-pointer'}`}>
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold ${
                    isCorrect ? 'border-green-500 bg-green-500 text-white' :
                    isWrong ? 'border-red-500 bg-red-500 text-white' :
                    isSelected ? 'border-brand-500 bg-brand-500 text-white' :
                    'border-current'
                  }`}>
                    {isCorrect ? '✓' : isWrong ? '✗' : String.fromCharCode(65 + j)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {!submitted[i] ? (
            <button onClick={() => handleCheck(i)} className="btn-primary text-sm px-4 py-2">
              Check Answer
            </button>
          ) : (
            <div className={`flex items-center gap-2 text-sm font-medium ${
              answers[i] === q.ans ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {answers[i] === q.ans ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {answers[i] === q.ans ? 'Correct!' : `Correct answer: ${q.opts[q.ans]}`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function TopicPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = topics.find(t => t.id === id);
  const [level, setLevel] = useState(1);
  const [showMethods, setShowMethods] = useState(true);

  if (!topic) return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-4">
      <div className="text-6xl">🔍</div>
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Topic not found</h2>
      <button onClick={() => navigate('/')} className="btn-primary">Go Home</button>
    </div>
  );

  const topicIdx = topics.findIndex(t => t.id === id);
  const prev = topics[topicIdx - 1];
  const next = topics[topicIdx + 1];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Topic Header */}
      <div className={`rounded-2xl bg-gradient-to-br ${topic.color} p-8 text-white mb-8 relative overflow-hidden`}>
        <div className="absolute top-4 right-4 text-7xl opacity-20">{topic.icon}</div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full">{topic.category}</span>
            <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full">{topic.difficulty}</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold mb-2">{topic.title}</h1>
          <p className="text-white/80 text-lg">{topic.description}</p>
          <div className="mt-4 font-mono text-sm bg-black/30 rounded-lg px-4 py-2 w-fit">
            {topic.include}
          </div>
        </div>
      </div>

      {/* Level Tabs */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <LevelTabs active={level} onChange={setLevel} />
        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${levelInfo[level-1].color}`} />
          {levelInfo[level-1].desc}
        </div>
      </div>

      {/* ====== LEVEL 1: LEARN ====== */}
      {level === 1 && (
        <div className="space-y-8 animate-fade-up">
          {/* Explanation */}
          <div className="card">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-green-500/15 text-green-600 dark:text-green-400 flex items-center justify-center text-sm">📖</span>
              What is {topic.title}?
            </h2>
            <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-[15px]">
              {topic.explanation.split('**').map((part, i) =>
                i % 2 === 1
                  ? <strong key={i} className="text-slate-900 dark:text-white font-semibold">{part}</strong>
                  : <span key={i}>{part}</span>
              )}
            </div>
          </div>

          {/* Syntax */}
          <div className="card">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">Syntax</h2>
            <div className="bg-slate-950 dark:bg-black rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400 leading-relaxed">{topic.syntax}</pre>
            </div>
          </div>

          {/* Code Example */}
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">Code Example</h2>
            <CodeBlock code={topic.code} title={`${topic.id}.cpp`} />
          </div>

          {/* Methods */}
          <div className="card">
            <button onClick={() => setShowMethods(m => !m)}
              className="w-full flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Common Methods & Operations
              </h2>
              {showMethods ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
            </button>

            {showMethods && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left font-semibold text-slate-700 dark:text-slate-300 pb-2 pr-4">Method</th>
                      <th className="text-left font-semibold text-slate-700 dark:text-slate-300 pb-2 pr-4">Description</th>
                      <th className="text-left font-semibold text-slate-700 dark:text-slate-300 pb-2">Complexity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {topic.methods.map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-2.5 pr-4 font-mono text-brand-600 dark:text-brand-400 font-medium whitespace-nowrap">{m.name}</td>
                        <td className="py-2.5 pr-4 text-slate-600 dark:text-slate-400">{m.desc}</td>
                        <td className="py-2.5 font-mono text-xs text-amber-600 dark:text-amber-400 whitespace-nowrap">{m.complexity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Use Cases + Real World */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="card">
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>✅</span> When to Use
              </h3>
              <ul className="space-y-2">
                {topic.useCases.map((u, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-green-500 mt-0.5">→</span> {u}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>⚠️</span> Common Mistakes
              </h3>
              <ul className="space-y-2">
                {topic.mistakes.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" /> {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-5 flex gap-3">
            <Lightbulb size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-1">💡 Pro Tip</div>
              <p className="text-sm text-amber-700 dark:text-amber-400">{topic.tip}</p>
            </div>
          </div>

          {/* Real World */}
          <div className="bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/50 rounded-2xl p-5">
            <h3 className="font-semibold text-brand-800 dark:text-brand-300 text-sm mb-2 flex items-center gap-2">
              🌍 Real-World Usage
            </h3>
            <p className="text-sm text-brand-700 dark:text-brand-400">{topic.realWorld}</p>
          </div>

          {/* Summary Box */}
          <div className="card border-2 border-brand-500/30 bg-brand-500/5">
            <h3 className="font-display font-bold text-slate-900 dark:text-white mb-3">📋 Quick Summary</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Container: </span>
                <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">{`<${topic.header}>`}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Include: </span>
                <span className="font-mono text-green-600 dark:text-green-400 text-xs">{topic.include}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Type: </span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{topic.shortDesc}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Level: </span>
                <span className={`font-semibold ${topic.difficulty === 'Beginner' ? 'text-green-600' : 'text-amber-600'}`}>{topic.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={() => setLevel(2)} className="btn-primary flex items-center gap-2">
              <Zap size={16} />
              Next: Try It Yourself
            </button>
          </div>
        </div>
      )}

      {/* ====== LEVEL 2: TRY ====== */}
      {level === 2 && (
        <div className="animate-fade-up">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">Try It Yourself</h2>
            <p className="text-slate-500 dark:text-slate-400">Experiment with {topic.title} interactively. Add, remove, and observe!</p>
          </div>
          <TryItSection topic={topic} />
          <div className="flex justify-end mt-8">
            <button onClick={() => setLevel(3)} className="btn-primary flex items-center gap-2">
              Next: Practice Quiz <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ====== LEVEL 3: PRACTICE ====== */}
      {level === 3 && (
        <div className="animate-fade-up">
          <QuizSection topic={topic} />
        </div>
      )}

      {/* Topic Navigation */}
      <div className="flex gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        {prev && (
          <button onClick={() => navigate(`/topic/${prev.id}`)}
            className="flex-1 card card-hover flex items-center gap-3 cursor-pointer group text-left">
            <ArrowLeft size={18} className="text-slate-400 group-hover:text-brand-500 transition-colors shrink-0" />
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Previous</div>
              <div className="font-semibold text-slate-900 dark:text-white text-sm">{prev.icon} {prev.title}</div>
            </div>
          </button>
        )}
        {next && (
          <button onClick={() => navigate(`/topic/${next.id}`)}
            className="flex-1 card card-hover flex items-center gap-3 cursor-pointer group text-right justify-end">
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Next</div>
              <div className="font-semibold text-slate-900 dark:text-white text-sm">{next.icon} {next.title}</div>
            </div>
            <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-500 transition-colors shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
}
