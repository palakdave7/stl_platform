import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, BookOpen, Layers, Cpu, Code2, ChevronRight, Home, Zap, Trophy } from 'lucide-react';
import { useTheme } from '../App';
import { topics } from '../data/topics';

function SearchModal({ onClose }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const filtered = topics.filter(t =>
    t.title.toLowerCase().includes(q.toLowerCase()) ||
    t.description.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <Search size={18} className="text-slate-400" />
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search STL topics..."
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 text-base"
          />
          <kbd className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {q === '' ? (
            <div className="p-4 text-sm text-slate-400 text-center">Type to search topics...</div>
          ) : filtered.length === 0 ? (
            <div className="p-4 text-sm text-slate-400 text-center">No topics found for "{q}"</div>
          ) : filtered.map(t => (
            <button key={t.id} onClick={() => { navigate(`/topic/${t.id}`); onClose(); }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left">
              <span className="text-2xl">{t.icon}</span>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{t.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t.shortDesc}</div>
              </div>
              <ChevronRight size={14} className="ml-auto text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/visualizers', label: 'Visualizers', icon: Zap },
    { path: '/practice', label: 'Practice', icon: Trophy },
  ];

  const categories = [
    { name: 'Containers', icon: Layers, items: topics.filter(t => t.category === 'Containers') },
    { name: 'Algorithms', icon: Cpu, items: topics.filter(t => t.category === 'Algorithms') },
    { name: 'Utility & Concepts', icon: Code2, items: topics.filter(t => t.category === 'Utility' || t.category === 'Concepts') },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => { navigate('/'); setSidebarOpen(false); }} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg">
            <BookOpen size={16} className="text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-slate-900 dark:text-white text-sm leading-tight">C++ STL</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Learning Platform</div>
          </div>
        </button>
      </div>

      {/* Main Navigation */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800">
        {navLinks.map(({ path, label, icon: Icon }) => (
          <button key={path} onClick={() => { navigate(path); setSidebarOpen(false); }}
            className={`nav-item w-full ${location.pathname === path ? 'nav-item-active' : ''}`}>
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Topics */}
      <div className="flex-1 overflow-y-auto p-3">
        {categories.map(cat => (
          <div key={cat.name} className="mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 mb-1">
              <cat.icon size={13} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{cat.name}</span>
            </div>
            {cat.items.map(topic => (
              <button key={topic.id} onClick={() => { navigate(`/topic/${topic.id}`); setSidebarOpen(false); }}
                className={`nav-item w-full ${location.pathname === `/topic/${topic.id}` ? 'nav-item-active' : ''}`}>
                <span className="text-base">{topic.icon}</span>
                <span className="flex-1 text-left">{topic.title}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  topic.difficulty === 'Beginner' ? 'bg-green-500/15 text-green-600 dark:text-green-400' :
                  topic.difficulty === 'Intermediate' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                  'bg-red-500/15 text-red-600 dark:text-red-400'
                }`}>{topic.difficulty[0]}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs text-slate-400 text-center">C++ STL Platform • {topics.length} Topics</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed top-0 bottom-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 h-14 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden btn-ghost p-2">
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 flex-1">
            {location.pathname !== '/' && (
              <>
                <button onClick={() => navigate('/')} className="hover:text-brand-500 transition-colors">Home</button>
                <ChevronRight size={14} />
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  {location.pathname.startsWith('/topic/') ?
                    topics.find(t => t.id === location.pathname.split('/')[2])?.title || 'Topic' :
                    location.pathname.replace('/', '').charAt(0).toUpperCase() + location.pathname.replace('/', '').slice(1)
                  }
                </span>
              </>
            )}
            {location.pathname === '/' && <span className="text-slate-700 dark:text-slate-200 font-medium">Dashboard</span>}
          </div>

          <div className="flex-1 lg:flex-none" />

          {/* Search */}
          <button onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg text-sm text-slate-500 dark:text-slate-400 transition-colors">
            <Search size={14} />
            <span className="hidden sm:inline">Search topics...</span>
            <kbd className="hidden sm:inline text-xs bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">⌘K</kbd>
          </button>

          {/* Theme Toggle */}
          <button onClick={toggle} className="btn-ghost p-2 rounded-lg" title="Toggle theme">
            {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
