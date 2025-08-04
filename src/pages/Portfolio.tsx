import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserData } from '../hooks/useUserData.js';
import { PortfolioValueChart } from '../components/portfolio/PortfolioValueChart';
import { PerformanceChart } from '../components/portfolio/PerformanceChart';
import { RwaPortfolioCard } from '../components/portfolio/RwaPortfolioCard';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Shield, 
  Globe, 
  Activity, 
  LineChart, 
  Settings, 
  Download, 
  Eye, 
  EyeOff,
  Filter
} from 'lucide-react';
import type { Asset, Portfolio as PortfolioType } from '../data/mockData.js';

export const Portfolio: React.FC = () => {
  const { portfolio, isLoading, error } = useUserData();
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [sortBy, setSortBy] = useState<'value' | 'change' | 'name'>('value');
  const [selectedAsset] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Calcular estadísticas dinámicas
  const portfolioData = portfolio as PortfolioType;
  const totalValue = portfolioData?.totalValue || 0;
  const assets = portfolioData?.assets || [];
  
  const totalChange24h = assets.reduce((sum: number, asset: Asset) => sum + asset.change24h, 0);
  const averageChange24h = totalChange24h / (assets.length || 1);
  const totalTokens = assets.reduce((sum: number, asset: Asset) => sum + asset.amount, 0);
  
  // Simular datos de distribución
  const distributionData = [
    { type: 'Bonos', percentage: 45, color: 'blue' },
    { type: 'Inmobiliario', percentage: 35, color: 'emerald' },
    { type: 'Commodities', percentage: 20, color: 'orange' }
  ];

  const sortOptions = [
    { id: 'value', label: 'Valor', active: sortBy === 'value' },
    { id: 'change', label: 'Cambio', active: sortBy === 'change' },
    { id: 'name', label: 'Nombre', active: sortBy === 'name' }
  ] as const;

  // Ordenar activos según criterio seleccionado
  const sortedAssets = [...assets].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return b.value - a.value;
      case 'change':
        return b.change24h - a.change24h;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 animate-pulse text-lg font-medium">Cargando tu portafolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto border border-red-200 dark:border-red-800">
            <span className="text-red-600 dark:text-red-400 text-3xl">⚠️</span>
          </div>
          <div className="space-y-2">
            <p className="text-red-600 dark:text-red-400 text-lg font-semibold">Error al cargar el portafolio</p>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Intenta recargar la página</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 lg:space-y-12">
      {/* Header mejorado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header principal */}
        <div className="text-center space-y-6 lg:space-y-8">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight">
              Tu Portafolio de Riqueza
            </h1>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse-slow border-2 border-white dark:border-slate-900"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed font-normal">
            Cada micro-ahorro se ha convertido en una parte de activos del mundo real. 
            Esta es la riqueza que estás construyendo automáticamente.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-emerald-500 rounded-full border border-emerald-300 dark:border-emerald-700"></div>
              <span className="font-medium">Diversificado</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-blue-500 rounded-full border border-blue-300 dark:border-blue-700"></div>
              <span className="font-medium">Seguro</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-purple-500 rounded-full border border-purple-300 dark:border-purple-700"></div>
              <span className="font-medium">Creciente</span>
            </div>
          </div>
        </div>

        {/* Estadísticas principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="card-hover bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Valor Total</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${showSensitiveData ? totalValue.toFixed(2) : '***.**'}
                    </span>
                    <button
                      onClick={() => setShowSensitiveData(!showSensitiveData)}
                      className="p-1 hover:bg-emerald-100 dark:hover:bg-emerald-800 rounded transition-colors"
                    >
                      {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Cambio 24h</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-bold ${
                      averageChange24h >= 0 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {averageChange24h >= 0 ? '+' : ''}{averageChange24h.toFixed(2)}%
                    </span>
                    {averageChange24h >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Activos</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {assets.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Tokens</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {totalTokens.toFixed(4)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controles de vista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-center"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Vista:</span>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <LineChart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ordenar:</span>
              <div className="flex space-x-2">
                {sortOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={option.active ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(option.id)}
                    className="text-xs"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
        {/* Columna izquierda - Gráfico y Rendimiento */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="xl:col-span-2 flex flex-col space-y-8"
        >
          {/* Gráfico de crecimiento */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex-1"
          >
            <PortfolioValueChart />
          </motion.div>

          {/* Rendimiento por períodos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="space-y-4"
          >
            <PerformanceChart />
          </motion.div>
        </motion.div>

        {/* Columna derecha - Activos y Distribución */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col space-y-8"
        >
          {/* Distribución del portafolio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Distribución</h3>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {distributionData.map((item, index) => (
                    <motion.div
                      key={item.type}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.type}</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: 1.6 + index * 0.1 }}
                          className={`h-full rounded-full ${
                            item.color === 'blue' ? 'bg-blue-500' :
                            item.color === 'emerald' ? 'bg-emerald-500' :
                            'bg-orange-500'
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activos del portafolio */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Tus Activos</h3>
              <span className="text-sm text-slate-600 dark:text-slate-400">{assets.length} activos</span>
            </div>

            <div className={`space-y-4 ${
              viewMode === 'grid' ? 'grid grid-cols-1 gap-4' : ''
            }`}>
              <AnimatePresence>
                {sortedAssets.map((asset, index) => (
                  <motion.div
                    key={asset.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={viewMode === 'grid' ? '' : 'w-full'}
                  >
                    <RwaPortfolioCard 
                      asset={asset} 
                      isSelected={selectedAsset === asset.symbol}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Información educativa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">¿Por qué RWA?</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Seguridad</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Tus activos están protegidos por tecnología blockchain y regulaciones financieras.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Crecimiento</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Los activos del mundo real generan rendimientos reales, no solo inflación.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Diversificación</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Acceso a diferentes tipos de activos para reducir el riesgo de tu portafolio.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Call to action mejorado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-blue-900/20 rounded-3xl p-8 sm:p-10 border border-emerald-200/50 dark:border-emerald-700/50 text-center shadow-xl"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
          ¿Quieres aumentar tu portafolio?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Ajusta tu tasa de ahorro automático para acelerar el crecimiento de tu riqueza.
          Cada peso cuenta en tu camino hacia la libertad financiera.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4 rounded-xl">
              <span>Ajustar Tasa de Ahorro</span>
              <Settings className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 text-lg px-8 py-4 rounded-xl">
            <span>Descargar Reporte</span>
            <Download className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}; 