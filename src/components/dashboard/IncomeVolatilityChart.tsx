import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, AlertTriangle, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { useUserData } from '@/hooks/useUserData.js';
import type { Earnings } from '@/data/mockData.js';

export const IncomeVolatilityChart: React.FC = () => {
  const { earnings } = useUserData();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '14d' | '30d'>('7d');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Filtrar solo los datos de Earnings (excluir Notifications)
  const earningsData = Array.isArray(earnings) 
    ? earnings.filter((item): item is Earnings => 'amount' in item && 'platform' in item)
    : [];

  // Calcular estadísticas
  const totalEarnings = earningsData.reduce((sum: number, earning: Earnings) => sum + earning.amount, 0);
  const averageEarnings = totalEarnings / (earningsData.length || 1);
  const maxEarnings = Math.max(...earningsData.map((e: Earnings) => e.amount));
  const minEarnings = Math.min(...earningsData.map((e: Earnings) => e.amount));
  const volatility = ((maxEarnings - minEarnings) / averageEarnings) * 100;

  // Obtener datos según el período seleccionado
  const getDataForPeriod = () => {
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '14d' ? 14 : 30;
    return earningsData.slice(0, days).reverse() || [];
  };

  const recentEarnings = getDataForPeriod();

  const getVolatilityColor = (vol: number) => {
    if (vol > 80) return 'text-red-600 dark:text-red-400';
    if (vol > 50) return 'text-orange-600 dark:text-orange-400';
    return 'text-emerald-600 dark:text-emerald-400';
  };

  const getVolatilityIcon = (vol: number) => {
    if (vol > 80) return <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />;
    if (vol > 50) return <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
    return <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
  };

  const getVolatilityMessage = (vol: number) => {
    if (vol > 80) return "Alta volatilidad - Considera ajustar tu estrategia";
    if (vol > 50) return "Volatilidad moderada - Monitorea tus ingresos";
    return "Baja volatilidad - Ingresos estables";
  };

  const periods = [
    { id: '7d', label: '7 días', active: selectedPeriod === '7d' },
    { id: '14d', label: '14 días', active: selectedPeriod === '14d' },
    { id: '30d', label: '30 días', active: selectedPeriod === '30d' }
  ] as const;

  return (
    <Card className="w-full card-hover">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center border border-blue-500/20">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-900 dark:text-white font-semibold">Volatilidad de Ingresos</span>
          </div>
          <div className="flex items-center space-x-2">
            {getVolatilityIcon(volatility)}
            <span className={`text-sm font-medium ${getVolatilityColor(volatility)}`}>
              {volatility.toFixed(1)}% volatilidad
            </span>
          </div>
        </CardTitle>
        
        {/* Selector de período */}
        <div className="flex items-center space-x-2 mt-4">
          {periods.map((period) => (
            <Button
              key={period.id}
              variant={period.active ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.id)}
              className={`text-xs ${
                period.active 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'
              }`}
            >
              {period.label}
            </Button>
          ))}
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
              className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
            >
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${totalEarnings.toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Total</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700"
            >
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                ${averageEarnings.toFixed(2)}
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
                ${maxEarnings.toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Máximo</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700"
            >
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                ${minEarnings.toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Mínimo</p>
            </motion.div>
          </div>

          {/* Gráfico de barras mejorado */}
          <div className="space-y-4">
            <div className="flex items-end justify-between h-48 space-x-2">
              <AnimatePresence>
                {recentEarnings.map((earning: Earnings, index: number) => {
                  const height = (earning.amount / maxEarnings) * 100;
                  const isToday = index === recentEarnings.length - 1;
                  const isHovered = hoveredBar === earning.id;
                  
                  return (
                    <motion.div
                      key={earning.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: `${height}%`, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex-1 relative group"
                      onMouseEnter={() => setHoveredBar(earning.id)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          isToday 
                            ? 'bg-gradient-to-t from-blue-600 to-indigo-600 shadow-lg' 
                            : 'bg-gradient-to-t from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500'
                        } ${
                          isHovered ? 'shadow-xl scale-105' : ''
                        }`}
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
              </AnimatePresence>
            </div>
            
            {/* Etiquetas de días */}
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
              {recentEarnings.map((earning: Earnings) => {
                const date = new Date(earning.date);
                const dayName = date.toLocaleDateString('es-MX', { weekday: 'short' });
                const dayNumber = date.getDate();
                return (
                  <div key={earning.id} className="text-center">
                    <div className="font-semibold">{dayName}</div>
                    <div className="text-xs opacity-75">{dayNumber}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mensaje de volatilidad */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={`p-4 rounded-lg border ${
              volatility > 80 
                ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
                : volatility > 50
                ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700'
                : 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                volatility > 80 
                  ? 'bg-red-600 text-white'
                  : volatility > 50
                  ? 'bg-orange-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {getVolatilityMessage(volatility)}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Basado en {recentEarnings.length} días de datos
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}; 