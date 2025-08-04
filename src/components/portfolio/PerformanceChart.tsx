import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';

export const PerformanceChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1d' | '7d' | '30d' | '1y'>('30d');

  // Datos de rendimiento por períodos con más detalle
  const performanceData = {
    '1d': { 
      change: 2.3, 
      positive: true, 
      data: [100, 102.3],
      points: [
        { x: 0, y: 100 },
        { x: 25, y: 101.2 },
        { x: 50, y: 101.8 },
        { x: 75, y: 102.1 },
        { x: 100, y: 102.3 }
      ]
    },
    '7d': { 
      change: 8.7, 
      positive: true, 
      data: [100, 108.7],
      points: [
        { x: 0, y: 100 },
        { x: 20, y: 102.5 },
        { x: 40, y: 104.8 },
        { x: 60, y: 106.2 },
        { x: 80, y: 107.9 },
        { x: 100, y: 108.7 }
      ]
    },
    '30d': { 
      change: 15.2, 
      positive: true, 
      data: [100, 115.2],
      points: [
        { x: 0, y: 100 },
        { x: 16.67, y: 103.5 },
        { x: 33.33, y: 106.8 },
        { x: 50, y: 109.2 },
        { x: 66.67, y: 112.4 },
        { x: 83.33, y: 114.1 },
        { x: 100, y: 115.2 }
      ]
    },
    '1y': { 
      change: 45.8, 
      positive: true, 
      data: [100, 145.8],
      points: [
        { x: 0, y: 100 },
        { x: 14.29, y: 108.5 },
        { x: 28.57, y: 115.2 },
        { x: 42.86, y: 122.8 },
        { x: 57.14, y: 128.9 },
        { x: 71.43, y: 135.4 },
        { x: 85.71, y: 141.2 },
        { x: 100, y: 145.8 }
      ]
    }
  };

  const periods = [
    { id: '1d', label: '1 día', active: selectedPeriod === '1d' },
    { id: '7d', label: '7 días', active: selectedPeriod === '7d' },
    { id: '30d', label: '30 días', active: selectedPeriod === '30d' },
    { id: '1y', label: '1 año', active: selectedPeriod === '30d' }
  ] as const;

  const currentData = performanceData[selectedPeriod];

  return (
    <Card className="w-full card-hover overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-200 dark:border-blue-700">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
            </div>
            <div>
              <span className="text-slate-900 dark:text-white font-semibold text-lg">Rendimiento por Períodos</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Análisis detallado del crecimiento</p>
            </div>
          </div>
        </CardTitle>
        
        {/* Controles de período mejorados */}
        <div className="flex flex-wrap gap-2 mt-4">
          {periods.map((period) => (
            <Button
              key={period.id}
              variant={period.active ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.id)}
              className={`text-xs font-medium transition-all duration-300 ${
                period.active 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg scale-105' 
                  : 'text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Gráfico mejorado con diseño más atractivo */}
          <div className="space-y-4">
            <div className="relative h-80 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Definiciones de gradientes y filtros */}
                <defs>
                  {/* Gradiente para el área del gráfico */}
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(221.2 83.2% 53.3%)" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="hsl(221.2 83.2% 53.3%)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(221.2 83.2% 53.3%)" stopOpacity="0.1" />
                  </linearGradient>
                  
                  {/* Gradiente para la línea principal */}
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(221.2 83.2% 53.3%)" />
                    <stop offset="50%" stopColor="hsl(221.2 83.2% 53.3%)" />
                    <stop offset="100%" stopColor="hsl(142.1 76.2% 36.3%)" />
                  </linearGradient>
                  
                  {/* Gradiente para el punto final */}
                  <radialGradient id="pointGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(142.1 76.2% 36.3%)" />
                    <stop offset="100%" stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity="0.8" />
                  </radialGradient>
                  
                  {/* Filtro de glow */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  {/* Patrón de grid sutil */}
                  <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                    <path d="M 5 0 L 0 0 0 5" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-slate-200 dark:text-slate-700" opacity="0.2"/>
                  </pattern>
                </defs>
                
                {/* Fondo con grid sutil */}
                <rect width="100" height="100" fill="url(#grid)" />
                
                {/* Líneas de referencia horizontales */}
                <line x1="5" y1="90" x2="95" y2="90" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-600" opacity="0.4"/>
                <line x1="5" y1="70" x2="95" y2="70" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-600" opacity="0.3"/>
                <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-600" opacity="0.3"/>
                <line x1="5" y1="30" x2="95" y2="30" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-600" opacity="0.3"/>
                <line x1="5" y1="10" x2="95" y2="10" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-600" opacity="0.3"/>
                
                {/* Líneas de referencia verticales */}
                <line x1="25" y1="10" x2="25" y2="90" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-600" opacity="0.2"/>
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-600" opacity="0.2"/>
                <line x1="75" y1="10" x2="75" y2="90" stroke="currentColor" strokeWidth="0.3" className="text-slate-300 dark:text-slate-600" opacity="0.2"/>
                
                {/* Área de crecimiento con gradiente suave */}
                <polygon
                  points={`5,90 ${currentData.points.map(p => `${p.x},${90 - (p.y - 100) * 0.8}`).join(' ')} 95,90`}
                  fill="url(#areaGradient)"
                  opacity="0.4"
                />
                
                {/* Línea principal con gradiente y glow */}
                <polyline
                  points={currentData.points.map(p => `${p.x},${90 - (p.y - 100) * 0.8}`).join(' ')}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                />
                
                {/* Puntos de datos con diseño mejorado */}
                {currentData.points.map((point, index) => {
                  const y = 90 - (point.y - 100) * 0.8;
                  const isLast = index === currentData.points.length - 1;
                  
                  return (
                    <g key={index}>
                      {/* Sombra del punto */}
                      <circle
                        cx={point.x}
                        cy={y + 2}
                        r={isLast ? "6" : "3"}
                        fill="hsl(221.2 83.2% 53.3%)"
                        opacity="0.4"
                      />
                      
                      {/* Punto principal */}
                      <circle
                        cx={point.x}
                        cy={y}
                        r={isLast ? "5" : "2.5"}
                        fill={isLast ? "url(#pointGradient)" : "hsl(221.2 83.2% 53.3%)"}
                        className="cursor-pointer transition-all duration-200"
                        filter={isLast ? "url(#glow)" : ""}
                      >
                        {isLast && (
                          <animate
                            attributeName="r"
                            values="5;6;5"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        )}
                      </circle>
                      
                      {/* Tooltip mejorado para el último punto */}
                      {isLast && (
                        <g>
                          {/* Fondo del tooltip con sombra */}
                          <rect
                            x={point.x - 35}
                            y={y - 50}
                            width="70"
                            height="35"
                            fill="hsl(222.2 84% 4.9%)"
                            rx="8"
                            opacity="0.95"
                            filter="url(#glow)"
                          />
                          
                          {/* Contenido del tooltip */}
                          <text
                            x={point.x}
                            y={y - 35}
                            textAnchor="middle"
                            fill="white"
                            fontSize="7"
                            fontWeight="bold"
                          >
                            ${point.y.toFixed(2)}
                          </text>
                          <text
                            x={point.x}
                            y={y - 20}
                            textAnchor="middle"
                            fill="hsl(142.1 76.2% 36.3%)"
                            fontSize="6"
                            fontWeight="bold"
                          >
                            +{currentData.change}%
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
              
              {/* Etiquetas de valores mejoradas */}
              <div className="absolute top-4 left-4 text-xs text-slate-600 dark:text-slate-400 font-semibold bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-lg shadow-sm">
                ${currentData.data[0].toFixed(2)}
              </div>
              <div className="absolute top-4 right-4 text-xs text-slate-600 dark:text-slate-400 font-semibold bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-lg shadow-sm">
                ${currentData.data[1].toFixed(2)}
              </div>
            </div>
            
            {/* Etiquetas de fechas mejoradas */}
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium px-2">
              <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg shadow-sm">Inicio</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg shadow-sm">Actual</span>
            </div>
          </div>

          {/* Estadísticas del período mejoradas */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <p className={`text-lg font-bold ${
                  currentData.positive 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {currentData.positive ? '+' : ''}{currentData.change}%
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Cambio</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 shadow-lg"
            >
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                ${currentData.data[1].toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Valor actual</p>
            </motion.div>
          </div>

          {/* Análisis del rendimiento mejorado */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-4 rounded-xl border shadow-lg ${
              currentData.positive 
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 dark:from-emerald-900/20 dark:to-teal-900/20 dark:border-emerald-700'
                : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 dark:from-red-900/20 dark:to-pink-900/20 dark:border-red-700'
            }`}
          >
            <div className="flex items-start space-x-3">
              {currentData.positive ? (
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {currentData.positive ? 'Rendimiento positivo' : 'Rendimiento negativo'}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {currentData.positive 
                    ? `Tu portafolio ha crecido un ${currentData.change}% en este período. Esta tendencia positiva indica un buen manejo de tus inversiones.`
                    : `Tu portafolio ha disminuido un ${Math.abs(currentData.change)}% en este período. Considera revisar tu estrategia de inversión.`
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}; 