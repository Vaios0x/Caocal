import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  TrendingDown, 
  Eye,
  EyeOff,
  Share2,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { useUserData } from '@/hooks/useUserData.js';
import type { Earnings } from '@/data/mockData.js';

export const RecentEarnings: React.FC = () => {
  const { earnings } = useUserData();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'platform'>('date');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  
  // Asegurar que earnings sea del tipo correcto y solo contenga Earnings
  const earningsData: Earnings[] = Array.isArray(earnings) ? earnings.filter((item): item is Earnings => 
    'date' in item && 'amount' in item && 'platform' in item
  ) : [];
  
  // Filtrar y ordenar datos
  const getFilteredData = () => {
    let filtered = [...earningsData];
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    switch (selectedFilter) {
      case 'today':
        filtered = filtered.filter(earning => earning.date === todayStr);
        break;
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(earning => new Date(earning.date) >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(earning => new Date(earning.date) >= monthAgo);
        break;
      default:
        break;
    }
    
    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'platform':
          return a.platform.localeCompare(b.platform);
        default:
          return 0;
      }
    });
    
    return filtered.slice(0, 8);
  };

  const recentEarnings = getFilteredData();
  const totalEarnings = recentEarnings.reduce((sum, earning) => sum + earning.amount, 0);
  const averageEarnings = totalEarnings / (recentEarnings.length || 1);
  
  // Calcular tendencia
  const firstHalf = recentEarnings.slice(0, Math.ceil(recentEarnings.length / 2));
  const secondHalf = recentEarnings.slice(Math.ceil(recentEarnings.length / 2));
  const firstHalfTotal = firstHalf.reduce((sum, earning) => sum + earning.amount, 0);
  const secondHalfTotal = secondHalf.reduce((sum, earning) => sum + earning.amount, 0);
  const trend = secondHalfTotal > firstHalfTotal ? 'up' : 'down';
  const trendPercentage = firstHalfTotal > 0 ? Math.abs(((secondHalfTotal - firstHalfTotal) / firstHalfTotal) * 100) : 0;

  const filters = [
    { id: 'all', label: 'Todos', active: selectedFilter === 'all' },
    { id: 'today', label: 'Hoy', active: selectedFilter === 'today' },
    { id: 'week', label: 'Semana', active: selectedFilter === 'week' },
    { id: 'month', label: 'Mes', active: selectedFilter === 'month' }
  ] as const;

  const sortOptions = [
    { id: 'date', label: 'Fecha', active: sortBy === 'date' },
    { id: 'amount', label: 'Monto', active: sortBy === 'amount' },
    { id: 'platform', label: 'Plataforma', active: sortBy === 'platform' }
  ] as const;

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'rappi':
        return 'bg-orange-600 text-white';
      case 'uber':
        return 'bg-black text-white';
      case 'didi':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'rappi':
        return '🛵';
      case 'uber':
        return '🚗';
      case 'didi':
        return '🚙';
      default:
        return '📱';
    }
  };

  return (
    <Card className="w-full card-hover">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-500/20">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-900 dark:text-white font-semibold">Ingresos Recientes</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSensitiveData(!showSensitiveData)}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
            >
              {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Últimas transacciones</span>
          </div>
        </CardTitle>
        
        {/* Controles de filtro y ordenamiento */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={filter.active ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className="text-xs"
              >
                {filter.label}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
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
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Resumen estadístico */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700"
            >
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                ${showSensitiveData ? totalEarnings.toFixed(2) : '***.**'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Total</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
            >
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${showSensitiveData ? averageEarnings.toFixed(2) : '***.**'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Promedio</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
            >
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {recentEarnings.length}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Transacciones</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700"
            >
              <div className="flex items-center justify-center space-x-1">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                )}
                <p className={`text-lg font-bold ${
                  trend === 'up' 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {trendPercentage.toFixed(1)}%
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Tendencia</p>
            </motion.div>
          </div>

          {/* Lista de ingresos */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {recentEarnings.map((earning, index) => {
                const isHovered = showDetails === earning.id;
                
                return (
                  <motion.div
                    key={earning.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={`p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                      isHovered ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                    } hover:bg-slate-50 dark:hover:bg-slate-800`}
                    onClick={() => setShowDetails(showDetails === earning.id ? null : earning.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPlatformColor(earning.platform)}`}>
                          <span className="text-sm">{getPlatformIcon(earning.platform)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{earning.platform}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {new Date(earning.date).toLocaleDateString('es-MX', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">
                          ${showSensitiveData ? earning.amount.toFixed(2) : '***.**'}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {new Date(earning.date).toLocaleTimeString('es-MX', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Detalles expandibles */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700"
                        >
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <p className="text-slate-600 dark:text-slate-400 font-medium">Plataforma</p>
                              <p className="text-slate-900 dark:text-white font-semibold">{earning.platform}</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400 font-medium">Fecha</p>
                              <p className="text-slate-900 dark:text-white font-semibold">
                                {new Date(earning.date).toLocaleDateString('es-MX')}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400 font-medium">Hora</p>
                              <p className="text-slate-900 dark:text-white font-semibold">
                                {new Date(earning.date).toLocaleTimeString('es-MX')}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400 font-medium">Monto</p>
                              <p className="text-slate-900 dark:text-white font-semibold">
                                ${earning.amount.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <div className="flex space-x-2 pt-3">
                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                              <Share2 className="w-3 h-3 mr-1" />
                              Compartir
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              Reporte
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Indicador de tendencia */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className={`p-4 rounded-lg border ${
              trend === 'up' 
                ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700'
                : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {trend === 'up' ? 'Tendencia positiva' : 'Tendencia negativa'}
                </span>
              </div>
              <span className={`text-sm font-bold ${
                trend === 'up' 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {trend === 'up' ? '+' : ''}{trendPercentage.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {trend === 'up' 
                ? 'Tus ingresos están creciendo consistentemente' 
                : 'Considera revisar tu estrategia de ingresos'
              }
            </p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}; 