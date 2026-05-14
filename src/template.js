export function buildStarterTemplate(options) {
  const { darkMode, pwa, basicLayout } = options;
  const projectName = 'starter-killer-generated';

  const packageJson = {
    name: projectName,
    private: true,
    version: '0.1.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    dependencies: {
      react: '^18.3.1',
      'react-dom': '^18.3.1'
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.3.1',
      autoprefixer: '^10.4.19',
      postcss: '^8.4.35',
      tailwindcss: '^3.4.4',
      vite: '^5.4.0'
    }
  };

  const content = {
    'package.json': JSON.stringify(packageJson, null, 2),
    'vite.config.js': `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()]\n});\n`,
    'tailwind.config.js': `export default {\n  content: ['./index.html', './src/**/*.{js,jsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};\n`,
    'postcss.config.js': `export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n`,
    'index.html': `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Starter Killer Demo</title>\n  </head>\n  <body class="bg-slate-50 text-slate-900">\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n`,
    'src/main.jsx': `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);\n`,
    'src/index.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nhtml { color-scheme: light; }\nhtml.dark { color-scheme: dark; }\nbody { @apply min-h-screen bg-slate-50 text-slate-900 antialiased; }\nhtml.dark body { @apply bg-slate-950 text-slate-100; }\n`,
    'src/App.jsx': generateAppFile(darkMode, basicLayout, pwa),
    'src/components/Header.jsx': generateHeaderFile(),
    'src/pages/Home.jsx': generatePageFile(darkMode, basicLayout),
    'src/hooks/useDarkMode.js': generateHookFile(),
    'src/utils/theme.js': generateThemeFile()
  };

  if (pwa) {
    content['public/manifest.webmanifest'] = JSON.stringify({
      name: 'Starter Killer App',
      short_name: 'StarterKiller',
      start_url: '.',
      display: 'standalone',
      background_color: '#0f172a',
      theme_color: '#0ea5e9',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }, null, 2);
    content['src/service-worker.js'] = `self.addEventListener('install', event => {\n  self.skipWaiting();\n});\n\nself.addEventListener('activate', event => {\n  event.waitUntil(self.clients.claim());\n});\n\nself.addEventListener('fetch', () => {});\n`;
  }

  return content;
}

function generateAppFile(darkMode, basicLayout) {
  return `import Header from './components/Header';\nimport Home from './pages/Home';\nimport './index.css';\n\nfunction App() {\n  return (\n    <div className={\
      'min-h-screen ' + (\n        ${darkMode} ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'\n      )\
    }>\n      <div className=\"mx-auto max-w-6xl p-6\">\n        <Header />\n        <Home />\n      </div>\n    </div>\n  );\n}\n\nexport default App;\n`;
}

function generateHeaderFile() {
  return `export default function Header() {\n  return (\n    <header className=\"mb-8 rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-slate-200/70 backdrop-blur-sm dark:bg-slate-900/80 dark:ring-slate-700/80\">\n      <div className=\"mx-auto max-w-5xl\">\n        <h1 className=\"text-3xl font-semibold text-slate-900 dark:text-slate-100\">Starter Killer</h1>\n        <p className=\"mt-2 max-w-2xl text-slate-600 dark:text-slate-400\">A blessed Vite + React starter with Tailwind, modern layout, and optional PWA / dark mode support.</p>\n      </div>\n    </header>\n  );\n}\n`;
}

function generatePageFile(darkMode, basicLayout) {
  const layoutBlock = basicLayout ? `        <section className=\"space-y-6 rounded-3xl bg-slate-100 p-8 shadow-soft dark:bg-slate-900\">\n          <p className=\"text-lg leading-8 text-slate-600 dark:text-slate-300\">Your starter includes a modern landing page, responsive section cards, and a clean utility-first layout powered by Tailwind.</p>\n          <div className=\"grid gap-4 lg:grid-cols-2\">\n            <article className=\"rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-950\">\n              <h2 className=\"text-xl font-semibold text-slate-900 dark:text-slate-100\">Flexible layout</h2>\n              <p className=\"mt-3 text-slate-600 dark:text-slate-400\">A polished hero section plus feature cards right out of the box.</p>\n            </article>\n            <article className=\"rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-950\">\n              <h2 className=\"text-xl font-semibold text-slate-900 dark:text-slate-100\">Fast setup</h2>\n              <p className=\"mt-3 text-slate-600 dark:text-slate-400\">Ready for development with Tailwind configured and a minimal Vite project structure.</p>\n            </article>\n          </div>\n        </section>` : `        <section className=\"rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-900\">\n          <p className=\"text-lg leading-8 text-slate-600 dark:text-slate-300\">This starter includes a simple homepage, clean folder structure, and Tailwind styling. Customize it to suit your next React app.</p>\n        </section>`;

  return `export default function Home() {\n  return (\n    <main className=\"space-y-8\">\n      <section className=\"rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-900\">\n        <div className=\"max-w-4xl\">\n          <h2 className=\"text-2xl font-semibold text-slate-900 dark:text-slate-100\">Welcome to your starter project</h2>\n          <p className=\"mt-4 text-slate-600 dark:text-slate-300\">Built with React, Vite, Tailwind CSS and opinionated utility patterns for modern frontend development.</p>\n        </div>\n      </section>\n${layoutBlock}\n    </main>\n  );\n}\n`;
}

function generateHookFile() {
  return `import { useEffect, useState } from 'react';\n\nexport default function useDarkMode(defaultValue = false) {\n  const [enabled, setEnabled] = useState(defaultValue);\n\n  useEffect(() => {\n    document.documentElement.classList.toggle('dark', enabled);\n  }, [enabled]);\n\n  return [enabled, setEnabled];\n}\n`;
}

function generateThemeFile() {
  return `export const themeClasses = {\n  light: 'bg-slate-50 text-slate-900',\n  dark: 'bg-slate-950 text-slate-100'\n};\n`;
}
