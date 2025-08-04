import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  PieChart, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Settings, 
  Bell, 
  User, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown,
  DollarSign,
  Shield,
  BookOpen,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Button } from '@components/ui/Button';
import { useUserData } from '@/hooks/useUserData.js';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    id: 'main',
    title: 'Principal',
    items: [
      {
        id: 'home',
        label: 'Inicio',
        path: '/',
        icon: Home,
        description: 'Landing page principal'
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: PieChart,
        description: 'Vista general de tus finanzas'
      },
      {
        id: 'portfolio',
        label: 'Portafolio',
        path: '/portfolio',
        icon: PieChart,
        description: 'Tus inversiones y activos'
      }
    ]
  },
  {
    id: 'wealth',
    title: 'Riqueza',
    items: [
      {
        id: 'earnings',
        label: 'Ingresos',
        path: '/earnings',
        icon: TrendingUp,
        description: 'Análisis de tus ganancias'
      },
      {
        id: 'savings',
        label: 'Ahorros',
        path: '/savings',
        icon: Target,
        description: 'Metas y progreso de ahorro'
      },
      {
        id: 'investments',
        label: 'Inversiones',
        path: '/investments',
        icon: BarChart3,
        description: 'Estrategias de inversión'
      },
      {
        id: 'rwa',
        label: 'RWA Tokens',
        path: '/rwa',
        icon: Shield,
        description: 'Activos del mundo real'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Herramientas',
    items: [
      {
        id: 'ai-insights',
        label: 'IA Insights',
        path: '/ai-insights',
        icon: Sparkles,
        description: 'Recomendaciones inteligentes'
      },
      {
        id: 'financial-education',
        label: 'Educación',
        path: '/education',
        icon: BookOpen,
        description: 'Aprende sobre finanzas'
      },
      {
        id: 'calculators',
        label: 'Calculadoras',
        path: '/calculators',
        icon: DollarSign,
        description: 'Herramientas financieras'
      }
    ]
  },
  {
    id: 'support',
    title: 'Soporte',
    items: [
      {
        id: 'help',
        label: 'Ayuda',
        path: '/help',
        icon: HelpCircle,
        description: 'Centro de ayuda'
      },
      {
        id: 'settings',
        label: 'Configuración',
        path: '/settings',
        icon: Settings,
        description: 'Preferencias de cuenta'
      }
    ]
  }
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user } = useUserData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleDropdownToggle = (sectionId: string) => {
    setActiveDropdown(activeDropdown === sectionId ? null : sectionId);
  };

  const NavItemComponent: React.FC<{ item: NavItem; isMobile?: boolean }> = ({ 
    item, 
    isMobile = false 
  }) => {
    const Icon = item.icon;
    return (
      <Link
        to={item.path}
        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
          isActive(item.path)
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
            : 'hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        } ${isMobile ? 'w-full' : ''}`}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive(item.path) ? 'text-white' : 'text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-white'}`} />
        <div className="flex-1 min-w-0">
          <span className="font-medium truncate">{item.label}</span>
          {item.description && (
            <p className="text-xs opacity-75 mt-0.5 truncate">{item.description}</p>
          )}
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Navbar Desktop */}
      <nav className={`hidden lg:block sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-xl' 
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 animate-float">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse-slow border-2 border-white dark:border-slate-900"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Caocal</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Wealth as a Service</span>
              </div>
            </div>

            {/* Navegación Desktop */}
            <div className="flex items-center space-x-2 flex-1 justify-center">
              {navSections.map((section) => (
                <div key={section.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDropdownToggle(section.id)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      activeDropdown === section.id 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="font-medium">{section.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                      activeDropdown === section.id ? 'rotate-180' : ''
                    }`} />
                  </Button>

                  {/* Dropdown Desktop */}
                  <AnimatePresence>
                    {activeDropdown === section.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-3 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-6 z-50"
                      >
                        <div className="space-y-3">
                          {section.items.map((item) => (
                            <NavItemComponent key={item.id} item={item} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Acciones del usuario */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Button variant="ghost" size="sm" className="relative p-2.5 rounded-xl">
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse-slow border-2 border-white dark:border-slate-900"></div>
              </Button>
              
              {user && typeof user === 'object' && 'name' in user ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Usuario Premium</span>
                  </div>
                  <div className="relative">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                  </div>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-slate-200 dark:border-slate-700">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">Iniciar Sesión</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar Mobile */}
      <nav className={`lg:hidden sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-xl' 
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Mobile */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse-slow border-2 border-white dark:border-slate-900"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Caocal</span>
            </div>

            {/* Botón de menú móvil */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl flex-shrink-0"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Secciones del menú móvil */}
                {navSections.map((section) => (
                  <div key={section.id} className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-2">
                      {section.title}
                    </h3>
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <NavItemComponent key={item.id} item={item} isMobile />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Acciones adicionales móvil */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="space-y-3">
                    <Button variant="ghost" className="w-full justify-start px-4 py-3 rounded-xl" size="sm">
                      <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
                      Configuración
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-4 py-3 rounded-xl" size="sm">
                      <HelpCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      Ayuda
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-4 py-3 rounded-xl text-red-600 dark:text-red-400" size="sm">
                      <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
                      Cerrar Sesión
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Overlay para cerrar menú móvil */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}; 