import { createContext, useContext, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TopicPage from './pages/TopicPage';
import VisualizersPage from './pages/VisualizersPage';
import PracticePage from './pages/PracticePage';

export const ThemeContext = createContext();
export const ToastContext = createContext();

export function useTheme() { return useContext(ThemeContext); }
export function useToast() { return useContext(ToastContext); }

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-[9999] bg-slate-900 dark:bg-slate-700 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-bounce-in flex items-center gap-2 border border-white/10">
      <span className="text-brand-400">✓</span> {message}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('stl-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('stl-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const showToast = (msg) => setToast(msg);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <ToastContext.Provider value={showToast}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="topic/:id" element={<TopicPage />} />
            <Route path="visualizers" element={<VisualizersPage />} />
            <Route path="practice" element={<PracticePage />} />
          </Route>
        </Routes>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </ToastContext.Provider>
    </ThemeContext.Provider>
  );
}
