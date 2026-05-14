import OptionCard from '../components/OptionCard';

export default function HomePage({
  framework,
  styling,
  darkMode,
  setDarkMode,
  pwa,
  setPwa,
  basicLayout,
  setBasicLayout,
  onGenerate,
  status
}) {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-slate-950/80 p-8 shadow-soft ring-1 ring-white/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Starter Killer</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Generate a custom React + Tailwind starter instantly.</h1>
            <p className="mt-4 max-w-2xl text-slate-300">Select your options and download a ready-to-use starter project in a ZIP file.</p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-5 text-right shadow-inner ring-1 ring-white/10">
            <p className="text-sm text-slate-400">Framework</p>
            <p className="mt-2 text-xl font-medium text-white">{framework.toUpperCase()}</p>
            <p className="mt-1 text-sm text-slate-500">Styling: {styling}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <OptionCard
          label="Dark Mode"
          description="Includes optional dark theme support in the generated starter."
          value={darkMode}
          onChange={() => setDarkMode(prev => !prev)}
        />
        <OptionCard
          label="PWA"
          description="Adds a manifest and service worker skeleton for offline-ready apps."
          value={pwa}
          onChange={() => setPwa(prev => !prev)}
        />
        <OptionCard
          label="Basic Layout"
          description="Includes a modern homepage layout with cards and sections."
          value={basicLayout}
          onChange={() => setBasicLayout(prev => !prev)}
        />
      </div>

      <div className="rounded-3xl bg-slate-900/90 p-8 shadow-soft ring-1 ring-white/10">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Build Preview</p>
              <p className="mt-2 text-slate-300">Tailwind configured, React Vite structure, and a streamlined download experience.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Output</p>
              <p className="mt-2 text-slate-300">A browser-generated ZIP with clean source files and no node_modules.</p>
            </div>
          </div>

          <button
            onClick={onGenerate}
            className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Generate starter ZIP
          </button>
          {status && <p className="text-slate-300">{status}</p>}
        </div>
      </div>
    </div>
  );
}
