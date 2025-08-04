import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, Settings, Calendar, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useSavingsRate } from '../../hooks/useUserData.js';

export const SavingsGoalMeter: React.FC = () => {
  const { savingsRate, updateSavingsRate } = useSavingsRate();
  const [showSettings, setShowSettings] = useState(false);
  const [tempRate, setTempRate] = useState(savingsRate);

  // Simular datos de meta de ahorro
  const monthlyGoal = 200; // $200 USD
  const currentSavings = 127.50; // Del portafolio
  const progress = (currentSavings / monthlyGoal) * 100;

  // Calcular días restantes en el mes
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysRemaining = daysInMonth - today.getDate();
  const daysElapsed = today.getDate();

  // Calcular proyección
  const projectedSavings = currentSavings + ((monthlyGoal - currentSavings) / daysRemaining) * daysElapsed;
  const projectedProgress = (projectedSavings / monthlyGoal) * 100;

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-emerald-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressMessage = (progress: number) => {
    if (progress >= 80) return "¡Excelente progreso! Estás muy cerca de tu meta.";
    if (progress >= 60) return "Buen progreso. Mantén el ritmo para alcanzar tu meta.";
    if (progress >= 40) return "Progreso moderado. Considera aumentar tu tasa de ahorro.";
    return "Iniciando tu camino. Cada paso cuenta hacia tu meta.";
  };

  const getProgressIcon = (progress: number) => {
    if (progress >= 80) return <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    if (progress >= 60) return <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    if (progress >= 40) return <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
    return <Info className="w-5 h-5 text-red-600 dark:text-red-400" />;
  };

  const handleRateChange = (newRate: number) => {
    setTempRate(newRate);
  };

  const handleSaveRate = () => {
    updateSavingsRate(tempRate);
    setShowSettings(false);
  };

  return (
    <Card className="w-full card-hover">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center border border-emerald-500/20">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-900 dark:text-white font-semibold">Meta de Ahorro Mensual</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Configuración de tasa de ahorro */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tasa de Ahorro</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{tempRate}%</span>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={tempRate}
                      onChange={(e) => handleRateChange(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>1%</span>
                      <span>10%</span>
                      <span>20%</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleRateChange(Math.max(1, tempRate - 1))}
                      className="flex-1"
                    >
                      -
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRateChange(Math.min(20, tempRate + 1))}
                      className="flex-1"
                    >
                      +
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveRate}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progreso visual mejorado */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Progreso</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {progress.toFixed(1)}%
                </span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-slow"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full ${getProgressColor(progress)}`}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
                <span>$0</span>
                <span>${monthlyGoal}</span>
              </div>
            </div>

            {/* Proyección */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Proyección mensual</span>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {projectedProgress.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Estadísticas mejoradas */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700"
            >
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                ${currentSavings.toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Ahorrado</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">
                ${(monthlyGoal - currentSavings).toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Restante</p>
            </motion.div>
          </div>

          {/* Información temporal */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700"
            >
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {daysRemaining}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Días restantes</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
            >
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {daysElapsed}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Días transcurridos</p>
            </motion.div>
          </div>

          {/* Mensaje de progreso */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`p-4 rounded-lg border ${
              progress >= 80 
                ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700'
                : progress >= 60
                ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                : progress >= 40
                ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700'
                : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
            }`}
          >
            <div className="flex items-start space-x-3">
              {getProgressIcon(progress)}
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {getProgressMessage(progress)}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Tasa actual: {savingsRate}% • Meta: ${monthlyGoal}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}; 