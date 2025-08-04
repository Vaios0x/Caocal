import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Zap, 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp
} from 'lucide-react';
import { Button } from '@components/ui/Button';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700">
      {/* Sección principal del footer */}
      <div className="container-responsive py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Columna 1 - Información de la empresa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/20">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Caocal</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Wealth-as-a-Service</p>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Automatizamos el micro-ahorro y la micro-inversión para que cada ganancia se convierta en un activo productivo.
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">Seguro</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Rápido</span>
              </div>
            </div>
          </motion.div>

          {/* Columna 2 - Productos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Productos</h4>
            <nav className="space-y-3">
              <Link 
                to="/dashboard" 
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/portfolio" 
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                Portafolio
              </Link>
              <Link 
                to="/earnings" 
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                Ganancias
              </Link>
              <Link 
                to="/savings" 
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                Ahorros
              </Link>
              <Link 
                to="/investments" 
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                Inversiones
              </Link>
            </nav>
          </motion.div>

          {/* Columna 3 - Recursos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Recursos</h4>
            <nav className="space-y-3">
              <Link 
                to="/education" 
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                Educación
              </Link>
              <Link 
                to="/calculators" 
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                Calculadoras
              </Link>
              <Link 
                to="/ai-insights" 
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                IA Insights
              </Link>
              <Link 
                to="/help" 
                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                Centro de Ayuda
              </Link>
              <a 
                href="#" 
                className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                <span>API Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </nav>
          </motion.div>

          {/* Columna 4 - Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="font-medium">hola@caocal.mx</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="font-medium">+52 55 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="font-medium">CDMX, México</span>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-slate-900 dark:text-white">Síguenos</h5>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200 border border-slate-300 dark:border-slate-600"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200 border border-slate-300 dark:border-slate-600"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-200 border border-slate-300 dark:border-slate-600"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all duration-200 border border-slate-300 dark:border-slate-600"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sección inferior */}
      <div className="border-t border-slate-200 dark:border-slate-700">
        <div className="container-responsive py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright y enlaces legales */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-600 dark:text-slate-400">
              <p className="font-medium">
                © {currentYear} Caocal. Hecho con <Heart className="w-4 h-4 text-red-500 inline" /> en México
              </p>
              <div className="flex items-center space-x-4">
                <Link 
                  to="/privacy" 
                  className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
                >
                  Privacidad
                </Link>
                <Link 
                  to="/terms" 
                  className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
                >
                  Términos
                </Link>
                <Link 
                  to="/cookies" 
                  className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
                >
                  Cookies
                </Link>
              </div>
            </div>

            {/* Botón de volver arriba */}
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="font-medium">Volver arriba</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Banner de seguridad */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-t border-emerald-200 dark:border-emerald-800">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-emerald-700 dark:text-emerald-300">
            <Shield className="w-4 h-4" />
            <span className="font-medium">
              Tu información está protegida con encriptación de nivel bancario
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}; 