import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserData } from '@/hooks/useUserData.js';
import { IncomeVolatilityChart } from '@components/dashboard/IncomeVolatilityChart';
import { RecentEarnings } from '@components/dashboard/RecentEarnings';
import { SavingsGoalMeter } from '@components/dashboard/SavingsGoalMeter';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { Card, CardContent } from '@components/ui/Card';
import { 
  Sparkles, 
  Target, 
  ArrowRight, 
  DollarSign, 
  Star, 
  Eye, 
  EyeOff, 
  Settings, 
  Info, 
  Calculator,
  PieChart,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { isLoading, error, earnings, portfolio } = useUserData();
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [quickActions] = useState([
    { id: 1, title: 'Ajustar Tasa', icon: Settings, action: 'adjust-rate', color: 'blue' },
    { id: 2, title: 'Ver Portafolio', icon: PieChart, action: 'view-portfolio', color: 'purple' },
    { id: 3, title: 'Educación', icon: Star, action: 'education', color: 'emerald' },
    { id: 4, title: 'Calculadoras', icon: Calculator, action: 'calculators', color: 'orange' }
  ]);

  // Calcular estadísticas dinámicas
  const earningsData = Array.isArray(earnings) ? earnings : [];
  const totalEarnings = earningsData.reduce((sum: number, earning: any) => sum + earning.amount, 0);
  const portfolioValue = (portfolio as any)?.totalValue || 0;
  const savingsRate = 5; // Valor por defecto ya que user no tiene savingsRate
  const monthlyGoal = 200;

  // Simular datos de notificaciones
  const notifications = [
    { id: 1, type: 'success', message: 'Meta de ahorro alcanzada', time: '2h' },
    { id: 2, type: 'info', message: 'Nueva recomendación disponible', time: '4h' },
    { id: 3, type: 'warning', message: 'Tasa de ahorro baja', time: '1d' }
  ];

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
          <p className="text-slate-600 dark:text-slate-400 animate-pulse text-lg font-medium">Cargando tu dashboard...</p>
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
            <p className="text-red-600 dark:text-red-400 text-lg font-semibold">Error al cargar el dashboard</p>
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
              Tu Dashboard Financiero
            </h1>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse-slow border-2 border-white dark:border-slate-900"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed font-normal">
            Bienvenido a tu centro de control financiero. Aquí puedes ver el estado de tus ingresos, 
            ahorros y portafolio de inversiones en tiempo real.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-blue-500 rounded-full border border-blue-300 dark:border-blue-700"></div>
              <span className="font-medium">Inteligente</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-purple-500 rounded-full border border-purple-300 dark:border-purple-700"></div>
              <span className="font-medium">Seguro</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-emerald-500 rounded-full border border-emerald-300 dark:border-emerald-700"></div>
              <span className="font-medium">Creciente</span>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas mejoradas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="card-hover bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Ingresos Totales</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${showSensitiveData ? totalEarnings.toFixed(2) : '***.**'}
                    </span>
                    <button
                      onClick={() => setShowSensitiveData(!showSensitiveData)}
                      className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded transition-colors"
                    >
                      {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Portafolio</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${showSensitiveData ? portfolioValue.toFixed(2) : '***.**'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Tasa de Ahorro</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {savingsRate}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Meta Mensual</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${monthlyGoal}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Acciones rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col items-center space-y-3 text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    action.color === 'blue' ? 'bg-blue-600' :
                    action.color === 'purple' ? 'bg-purple-600' :
                    action.color === 'emerald' ? 'bg-emerald-600' :
                    'bg-orange-600'
                  }`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{action.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
        {/* Columna izquierda - Análisis de Ingresos */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="xl:col-span-2 flex flex-col space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex-1"
          >
            <IncomeVolatilityChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex-1"
          >
            <RecentEarnings />
          </motion.div>
        </motion.div>

        {/* Columna derecha - Plan de Ahorro y Widgets */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex-1"
          >
            <SavingsGoalMeter />
          </motion.div>

          {/* Widget de IA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">💡 Insights de IA</h3>
            <Card className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Recomendación Inteligente</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Basada en tus patrones</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Aumenta tu tasa de ahorro</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Considera subir al 8% para alcanzar tu meta más rápido</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Diversifica tus ingresos</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Explora nuevas oportunidades en la gig economy</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Optimiza tus horarios</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Los martes y jueves son tus días más productivos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notificaciones */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notificaciones</h3>
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    notification.type === 'success' 
                      ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700'
                      : notification.type === 'info'
                      ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                      : 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {notification.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    ) : notification.type === 'info' ? (
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{notification.message}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{notification.time}</p>
                    </div>
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
        className="bg-gradient-to-r from-blue-50 via-purple-50 to-emerald-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-emerald-900/20 rounded-3xl p-8 sm:p-10 border border-blue-200/50 dark:border-blue-700/50 text-center shadow-xl"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
          ¿Quieres optimizar tu estrategia financiera?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Descubre herramientas avanzadas para maximizar tus ahorros y construir riqueza 
          de manera inteligente y sostenible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/portfolio">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:from-blue-700 hover:via-purple-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4 rounded-xl">
              <span>Ver Portafolio</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/education">
            <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg px-8 py-4 rounded-xl">
              <span>Educación Financiera</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}; 