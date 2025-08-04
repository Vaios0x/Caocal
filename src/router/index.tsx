import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@components/shared/Layout';
import { Home } from '@/pages/Home';
import { Dashboard } from '@/pages/Dashboard';
import { Portfolio } from '@/pages/Portfolio';
import { EarningsPage } from '@/pages/Earnings';
import { Savings } from '@/pages/Savings';
import { Investments } from '@/pages/Investments';
import { RwaTokens } from '@/pages/RwaTokens';
import { AiInsights } from '@/pages/AiInsights';
import { Education } from '@/pages/Education';
import { Calculators } from '@/pages/Calculators';

const Help = () => (
  <div className="text-center space-y-4 py-20">
    <h1 className="text-4xl font-bold gradient-text">Centro de Ayuda</h1>
    <p className="text-muted-foreground">Próximamente: Soporte y documentación completa</p>
  </div>
);

const Settings = () => (
  <div className="text-center space-y-4 py-20">
    <h1 className="text-4xl font-bold gradient-text">Configuración</h1>
    <p className="text-muted-foreground">Próximamente: Preferencias y configuración de cuenta</p>
  </div>
);

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'portfolio',
        element: <Portfolio />
      },
      {
        path: 'earnings',
        element: <EarningsPage />
      },
      {
        path: 'savings',
        element: <Savings />
      },
      {
        path: 'investments',
        element: <Investments />
      },
      {
        path: 'rwa',
        element: <RwaTokens />
      },
      {
        path: 'ai-insights',
        element: <AiInsights />
      },
      {
        path: 'education',
        element: <Education />
      },
      {
        path: 'calculators',
        element: <Calculators />
      },
      {
        path: 'help',
        element: <Help />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
]); 