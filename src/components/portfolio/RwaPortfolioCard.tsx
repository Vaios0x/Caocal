import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Info, Eye, EyeOff, Share2, Download, Star, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Asset } from '../../data/mockData.js';

interface RwaPortfolioCardProps {
  asset: Asset;
  isSelected?: boolean;
}

export const RwaPortfolioCard: React.FC<RwaPortfolioCardProps> = ({ 
  asset, 
  isSelected = false
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const isPositive = asset.change24h >= 0;
  const percentageOwned = (asset.amount / 1) * 100; // Simular porcentaje de propiedad

  const getAssetIcon = (symbol: string) => {
    switch (symbol.toLowerCase()) {
      case 'btt-2030':
        return '🏛️';
      case 'fit-mex':
        return '🏢';
      default:
        return '📊';
    }
  };

  const getAssetColor = (symbol: string) => {
    switch (symbol.toLowerCase()) {
      case 'btt-2030':
        return 'bg-blue-600';
      case 'fit-mex':
        return 'bg-emerald-600';
      default:
        return 'bg-purple-600';
    }
  };

  const getAssetGradient = (symbol: string) => {
    switch (symbol.toLowerCase()) {
      case 'btt-2030':
        return 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700';
      case 'fit-mex':
        return 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700';
      default:
        return 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className={`h-full transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'ring-2 ring-blue-500 shadow-xl' 
          : 'hover:shadow-lg'
      } bg-gradient-to-br ${getAssetGradient(asset.symbol)}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl overflow-hidden ${getAssetColor(asset.symbol)} flex items-center justify-center`}>
                <span className="text-white text-lg">{getAssetIcon(asset.symbol)}</span>
              </div>
              <div>
                <CardTitle className="text-lg text-slate-900 dark:text-white">{asset.name}</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">{asset.symbol}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFavorite(!isFavorite);
                }}
                className="hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Star className={`w-4 h-4 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(!showDetails);
                }}
                className="hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Info className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Valor y cambio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Tu valor</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  ${showSensitiveData ? asset.value.toFixed(2) : '***.**'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSensitiveData(!showSensitiveData);
                  }}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  {showSensitiveData ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Cambio 24h</span>
              <div className={`flex items-center space-x-1 text-sm ${
                isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-semibold">{Math.abs(asset.change24h).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Propiedad fraccionada */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Tu propiedad</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {asset.amount.toFixed(4)} tokens
              </span>
            </div>
            
            {/* Gráfico de anillo mejorado */}
            <div className="relative w-16 h-16 mx-auto">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-300 dark:text-slate-600"
                  opacity="0.3"
                />
                <motion.path
                  initial={{ strokeDasharray: '0 100' }}
                  animate={{ strokeDasharray: `${percentageOwned * 3.14159}, 100` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`${getAssetColor(asset.symbol).replace('bg-', 'text-')}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {percentageOwned.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Detalles expandibles */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-slate-200 dark:border-slate-700"
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">Tipo de Activo</p>
                      <p className="text-slate-900 dark:text-white font-semibold">
                        {asset.symbol.includes('BTT') ? 'Bono del Tesoro' : 'Fondo Inmobiliario'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">Vencimiento</p>
                      <p className="text-slate-900 dark:text-white font-semibold">
                        {asset.symbol.includes('BTT') ? '2030' : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">Rendimiento</p>
                      <p className="text-slate-900 dark:text-white font-semibold">
                        {asset.symbol.includes('BTT') ? '4.5%' : '6.2%'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">Riesgo</p>
                      <p className="text-slate-900 dark:text-white font-semibold">
                        {asset.symbol.includes('BTT') ? 'Bajo' : 'Medio'}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Share2 className="w-3 h-3 mr-1" />
                      Compartir
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Download className="w-3 h-3 mr-1" />
                      Reporte
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicador de rendimiento */}
          <div className={`p-3 rounded-lg border ${
            isPositive 
              ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700'
              : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className={`w-4 h-4 ${
                  isPositive 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-red-600 dark:text-red-400'
                }`} />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {isPositive ? 'Rendimiento positivo' : 'Rendimiento negativo'}
                </span>
              </div>
              <span className={`text-xs font-bold ${
                isPositive 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {isPositive ? '+' : ''}{asset.change24h.toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 