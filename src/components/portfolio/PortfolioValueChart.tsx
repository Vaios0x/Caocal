import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Activity, BarChart3, LineChart, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { portfolioGrowthData } from '../../data/mockData.js';

export const PortfolioValueChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');

  const maxValue = Math.max(...portfolioGrowthData.map(d => d.value));
  const minValue = Math.min(...portfolioGrowthData.map(d => d.value));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
  };

  const calculateGrowth = () => {
    const firstValue = portfolioGrowthData[0].value;
    const lastValue = portfolioGrowthData[portfolioGrowthData.length - 1].value;
    return ((lastValue - firstValue) / firstValue) * 100;
  };

  const growth = calculateGrowth();

  // Datos de rendimiento por período
  const performanceByPeriod = {
    '7d': { change: 2.3, positive: true },
    '30d': { change: 15.2, positive: true },
    '90d': { change: 28.7, positive: true },
    '1y': { change: 45.8, positive: true }
  };

  const periods = [
    { id: '7d', label: '7 días', active: selectedPeriod === '7d' },
    { id: '30d', label: '30 días', active: selectedPeriod === '30d' },
    { id: '90d', label: '90 días', active: selectedPeriod === '90d' },
    { id: '1y', label: '1 año', active: selectedPeriod === '1y' }
  ] as const;

  const chartTypes = [
    { id: 'line', label: 'Línea', icon: LineChart, active: chartType === 'line' },
    { id: 'area', label: 'Área', icon: BarChart3, active: chartType === 'area' },
    { id: 'bar', label: 'Barras', icon: PieChart, active: chartType === 'bar' }
  ] as const;

  return (
    <Card className="w-full card-hover">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-900 dark:text-white font-semibold">Crecimiento del Portafolio</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Últimos 30 días</span>
          </div>
        </CardTitle>
        
        {/* Controles de período */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {periods.map((period) => (
              <Button
                key={period.id}
                variant={period.active ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period.id)}
                className={`text-xs ${
                  period.active 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                }`}
              >
                {period.label}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {chartTypes.map((type) => (
              <Button
                key={type.id}
                variant={type.active ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType(type.id)}
                className={`text-xs ${
                  type.active 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                }`}
              >
                <type.icon className="w-3 h-3 mr-1" />
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Estadísticas principales */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700"
            >
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                ${portfolioGrowthData[portfolioGrowthData.length - 1].value.toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Valor actual</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
            >
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Crecimiento total</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
            >
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {portfolioGrowthData.length}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Datos registrados</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700"
            >
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                ${(portfolioGrowthData[portfolioGrowthData.length - 1].value - portfolioGrowthData[0].value).toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Ganancia total</p>
            </motion.div>
          </div>

          {/* Gráfico SVG */}
          <div className="space-y-4">
            <div className="relative h-64 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Línea de fondo */}
                <polyline
                  points={portfolioGrowthData.map((d, i) => 
                    `${(i / (portfolioGrowthData.length - 1)) * 100},${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}`
                  ).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-300 dark:text-slate-600"
                  opacity="0.3"
                />
                
                {/* Área de crecimiento */}
                {chartType === 'area' && (
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                )}
                
                {chartType === 'area' && (
                  <polygon
                    points={`0,100 ${portfolioGrowthData.map((d, i) => 
                      `${(i / (portfolioGrowthData.length - 1)) * 100},${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}`
                    ).join(' ')} 100,100`}
                    fill="url(#portfolioGradient)"
                  />
                )}
                
                {/* Línea principal */}
                <polyline
                  points={portfolioGrowthData.map((d, i) => 
                    `${(i / (portfolioGrowthData.length - 1)) * 100},${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}`
                  ).join(' ')}
                  fill="none"
                  stroke="hsl(142.1 76.2% 36.3%)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Puntos */}
                {portfolioGrowthData.map((d, i) => {
                  const x = (i / (portfolioGrowthData.length - 1)) * 100;
                  const y = 100 - ((d.value - minValue) / (maxValue - minValue)) * 100;
                  
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="hsl(142.1 76.2% 36.3%)"
                      className="cursor-pointer transition-all duration-200 hover:r-4"
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* Etiquetas de fechas */}
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
              {portfolioGrowthData.map((d, i) => {
                if (i % 2 === 0 || i === portfolioGrowthData.length - 1) {
                  return (
                    <span key={i} className="text-center">
                      {formatDate(d.date)}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Rendimiento por período */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Rendimiento por Período</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(performanceByPeriod).map(([period, data], index) => (
                <motion.div
                  key={period}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className={`p-3 rounded-lg border ${
                    data.positive 
                      ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700'
                      : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{period.toUpperCase()}</p>
                    <p className={`text-lg font-bold ${
                      data.positive 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {data.positive ? '+' : ''}{data.change}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mensaje de análisis */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="p-4 rounded-lg border bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700"
          >
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  ¡Excelente crecimiento!
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Tu portafolio ha crecido un {growth.toFixed(1)}% desde el inicio. ¡Mantén esta excelente tendencia!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}; 