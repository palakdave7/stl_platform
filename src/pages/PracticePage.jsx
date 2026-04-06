import { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, Target } from 'lucide-react';
import { topics } from '../data/topics';
import { useToast } from '../App';
import { useNavigate } from 'react-router-dom';

const allQuestions = topics.flatMap(topic =>
  topic.quiz.map((q, i) => ({
    ...q,
    topicId: topic.id,
    topicTitle: topic.title,
    topicIcon: topic.icon,
    id: `${topic.id}-${i}`,
  }))
);

function QuizMode({ questions, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const toast = useToast();

  const q = questions[current];

  const selectAnswer = (opt) => {
    if (answers[current] !== undefined) return;
    setAnswers(a => ({ ...a, [current]: opt }));
    if (opt === q.ans) toast('🎉 Correct!');
    else toast(`❌ Correct: ${q.opts[q.ans]}`);
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent(c => c+1);
    else setShowResult(true);
  };

  const score = Object.keys(answers).filter(i => answers[i] === questions[i]?.ans).length;

  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="card text-center max-w-lg mx-auto py-12">
        <div className="text-6xl mb-4">
          {pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '📚'}
        </div>
        <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : 'Keep Learning!'}
        </h2>
        <p className="text-slate-500 mb-6">You scored <strong className="text-brand-500">{score}/{questions.length}</strong> ({pct}%)</p>

        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-8">
          <div className={`h-3 rounded-full transition-all duration-1000 ${pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${pct}%` }} />
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => { setCurrent(0); setAnswers({}); setShowResult(false); }} className="btn-primary flex items-center gap-2">
            <RotateCcw size={16}/> Try Again
          </button>
          <button onClick={onFinish} className="btn-secondary">Back to Topics</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500">{q.topicIcon} {q.topicTitle}</span>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{current+1} / {questions.length}</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6">
        <div className="h-2 bg-brand-500 rounded-full transition-all duration-300"
          style={{ width: `${((current+1)/questions.length)*100}%` }} />
      </div>

      {/* Question */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-brand-500/15 text-brand-600 dark:text-brand-400 text-xs font-bold px-2.5 py-1 rounded-full">Q{current+1}</span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            topics.find(t=>t.id===q.topicId)?.difficulty === 'Beginner' ? 'bg-green-500/15 text-green-600 dark:text-green-400' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
          }`}>{topics.find(t=>t.id===q.topicId)?.difficulty}</span>
        </div>
        <p className="text-lg font-semibold text-slate-900 dark:text-white mb-5">{q.q}</p>

        <div className="grid gap-2.5">
          {q.opts.map((opt, j) => {
            const selected = answers[current] === j;
            const isCorrect = answers[current] !== undefined && j === q.ans;
            const isWrong = selected && j !== q.ans;
            return (
              <button key={j} onClick={() => selectAnswer(j)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                  isCorrect ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-300' :
                  isWrong ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300' :
                  selected ? 'border-brand-500 bg-brand-500/10' :
                  'border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 text-slate-700 dark:text-slate-300'
                } ${answers[current] !== undefined ? 'cursor-default' : 'cursor-pointer'}`}>
                <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                  isCorrect ? 'border-green-500 bg-green-500 text-white' :
                  isWrong ? 'border-red-500 bg-red-500 text-white' :
                  selected ? 'border-brand-500 bg-brand-500 text-white' :
                  'border-current'
                }`}>
                  {isCorrect ? '✓' : isWrong ? '✗' : String.fromCharCode(65+j)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {answers[current] !== undefined && (
          <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${answers[current] === q.ans ? 'text-green-600' : 'text-red-500'}`}>
            {answers[current] === q.ans ? <CheckCircle size={16}/> : <XCircle size={16}/>}
            {answers[current] === q.ans ? 'Correct!' : `Correct answer: ${q.opts[q.ans]}`}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-500">Score so far: {score}/{current + (answers[current]!==undefined?1:0)}</span>
        {answers[current] !== undefined && (
          <button onClick={next} className="btn-primary flex items-center gap-2 text-sm">
            {current < questions.length - 1 ? 'Next Question' : 'See Results'} <ChevronRight size={16}/>
          </button>
        )}
      </div>
    </div>
  );
}

export default function PracticePage() {
  const [mode, setMode] = useState('select');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const toggleTopic = (id) => {
    setSelectedTopics(t => t.includes(id) ? t.filter(x => x !== id) : [...t, id]);
  };

  const startQuiz = () => {
    let qs = selectedTopics.length === 0
      ? allQuestions
      : allQuestions.filter(q => selectedTopics.includes(q.topicId));
    // Shuffle
    qs = qs.sort(() => Math.random() - 0.5).slice(0, 20);
    setQuestions(qs);
    setMode('quiz');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          🏆 Practice & Quiz
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Test your STL knowledge with {allQuestions.length}+ questions across all topics.
        </p>
      </div>

      {mode === 'select' && (
        <div className="space-y-8">
          {/* Quick Start */}
          <div className="grid sm:grid-cols-3 gap-4">
            <button onClick={() => { setSelectedTopics([]); startQuiz(); }}
              className="card card-hover cursor-pointer text-center p-8 border-2 hover:border-brand-500 transition-all">
              <div className="text-4xl mb-3">🎲</div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1">Random Mix</h3>
              <p className="text-sm text-slate-500">20 random questions from all topics</p>
            </button>

            <button onClick={() => {
              setSelectedTopics(topics.filter(t => t.difficulty === 'Beginner').map(t => t.id));
              setTimeout(() => startQuiz(), 0);
            }}
              className="card card-hover cursor-pointer text-center p-8 border-2 hover:border-green-500 transition-all">
              <div className="text-4xl mb-3">🟢</div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1">Beginner Quiz</h3>
              <p className="text-sm text-slate-500">Only beginner-level questions</p>
            </button>

            <button onClick={() => {
              setSelectedTopics(topics.filter(t => t.difficulty === 'Intermediate').map(t => t.id));
              setTimeout(() => startQuiz(), 0);
            }}
              className="card card-hover cursor-pointer text-center p-8 border-2 hover:border-amber-500 transition-all">
              <div className="text-4xl mb-3">🟡</div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-1">Intermediate Quiz</h3>
              <p className="text-sm text-slate-500">Only intermediate-level questions</p>
            </button>
          </div>

          {/* Custom Selection */}
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">
              Or choose specific topics:
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {topics.map(topic => (
                <button key={topic.id} onClick={() => toggleTopic(topic.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    selectedTopics.includes(topic.id)
                      ? 'border-brand-500 bg-brand-500/10'
                      : 'border-slate-200 dark:border-slate-700 hover:border-brand-300'
                  }`}>
                  <span className="text-2xl">{topic.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">{topic.title}</div>
                    <div className="text-xs text-slate-400">{topic.quiz.length} questions</div>
                  </div>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedTopics.includes(topic.id) ? 'bg-brand-500 border-brand-500' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedTopics.includes(topic.id) && <span className="text-white text-xs">✓</span>}
                  </div>
                </button>
              ))}
            </div>

            {selectedTopics.length > 0 && (
              <div className="flex items-center gap-4">
                <button onClick={startQuiz} className="btn-primary flex items-center gap-2">
                  <Target size={16}/>
                  Start Custom Quiz ({selectedTopics.length} topics)
                </button>
                <button onClick={() => setSelectedTopics([])} className="btn-ghost text-sm">Clear all</button>
              </div>
            )}
          </div>

          {/* All Questions Preview */}
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">All Questions by Topic</h2>
            <div className="space-y-4">
              {topics.map(topic => (
                <div key={topic.id} className="card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{topic.icon}</span>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{topic.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        topic.difficulty === 'Beginner' ? 'bg-green-500/15 text-green-600 dark:text-green-400' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      }`}>{topic.difficulty}</span>
                    </div>
                    <button onClick={() => navigate(`/topic/${topic.id}`)} className="btn-ghost text-xs">
                      Go to topic →
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {topic.quiz.map((q, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 py-1">
                        <span className="font-mono text-brand-500 text-xs mt-0.5 shrink-0">Q{i+1}</span>
                        {q.q}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'quiz' && questions.length > 0 && (
        <QuizMode questions={questions} onFinish={() => setMode('select')} />
      )}
    </div>
  );
}
