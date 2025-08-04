import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserData } from '../hooks/useUserData.js';
import { PortfolioValueChart } from '../components/portfolio/PortfolioValueChart';
import { PerformanceChart } from '../components/portfolio/PerformanceChart';
import { RwaPortfolioCard } from '../components/portfolio/RwaPortfolioCard';
import { Link, useNavigate } from 'react-router-dom';
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
  Filter,
  X,
  ExternalLink,
  Share2,
  Info,
  AlertCircle,
  CheckCircle,
  Plus,
  Minus,
  Edit,
  Trash2,
  Star,
  BookOpen,
  Calculator,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  Zap,
  Users,
  Award,
  Clock,
  Calendar,
  Bell,
  MessageCircle
} from 'lucide-react';
import type { Asset, Portfolio as PortfolioType } from '../data/mockData.js';

export const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const { portfolio, isLoading, error } = useUserData();
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [sortBy, setSortBy] = useState<'value' | 'change' | 'name'>('value');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAssetModal, setShowAssetModal] = useState<string | null>(null);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showRwaInfoModal, setShowRwaInfoModal] = useState(false);
  const [expandedAssets, setExpandedAssets] = useState<string[]>([]);

  // Calcular estadísticas dinámicas
  const portfolioData = portfolio as PortfolioType;
  const totalValue = portfolioData?.totalValue || 0;
  const assets = portfolioData?.assets || [];
  
  const totalChange24h = assets.reduce((sum: number, asset: Asset) => sum + asset.change24h, 0);
  const averageChange24h = totalChange24h / (assets.length || 1);
  const totalTokens = assets.reduce((sum: number, asset: Asset) => sum + asset.amount, 0);

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
  
  // Simular datos de distribución
  const distributionData = [
    { type: 'Bonos', percentage: 45, color: 'blue' },
    { type: 'Inmobiliario', percentage: 35, color: 'emerald' },
    { type: 'Commodities', percentage: 20, color: 'orange' }
  ];

  // Datos de información RWA
  const rwaInfo = [
    {
      id: 'security',
      title: 'Seguridad',
      description: 'Tus activos están protegidos por tecnología blockchain y regulaciones financieras.',
      icon: <Shield className="w-5 h-5" />,
      color: 'emerald'
    },
    {
      id: 'growth',
      title: 'Crecimiento',
      description: 'Los activos del mundo real generan rendimientos reales, no solo inflación.',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 'diversification',
      title: 'Diversificación',
      description: 'Acceso a diferentes tipos de activos para reducir el riesgo de tu portafolio.',
      icon: <Globe className="w-5 h-5" />,
      color: 'purple'
    }
  ];

  // Datos de reporte
  const reportData = {
    totalValue: totalValue,
    totalChange: averageChange24h,
    totalAssets: assets.length,
    totalTokens: totalTokens,
    distribution: distributionData,
    topPerformers: sortedAssets.slice(0, 3),
    generatedAt: new Date().toLocaleString('es-MX')
  };

  const handleAssetClick = (assetSymbol: string) => {
    setShowAssetModal(assetSymbol);
  };

  const handleDistributionClick = () => {
    setShowDistributionModal(true);
  };

  const handleDownloadReport = () => {
    setShowReportModal(true);
  };

  const handleRwaInfoClick = () => {
    setShowRwaInfoModal(true);
  };

  const handleAssetExpand = (assetSymbol: string) => {
    if (expandedAssets.includes(assetSymbol)) {
      setExpandedAssets(expandedAssets.filter(symbol => symbol !== assetSymbol));
    } else {
      setExpandedAssets([...expandedAssets, assetSymbol]);
    }
  };

  const handleAdjustRate = () => {
    navigate('/dashboard');
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'emerald': return 'text-emerald-600 dark:text-emerald-400';
      case 'blue': return 'text-blue-600 dark:text-blue-400';
      case 'purple': return 'text-purple-600 dark:text-purple-400';
      case 'orange': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getBgColorClass = (color: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700';
      case 'blue': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      case 'purple': return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700';
      case 'orange': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700';
      default: return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-700';
    }
  };

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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Distribución</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDistributionClick}
                className="border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                <Info className="w-4 h-4 mr-1" />
                Ver Detalles
              </Button>
            </div>
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300" onClick={handleDistributionClick}>
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">¿Por qué RWA?</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRwaInfoClick}
                className="border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Saber Más
              </Button>
            </div>
            <div className="space-y-3">
              {rwaInfo.map((info, index) => (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 ${getBgColorClass(info.color)}`}
                  onClick={handleRwaInfoClick}
                >
                  <div className={`${getColorClass(info.color)}`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{info.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {info.description}
                    </p>
                  </div>
                </motion.div>
              ))}
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
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 text-lg px-8 py-4 rounded-xl"
            onClick={handleDownloadReport}
          >
            <span>Descargar Reporte</span>
            <Download className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* Asset Modal */}
      <AnimatePresence>
        {showAssetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAssetModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAssetModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Detalles del Activo</h3>
                </div>
                
                <div className="space-y-4">
                  {assets
                    .filter(asset => asset.symbol === showAssetModal)
                    .map((asset) => (
                      <div key={asset.symbol} className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <img src={asset.imageUrl} alt={asset.name} className="w-12 h-12 rounded-lg" />
                          <div>
                            <h4 className="font-semibold text-white">{asset.name}</h4>
                            <p className="text-sm text-slate-400">{asset.symbol}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-700/50 rounded-lg">
                            <p className="text-xs text-slate-400">Valor</p>
                            <p className="font-semibold text-white">${asset.value.toFixed(2)}</p>
                          </div>
                          <div className="p-3 bg-slate-700/50 rounded-lg">
                            <p className="text-xs text-slate-400">Cantidad</p>
                            <p className="font-semibold text-white">{asset.amount.toFixed(4)}</p>
                          </div>
                          <div className="p-3 bg-slate-700/50 rounded-lg">
                            <p className="text-xs text-slate-400">Cambio 24h</p>
                            <p className={`font-semibold ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                            </p>
                          </div>
                          <div className="p-3 bg-slate-700/50 rounded-lg">
                            <p className="text-xs text-slate-400">% del Portafolio</p>
                            <p className="font-semibold text-white">{((asset.value / totalValue) * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-slate-600 text-slate-300"
                            onClick={() => setShowAssetModal(null)}
                          >
                            Cerrar
                          </Button>
                          <Button 
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                            onClick={() => navigate('/rwa')}
                          >
                            Ver Más Activos
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Distribution Modal */}
      <AnimatePresence>
        {showDistributionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDistributionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDistributionModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <PieChart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Distribución del Portafolio</h3>
                  <p className="text-slate-300">
                    Análisis detallado de la distribución de tus activos por categoría.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {distributionData.map((item, index) => (
                    <div key={item.type} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${
                            item.color === 'blue' ? 'bg-blue-500' :
                            item.color === 'emerald' ? 'bg-emerald-500' :
                            'bg-orange-500'
                          }`}></div>
                          <h4 className="font-semibold text-white">{item.type}</h4>
                        </div>
                        <span className="text-lg font-bold text-white">{item.percentage}%</span>
                      </div>
                      
                      <div className="w-full h-3 bg-slate-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className={`h-full rounded-full ${
                            item.color === 'blue' ? 'bg-blue-500' :
                            item.color === 'emerald' ? 'bg-emerald-500' :
                            'bg-orange-500'
                          }`}
                        />
                      </div>
                      
                      <div className="mt-3 text-sm text-slate-400">
                        <p>Valor estimado: ${((totalValue * item.percentage) / 100).toFixed(2)}</p>
                        <p>Activos en esta categoría: {Math.floor(assets.length * (item.percentage / 100))}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => setShowDistributionModal(false)}
                  >
                    Entendido
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowReportModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Reporte de Portafolio</h3>
                  <p className="text-slate-300">
                    Descarga un reporte completo de tu portafolio en formato PDF.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                      <p className="text-xs text-slate-400">Valor Total</p>
                      <p className="font-semibold text-white">${reportData.totalValue.toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                      <p className="text-xs text-slate-400">Cambio 24h</p>
                      <p className={`font-semibold ${reportData.totalChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {reportData.totalChange >= 0 ? '+' : ''}{reportData.totalChange.toFixed(2)}%
                      </p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                      <p className="text-xs text-slate-400">Activos</p>
                      <p className="font-semibold text-white">{reportData.totalAssets}</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                      <p className="text-xs text-slate-400">Tokens</p>
                      <p className="font-semibold text-white">{reportData.totalTokens.toFixed(4)}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-400 text-center">
                    Generado el: {reportData.generatedAt}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-slate-600 text-slate-300"
                    onClick={() => setShowReportModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    onClick={() => {
                      // Aquí se implementaría la descarga real
                      console.log('Descargando reporte...');
                      setShowReportModal(false);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RWA Info Modal */}
      <AnimatePresence>
        {showRwaInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRwaInfoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowRwaInfoModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">¿Qué son los RWA?</h3>
                  <p className="text-slate-300">
                    Los Real World Assets (RWA) son activos del mundo real tokenizados en blockchain.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {rwaInfo.map((info) => (
                    <div key={info.id} className={`p-4 rounded-lg border ${getBgColorClass(info.color)}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`${getColorClass(info.color)}`}>
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{info.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            {info.description}
                          </p>
                          <div className="text-xs text-slate-500 dark:text-slate-500">
                            Beneficios adicionales incluyen liquidez 24/7, transparencia total y acceso global.
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-slate-600 text-slate-300"
                    onClick={() => setShowRwaInfoModal(false)}
                  >
                    Cerrar
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => navigate('/education')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Aprender Más
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 