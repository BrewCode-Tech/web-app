import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import { CASE_STUDIES } from './content/caseStudies'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.tsx',
    children: [
      { index: true, lazy: () => import('./pages/Home') },
      { path: 'work', lazy: () => import('./pages/Work') },
      {
        path: 'work/:slug',
        lazy: () => import('./pages/CaseStudy'),
        getStaticPaths: () => CASE_STUDIES.map((study) => `work/${study.slug}`),
      },
      { path: 'how-we-work', lazy: () => import('./pages/HowWeWork') },
      { path: 'about', lazy: () => import('./pages/About') },
      { path: 'contact', lazy: () => import('./pages/Contact') },
      { path: 'privacy', lazy: () => import('./pages/Privacy') },
      { path: '*', lazy: () => import('./pages/NotFound') },
    ],
  },
]
