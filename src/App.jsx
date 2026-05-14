import { useState } from 'react';
import HomePage from './pages/HomePage';
import { buildStarterTemplate } from './template';
import { createStarterZip } from './utils/zipGenerator';

function App() {
  const [framework] = useState('react');
  const [styling] = useState('tailwind');
  const [darkMode, setDarkMode] = useState(false);
  const [pwa, setPwa] = useState(false);
  const [basicLayout, setBasicLayout] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    setStatus('Building starter ZIP...');
    const options = { framework, styling, darkMode, pwa, basicLayout };
    const template = buildStarterTemplate(options);
    await createStarterZip(template);
    setStatus('Download ready.');
    window.setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-slate-900/90 p-8 shadow-soft ring-1 ring-white/10 backdrop-blur">
        <HomePage
          framework={framework}
          styling={styling}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          pwa={pwa}
          setPwa={setPwa}
          basicLayout={basicLayout}
          setBasicLayout={setBasicLayout}
          onGenerate={handleGenerate}
          status={status}
        />
      </div>
    </div>
  );
}

export default App;
