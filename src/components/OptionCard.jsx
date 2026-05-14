export default function OptionCard({ label, description, value, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`group rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6 text-left transition hover:border-cyan-400 ${value ? 'ring-2 ring-cyan-400/40' : ''}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{label}</h3>
          <p className="mt-2 text-slate-400">{description}</p>
        </div>
        <div className={`h-5 w-10 rounded-full transition ${value ? 'bg-cyan-400' : 'bg-slate-700'}`}>
          <span className={`block h-5 w-5 rounded-full bg-white shadow ${value ? 'translate-x-5' : 'translate-x-0'} transform transition`} />
        </div>
      </div>
    </button>
  );
}
