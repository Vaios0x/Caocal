import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Clock, 
  Target, 
  Shield, 
  Globe, 
  Activity, 
  LineChart, 
  ArrowRight, 
  Download, 
  Eye, 
  EyeOff,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { useUserData } from '@/hooks/useUserData.js';
import type { Earnings } from '@/data/mockData.js';

export const EarningsPage: React.FC = () => {
  const { earnings, isLoading, error } = useUserData();
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '14d' | '30d' | '90d'>('30d');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'chart' | 'list' | 'calendar'>('chart');
  const [selectedEarning, setSelectedEarning] = useState<string | null>(null);

  // Filtrar solo los datos de Earnings (excluir Notifications)
  const earningsData = Array.isArray(earnings) 
    ? earnings.filter((item): item is Earnings => 'amount' in item && 'platform' in item)
    : [];
  
  const totalEarnings = earningsData.reduce((sum: number, earning: Earnings) => sum + earning.amount, 0);
  const averageEarnings = totalEarnings / (earningsData.length || 1);
  const maxEarnings = Math.max(...earningsData.map((e: Earnings) => e.amount));
  const minEarnings = Math.min(...earningsData.map((e: Earnings) => e.amount));
  const volatility = ((maxEarnings - minEarnings) / averageEarnings) * 100;

  // Simular datos de rendimiento por período
  const performanceByPeriod = {
    '7d': { change: 8.3, positive: true, total: 1250.50 },
    '14d': { change: 15.7, positive: true, total: 2450.75 },
    '30d': { change: 22.4, positive: true, total: 4850.25 },
    '90d': { change: 45.8, positive: true, total: 12500.00 }
  };

  // Simular datos de plataformas
  const platformData = [
    { name: 'Rappi', earnings: 1850.50, percentage: 38, color: 'orange', icon: '🛵' },
    { name: 'Uber', earnings: 1450.25, percentage: 30, color: 'black', icon: '🚗' },
    { name: 'DiDi', earnings: 950.75, percentage: 20, color: 'yellow', icon: '🚙' },
    { name: 'Otros', earnings: 598.75, percentage: 12, color: 'gray', icon: '📱' }
  ];

  // Simular datos de horarios
  const hourlyData = [
    { hour: '6-9', earnings: 450, percentage: 15 },
    { hour: '9-12', earnings: 850, percentage: 28 },
    { hour: '12-15', earnings: 1200, percentage: 40 },
    { hour: '15-18', earnings: 750, percentage: 25 },
    { hour: '18-21', earnings: 600, percentage: 20 },
    { hour: '21-24', earnings: 300, percentage: 10 }
  ];

  const timeframes = [
    { id: '7d', label: '7 días', active: selectedTimeframe === '7d' },
    { id: '14d', label: '14 días', active: selectedTimeframe === '14d' },
    { id: '30d', label: '30 días', active: selectedTimeframe === '30d' },
    { id: '90d', label: '90 días', active: selectedTimeframe === '90d' }
  ] as const;

  const platforms = [
    { id: 'all', label: 'Todas', active: selectedPlatform === 'all' },
    { id: 'rappi', label: 'Rappi', active: selectedPlatform === 'rappi' },
    { id: 'uber', label: 'Uber', active: selectedPlatform === 'uber' },
    { id: 'didi', label: 'DiDi', active: selectedPlatform === 'didi' }
  ] as const;

  const viewModes = [
    { id: 'chart', label: 'Gráfico', icon: BarChart3, active: viewMode === 'chart' },
    { id: 'list', label: 'Lista', icon: LineChart, active: viewMode === 'list' },
    { id: 'calendar', label: 'Calendario', icon: Calendar, active: viewMode === 'calendar' }
  ] as const;

  // Filtrar datos según selección
  const getFilteredData = () => {
    let filtered = [...earningsData];
    
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(earning => 
        earning.platform.toLowerCase() === selectedPlatform.toLowerCase()
      );
    }
    
    return filtered;
  };

  const filteredEarnings = getFilteredData();

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
          <p className="text-slate-600 dark:text-slate-400 animate-pulse text-lg font-medium">Cargando tus ingresos...</p>
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
            <p className="text-red-600 dark:text-red-400 text-lg font-semibold">Error al cargar los ingresos</p>
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
              Análisis de Ingresos
            </h1>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse-slow border-2 border-white dark:border-slate-900"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed font-normal">
            Analiza tus patrones de ingresos, identifica tendencias y optimiza tu estrategia financiera
            para maximizar tus ganancias y construir riqueza de manera inteligente.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-emerald-500 rounded-full border border-emerald-300 dark:border-emerald-700"></div>
              <span className="font-medium">Inteligente</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-blue-500 rounded-full border border-blue-300 dark:border-blue-700"></div>
              <span className="font-medium">Analítico</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-purple-500 rounded-full border border-purple-300 dark:border-purple-700"></div>
              <span className="font-medium">Optimizado</span>
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
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Ingresos Totales</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${showSensitiveData ? totalEarnings.toFixed(2) : '***.**'}
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
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Promedio Diario</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${showSensitiveData ? averageEarnings.toFixed(2) : '***.**'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Mejor Día</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${showSensitiveData ? maxEarnings.toFixed(2) : '***.**'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Volatilidad</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {volatility.toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
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
                {viewModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`p-2 rounded-md transition-colors ${
                      mode.active 
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <mode.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Período:</span>
              <div className="flex space-x-2">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe.id}
                    variant={timeframe.active ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe.id)}
                    className="text-xs"
                  >
                    {timeframe.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
        {/* Columna izquierda - Gráfico y Análisis */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="xl:col-span-2 flex flex-col space-y-8"
        >
          {/* Gráfico de ingresos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex-1"
          >
            <Card className="w-full card-hover">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center border border-emerald-500/20">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-900 dark:text-white font-semibold">Historial de Ingresos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Últimos {selectedTimeframe}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Gráfico de barras */}
                  <div className="space-y-4">
                    <div className="flex items-end justify-between h-64 space-x-2">
                      {filteredEarnings.slice(0, 14).reverse().map((earning: Earnings, index: number) => {
                        const height = (earning.amount / maxEarnings) * 100;
                        const isToday = index === 0;
                        const isHovered = selectedEarning === earning.id;
                        
                        return (
                          <motion.div
                            key={earning.id}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: `${height}%`, opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="flex-1 relative group"
                            onClick={() => setSelectedEarning(selectedEarning === earning.id ? null : earning.id)}
                          >
                            <div
                              className={`w-full rounded-t-lg transition-all duration-300 ${
                                isToday 
                                  ? 'bg-gradient-to-t from-emerald-500 to-emerald-600' 
                                  : 'bg-gradient-to-t from-blue-500 to-blue-600'
                              } ${isHovered ? 'shadow-xl scale-105' : 'group-hover:shadow-lg'}`}
                              style={{ height: `${height}%` }}
                            >
                              <AnimatePresence>
                                {isHovered && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap font-medium z-10"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <DollarSign className="w-3 h-3" />
                                      <span>${earning.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Etiquetas de días */}
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
                      {filteredEarnings.slice(0, 14).reverse().map((earning: Earnings) => {
                        const date = new Date(earning.date);
                        const dayName = date.toLocaleDateString('es-MX', { weekday: 'short' });
                        return (
                          <span key={earning.id} className="text-center">
                            {dayName}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Análisis de tendencias */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                    {Object.entries(performanceByPeriod).map(([period, data], index) => (
                      <motion.div
                        key={period}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                        className={`text-center p-4 rounded-lg border ${
                          data.positive 
                            ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700'
                            : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
                        }`}
                      >
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{period.toUpperCase()}</p>
                        <p className={`text-lg font-bold ${
                          data.positive 
                            ? 'text-emerald-600 dark:text-emerald-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {data.positive ? '+' : ''}{data.change}%
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          ${data.total.toFixed(2)}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Análisis por plataformas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Análisis por Plataformas</h3>
              <div className="flex space-x-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={platform.active ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPlatform(platform.id)}
                    className="text-xs"
                  >
                    {platform.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {platformData.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                  className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{platform.icon}</span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{platform.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          ${platform.earnings.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{platform.percentage}%</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">del total</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${platform.percentage}%` }}
                      transition={{ duration: 1, delay: 1.6 + index * 0.1 }}
                      className={`h-full rounded-full ${
                        platform.color === 'orange' ? 'bg-orange-500' :
                        platform.color === 'black' ? 'bg-slate-800' :
                        platform.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-slate-500'
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Columna derecha - Detalles y Análisis */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col space-y-8"
        >
          {/* Análisis de horarios */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Rendimiento por Horarios</h3>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {hourlyData.map((hour, index) => (
                    <motion.div
                      key={hour.hour}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{hour.hour}h</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">${hour.earnings}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${hour.percentage}%` }}
                          transition={{ duration: 1, delay: 1.6 + index * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recomendaciones de IA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">💡 Recomendaciones de IA</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Tendencia positiva</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Considera aumentar tu tasa de ahorro al 8%
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Optimiza horarios</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Los martes y jueves son tus días más productivos
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Diversifica ingresos</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Explora nuevas oportunidades en la gig economy
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Información educativa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">¿Por qué analizar ingresos?</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-700">
                <Target className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Optimización</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Identifica patrones para maximizar ganancias
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-700">
                <Shield className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Estabilidad</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Reduce la volatilidad de tus ingresos
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-700">
                <TrendingUp className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Crecimiento</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Planifica estrategias de crecimiento sostenible
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
          ¿Quieres optimizar tus ingresos?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Descubre estrategias avanzadas para maximizar tus ganancias y construir
          riqueza de manera inteligente y sostenible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4 rounded-xl">
            <span>Ver Estrategias</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 text-lg px-8 py-4 rounded-xl">
            <span>Descargar Reporte</span>
            <Download className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}; 