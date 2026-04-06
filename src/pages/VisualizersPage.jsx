import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Plus, Trash2, ChevronRight } from 'lucide-react';
import { useToast } from '../App';

// ---- Sort Visualizer ----
function SortVisualizer() {
  const [arr, setArr] = useState([64, 34, 25, 12, 22, 11, 90, 45]);
  const [comparing, setComparing] = useState([]);
  const [sortedIdx, setSortedIdx] = useState([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [algo, setAlgo] = useState('bubble');
  const toast = useToast();

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const resetArr = () => {
    setArr([64, 34, 25, 12, 22, 11, 90, 45]);
    setComparing([]);
    setSortedIdx([]);
  };

  const shuffle = () => {
    setArr(a => [...a].sort(() => Math.random() - 0.5));
    setComparing([]);
    setSortedIdx([]);
  };

  const runSort = async () => {
    if (running) return;
    setRunning(true);
    setSortedIdx([]);
    const a = [...arr];

    if (algo === 'bubble') {
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
          setComparing([j, j+1]);
          await sleep(speed);
          if (a[j] > a[j+1]) {
            [a[j], a[j+1]] = [a[j+1], a[j]];
            setArr([...a]);
          }
        }
        setSortedIdx(s => [...s, a.length - i - 1]);
      }
    } else if (algo === 'selection') {
      for (let i = 0; i < a.length; i++) {
        let minIdx = i;
        for (let j = i+1; j < a.length; j++) {
          setComparing([minIdx, j]);
          await sleep(speed);
          if (a[j] < a[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
          [a[i], a[minIdx]] = [a[minIdx], a[i]];
          setArr([...a]);
        }
        setSortedIdx(s => [...s, i]);
      }
    }

    setComparing([]);
    setSortedIdx(a.map((_, i) => i));
    setRunning(false);
    toast('Sort complete! 🎉');
  };

  const maxVal = Math.max(...arr);

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Sorting Visualizer</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Watch elements compare and swap</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setAlgo('bubble')}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold ${algo === 'bubble' ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            Bubble Sort
          </button>
          <button onClick={() => setAlgo('selection')}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold ${algo === 'selection' ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            Selection Sort
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-end gap-2 justify-center min-h-40">
        {arr.map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400">{v}</span>
            <div className={`w-10 rounded-t-lg transition-all duration-200 ${
              comparing.includes(i) ? 'bg-red-500' :
              sortedIdx.includes(i) ? 'bg-green-500' :
              'bg-brand-500'
            }`}
            style={{ height: `${(v / maxVal) * 120}px` }} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-brand-500"/><span className="text-slate-500">Unsorted</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-500"/><span className="text-slate-500">Comparing</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-500"/><span className="text-slate-500">Sorted</span></div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={runSort} disabled={running} className="btn-primary flex items-center gap-2 text-sm disabled:opacity-50">
          <Play size={14}/> {running ? 'Sorting...' : 'Start Sort'}
        </button>
        <button onClick={shuffle} disabled={running} className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-50">
          Shuffle
        </button>
        <button onClick={resetArr} disabled={running} className="btn-ghost text-sm"><RotateCcw size={14}/></button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-slate-500">Speed:</span>
          <input type="range" min="100" max="800" value={speed} onChange={e => setSpeed(+e.target.value)}
            className="w-24 accent-brand-500" />
          <span className="text-xs text-slate-500 w-12">{speed > 500 ? 'Slow' : speed > 300 ? 'Med' : 'Fast'}</span>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg px-4 py-2.5 text-xs text-slate-500 font-mono">
        {comparing.length > 0
          ? `Comparing arr[${comparing[0]}]=${arr[comparing[0]]} vs arr[${comparing[1]}]=${arr[comparing[1]]} → ${arr[comparing[0]] > arr[comparing[1]] ? 'SWAP!' : 'no swap'}`
          : sortedIdx.length === arr.length ? '✅ Fully sorted!' : 'Click "Start Sort" to begin step-by-step animation'
        }
      </div>
    </div>
  );
}

// ---- Binary Search Visualizer ----
function BinarySearchVisualizer() {
  const [arr] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]);
  const [target, setTarget] = useState('');
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);
  const [found, setFound] = useState(null);
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);
  const toast = useToast();

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const runSearch = async () => {
    const t = parseInt(target);
    if (isNaN(t)) { toast('Enter a number to search'); return; }
    setRunning(true);
    setFound(null);
    setSteps([]);
    const newSteps = [];

    let l = 0, h = arr.length - 1;
    setLow(l); setHigh(h);

    while (l <= h) {
      const m = Math.floor((l + h) / 2);
      setMid(m); setLow(l); setHigh(h);
      newSteps.push(`low=${l}, high=${h}, mid=${m} → arr[${m}]=${arr[m]}`);
      setSteps([...newSteps]);
      await sleep(800);

      if (arr[m] === t) {
        setFound(m);
        toast(`Found ${t} at index [${m}]! ✅`);
        setRunning(false);
        return;
      } else if (arr[m] < t) {
        l = m + 1;
        newSteps.push(`${arr[m]} < ${t} → search right half`);
      } else {
        h = m - 1;
        newSteps.push(`${arr[m]} > ${t} → search left half`);
      }
      setSteps([...newSteps]);
    }

    setMid(null);
    toast(`${t} not found in array ❌`);
    setRunning(false);
  };

  const reset = () => { setLow(null); setHigh(null); setMid(null); setFound(null); setSteps([]); };

  return (
    <div className="card space-y-5">
      <div>
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Binary Search Visualizer</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Sorted array — eliminates half the search space each step</p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-fit">
          {arr.map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div className={`w-10 h-10 flex items-center justify-center font-mono font-bold text-xs rounded-lg border-2 transition-all duration-400 ${
                found === i ? 'bg-green-500 border-green-400 text-white scale-125 shadow-lg' :
                mid === i ? 'bg-red-500 border-red-400 text-white' :
                (low !== null && high !== null && i >= low && i <= high) ? 'bg-brand-100 dark:bg-brand-900/30 border-brand-400 text-brand-800 dark:text-brand-200' :
                'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 opacity-40'
              }`}>{v}</div>
              <div className="text-[10px] text-slate-400 font-mono">{i}</div>
              <div className={`text-[9px] font-bold transition-opacity ${
                low === i && high === i ? 'text-brand-500' :
                low === i ? 'text-green-500' : 'opacity-0'
              }`}>{low === i && high === i ? 'L/H' : low === i ? 'L' : '·'}</div>
              <div className={`text-[9px] font-bold ${high === i && low !== i ? 'text-orange-500' : 'opacity-0'}`}>H</div>
              {mid === i && <div className="text-[9px] font-bold text-red-500">mid</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input value={target} onChange={e => setTarget(e.target.value)} onKeyDown={e => e.key === 'Enter' && runSearch()}
          placeholder="Search value..." className="input flex-1" />
        <button onClick={runSearch} disabled={running} className="btn-primary text-sm disabled:opacity-50">
          binary_search()
        </button>
        <button onClick={reset} className="btn-ghost"><RotateCcw size={15}/></button>
      </div>

      {steps.length > 0 && (
        <div className="bg-slate-950 dark:bg-black rounded-xl p-3 max-h-40 overflow-y-auto space-y-1">
          {steps.map((s, i) => (
            <div key={i} className="text-xs font-mono text-green-400">
              <span className="text-slate-500 mr-2">Step {Math.floor(i/2)+1}:</span>{s}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-brand-200 border border-brand-400"/><span className="text-slate-500">Active range</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-500"/><span className="text-slate-500">Mid point</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-500"/><span className="text-slate-500">Found!</span></div>
      </div>
    </div>
  );
}

// ---- Heap Visualizer (Priority Queue) ----
function HeapVisualizer() {
  const [heap, setHeap] = useState([90, 50, 70, 30, 20, 40, 60]);
  const [val, setVal] = useState('');
  const [highlighted, setHighlighted] = useState(null);
  const toast = useToast();

  // Draw as tree
  const levels = [];
  let idx = 0, level = 1;
  while (idx < heap.length) {
    levels.push(heap.slice(idx, idx + level));
    idx += level;
    level *= 2;
  }

  const pushHeap = () => {
    const n = parseInt(val);
    if (isNaN(n)) { toast('Enter a number'); return; }
    const newHeap = [...heap, n];
    // Sift up
    let i = newHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i-1)/2);
      if (newHeap[parent] < newHeap[i]) {
        [newHeap[parent], newHeap[i]] = [newHeap[i], newHeap[parent]];
        i = parent;
      } else break;
    }
    setHeap(newHeap);
    setVal('');
    setHighlighted(0);
    setTimeout(() => setHighlighted(null), 1000);
    toast(`Inserted ${n} — heap property maintained!`);
  };

  const popHeap = () => {
    if (heap.length === 0) return;
    toast(`Removed max: ${heap[0]}`);
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    // Sift down
    let i = 0;
    while (true) {
      let largest = i;
      const l = 2*i+1, r = 2*i+2;
      if (l < newHeap.length && newHeap[l] > newHeap[largest]) largest = l;
      if (r < newHeap.length && newHeap[r] > newHeap[largest]) largest = r;
      if (largest !== i) { [newHeap[i], newHeap[largest]] = [newHeap[largest], newHeap[i]]; i = largest; }
      else break;
    }
    setHeap(newHeap);
  };

  return (
    <div className="card space-y-5">
      <div>
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Max-Heap Visualizer</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Parent is always ≥ children · Root = maximum</p>
      </div>

      {/* Tree layout */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 overflow-x-auto">
        {levels.map((level, li) => (
          <div key={li} className="flex justify-center gap-4 mb-4">
            {level.map((v, vi) => {
              const globalIdx = (Math.pow(2, li) - 1) + vi;
              const left = 2*globalIdx+1;
              const right = 2*globalIdx+2;
              return (
                <div key={vi} className="flex flex-col items-center gap-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 transition-all duration-300 ${
                    highlighted === globalIdx ? 'bg-orange-500 border-orange-400 text-white scale-125 shadow-lg' :
                    li === 0 ? 'bg-orange-500/80 border-orange-400 text-white' :
                    'bg-brand-500/70 border-brand-400 text-white'
                  }`}>{v}</div>
                  {li === 0 && <div className="text-[10px] text-orange-500 font-bold">root/top</div>}
                  {li > 0 && <div className="text-[10px] text-slate-400 font-mono">[{globalIdx}]</div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && pushHeap()}
          placeholder="Enter number" className="input flex-1 min-w-32" />
        <button onClick={pushHeap} className="btn-primary text-sm flex items-center gap-1.5"><Plus size={14}/>push</button>
        <button onClick={popHeap} className="btn-secondary text-sm flex items-center gap-1.5"><Trash2 size={14}/>pop max</button>
        <button onClick={() => setHeap([90, 50, 70, 30, 20, 40, 60])} className="btn-ghost text-sm"><RotateCcw size={14}/></button>
      </div>

      <div className="text-xs font-mono bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2 text-slate-500">
        top() = {heap[0] ?? 'empty'} | size() = {heap.length} | Property: parent ≥ both children
      </div>
    </div>
  );
}

// ---- Iterator Walker ----
function IteratorWalker() {
  const [container, setContainer] = useState('vector');
  const items = {
    vector: [10, 20, 30, 40, 50],
    list: [5, 15, 25, 35, 45],
    set: [10, 20, 30, 40, 50],
  };
  const [pos, setPos] = useState(0);
  const arr = items[container];

  return (
    <div className="card space-y-5">
      <div>
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Iterator Walker</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Traverse any container with iterators</p>
      </div>

      <div className="flex gap-2">
        {['vector', 'list', 'set'].map(c => (
          <button key={c} onClick={() => { setContainer(c); setPos(0); }}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold ${container === c ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-0.5 items-end min-w-fit">
          {arr.map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-12 h-12 flex items-center justify-center font-mono font-bold text-sm rounded-lg border-2 transition-all duration-300 ${
                pos === i ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30 scale-110' :
                pos > i ? 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400' :
                'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white'
              }`}>{v}</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">[{i}]</div>
            </div>
          ))}
          <div className="flex flex-col items-center ml-1">
            <div className="w-12 h-12 flex items-center justify-center font-mono text-[10px] rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">end</div>
          </div>
        </div>
      </div>

      <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-xl p-3 font-mono text-sm">
        <div className="text-cyan-700 dark:text-cyan-300">
          {pos < arr.length
            ? `auto it = ${container}.begin() + ${pos}; // *it = ${arr[pos]}`
            : `it == ${container}.end(); // Past the last element`
          }
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setPos(0)} className="btn-secondary text-sm">begin()</button>
        <button onClick={() => setPos(p => Math.max(0, p-1))} disabled={pos === 0} className="btn-secondary text-sm disabled:opacity-40">← --it</button>
        <button onClick={() => setPos(p => Math.min(arr.length, p+1))} disabled={pos >= arr.length} className="btn-primary text-sm disabled:opacity-40">++it →</button>
        <button onClick={() => setPos(arr.length)} className="btn-secondary text-sm">end()</button>
      </div>
    </div>
  );
}

const visualizers = [
  { id: 'sort', title: 'Sort Visualizer', icon: '↕️', desc: 'Bubble & Selection sort animated', component: SortVisualizer },
  { id: 'binary', title: 'Binary Search', icon: '🔍', desc: 'Divide and conquer search', component: BinarySearchVisualizer },
  { id: 'heap', title: 'Max-Heap / Priority Queue', icon: '👑', desc: 'Tree-based max-heap structure', component: HeapVisualizer },
  { id: 'iterator', title: 'Iterator Walker', icon: '🔄', desc: 'Walk through any container', component: IteratorWalker },
];

export default function VisualizersPage() {
  const [active, setActive] = useState('sort');
  const ActiveComponent = visualizers.find(v => v.id === active)?.component;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          ⚡ Interactive Visualizers
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Watch algorithms and data structures come to life with step-by-step animations.
        </p>
      </div>

      {/* Viz Selector */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {visualizers.map(v => (
          <button key={v.id} onClick={() => setActive(v.id)}
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
              active === v.id
                ? 'border-brand-500 bg-brand-500/10'
                : 'border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700 bg-white dark:bg-slate-900'
            }`}>
            <span className="text-2xl">{v.icon}</span>
            <div>
              <div className={`font-semibold text-sm ${active === v.id ? 'text-brand-700 dark:text-brand-300' : 'text-slate-900 dark:text-white'}`}>{v.title}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{v.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Active Visualizer */}
      {ActiveComponent && <ActiveComponent />}

      {/* Also show TryIt for containers */}
      <div className="mt-8">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">
          🧪 Container Playgrounds
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
          Head to any topic page to access its interactive playground. Here are the available ones:
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { id: 'vector', icon: '📦', label: 'Vector', color: 'from-blue-500 to-cyan-400' },
            { id: 'stack', icon: '🥞', label: 'Stack', color: 'from-purple-500 to-violet-400' },
            { id: 'queue', icon: '🚶', label: 'Queue', color: 'from-green-500 to-emerald-400' },
            { id: 'priority-queue', icon: '👑', label: 'Priority Queue', color: 'from-orange-500 to-amber-400' },
            { id: 'set', icon: '🔵', label: 'Set', color: 'from-sky-500 to-blue-400' },
            { id: 'map', icon: '🗺️', label: 'Map', color: 'from-teal-500 to-green-400' },
          ].map(item => (
            <a key={item.id} href={`#/topic/${item.id}`}
              className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${item.color} text-white font-semibold hover:opacity-90 transition-opacity`}>
              <span className="text-2xl">{item.icon}</span>
              {item.label} Playground
              <ChevronRight size={16} className="ml-auto" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
