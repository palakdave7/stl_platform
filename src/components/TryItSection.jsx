import { useState } from 'react';
import { Plus, Trash2, RotateCcw, ArrowDown, ArrowRight } from 'lucide-react';
import { useToast } from '../App';

// ---- Vector Visualizer ----
function VectorTry() {
  const [items, setItems] = useState([10, 20, 30]);
  const [val, setVal] = useState('');
  const [highlight, setHighlight] = useState(null);
  const toast = useToast();

  const pushBack = () => {
    const n = parseInt(val);
    if (isNaN(n)) { toast('Enter a valid number'); return; }
    setItems(a => [...a, n]);
    setHighlight(items.length);
    setTimeout(() => setHighlight(null), 1200);
    setVal('');
    toast(`Pushed ${n} to back`);
  };

  const popBack = () => {
    if (items.length === 0) { toast('Vector is empty!'); return; }
    setHighlight(items.length - 1);
    setTimeout(() => { setItems(a => a.slice(0, -1)); setHighlight(null); }, 400);
    toast(`Popped ${items[items.length-1]} from back`);
  };

  const capacity = Math.max(items.length, Math.pow(2, Math.ceil(Math.log2(items.length + 1))));

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-slate-900 dark:text-white">Vector Visualizer</h3>
        <div className="flex gap-2 text-xs font-mono">
          <span className="bg-green-500/15 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full">size: {items.length}</span>
          <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full">capacity: {capacity}</span>
        </div>
      </div>

      {/* Visual */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 min-h-20 flex items-center gap-1 flex-wrap">
        {items.length === 0 && <span className="text-slate-400 text-sm">Vector is empty — push some elements!</span>}
        {items.map((v, i) => (
          <div key={i} className={`flex flex-col items-center transition-all duration-300 ${highlight === i ? 'scale-110' : ''}`}>
            <div className={`w-14 h-12 flex items-center justify-center font-mono font-bold text-sm rounded-lg border-2 transition-all ${
              highlight === i
                ? 'bg-brand-500 border-brand-400 text-white shadow-lg shadow-brand-500/40'
                : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white'
            }`}>{v}</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">[{i}]</div>
          </div>
        ))}
        {/* Capacity slots */}
        {Array.from({length: capacity - items.length}).map((_, i) => (
          <div key={`empty-${i}`} className="flex flex-col items-center">
            <div className="w-14 h-12 flex items-center justify-center font-mono text-sm rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">—</div>
            <div className="text-xs text-slate-300 dark:text-slate-600 mt-1 font-mono">[{items.length + i}]</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && pushBack()}
          placeholder="Enter number" className="input flex-1 min-w-32" />
        <button onClick={pushBack} className="btn-primary flex items-center gap-1.5 text-sm"><Plus size={15}/>push_back</button>
        <button onClick={popBack} className="btn-secondary flex items-center gap-1.5 text-sm"><Trash2 size={15}/>pop_back</button>
        <button onClick={() => { setItems([]); setHighlight(null); }} className="btn-ghost text-sm"><RotateCcw size={15}/></button>
      </div>

      <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2 font-mono">
        💡 Gray dashed boxes show reserved capacity. When size = capacity, vector doubles its space!
      </div>
    </div>
  );
}

// ---- Stack Visualizer ----
function StackTry() {
  const [items, setItems] = useState([10, 20, 30]);
  const [val, setVal] = useState('');
  const [popAnim, setPopAnim] = useState(false);
  const [pushAnim, setPushAnim] = useState(false);
  const toast = useToast();

  const push = () => {
    const n = parseInt(val);
    if (isNaN(n)) { toast('Enter a valid number'); return; }
    setPushAnim(true);
    setTimeout(() => { setItems(a => [...a, n]); setPushAnim(false); }, 200);
    setVal('');
    toast(`Pushed ${n} — LIFO: last in, first out!`);
  };

  const pop = () => {
    if (items.length === 0) { toast('Stack is empty!'); return; }
    setPopAnim(true);
    setTimeout(() => { setItems(a => a.slice(0, -1)); setPopAnim(false); }, 400);
    toast(`Popped ${items[items.length-1]}`);
  };

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-slate-900 dark:text-white">Stack Visualizer</h3>
        <span className="text-xs font-mono bg-purple-500/15 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full">LIFO</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-xs text-slate-400 mb-2 flex items-center gap-1"><ArrowDown size={12}/> TOP (push/pop here)</div>
        <div className="w-36 min-h-16 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden flex flex-col-reverse">
          {items.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm py-6">empty</div>
          )}
          {items.map((v, i) => (
            <div key={i} className={`w-full h-12 flex items-center justify-center font-mono font-bold text-sm border-b border-slate-200 dark:border-slate-700 transition-all duration-300 ${
              i === items.length - 1
                ? `bg-purple-500 text-white ${popAnim ? 'opacity-0 -translate-y-4' : ''} ${pushAnim && i === items.length - 1 ? 'animate-bounce-in' : ''}`
                : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white'
            }`}>
              {v} {i === items.length - 1 && <span className="ml-1 text-xs opacity-70">← TOP</span>}
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-400 mt-2">BOTTOM</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && push()}
          placeholder="Enter number" className="input flex-1 min-w-32" />
        <button onClick={push} className="btn-primary text-sm flex items-center gap-1.5"><Plus size={15}/>push</button>
        <button onClick={pop} className="btn-secondary text-sm flex items-center gap-1.5"><Trash2 size={15}/>pop</button>
        <button onClick={() => setItems([])} className="btn-ghost text-sm"><RotateCcw size={15}/></button>
      </div>

      <InfoPanel>
        {items.length > 0
          ? `top() = ${items[items.length-1]} | size() = ${items.length}`
          : 'empty() = true | size() = 0'
        }
      </InfoPanel>
    </div>
  );
}

// ---- Queue Visualizer ----
function QueueTry() {
  const [items, setItems] = useState([10, 20, 30]);
  const [val, setVal] = useState('');
  const toast = useToast();

  const enqueue = () => {
    const n = parseInt(val);
    if (isNaN(n)) { toast('Enter a valid number'); return; }
    setItems(a => [...a, n]);
    setVal('');
    toast(`Enqueued ${n} at the back`);
  };

  const dequeue = () => {
    if (items.length === 0) { toast('Queue is empty!'); return; }
    toast(`Dequeued ${items[0]} from front — FIFO!`);
    setItems(a => a.slice(1));
  };

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-slate-900 dark:text-white">Queue Visualizer</h3>
        <span className="text-xs font-mono bg-green-500/15 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full">FIFO</span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-fit">
          <div className="flex flex-col items-center">
            <ArrowDown size={14} className="text-red-400 rotate-90 mb-1" />
            <span className="text-xs text-red-400 font-mono">dequeue</span>
          </div>
          <div className="flex items-center gap-0.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden min-w-32">
            {items.length === 0 && (
              <div className="px-8 py-3 text-slate-400 text-sm">empty</div>
            )}
            {items.map((v, i) => (
              <div key={i} className={`flex flex-col items-center px-2 border-r border-slate-200 dark:border-slate-700 last:border-r-0 ${
                i === 0 ? 'bg-red-50 dark:bg-red-950/30' :
                i === items.length - 1 ? 'bg-green-50 dark:bg-green-950/30' : ''
              }`}>
                <div className={`w-12 h-10 flex items-center justify-center font-mono font-bold text-sm ${
                  i === 0 ? 'text-red-600 dark:text-red-400' :
                  i === items.length - 1 ? 'text-green-600 dark:text-green-400' :
                  'text-slate-800 dark:text-white'
                }`}>{v}</div>
                <div className="text-[10px] text-slate-400 pb-1 font-mono">
                  {i === 0 ? 'front' : i === items.length-1 ? 'back' : i}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <ArrowDown size={14} className="text-green-400 -rotate-90 mb-1" />
            <span className="text-xs text-green-400 font-mono">enqueue</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && enqueue()}
          placeholder="Enter number" className="input flex-1 min-w-32" />
        <button onClick={enqueue} className="btn-primary text-sm flex items-center gap-1.5"><Plus size={15}/>push (back)</button>
        <button onClick={dequeue} className="btn-secondary text-sm flex items-center gap-1.5"><Trash2 size={15}/>pop (front)</button>
        <button onClick={() => setItems([])} className="btn-ghost text-sm"><RotateCcw size={15}/></button>
      </div>

      <InfoPanel>
        {items.length > 0
          ? `front() = ${items[0]} | back() = ${items[items.length-1]} | size() = ${items.length}`
          : 'Queue is empty!'
        }
      </InfoPanel>
    </div>
  );
}

// ---- Set Visualizer ----
function SetTry() {
  const [items, setItems] = useState(new Set([10, 30, 20]));
  const [val, setVal] = useState('');
  const [rejected, setRejected] = useState(null);
  const toast = useToast();

  const insert = () => {
    const n = parseInt(val);
    if (isNaN(n)) { toast('Enter a valid number'); return; }
    if (items.has(n)) {
      setRejected(n);
      setTimeout(() => setRejected(null), 1000);
      toast(`${n} already exists! Set ignores duplicates.`);
    } else {
      setItems(s => new Set([...s, n]));
      toast(`Inserted ${n} — auto-sorted!`);
    }
    setVal('');
  };

  const remove = (v) => {
    setItems(s => { const ns = new Set(s); ns.delete(v); return ns; });
    toast(`Removed ${v}`);
  };

  const sorted = [...items].sort((a, b) => a - b);

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-slate-900 dark:text-white">Set Visualizer</h3>
        <div className="flex gap-1.5">
          <span className="text-xs bg-sky-500/15 text-sky-600 dark:text-sky-400 px-2.5 py-1 rounded-full font-mono">sorted</span>
          <span className="text-xs bg-sky-500/15 text-sky-600 dark:text-sky-400 px-2.5 py-1 rounded-full font-mono">unique</span>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 min-h-16 flex flex-wrap gap-2 items-center">
        {sorted.length === 0 && <span className="text-slate-400 text-sm">Set is empty — insert some elements!</span>}
        {sorted.map(v => (
          <div key={v} onClick={() => remove(v)}
            className="group relative flex items-center gap-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 font-mono font-bold text-sm text-slate-800 dark:text-white cursor-pointer hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all">
            {v}
            <span className="text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">×</span>
          </div>
        ))}
        {rejected !== null && (
          <div className="flex items-center gap-1.5 bg-red-100 dark:bg-red-950/30 border-2 border-red-400 rounded-lg px-3 py-1.5 font-mono font-bold text-sm text-red-600 animate-bounce">
            {rejected} ✗ duplicate
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && insert()}
          placeholder="Enter number" className="input flex-1 min-w-32" />
        <button onClick={insert} className="btn-primary text-sm flex items-center gap-1.5"><Plus size={15}/>insert</button>
        <button onClick={() => setItems(new Set())} className="btn-ghost text-sm"><RotateCcw size={15}/></button>
      </div>

      <InfoPanel>Click any element to erase it. Elements are always sorted. Duplicates rejected!</InfoPanel>
    </div>
  );
}

// ---- Map Visualizer ----
function MapTry() {
  const [items, setItems] = useState(new Map([['Alice', 90], ['Bob', 85], ['Charlie', 92]]));
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const toast = useToast();

  const insert = () => {
    if (!key.trim()) { toast('Enter a key'); return; }
    const v = parseInt(value);
    if (isNaN(v)) { toast('Enter a valid number for value'); return; }
    const isUpdate = items.has(key);
    setItems(m => new Map([...m, [key, v]]));
    setKey(''); setValue('');
    toast(isUpdate ? `Updated ${key} → ${v}` : `Inserted ${key} → ${v}`);
  };

  const remove = (k) => {
    setItems(m => { const nm = new Map(m); nm.delete(k); return nm; });
    toast(`Erased key: ${k}`);
  };

  const sorted = [...items].sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-slate-900 dark:text-white">Map Visualizer</h3>
        <span className="text-xs bg-teal-500/15 text-teal-600 dark:text-teal-400 px-2.5 py-1 rounded-full font-mono">key → value</span>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2">
        {sorted.length === 0 && <span className="text-slate-400 text-sm">Map is empty!</span>}
        {sorted.map(([k, v]) => (
          <div key={k} className="flex items-center gap-3 bg-white dark:bg-slate-700 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-600 group">
            <span className="font-mono font-bold text-brand-600 dark:text-brand-400 min-w-16">{k}</span>
            <ArrowRight size={14} className="text-slate-400" />
            <span className="font-mono font-bold text-slate-800 dark:text-white flex-1">{v}</span>
            <button onClick={() => remove(k)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 text-xs transition-opacity">
              ✕ erase
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <input value={key} onChange={e => setKey(e.target.value)} placeholder="Key (string)" className="input w-36" />
        <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && insert()} placeholder="Value (int)" className="input w-32" />
        <button onClick={insert} className="btn-primary text-sm flex items-center gap-1.5"><Plus size={15}/>insert/update</button>
        <button onClick={() => setItems(new Map())} className="btn-ghost text-sm"><RotateCcw size={15}/></button>
      </div>

      <InfoPanel>Keys are sorted alphabetically. Hover over an entry to erase it. map[key] = val updates if key exists!</InfoPanel>
    </div>
  );
}

// ---- Priority Queue Visualizer ----
function PriorityQueueTry() {
  const [items, setItems] = useState([50, 30, 40, 10, 20]);
  const [val, setVal] = useState('');
  const [isMin, setIsMin] = useState(false);
  const toast = useToast();

  const sorted = [...items].sort((a, b) => isMin ? a - b : b - a);

  const push = () => {
    const n = parseInt(val);
    if (isNaN(n)) { toast('Enter a valid number'); return; }
    setItems(a => [...a, n]);
    setVal('');
    toast(`Pushed ${n} — heap reorders!`);
  };

  const pop = () => {
    if (items.length === 0) { toast('Empty!'); return; }
    const top = sorted[0];
    toast(`Popped ${top} (${isMin ? 'min' : 'max'} element)`);
    setItems(a => { const idx = a.indexOf(top); return [...a.slice(0, idx), ...a.slice(idx+1)]; });
  };

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-display font-bold text-slate-900 dark:text-white">Priority Queue</h3>
        <div className="flex gap-2 items-center">
          <button onClick={() => setIsMin(false)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${!isMin ? 'bg-orange-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            Max-Heap ↑
          </button>
          <button onClick={() => setIsMin(true)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${isMin ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            Min-Heap ↓
          </button>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-wrap gap-2 items-center">
        {sorted.map((v, i) => (
          <div key={i} className={`flex flex-col items-center gap-1`}>
            <div className={`w-12 h-12 flex items-center justify-center font-mono font-bold text-sm rounded-xl border-2 transition-all ${
              i === 0
                ? `${isMin ? 'bg-brand-500' : 'bg-orange-500'} border-transparent text-white shadow-lg`
                : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white'
            }`}>{v}</div>
            {i === 0 && <span className={`text-[10px] font-bold ${isMin ? 'text-brand-500' : 'text-orange-500'}`}>top</span>}
          </div>
        ))}
        {items.length === 0 && <span className="text-slate-400 text-sm">Empty priority queue</span>}
      </div>

      <div className="flex flex-wrap gap-2">
        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && push()}
          placeholder="Enter number" className="input flex-1 min-w-32" />
        <button onClick={push} className="btn-primary text-sm flex items-center gap-1.5"><Plus size={15}/>push</button>
        <button onClick={pop} className="btn-secondary text-sm flex items-center gap-1.5"><Trash2 size={15}/>pop top</button>
        <button onClick={() => setItems([])} className="btn-ghost text-sm"><RotateCcw size={15}/></button>
      </div>

      <InfoPanel>
        {sorted.length > 0 ? `top() = ${sorted[0]} | size() = ${items.length} | ${isMin ? 'Min-heap: smallest first' : 'Max-heap: largest first'}` : 'Empty'}
      </InfoPanel>
    </div>
  );
}

// ---- Algorithm Visualizer ----
function AlgorithmTry() {
  const [arr, setArr] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const toast = useToast();

  const addElement = () => {
    const n = parseInt(input);
    if (isNaN(n)) { toast('Enter a valid number'); return; }
    setArr(a => [...a, n]);
    setInput('');
    setSorted([]);
    setSteps([]);
  };

  const doSort = () => {
    const a = [...arr];
    a.sort((x, y) => x - y);
    setArr(a);
    setSorted(a.map((_, i) => i));
    toast('Sorted in ascending order!');
  };

  const doReverse = () => {
    setArr(a => [...a].reverse());
    setSorted([]);
    toast('Reversed!');
  };

  const doSearch = () => {
    const n = parseInt(searchVal);
    if (isNaN(n)) { toast('Enter value to search'); return; }
    const idx = arr.indexOf(n);
    if (idx !== -1) {
      setComparing([idx]);
      setTimeout(() => setComparing([]), 2000);
      toast(`Found ${n} at index [${idx}]`);
    } else {
      toast(`${n} not found in array`);
    }
  };

  return (
    <div className="card space-y-5">
      <h3 className="font-display font-bold text-slate-900 dark:text-white">Algorithm Visualizer</h3>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-wrap gap-2 items-end">
        {arr.map((v, i) => (
          <div key={i} className={`flex flex-col items-center gap-1 transition-all duration-500`}>
            <div className={`flex items-end justify-center font-mono font-bold text-xs rounded-t-lg transition-all duration-300 ${
              comparing.includes(i) ? 'bg-amber-500 text-white' :
              sorted.includes(i) ? 'bg-green-500 text-white' :
              'bg-brand-500 text-white'
            }`}
            style={{ width: '36px', height: `${Math.max(20, Math.min(v, 100))}px` }}>
            </div>
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400">{v}</div>
            <div className="text-[10px] text-slate-400">[{i}]</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addElement()}
          placeholder="Add element" className="input w-28" />
        <button onClick={addElement} className="btn-secondary text-sm">+ Add</button>
        <button onClick={doSort} className="btn-primary text-sm">sort()</button>
        <button onClick={doReverse} className="btn-secondary text-sm">reverse()</button>
        <button onClick={() => { setArr([64, 34, 25, 12, 22, 11, 90]); setSorted([]); setComparing([]); }} className="btn-ghost text-sm"><RotateCcw size={14}/></button>
      </div>

      <div className="flex gap-2">
        <input value={searchVal} onChange={e => setSearchVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch()}
          placeholder="Search value" className="input flex-1" />
        <button onClick={doSearch} className="btn-secondary text-sm">find()</button>
      </div>

      <InfoPanel>Yellow = found element, Green = sorted position. Try sort() then reverse()!</InfoPanel>
    </div>
  );
}

// ---- Iterators Visualizer ----
function IteratorTry() {
  const [arr] = useState([10, 20, 30, 40, 50]);
  const [pos, setPos] = useState(0);
  const [direction, setDirection] = useState('forward');

  const step = (dir) => {
    setDirection(dir);
    setPos(p => {
      if (dir === 'forward') return Math.min(p + 1, arr.length - 1);
      return Math.max(p - 1, 0);
    });
  };

  return (
    <div className="card space-y-5">
      <h3 className="font-display font-bold text-slate-900 dark:text-white">Iterator Visualizer</h3>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-start gap-0 border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden w-fit">
          {arr.map((v, i) => (
            <div key={i} className={`flex flex-col items-center w-16 border-r last:border-r-0 border-slate-200 dark:border-slate-700 transition-all duration-300 ${
              i === pos ? 'bg-brand-500 text-white' : 'bg-white dark:bg-slate-700'
            }`}>
              <div className={`h-12 flex items-center justify-center font-mono font-bold text-sm w-full ${i === pos ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                {v}
              </div>
              <div className={`text-[10px] py-1 font-mono border-t border-slate-200 dark:border-slate-700 w-full text-center ${i === pos ? 'text-brand-200' : 'text-slate-400'}`}>
                [{i}]
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 rounded-xl p-3 font-mono text-sm">
        <span className="text-brand-600 dark:text-brand-400">*it = {arr[pos]}</span>
        <span className="text-slate-400 mx-2">|</span>
        <span className="text-slate-500">position: {pos}</span>
        <span className="text-slate-400 mx-2">|</span>
        <span className="text-slate-500">{pos === 0 ? 'at begin()' : pos === arr.length-1 ? 'at last' : `it + ${pos}`}</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setPos(0)} className="btn-secondary text-sm">begin()</button>
        <button onClick={() => step('back')} disabled={pos === 0} className="btn-secondary text-sm disabled:opacity-40">← --it</button>
        <button onClick={() => step('forward')} disabled={pos === arr.length-1} className="btn-primary text-sm">++it →</button>
        <button onClick={() => setPos(arr.length-1)} className="btn-secondary text-sm">last</button>
      </div>

      <InfoPanel>The blue box is where the iterator (*it) currently points. begin() = first element, end() = past last.</InfoPanel>
    </div>
  );
}

function InfoPanel({ children }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 font-mono leading-relaxed">
      💡 {children}
    </div>
  );
}

export default function TryItSection({ topic }) {
  const components = {
    vector: VectorTry,
    stack: StackTry,
    queue: QueueTry,
    'priority-queue': PriorityQueueTry,
    set: SetTry,
    map: MapTry,
    'unordered-map': MapTry,
    pair: PairTry,
    algorithms: AlgorithmTry,
    iterators: IteratorTry,
  };

  const Component = components[topic.id];
  if (Component) return <Component />;

  return (
    <div className="card text-center py-12">
      <div className="text-4xl mb-3">{topic.icon}</div>
      <h3 className="font-display font-bold text-slate-900 dark:text-white mb-2">Interactive Playground</h3>
      <p className="text-slate-500 text-sm">Use the concepts from Level 1 to experiment with {topic.title}!</p>
    </div>
  );
}

function PairTry() {
  const [pairs, setPairs] = useState([[1, 'Alice'], [2, 'Bob'], [3, 'Charlie']]);
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const toast = useToast();

  const addPair = () => {
    if (!first.trim() || !second.trim()) { toast('Enter both first and second values'); return; }
    setPairs(p => [...p, [isNaN(parseInt(first)) ? first : parseInt(first), second]]);
    setFirst(''); setSecond('');
    toast(`Created pair(${first}, ${second})`);
  };

  const sortPairs = () => {
    setPairs(p => [...p].sort((a, b) => {
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      return 0;
    }));
    toast('Sorted by .first!');
  };

  return (
    <div className="card space-y-5">
      <h3 className="font-display font-bold text-slate-900 dark:text-white">Pair Visualizer</h3>
      <div className="space-y-2">
        {pairs.map(([f, s], i) => (
          <div key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-4 py-2">
            <span className="font-mono text-sm text-pink-600 dark:text-pink-400 font-bold w-16">p.first:</span>
            <span className="font-mono text-sm text-slate-800 dark:text-white">{String(f)}</span>
            <span className="text-slate-400 mx-2">|</span>
            <span className="font-mono text-sm text-purple-600 dark:text-purple-400 font-bold w-20">p.second:</span>
            <span className="font-mono text-sm text-slate-800 dark:text-white">{String(s)}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <input value={first} onChange={e => setFirst(e.target.value)} placeholder="first value" className="input w-28" />
        <input value={second} onChange={e => setSecond(e.target.value)} onKeyDown={e => e.key === 'Enter' && addPair()} placeholder="second value" className="input w-28" />
        <button onClick={addPair} className="btn-primary text-sm">make_pair</button>
        <button onClick={sortPairs} className="btn-secondary text-sm">sort by .first</button>
        <button onClick={() => setPairs([])} className="btn-ghost text-sm"><RotateCcw size={14}/></button>
      </div>
      <InfoPanel>Access with .first and .second. Pairs sort by .first, then .second for ties.</InfoPanel>
    </div>
  );
}
